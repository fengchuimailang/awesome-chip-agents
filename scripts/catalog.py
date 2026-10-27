#!/usr/bin/env python3
"""Render the bilingual catalog and optionally refresh public GitHub metadata.

Only Python's standard library is required. Resource Markdown is the editorial
source; its JSON metadata comment and descriptions are preserved verbatim.
"""

import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import date, datetime, timezone
import json
import os
from pathlib import Path
import re
import subprocess
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
METADATA = re.compile(r"<!-- metadata\n(.*?)\n-->", re.S)
MANAGED = re.compile(r"<!-- resource:start -->\n.*?<!-- resource:end -->", re.S)
REPOSITORY = re.compile(r"https://github\.com/([\w.-]+/[\w.-]+)(?:[/#?]|$)")
SLUG = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")
WORDS = {
    "unknown": ["Date not recorded", "日期待核实"],
    "year": ["month not verified", "月份待核实"],
    "source": ["Date recorded in the linked source", "日期沿用所链接来源的记录"],
    "arxiv-month": ["arXiv identifier month; exact first-public day not verified", "按 arXiv 编号月份归档；首次公开的具体日期待核实"],
    "year-only": ["Publication / conference year only; first-public month not verified", "仅记录发表 / 会议年份；首次公开月份待核实"],
}


def load_catalog(root=ROOT):
    """读取并校验所有资源文件及其双语元数据。"""
    taxonomy = json.loads((root / "data/taxonomy.json").read_text())
    records = []
    seen = set()
    for path in sorted((root / "resources").glob("*/*.md")):
        if path.parent.name not in taxonomy["directions"]:
            continue
        if path.name in ("README.md", "README_zh.md"):
            continue
        body = path.read_text()
        match = METADATA.search(body)
        if not match:
            raise ValueError(f"Missing metadata: {path}")
        meta = json.loads(match[1])
        rid = meta["id"]
        if not SLUG.fullmatch(rid) or rid in seen:
            raise ValueError(f"Invalid or duplicate resource id: {rid}")
        seen.add(rid)
        direction = meta["direction"]
        if direction not in taxonomy["directions"] or path.relative_to(root).as_posix() != f"resources/{direction}/{rid}.md":
            raise ValueError(f"Resource path does not match metadata: {path}")
        for key in ("tags", "types"):
            values = meta[key]
            if not values or len(set(values)) != len(values) or any(v not in taxonomy[key] for v in values):
                raise ValueError(f"Invalid {key}: {rid}")
        if len(meta["tags"]) < 2:
            raise ValueError(f"At least two tags required: {rid}")
        if len(meta["summary"]) != 2 or any(not isinstance(s, str) or not s.strip() or "\n" in s for s in meta["summary"]):
            raise ValueError(f"Bilingual summaries required: {rid}")
        when = meta["date"]
        if when is not None:
            if not re.fullmatch(r"20\d{2}(?:-\d{2}(?:-\d{2})?)?", when):
                raise ValueError(f"Invalid date: {rid}")
            date.fromisoformat(when + {4: "-01-01", 7: "-01", 10: ""}[len(when)])
        if meta["date_basis"] not in ("unknown", "source", "arxiv-month", "year-only"):
            raise ValueError(f"Invalid date basis: {rid}")
        if (when is None) != (meta["date_basis"] == "unknown"):
            raise ValueError(f"Date / basis mismatch: {rid}")
        if not meta["links"]:
            raise ValueError(f"Source link required: {rid}")
        for link in meta["links"]:
            parsed = urlparse(link["url"])
            if parsed.scheme != "https" or not parsed.netloc or link["kind"] not in ("paper", "repository", "source"):
                raise ValueError(f"Invalid source link: {rid}")
        if not MANAGED.search(body) or "\n## English\n" not in body or "\n## 简体中文\n" not in body:
            raise ValueError(f"Missing rendered block or bilingual descriptions: {rid}")
        if any(d not in taxonomy["directions"] or d == direction for d in meta["also_in"]):
            raise ValueError(f"Invalid secondary direction: {rid}")
        records.append({"meta": meta, "body": body, "path": path})
    for record in records:
        if any(r not in seen or r == record["meta"]["id"] for r in record["meta"]["related"]):
            raise ValueError(f"Invalid related resource: {record['path']}")
    return taxonomy, records


def repositories(meta):
    """Deduplicate repo roots, including links to subdirectories of one repo.

    从资源链接中提取并去重 GitHub 仓库根路径。
    """
    found = {}
    for link in meta["links"]:
        match = REPOSITORY.match(link["url"])
        if match:
            repo = match[1].removesuffix(".git")
            found.setdefault(repo.lower(), repo)
    return list(found.values())


def refresh_stats(records, cache, fetch=None, now=None):
    """Keep successful snapshots on failures, recording the latest attempt.

    刷新相关 GitHub 仓库快照；失败时保留旧数据并记录尝试结果。
    """
    now = now or datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")
    token = os.environ.get("GITHUB_TOKEN") or os.environ.get("GH_TOKEN")
    if not token and fetch is None:
        # Reuse an existing local GitHub CLI login without exposing its token.
        # CI supplies GITHUB_TOKEN; gh remains entirely optional.
        try:
            auth = subprocess.run(
                ["gh", "auth", "token", "--hostname", "github.com"],
                capture_output=True, text=True, timeout=5, check=False,
            )
            if auth.returncode == 0:
                token = auth.stdout.strip()
        except (OSError, subprocess.TimeoutExpired):
            pass

    def fetch_api(repo):
        """通过 GitHub API 获取单个仓库的数据，并对临时错误重试。"""
        headers = {"Accept": "application/vnd.github+json", "User-Agent": "awesome-chip-agents-catalog"}
        if token:
            headers["Authorization"] = f"Bearer {token}"
        request = Request(f"https://api.github.com/repos/{repo}", headers=headers)
        for attempt in range(3):
            try:
                with urlopen(request, timeout=20) as response:
                    return json.load(response)
            except HTTPError as exc:
                if exc.code not in (429, 500, 502, 503, 504) or attempt == 2:
                    raise
                time.sleep(attempt + 1)

    fetch = fetch or fetch_api
    all_repos = {repo.lower(): repo for record in records for repo in repositories(record["meta"])}
    updated = {key: value.copy() for key, value in cache.items() if key in all_repos}

    def one(item):
        """获取并规范化单个仓库的统计数据，失败时沿用已有快照。"""
        key, repo = item
        snapshot = updated.get(key, {}).copy()
        try:
            payload = fetch(repo)
            stars = payload["stargazers_count"]
            pushed = payload["pushed_at"]
            if type(stars) is not int or stars < 0:
                raise ValueError("Invalid star count")
            if pushed is not None:
                datetime.fromisoformat(pushed.replace("Z", "+00:00"))
            snapshot = {
                "full_name": payload["full_name"], "stars": stars,
                "pushed_at": pushed, "fetched_at": now,
                "archived": bool(payload.get("archived", False)),
                "last_attempt_at": now, "fetch_error": None,
            }
            return key, snapshot, None
        except HTTPError as exc:
            error = f"HTTP {exc.code}"
        except (URLError, TimeoutError, OSError):
            error = "Network request failed"
        except (KeyError, TypeError, ValueError):
            error = "Invalid API response"
        snapshot.update(last_attempt_at=now, fetch_error=error)
        return key, snapshot, f"{repo}: {error}"

    failures = []
    with ThreadPoolExecutor(max_workers=4) as pool:
        for key, snapshot, error in pool.map(one, sorted(all_repos.items())):
            updated[key] = snapshot
            if error:
                failures.append(error)
    return dict(sorted(updated.items())), failures


def text_pair(en, zh, lang):
    """根据语言标记从英文和中文文本中选择一个版本。"""
    return zh if lang else en


def resource_url(record, prefix=""):
    """生成指向资源详情 Markdown 文件的相对链接。"""
    m = record["meta"]
    return f"{prefix}resources/{m['direction']}/{m['id']}.md"


def month(meta, lang):
    """返回资源的归档月份，或对应语言的日期未知提示。"""
    when = meta["date"]
    if not when:
        return WORDS["unknown"][lang]
    return when[:7] if len(when) >= 7 else f"{when} · {WORDS['year'][lang]}"


def sorted_records(records):
    """按日期和资源 ID 倒序排列资源记录。"""
    return sorted(records, key=lambda r: (r["meta"]["date"] or "", r["meta"]["id"]), reverse=True)


def is_benchmark_resource(meta):
    """汇总基准与数据集研究资源，排除仅谈及评测的新闻和视频。"""
    return not set(meta["types"]) & {"news", "video"} and bool(
        "benchmark" in meta["types"] or set(meta["tags"]) & {"benchmark", "dataset"})


def repo_cells(repo, cache, lang):
    """返回仓库、Stars 和推送时间三个表格单元格。"""
    snapshot = cache.get(repo.lower(), {})
    repository = f"[{repo}](https://github.com/{repo})"
    if snapshot.get("fetch_error"):
        repository += "<br>" + text_pair(
            "Refresh failed; previous snapshot" if "stars" in snapshot else "Refresh failed",
            "刷新失败，保留上次快照" if "stars" in snapshot else "刷新失败", lang)
    if snapshot.get("archived"):
        repository += "<br>" + text_pair("Archived", "已归档", lang)
    if "stars" not in snapshot:
        return repository, "—", text_pair("Metadata unavailable", "指标暂不可用", lang)
    pushed = (snapshot.get("pushed_at") or "")[:10] or "—"
    fetched = snapshot["fetched_at"][:10]
    return repository, f"{snapshot['stars']:,}", pushed + "<br>" + text_pair(f"Fetched {fetched}", f"采集 {fetched}", lang)


def table_row(cells):
    """转义单元格分隔符和换行，避免内容破坏 Markdown 表格。"""
    return "| " + " | ".join(str(cell).replace("|", r"\|").replace("\n", "<br>") for cell in cells) + " |"


def entry(record, taxonomy, cache, lang, prefix, cross=False):
    """生成资源表格的一行，包含简介、标签、来源和仓库指标。"""
    m = record["meta"]
    kind = " / ".join(taxonomy["types"][t][lang] for t in m["types"])
    suffix = text_pair(" · cross-reference", " · 跨方向索引", lang) if cross else ""
    # A short purpose line complements the original full title on the detail page.
    summary = m["summary"][lang]
    resource = f"**[{m['name']}]({resource_url(record, prefix)})**<br>{summary}"
    labels = " · ".join(f"[{taxonomy['tags'][tag][lang]}]({prefix}resources/tags/{tag}.md)" for tag in m["tags"])
    labels += f"<br>{kind}{suffix}"
    paper = next((link for link in m["links"] if link["kind"] == "paper"), None)
    repos = repositories(m)
    sources = []
    if paper:
        sources.append(f"[{text_pair('Paper', '论文', lang)}]({paper['url']})")
    if not sources and not repos:
        sources.append(f"[{text_pair('Source', '原始来源', lang)}]({m['links'][0]['url']})")
    # Keep the repository, star count and dates aligned when a resource links
    # multiple repositories. Each repository occupies the same numbered line.
    activities = [repo_cells(repo, cache, lang) for repo in repos]
    columns = ["<br><br>".join(f"{i + 1}. {cells[column]}" if len(activities) > 1 else cells[column]
                              for i, cells in enumerate(activities)) or "—" for column in range(3)]
    return table_row([resource, labels, " · ".join(sources) or "—", *columns])


def grouped(records, taxonomy, cache, lang, prefix, cross_ids=None, heading_level=2):
    """按月份分组并生成资源索引内容。"""
    groups = {}
    for record in sorted_records(records):
        groups.setdefault(month(record["meta"], lang), []).append(record)
    blocks = []
    for heading, group in groups.items():
        header = table_row([
            text_pair("Resource / Summary", "资源 / 简介", lang),
            text_pair("Tags / Type", "标签 / 类型", lang),
            text_pair("Paper / Source", "论文 / 来源", lang),
            text_pair("Repository", "仓库", lang), "Stars",
            text_pair("Last push (UTC)", "最近推送（UTC）", lang),
        ])
        rows = [header, "| --- | --- | --- | --- | ---: | --- |"]
        rows.extend(entry(r, taxonomy, cache, lang, prefix, r["meta"]["id"] in (cross_ids or set())) for r in group)
        blocks.append(f"{'#' * heading_level} {heading}\n\n" + "\n".join(rows))
    return "\n\n".join(blocks)


def render_detail(record, taxonomy, cache, by_id):
    """更新资源文件中的自动生成详情区块，并保留编辑内容。"""
    m = record["meta"]
    nav = "[English index](../../README.md) · [中文索引](../../README_zh.md) · [Direction](README.md) · [本方向](README_zh.md) · [Tags / 标签](../tags/README.md)"
    if is_benchmark_resource(m):
        nav += " · [Benchmarks](../benchmarks/README.md) · [基准与数据集](../benchmarks/README_zh.md)"
    when = m["date"] or "Not recorded / 待核实"
    basis = WORDS[m["date_basis"]]
    block = [nav, f"- **Date / 日期：** {when}",
             f"- **Date basis / 日期依据：** {basis[0]} / {basis[1]}",
             "- **Type / 类型：** " + "; ".join(" / ".join(taxonomy["types"][t]) for t in m["types"]),
             "- **Direction / 方向：** " + " / ".join(taxonomy["directions"][m["direction"]]),
             "- **Tags / 标签：** " + " · ".join(f"[{taxonomy['tags'][t][0]} / {taxonomy['tags'][t][1]}](../tags/{t}.md)" for t in m["tags"])]
    # Separate list items with a blank line from the preceding navigation paragraph.
    block[0] += "\n"
    block.extend(["", "## Links / 相关链接", ""])
    for link in m["links"]:
        role = {"paper": "Paper / 论文", "repository": "Repository / 仓库", "source": "Source / 原始来源"}[link["kind"]]
        block.append(f"- **{role}：** [{link['label']}]({link['url']})")
    if not any(link["kind"] == "paper" for link in m["links"]):
        block.append("- **Paper / 论文：** No separate paper link recorded / 暂未记录独立论文链接。")
    repos = repositories(m)
    if repos:
        block.extend(["", "## Repository activity / 仓库动态", "",
                      "| Repository / 仓库 | Stars | Last push (UTC) / 最近推送 | Fetched (UTC) / 采集时间 | Status / 状态 |",
                      "| --- | ---: | --- | --- | --- |"])
        for repo in repos:
            s = cache.get(repo.lower(), {})
            stars = f"{s['stars']:,}" if "stars" in s else "—"
            status = "Snapshot / 快照" if "stars" in s else "Unavailable / 暂不可用"
            if s.get("fetch_error"):
                status += "; refresh failed / 刷新失败"
            if s.get("archived"):
                status += "; archived / 已归档"
            block.append(f"| [{repo}](https://github.com/{repo}) | {stars} | {s.get('pushed_at') or '—'} | {s.get('fetched_at', '—')} | {status} |")
        block.extend(["", "Stars and push times are GitHub API snapshots. A push may update any branch and does not establish a functional release or research quality.",
                      "", "Stars 与推送时间来自 GitHub API 快照；推送可能涉及任一分支，不代表发布了新功能，也不代表研究质量。"])
    else:
        block.extend(["", "**Repository / 仓库：** No related public repository link recorded / 暂未记录相关公开仓库链接。"])
    if m["related"]:
        block.extend(["", "## Related resources / 相关资源", ""])
        for rid in m["related"]:
            other = by_id[rid]
            block.append(f"- [{other['meta']['name']}]({resource_url(other, '../../')})")
    replacement = "<!-- resource:start -->\n" + "\n".join(block) + "\n<!-- resource:end -->"
    # A callable replacement leaves literal backslashes in titles/URLs untouched.
    return MANAGED.sub(lambda _: replacement, record["body"], count=1)


def render_all(taxonomy, records, cache):
    """生成双语首页、分类索引、标签索引和资源详情文件内容。"""
    outputs = {}
    by_id = {r["meta"]["id"]: r for r in records}
    generated = "<!-- Generated by scripts/catalog.py; edit resource metadata and descriptions. -->\n\n"
    for record in records:
        outputs[record["path"]] = render_detail(record, taxonomy, cache, by_id)
    for lang, filename in [(0, "README.md"), (1, "README_zh.md")]:
        other = "README_zh.md" if not lang else "README.md"
        language = "简体中文" if not lang else "English"
        intro = text_pair(
            "A curated catalog of **LLM agents for chip design**. Browse by direction, then publication month; each resource combines its paper, code, tags, and bilingual descriptions.",
            "面向**芯片设计 LLM Agent** 的精选资料库。先按方向查找，再按发布月份浏览；每项资源集中提供论文、代码、多个标签和中英文简介。", lang)
        home = ["# Awesome Chip Agents", f"[{language}]({other})", intro,
                "## " + text_pair("Browse by Direction", "按方向查找", lang),
                text_pair("Each record has one primary direction. Cross-references link to the same detail file.", "每项资源只有一个主要方向；跨方向条目链接到同一详情文件。", lang)]
        home.extend(["| " + text_pair("Direction | Primary resources", "方向 | 主要资源数", lang) + " |", "| --- | ---: |"])
        for direction, labels in taxonomy["directions"].items():
            count = sum(r["meta"]["direction"] == direction and not set(r["meta"]["types"]) & {"news", "video"} for r in records)
            home.append(f"| [{labels[lang]}](resources/{direction}/{filename}) | {count} |")
        home.extend(["## " + text_pair("Other Indexes", "其他入口", lang),
                     f"- [{text_pair('Benchmarks and Datasets', '基准与数据集', lang)}](resources/benchmarks/{filename})",
                     f"- [{text_pair('Tags', '标签索引', lang)}](resources/tags/{filename})",
                     f"- [{text_pair('News and Announcements', '新闻与动态', lang)}](resources/news/{filename})",
                     f"- [{text_pair('Talks and Videos', '演讲与视频', lang)}](resources/videos/{filename})",
                     "## " + text_pair("Reading the Catalog", "阅读说明", lang),
                     text_pair(
                         "Months follow the earliest public date documented here, using the arXiv identifier month where only that precision is known. Conference years and revisions remain in resource notes; year-only and undated resources have separate groups. Repository push dates never change publication groups.",
                         "月份优先采用已记录的首次公开日期；仅能确认 arXiv 编号月份时按该月份归档，并注明依据。会议年份和修订日期保留在详情中；只有年份或日期不明的资源单独分组。仓库推送时间不改变发布月份。", lang),
                     text_pair(
                         "GitHub stars and latest push times are weekly snapshots with collection timestamps. Failed refreshes retain previous snapshots. These indicators help assess visibility and activity, not research quality. See the [update policy](CONTRIBUTING.md#repository-metadata).",
                         "GitHub Stars 和最近推送时间为每周采集的快照，均标注采集时间；刷新失败保留旧数据。这些指标用于了解关注度和仓库动态。详见[更新规则](CONTRIBUTING.md#repository-metadata)。", lang),
                     "## " + text_pair("Scope", "收录范围", lang),
                     text_pair(
                         "Resources cover RTL generation/editing, verification/debugging, physical design, analog/RF, architecture/HLS/co-design, and agent infrastructure. Board, packaging, and system work is included when directly relevant. General tools and datasets are included only as supporting resources; not every listed benchmark is agent-specific. Simulator-based architecture optimization need not produce RTL. Vendor claims are identified in resource notes.",
                         "覆盖 RTL 生成与编辑、验证与调试、物理设计、模拟与 RF、架构探索与 HLS / 软硬件协同设计，以及 Agent 基础设施。板级、封装和系统资料需与上述工作直接相关。通用工具和数据集作为支撑资料收录，并非所有基准都专为 Agent 设计；基于模拟器的架构优化也不一定生成 RTL。厂商主张在详情中注明。", lang),
                     "## " + text_pair("Contributing", "如何贡献", lang),
                     text_pair("See [contribution guidelines and the resource template](CONTRIBUTING.md). Keep English and Simplified Chinese content aligned.", "请参阅[贡献指南与资源模板](CONTRIBUTING.md)，保持中英文内容对应。", lang),
                     "## " + text_pair("License", "许可", lang),
                     text_pair("Original repository content uses the [MIT License](LICENSE). Linked resources retain their own terms.", "本仓库原创内容采用 [MIT License](LICENSE)；所链接资源遵循其各自条款。", lang)])
        # Keep the table and bullet lists contiguous, with blank lines around them.
        start = home.index(next(s for s in home if s.startswith("| ")))
        end = start + len(taxonomy["directions"]) + 2
        home[start:end] = ["\n".join(home[start:end])]
        bullets = [i for i,s in enumerate(home) if s.startswith("- [")]
        a,b=bullets[0],bullets[-1]+1
        home[a:b] = ["\n".join(home[a:b])]
        outputs[ROOT / filename] = generated + "\n\n".join(home) + "\n"

        for direction, labels in taxonomy["directions"].items():
            technical = [r for r in records if not set(r["meta"]["types"]) & {"news", "video"}
                         and (r["meta"]["direction"] == direction or direction in r["meta"]["also_in"])]
            cross_ids = {r["meta"]["id"] for r in technical if r["meta"]["direction"] != direction}
            title = f"# {labels[lang]}"
            nav = f"[{text_pair('Home', '首页', lang)}](../../{filename}) · [{language}]({other}) · [{text_pair('Tags', '标签', lang)}](../tags/{filename})"
            note = text_pair("Newest publication month first. Cross-references share the original record; repository activity does not affect ordering.", "按发布月份倒序排列。跨方向索引共用原始详情；仓库动态不影响排序。", lang)
            parts = [title,nav,note,grouped(technical,taxonomy,cache,lang,"../../",cross_ids)]
            events = [r for r in records if r["meta"]["direction"] == direction and set(r["meta"]["types"]) & {"news", "video"}]
            if events:
                parts += ["# " + text_pair("Related News and Videos", "相关动态与视频",lang), grouped(events,taxonomy,cache,lang,"../../")]
            outputs[ROOT / "resources" / direction / filename] = generated + "\n\n".join(parts) + "\n"
        for folder, kind, labels in [("news","news",["News and Announcements","新闻与动态"]),("videos","video",["Talks and Videos","演讲与视频"])]:
            subset = [r for r in records if kind in r["meta"]["types"]]
            outputs[ROOT / "resources" / folder / filename] = generated + f"# {labels[lang]}\n\n[{text_pair('Home','首页',lang)}](../../{filename}) · [{language}]({other})\n\n" + grouped(subset,taxonomy,cache,lang,"../../") + "\n"
        benchmarks = [r for r in records if is_benchmark_resource(r["meta"])]
        benchmark_parts = [
            "# " + text_pair("Benchmarks and Datasets", "基准与数据集", lang),
            f"[{text_pair('Home', '首页', lang)}](../../{filename}) · [{language}]({other})",
            text_pair(
                f"{len(benchmarks)} resources, grouped by primary direction and newest publication month. Entries link to shared details with papers, repositories, tags, and activity snapshots. General datasets are included as supporting resources; announcements of evaluation plans remain in the news index.",
                f"共 {len(benchmarks)} 项，先按主要研究方向分类，再按发布月份倒序排列。各条目共用已有详情，提供论文、仓库、标签及动态快照。通用数据集作为支撑资料收录；仅宣布评测计划的新闻保留在动态索引中。", lang),
        ]
        direction_groups = [
            (direction, labels, [r for r in benchmarks if r["meta"]["direction"] == direction])
            for direction, labels in taxonomy["directions"].items()
        ]
        benchmark_parts.append("\n".join([
            table_row([text_pair("Direction", "方向", lang), text_pair("Resources", "资源数", lang)]),
            "| --- | ---: |",
            *(table_row([f"[{labels[lang]}](#{direction})", len(subset)])
              for direction, labels, subset in direction_groups if subset),
        ]))
        for direction, labels, subset in direction_groups:
            if subset:
                benchmark_parts.extend([
                    f'<a id="{direction}"></a>\n\n## {labels[lang]}',
                    grouped(subset, taxonomy, cache, lang, "../../", heading_level=3),
                ])
        outputs[ROOT / "resources/benchmarks" / filename] = generated + "\n\n".join(benchmark_parts) + "\n"
        tagrows=[table_row([text_pair("Tag", "标签", lang), text_pair("Resources", "资源数", lang)]),
                 "| --- | ---: |"]
        for tag, labels in taxonomy["tags"].items():
            subset=[r for r in records if tag in r["meta"]["tags"]]
            if subset:
                tagrows.append(table_row([f"[{labels[lang]}]({tag}.md)", len(subset)]))
        outputs[ROOT / "resources/tags" / filename] = generated + f"# {text_pair('Tag Index','标签索引',lang)}\n\n[{text_pair('Home','首页',lang)}](../../{filename}) · [{language}]({other})\n\n" + "\n".join(tagrows) + "\n"
    for tag, labels in taxonomy["tags"].items():
        subset=[r for r in records if tag in r["meta"]["tags"]]
        if subset:
            body = generated + f"# {labels[0]} / {labels[1]}\n\n[English index](README.md) · [中文索引](README_zh.md)\n\n"
            # Short bilingual lookup table avoids repeating full descriptions and stats.
            body += "| Resource / 资源 | Date / 日期 | Direction / 方向 |\n| --- | --- | --- |\n"
            for r in sorted_records(subset):
                m=r["meta"]
                body += f"| [{m['name']}]({resource_url(r,'../../')}) | {m['date'] or 'Unknown / 待核实'} | {' / '.join(taxonomy['directions'][m['direction']])} |\n"
            outputs[ROOT / "resources/tags" / (tag+".md")] = body
    return outputs


def main():
    """解析命令行选项，校验数据并检查或写入生成文件。"""
    parser = argparse.ArgumentParser(description=__doc__)
    mode = parser.add_mutually_exclusive_group()
    mode.add_argument("--refresh", action="store_true", help="Fetch public GitHub repository metadata, then render")
    mode.add_argument("--check", action="store_true", help="Check metadata and generated content without changing files or accessing the network")
    args = parser.parse_args()
    taxonomy, records = load_catalog()
    stats_path = ROOT / "data/repo-stats.json"
    cache = json.loads(stats_path.read_text())
    failures = []
    if args.refresh:
        cache, failures = refresh_stats(records, cache)
        stats_path.write_text(json.dumps(cache,ensure_ascii=False,indent=2)+"\n")
        for failure in failures:
            print(f"Warning: {failure}", file=sys.stderr)
    outputs = render_all(taxonomy,records,cache)
    stale = []
    for path, content in outputs.items():
        if not path.exists() or path.read_text() != content:
            stale.append(str(path.relative_to(ROOT)))
            if not args.check:
                path.parent.mkdir(parents=True,exist_ok=True)
                path.write_text(content)
    if args.check and stale:
        print("Generated content is out of date:\n"+"\n".join(stale),file=sys.stderr)
        return 1
    available = sum("stars" in snapshot for snapshot in cache.values())
    print(f"Validated {len(records)} resources; {'checked' if args.check else 'rendered'} {len(outputs)} Markdown files; {available}/{len(cache)} repository snapshots available.")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
