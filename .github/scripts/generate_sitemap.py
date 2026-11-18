#!/usr/bin/env python3
"""Generate sitemap.xml from the exact content deployed by GitHub Pages.

Run after preparing _site. Public index.html files are discovered automatically.
Noindex pages, preview versions and legacy redirects are excluded.
"""
from __future__ import annotations

import argparse
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin
from xml.etree import ElementTree

SITE = "https://bogdanpascal.com"
NS = "http://www.sitemaps.org/schemas/sitemap/0.9"
ElementTree.register_namespace("", NS)

EXCLUDED_PREFIXES = (
    ("filmmaker", "v2"),
    ("filmmaker", "v3"),
)
EXCLUDED_ROUTES = {"/filmmaker/services/on-set/"}
REQUIRED_ROUTES = {
    "/",
    "/athlete/",
    "/filmmaker/",
    "/filmmaker/equipment/",
    "/filmmaker/services/",
    "/filmmaker/services/dop/",
    "/filmmaker/services/fpv/",
    "/filmmaker/services/editing/",
    "/filmmaker/services/colour-grading/",
    "/filmmaker/services/sound-design/",
}


class PageSignals(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.noindex = False
        self.redirect = False
        self.canonical: str | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = {key.lower(): (value or "") for key, value in attrs}
        if tag == "meta":
            if values.get("name", "").lower() in {"robots", "googlebot"}:
                directives = {item.strip().lower() for item in values.get("content", "").split(",")}
                if "noindex" in directives or "none" in directives:
                    self.noindex = True
            if values.get("http-equiv", "").lower() == "refresh":
                self.redirect = True
        elif tag == "link" and "canonical" in values.get("rel", "").lower().split():
            if values.get("href"):
                self.canonical = values["href"].strip()


def page_route(relative: Path) -> str:
    parts = relative.parent.parts
    return "/" if not parts else "/" + "/".join(parts) + "/"


def collect_urls(root: Path) -> list[str]:
    if not (root / "index.html").is_file():
        raise ValueError(f"Missing website homepage: {root / 'index.html'}")

    urls: set[str] = set()
    for page in root.rglob("index.html"):
        relative = page.relative_to(root)
        parts = relative.parent.parts

        # Keep the sitemap limited to the published personal portfolio.
        if parts and parts[0] not in {"athlete", "filmmaker"}:
            continue
        if any(parts[:len(prefix)] == prefix for prefix in EXCLUDED_PREFIXES):
            continue

        route = page_route(relative)
        if route in EXCLUDED_ROUTES:
            continue

        signals = PageSignals()
        signals.feed(page.read_text(encoding="utf-8"))
        if signals.noindex or signals.redirect:
            continue

        url = SITE + route
        # A page canonicalizing to another URL must not be listed as canonical.
        if signals.canonical and urljoin(url, signals.canonical).rstrip("/") != url.rstrip("/"):
            continue
        urls.add(url)

    found = {url.removeprefix(SITE) for url in urls}
    if missing := REQUIRED_ROUTES - found:
        raise ValueError(f"Required indexable pages missing: {sorted(missing)}")
    return sorted(urls)


def generate(root: Path) -> None:
    urls = collect_urls(root)
    urlset = ElementTree.Element(f"{{{NS}}}urlset")
    for url in urls:
        ElementTree.SubElement(
            ElementTree.SubElement(urlset, f"{{{NS}}}url"),
            f"{{{NS}}}loc",
        ).text = url

    ElementTree.indent(urlset, space="  ")
    output = root / "sitemap.xml"
    ElementTree.ElementTree(urlset).write(output, encoding="utf-8", xml_declaration=True)

    parsed = ElementTree.parse(output).getroot().findall(f"{{{NS}}}url")
    if len(parsed) != len(urls):
        raise ValueError("Sitemap validation failed: unexpected URL count")
    print(f"Generated {output} with {len(urls)} indexable pages")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("publish_dir", type=Path, help="Prepared GitHub Pages output, usually _site")
    args = parser.parse_args()
    generate(args.publish_dir)
