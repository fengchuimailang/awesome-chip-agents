"""Build an evidence-backed graph from canonical catalog metadata (stdlib only)."""

import hashlib
import json
import re
from datetime import date, datetime
from urllib.parse import urlsplit

ENTITY_TYPES = ("resource", "person", "organization", "repository", "topic", "method")
RELATIONS = {
    "IN_TOPIC": (("resource",), ("topic",)),
    "USES_METHOD": (("resource",), ("method",)),
    "AUTHOR_OF": (("person",), ("resource",)),
    "AFFILIATED_WITH": (("person",), ("organization",)),
    "HAS_REPOSITORY": (("resource",), ("repository",)),
    "OWNED_BY": (("repository",), ("person", "organization")),
    "EXTENDS": (("resource",), ("resource",)),
    "EVALUATED_ON": (("resource",), ("resource",)),
    "COMPARES_WITH": (("resource",), ("resource",)),
    "RELATED_TO": (("resource",), ("resource",)),
}


def precision(value):
    if value is None:
        return "unknown"
    if not isinstance(value, str) or not re.fullmatch(r"\d{4}(?:-\d{2}(?:-\d{2})?)?", value):
        raise ValueError("Invalid graph date: " + str(value))
    date.fromisoformat(value + {4: "-01-01", 7: "-01", 10: ""}[len(value)])
    return {4: "year", 7: "month", 10: "day"}[len(value)]


def timestamp(value):
    if value is not None:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
        if parsed.tzinfo is None:
            raise ValueError("Graph collection timestamps require a timezone")
    return value


def evidence(value):
    if not isinstance(value, list) or not value:
        raise ValueError("Graph facts require evidence")
    for source in value:
        parsed = urlsplit(source.get("url", ""))
        if parsed.scheme not in ("http", "https") or not parsed.netloc or not source.get("locator"):
            raise ValueError("Graph evidence requires an HTTP source and locator")
        if source.get("kind") not in ("catalog", "primary"):
            raise ValueError("Invalid graph evidence kind")
        timestamp(source.get("retrieved_at"))
    return value


def edge_id(kind, source, target, scope=""):
    key = "\0".join((kind, source, target, scope))
    return "edge:" + hashlib.sha256(key.encode()).hexdigest()[:20]


def build_graph(root, taxonomy, resources, repository):
    nodes, edges = {}, {}

    def add_node(node):
        if node["id"] in nodes or node["kind"] not in ENTITY_TYPES:
            raise ValueError("Duplicate or invalid graph entity: " + node["id"])
        if not node["id"].startswith(node["kind"] + ":"):
            raise ValueError("Graph entity ID must use its type namespace")
        if not isinstance(node.get("label"), list) or len(node["label"]) != 2 or not all(isinstance(part, str) and part.strip() for part in node["label"]):
            raise ValueError("Graph entity requires bilingual labels")
        node = {"date": None, "recorded_at": None, "attributes": {}, **node}
        node["date_precision"] = precision(node["date"])
        timestamp(node["recorded_at"])
        evidence(node["evidence"])
        nodes[node["id"]] = node

    def add_edge(edge):
        edge = {"date": None, "end_date": None, "recorded_at": None, "attributes": {}, **edge}
        kind, source, target = edge["kind"], edge["source"], edge["target"]
        if kind not in RELATIONS or source not in nodes or target not in nodes or source == target:
            raise ValueError("Invalid graph relation endpoints: " + str(edge))
        allowed_source, allowed_target = RELATIONS[kind]
        if nodes[source]["kind"] not in allowed_source or nodes[target]["kind"] not in allowed_target:
            raise ValueError("Invalid graph relation types: " + kind)
        scope = edge["attributes"].get("resource", "")
        if kind == "AFFILIATED_WITH" and (not scope or nodes.get(scope, {}).get("kind") != "resource"):
            raise ValueError("Affiliation must be scoped to a resource")
        if kind in ("COMPARES_WITH", "EVALUATED_ON"):
            conditions = edge["attributes"].get("conditions")
            if not isinstance(conditions, list) or len(conditions) != 2 or not all(isinstance(part, str) and part.strip() for part in conditions):
                raise ValueError("Evaluation relations require bilingual conditions")
        if kind == "EVALUATED_ON" and "benchmark" not in nodes[target]["attributes"].get("types", []):
            raise ValueError("EVALUATED_ON target must be a benchmark/dataset resource")
        if kind in ("USES_METHOD", "EXTENDS", "OWNED_BY", "AFFILIATED_WITH", "AUTHOR_OF", "COMPARES_WITH", "EVALUATED_ON"):
            if not any(item.get("kind") == "primary" for item in edge["evidence"]):
                raise ValueError("Semantic relations require primary-source evidence")
        edge["date_precision"] = precision(edge["date"])
        precision(edge["end_date"])
        if edge["end_date"] and (not edge["date"] or len(edge["date"]) != 10 or len(edge["end_date"]) != 10 or edge["end_date"] < edge["date"]):
            raise ValueError("Bounded relations require ordered exact dates")
        timestamp(edge["recorded_at"])
        evidence(edge["evidence"])
        if kind == "RELATED_TO":
            edge["source"], edge["target"] = sorted((source, target))
        edge["id"] = edge_id(kind, edge["source"], edge["target"], scope)
        if edge["id"] in edges:
            old = edges[edge["id"]]
            if any(old[key] != edge[key] for key in ("date", "end_date", "attributes")):
                raise ValueError("Conflicting graph relations: " + edge["id"])
            for item in edge["evidence"]:
                if item not in old["evidence"]:
                    old["evidence"].append(item)
        else:
            edges[edge["id"]] = edge

    def catalog_source(path, locator):
        return [{"url": (repository or "https://github.com/fengchuimailang/awesome-chip-agents") + "/blob/HEAD/" + path,
                 "locator": locator, "kind": "catalog", "retrieved_at": None}]

    for key, pair in taxonomy["directions"].items():
        add_node({"id": "topic:" + key, "kind": "topic", "label": pair,
                  "evidence": catalog_source("data/taxonomy.json", "directions." + key)})
    for resource in resources:
        rid = "resource:" + resource["id"]
        add_node({"id": rid, "kind": "resource", "label": [resource["name"]] * 2,
                  "date": resource["date"], "evidence": catalog_source(resource["path"], "metadata"),
                  "attributes": {"resource_id": resource["id"], "title": resource["title"],
                                 "summary": resource["summary"], "types": resource["types"],
                                 "direction": resource["direction"], "also_in": resource["also_in"],
                                 "date_basis": resource["date_basis"]}})
        for repo in resource["repositories"]:
            key = "repository:" + repo["name"].lower()
            if key not in nodes:
                add_node({"id": key, "kind": "repository", "label": [repo["name"]] * 2,
                          "attributes": {"url": "https://github.com/" + repo["name"],
                                         "github_owner": repo["name"].split("/")[0]},
                          "evidence": catalog_source(resource["path"], "links.repository")})
    for resource in resources:
        rid = "resource:" + resource["id"]
        for topic in [resource["direction"], *resource["also_in"]]:
            add_edge({"kind": "IN_TOPIC", "source": rid, "target": "topic:" + topic,
                      "attributes": {"primary": topic == resource["direction"]},
                      "evidence": catalog_source(resource["path"], "direction / also_in")})
        for repo in resource["repositories"]:
            add_edge({"kind": "HAS_REPOSITORY", "source": rid, "target": "repository:" + repo["name"].lower(),
                      "attributes": {"role": "linked-repository"},
                      "evidence": catalog_source(resource["path"], "links.repository")})
        for related in resource["related"]:
            add_edge({"kind": "RELATED_TO", "source": rid, "target": "resource:" + related,
                      "evidence": catalog_source(resource["path"], "related")})

    # Snapshots are produced by graph_sources.py; editorial facts use the same reviewed format.
    for filename in ("graph-sources.json", "knowledge-graph.json"):
        path = root / "data" / filename
        if not path.exists():
            continue
        supplement = json.loads(path.read_text())
        if supplement.get("schema_version") != 1:
            raise ValueError("Unsupported graph supplement schema: " + filename)
        if filename == "graph-sources.json":
            unique, source_edges = {}, []
            by_resource = {r["id"]: r for r in resources}
            for key, snapshot in supplement["snapshots"].items():
                if key.startswith("authors:"):
                    resource = by_resource.get(key.removeprefix("authors:"))
                    if not resource or snapshot["url"] not in [link["url"] for link in resource["links"]]:
                        continue
                elif key.startswith("owner:"):
                    if "repository:" + key.removeprefix("owner:") not in nodes:
                        continue
                else:
                    raise ValueError("Unknown graph snapshot key: " + key)
                for node in snapshot["nodes"]:
                    if node["id"] not in unique:
                        unique[node["id"]] = {**node, "evidence": list(node["evidence"])}
                    else:
                        for item in node["evidence"]:
                            if item not in unique[node["id"]]["evidence"]:
                                unique[node["id"]]["evidence"].append(item)
                source_edges.extend(snapshot["edges"])
            supplement = {"nodes": list(unique.values()), "edges": source_edges}
        for node in supplement["nodes"]:
            if node["kind"] not in ("person", "organization", "method"):
                raise ValueError("Supplements may only add people, organizations and methods")
            add_node(node)
        for edge in supplement["edges"]:
            add_edge(edge)
    return {"schema_version": 1, "entity_types": list(ENTITY_TYPES), "relation_types": list(RELATIONS),
            "nodes": sorted(nodes.values(), key=lambda node: node["id"]),
            "edges": sorted(edges.values(), key=lambda edge: edge["id"])}
