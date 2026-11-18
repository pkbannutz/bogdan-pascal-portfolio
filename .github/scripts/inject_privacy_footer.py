#!/usr/bin/env python3
"""Link the privacy policy inside existing public-page footers at publish time.

Only pages from the generated public sitemap are changed. No source HTML is
reformatted and draft/noindex preview pages remain untouched.
"""
from pathlib import Path
from urllib.parse import urlsplit
from xml.etree import ElementTree as ET
import re
import sys

SITE_HOST = "bogdanpascal.com"
POLICY_PATH = "/privacy/"
LINK = '<a class="bp-footer-privacy" href="/privacy/">Privacy Policy</a>'
STYLE = (
    "<style>"
    ".bp-footer-privacy{color:inherit;font:inherit;text-decoration:none;"
    "opacity:.82;white-space:nowrap}"
    ".bp-footer-privacy:hover,.bp-footer-privacy:focus-visible{"
    "text-decoration:underline;opacity:1}"
    ".bp-home-privacy{position:fixed;bottom:8px;left:50%;"
    "transform:translateX(-50%);z-index:60;color:#f2f2f2;"
    "background:rgba(0,0,0,.75);border-radius:4px;"
    "padding:5px 9px;font:11px/1.3 system-ui,sans-serif;"
    "text-decoration:none;white-space:nowrap}"
    ".bp-home-privacy:hover,.bp-home-privacy:focus-visible{"
    "text-decoration:underline}"
    "</style>"
)
NS = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def add_in_existing_footer(html: str, route: str) -> str:
    if route == "/":
        # The split-screen landing page has no footer. Add only a tiny legal
        # link, without adding another footer bar or altering its split layout.
        home_link = '<a class="bp-home-privacy" href="/privacy/">Privacy Policy</a>'
        return re.sub(r"</body\s*>", home_link + "\n</body>", html,
                      count=1, flags=re.IGNORECASE)

    # Athlete page: insert into its existing footer links row.
    if 'class="footer-links"' in html:
        return html.replace('<div class="footer-links">',
                            '<div class="footer-links">' + LINK, 1)

    # Filmmaker pages: place link in their existing small legal line, not in
    # the larger "Let's shoot" call to action.
    if 'class="legal mono"' in html:
        pattern = r'(<div class="legal mono">.*?<span[^>]*>[^<]*)(</span>)'
        # Use the final span in this particular legal container, retaining its
        # current two-column alignment and its original attribution.
        match = re.search(r'<div class="legal mono">.*?</div>', html, re.DOTALL)
        if not match:
            raise ValueError("Cannot find filmmaker legal footer")
        section = match.group(0)
        close = section.rfind("</span>")
        if close == -1:
            raise ValueError("Cannot find filmmaker legal footer text")
        updated = section[:close] + " &nbsp;·&nbsp; " + LINK + section[close:]
        return html[:match.start()] + updated + html[match.end():]

    # Service and equipment pages already have a compact single-line footer.
    for footer_class in ("svc-end", "folio-foot"):
        match = re.search(
            r'<footer\b[^>]*class="[^"]*\b' + footer_class +
            r'\b[^"]*"[^>]*>.*?</footer>', html, re.DOTALL
        )
        if not match:
            continue
        section = match.group(0)
        close = section.find("</span>")
        if close < 0:
            raise ValueError(f"Cannot find text in {footer_class} footer")
        section = section[:close] + " · " + LINK + section[close:]
        return html[:match.start()] + section + html[match.end():]

    raise ValueError(f"No recognised existing footer for: {route}")


def inject(root: Path) -> None:
    policy = root / "privacy" / "index.html"
    if not policy.is_file() or 'href="https://bogdanpascal.com/privacy/"' not in policy.read_text(encoding="utf-8"):
        raise ValueError("The canonical privacy policy page is missing")

    urls = [element.text for element in ET.parse(root / "sitemap.xml").findall(".//s:loc", NS)]
    if not urls:
        raise ValueError("Empty sitemap")
    if "https://bogdanpascal.com/privacy/" not in urls:
        raise ValueError("Privacy policy must be included in public sitemap")

    count = 0
    for url in urls:
        parts = urlsplit(url or "")
        if parts.scheme != "https" or parts.netloc != SITE_HOST or not parts.path.endswith("/"):
            raise ValueError(f"Unexpected sitemap route: {url}")
        route = parts.path
        if route == POLICY_PATH:
            continue  # The privacy page already has a small footer link.
        path = root / route.lstrip("/") / "index.html"
        if not path.is_file():
            raise ValueError(f"Missing public HTML page: {path}")
        html = path.read_text(encoding="utf-8")
        if LINK in html or 'class="bp-home-privacy"' in html:
            continue
        updated = add_in_existing_footer(html, route)
        if updated == html or updated.count('href="/privacy/"') != 1:
            raise ValueError(f"Privacy link injection failed for: {path}")
        if "</head>" not in updated.lower():
            raise ValueError(f"Missing document head in {path}")
        updated = re.sub(
            r"</head\s*>", STYLE + "\n</head>", updated, count=1, flags=re.IGNORECASE
        )
        path.write_text(updated, encoding="utf-8")
        count += 1

    print(f"Added existing-footer privacy links to {count} public pages")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: inject_privacy_footer.py <publish-dir>")
    inject(Path(sys.argv[1]))
