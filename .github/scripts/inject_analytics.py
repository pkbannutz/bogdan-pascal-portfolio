#!/usr/bin/env python3
"""Add opt-in analytics to exactly the public pages in the generated sitemap.

Run after generate_sitemap.py. Source HTML is untouched; only the publish
folder gets the analytics loader. Preview and noindex pages stay unchanged.
"""
from pathlib import Path
from urllib.parse import urlsplit
from xml.etree import ElementTree as ET
import re
import sys

SITE_HOST = "bogdanpascal.com"
INCLUDE = '<script defer src="/assets/analytics-consent.js?v=20261121-no-floating-pill"></script>'
NS = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def inject(root: Path) -> None:
    sitemap = root / "sitemap.xml"
    loader = root / "assets" / "analytics-consent.js"
    if not sitemap.is_file() or not loader.is_file():
        raise ValueError("Sitemap or consent script missing from published site")

    urls = [node.text for node in ET.parse(sitemap).findall(".//s:loc", NS)]
    if not urls:
        raise ValueError("Sitemap has no public URLs")

    for url in urls:
        parts = urlsplit(url or "")
        if parts.scheme != "https" or parts.netloc != SITE_HOST or not parts.path.endswith("/"):
            raise ValueError(f"Unexpected sitemap URL: {url}")
        path = root / parts.path.lstrip("/") / "index.html"
        if not path.is_file():
            raise ValueError(f"Public page file missing: {path}")
        html = path.read_text(encoding="utf-8")
        if INCLUDE in html:
            continue
        if "googletagmanager.com/gtag/js" in html:
            raise ValueError(f"Existing Google Analytics loader found: {path}")
        new_html, matches = re.subn(
            r"</head\s*>", INCLUDE + "\n</head>", html, count=1, flags=re.IGNORECASE
        )
        if matches != 1:
            raise ValueError(f"Cannot find HTML head in: {path}")
        path.write_text(new_html, encoding="utf-8")

    print(f"Added privacy-based GA4 loader to {len(urls)} public pages")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: inject_analytics.py <publish-dir>")
    inject(Path(sys.argv[1]))
