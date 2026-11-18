# Live indexing directives on filmmaker service pages: historical observations and latest FPV recheck

**Check date:** 18 November 2026. **Status:** EVIDENCED via live `rawHtml` HTTP 200 responses, plus corresponding GitHub source. **Scope:** five public service URLs. **Website changes:** NONE.

> **LATEST FPV RECHECK, 18 NOVEMBER 2026 (newer than initial table below):** A fresh **maxAge:0 live raw HTML** request of `https://bogdanpascal.com/filmmaker/services/fpv/` returned HTTP **200**, robots **`<meta name="robots" content="index, follow">`**, **no HTML self-canonical**. **The earlier FPV `noindex,nofollow` finding shown below has been superseded and must NOT be reported as current.** This is an observational change, not an edit by the research agent. Actual Google index/selected canonical, response `X-Robots-Tag` and crawler history remain unverified. Editing and Colour Grading service pages were **not** independently rechecked in this later pass, so their earlier status is historical, not claimed refreshed. See [F08 individual current audit](individual/F08-FPV-DRONE-FILMING-RESEARCH-2026-11-18.md).

> **ADDITIONAL SOURCE-STATE CHECK, 18 NOVEMBER 2026 AFTER F12-F16 STUDIES:** Current GitHub source `filmmaker/services/editing/index.html` **and** `filmmaker/services/colour-grading/index.html` now both explicitly contain `<meta name="robots" content="index, follow">`, and still lack HTML self-canonical. This differs from their **earlier live** `noindex,nofollow` snapshot below. **Unlike FPV, their deployed live raw HTML was NOT freshly rechecked here**, so do not assert the live change has deployed or that Google has indexed these pages. Treat old noindex rows as historical; verify present live response, `X-Robots-Tag`, selected canonical and GSC before approving any production fix. [F12](individual/F12-VIDEO-EDITING-RESEARCH-2026-11-18.md), [F14](individual/F14-COLOUR-GRADING-SERVICE-RESEARCH-2026-11-18.md).

## Historical earlier snapshot: three of five service pages served noindex at the time

| Live public URL | HTTP | Live HTML robots meta | Canonical |
|---|---:|---|---|
| https://bogdanpascal.com/filmmaker/services/fpv/ | 200 | `noindex,nofollow` | Not found |
| https://bogdanpascal.com/filmmaker/services/editing/ | 200 | `noindex, nofollow` | Not found |
| https://bogdanpascal.com/filmmaker/services/colour-grading/ | 200 | `noindex, nofollow` | Not found |
| https://bogdanpascal.com/filmmaker/services/dop/ | 200 | No robots meta observed | Not found |
| https://bogdanpascal.com/filmmaker/services/sound-design/ | 200 | No robots meta observed | Not found |

**Source method:** Fresh Firecrawl `rawHtml` fetch (`maxAge:0`) of each canonical live service URL, inspecting HTTP status and raw `<head>` meta-robots/canonical elements; also direct GitHub repository `filmmaker/services/{fpv,editing,colour-grading,sound-design,dop}/index.html` inspection. On an earlier `html` processed output test, the HTML was transformed and appeared to lack the directives. That was an **extraction artefact**, corrected with `rawHtml`.

**Impact of historical directives (for FPV now superseded; current editing/colour requires fresh check):** A `noindex` tag explicitly instructs compliant search engines not to include the page in search results; `nofollow` tells them not to follow links from it. Thus keyword optimization alone cannot make these three URLs effective searchable landing pages while they carry the live directives. Lack of a self-referencing canonical does *not* itself block indexing, but is a missed canonicalization signal and should be corrected with the rest of site-wide SEO.

**Urgency:** **P0** at the top of the later approved implementation backlog. The goal is targeted qualified production bookings from these actual service pages. These noindex tags are a direct conflict with that goal, **assuming those pages are intended to be public and indexable**, as the service menu and user SEO goals indicate.

## Expanded repository-source verification, 18 November 2026

Direct connected GitHub reads of all **23 work page index.html** files found **no robots noindex meta** on any of them, but **no rel=canonical** on any. Additionally, source files for root, athlete, filmmaker homepage, filmmaker services hub, About and Contact all lack self-canonical and show no robots noindex. These 29 are **static source checks** only, not individually rechecked live for HTML. The live noindex finding remains specifically verified on FPV, Editing and Colour Grading. This is a strong reason to implement canonical metadata in shared build/templates and validate deployment after approval, while avoiding mislabeling all 23 project pages as currently noindexed.

## Exact implementation proposal, not yet authorized

1. **VERIFY INTENT**: Confirm these three are intended for public search rather than deliberately unindexed previews. They are existing public service URLs linked from the filmmaker service hub, not standalone V2/V3 preview routes, so this appears unintended.
2. **P0 BACKEND**: Upon owner approval, remove `noindex,nofollow` from **only** the three intended public service page heads. Do not globally remove preview `noindex` metadata, and do not use `robots.txt` disallow to hide a page intended for indexing.
3. **P0 BACKEND**: Add self canonical `https://bogdanpascal.com/filmmaker/services/{slug}/` to each indexable service, including DoP and Sound. Check redirect host and trailing slash.
4. **P0 BACKEND**: Add valid root sitemap and minimal robots sitemap reference with site deployment workflow change that actually publishes the files. Earlier crawl returned 404 for both `/sitemap.xml` and `/robots.txt`; check status again after implementation.
5. **P0 QA**: Redeploy and verify live raw HTML, status, robots, canonical, sitemap presence; run Google URL Inspection in Search Console and submit updated sitemap. Indexing is **not guaranteed** and does not happen on a guaranteed schedule. Allow search engines to recrawl.
6. **P1**: Use Search Console to monitor indexing/Google-selected canonical, real query impressions, clicks and qualified contact enquiries by service. Check for `X-Robots-Tag` headers and HTTP/redirect issues too.
7. **DO NOT** change website code or deployment until explicit approval. All present work is a research document.

**Google documentation:** [robots meta directives](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag), [canonical consolidation](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [sitemaps overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [Search Essentials](https://developers.google.com/search/docs/essentials).

**Data confidence:** High for retrieved live HTML/meta and missing HTML canonical tags at time of test; Google’s actual indexed page state and user search analytics still need Google Search Console. The finding does **not** assert that no Google document is presently indexed, because index state can lag current page instructions.
