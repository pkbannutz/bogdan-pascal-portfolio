#!/usr/bin/env python3
"""Verify the published policy and the existing footers on every public route."""
from pathlib import Path
from urllib.parse import urlsplit
from xml.etree import ElementTree as ET
import re
import sys

root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path("_site")
site = "https://bogdanpascal.com"
namespaces = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
urls = [node.text for node in ET.parse(root / "sitemap.xml").findall(".//s:loc", namespaces)]
assert len(urls) >= 35, f"Unexpectedly few public routes: {len(urls)}"
assert site + "/privacy/" in urls

for url in urls:
    assert url.startswith(site + "/"), url
    relative = urlsplit(url).path.lstrip("/")
    path = root / relative / "index.html"
    html = path.read_text(encoding="utf-8")
    assert "\u2014" not in html, f"Forbidden em dash in {path}"
    assert 'href="/privacy/"' in html or (
        relative == "privacy/" and 'href="https://bogdanpascal.com/privacy/"' in html
    ), f"Missing policy link in {path}"
    assert '<script defer src="/assets/analytics-consent.js?v=20261121-no-floating-pill"></script>' in html, (
        f"Missing analytics/Clarity consent on {path}"
    )
    assert 'data-bp-consent-open' in html, f"Missing cookie settings control in {path}"
    if relative != "privacy/":
        assert html.count('href="/privacy/"') == 1, f"Repeated privacy link in {path}"
        if relative:
            assert re.search(r'<footer\b|class="legal mono"', html), (
                f"Missing original footer in {path}"
            )

policy = (root / "privacy" / "index.html").read_text(encoding="utf-8")
for required in ("Google Analytics 4", "Microsoft Clarity", "Cookie settings",
                 "GitHub Pages", "hello@bogdanpascal.com"):
    assert required in policy, f"Privacy policy missing {required}"

# Unindexed previews remain untouched by the deployment-time footer injection.
preview = root / "filmmaker" / "v2" / "index.html"
if preview.exists():
    assert 'class="bp-footer-privacy"' not in preview.read_text(encoding="utf-8")
print(f"Verified privacy policy and existing footer links across {len(urls)} public pages")
