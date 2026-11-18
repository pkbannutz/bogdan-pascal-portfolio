# SEO implementation checklist

**Snapshot:** 18 November 2026 (expanded with live deep dive)  
**Repository:** `pkbannutz/bogdan-pascal-portfolio`  
**Implementation status:** **0 SEO fixes implemented**. The four companion audit documents are already written; existing website code is untouched.

## How to read the labels

- **BACKEND:** Code, HTML semantics, deployment, indexing, analytics, URLs, assets. Should not intentionally change how the site looks. Verify any performance/layout side effects.
- **SEARCH:** What Google or social link previews may display, not what a site visitor sees inside the page.
- **VISIBLE:** Text, hero wording, cases, CTAs, sections, layout or navigation visibly changes on the website. Show proposed designs/copy for review first.
- **VERIFY:** Cannot establish without Google Search Console, OpenSEO/live crawler, browser or performance test.
- **P0:** Start here; **P1:** Next phase; **P2:** Improvement after measurement.

## Full-site audit extensions (every page)

The following documents extend the initial 10-pass and deep-dive work into **all 35 current content pages** plus hidden/functional routes (V2/V3 excluded from page scoring):

- [Every-page resource-speed measurements](SPEED-ALL-PAGES.md): initial-load and full-scroll image bytes for athlete, filmmaker, five services, equipment and **all 23 work pages**.
- [Each filmmaker service's independent SEO plan](SERVICE-SEO-DETAIL.md): target intent, real content coverage, specific backend/search tasks and visible change proposals.
- [All 23 projects with specific credits and SEO tasks](PROJECT-SEO-ALL-23.md): correct role attribution, current video visibility and case-study opportunities.
- [Hidden routes, build bloat and safe cleanup](HIDDEN-ROUTES-AND-CLEANUP.md): normal pages versus redirects/fragments/previews, actual downloads versus dormant files, identical asset duplicates.

### Newly urgent checklist, still not implemented

- [ ] **E01 | FILMMAKER EQUIPMENT | P0 | BACKEND:** Optimize the 97-image expanded equipment view, measuring before/after ~27.2MiB image-resource weight. Keep both functional HTML fragments.
- [ ] **E02 | ATHLETE | P0 | BACKEND:** Replace ~7.6MiB original GIF with efficient in-page video/modern equivalent and optimize oversized PNGs, preserving visible filmic quality.
- [ ] **E03 | FILMMAKER PROJECTS | P0/P1 | BACKEND:** Full-scroll galleries Therme (~10.9MiB), Miki (~10.0MiB), RawPot (~8.8MiB), GeoDomeX (~6.7MiB), Dyla (~6.5MiB), Renais (~5.3MiB): responsive preview assets and full-res only in lightbox.
- [ ] **E04 | FILMMAKER SERVICES | P0 | SEARCH:** Each of DoP, FPV, Editing, Colour, Sound gets independent focused title, description, canonical, truthful proof/roles, internal links and Service schema as appropriate. See full per-page guidance. Do not create duplicate synonym landing pages.
- [ ] **E05 | FILMMAKER PROJECTS | P0 | SEARCH:** Project-specific, role-accurate meta descriptions and reciprocal service links in a synchronized shared build generator.
- [ ] **E06 | FILMMAKER PROJECTS | P0 | VERIFY:** Confirm personal credit on Mojo Skincare, avoid falsely attributing cinematography on Mojo Hair, preserve co-DoP on GeoDomeX and Director/DoP on Renais.
- [ ] **E07 | FILMMAKER PROJECTS | P1 | VISIBLE:** Add concise authentic descriptions to 23 project pages; note four currently have no detected playable video elements. Review copy and role attributions before changes.
- [ ] **E08 | CLEANUP | P2 | BACKEND:** Exclude maintenance README from published equipment subtree if safe; investigate two SHA-identical asset pairs; keep dynamic equipment fragments and active preview work.
- [ ] **E09 | BUILD CONSISTENCY | P1 | BACKEND:** Reconcile current `filmmaker/_build/build.py` generated navigation with manually updated production header before any rebuild.
- [ ] **E10 | SPEED VERIFY | P1 | VERIFY:** Official PageSpeed/Lighthouse and real phone tests for the heaviest templates, plus video/audio transfer while actively used. Source measurements are **image-resource weights, not Lighthouse scores**.

**Definition of complete:** All documented `E` tasks above are recommendations and remain unchecked. No live HTML/CSS/JS/assets/SEO code was modified during the audit.

## New high-priority issues from the live deep dive (18 Nov 2026)

Read [the second-pass deep dive](DEEP-DIVE-2026-11-18.md) for evidence and caveats. These were found after the original checklist and **should be considered before less impactful metadata work**.

- [ ] **D01 | FILMMAKER | P0 | BACKEND/performance:** Prevent all 23 portfolio JPGs (~4.83 MB image payload observed) from downloading during initial view. Investigate CSS background overlays defeating lazy image loading. Preserve transitions; verify cold mobile waterfall.
- [ ] **D02 | FILMMAKER | P0 | VISIBLE/INTERACTION:** Rework touch card interaction: current handler blocks project navigation on first tap, requiring a second tap. Review a one-tap pattern or explicit preview button.
- [ ] **D03 | FILMMAKER | P0 | VISIBLE/INTERACTION:** Increase mobile nav and footer contact hit areas: browser inspection measured ~15px nav and ~16px footer anchor heights; preserve typography where possible.
- [ ] **D04 | FILMMAKER | P1 | VISIBLE:** Narrow-screen CSS currently hides `See the work` hero CTA; propose a discreet mobile CTA/scroll affordance.
- [ ] **D05 | OVERALL | P1 | BACKEND:** Live 404s confirmed for `/robots.txt` and `/sitemap.xml`; address with O01-O04. Note missing robots.txt alone is not a ranking error.
- [ ] **D07 | FILMMAKER | P1 | BACKEND:** Pause unnecessary JS hero/timecode/touch timers when hidden/offscreen and respect reduced motion behavior.
- [ ] **D08 | FILMMAKER | P1 | BACKEND + SEARCH:** Evaluate video watch-page semantics, valid VideoObject metadata, permanent thumbnails and optional video sitemap for real featured projects.
- [ ] **D09 | FILMMAKER | P1 | BACKEND/ACCESSIBILITY:** Improve lightbox dialog semantics, focus management and keyboard behavior.
- [ ] **D10 | OVERALL | P1 | VERIFY:** Obtain actual GSC indexing/search data, cold mobile Lighthouse/CrUX measurements and conversion tracking. Neither is established by the source-only first pass.

**New positive live evidence:** A bounded crawl found 35 production pages returned HTTP 200. No need to treat those tested URLs as broken. These new P0 findings are about actual user experience and unnecessary downloads, not generic SEO checkboxes.

## Priority 0: Core technical SEO

- [ ] **O01 | OVERALL | P0 | BACKEND:** Update `.github/workflows/deploy-pages.yml` to ship root sitemap/robots when created, while checking how the existing CNAME and Pages domain are managed. `SEO-AUDIT ONLY NOW`.
- [ ] **O02 | OVERALL | P0 | BACKEND:** Publish canonical-only sitemap of production pages. Exclude `/filmmaker/v2/`, `/filmmaker/v3/`, legacy on-set, noindex equipment and HTML partials.
- [ ] **O03 | OVERALL | P0 | BACKEND:** Self-canonical tags for intended indexable pages, preserving redirect canonical.
- [ ] **O04 | OVERALL | P0 | BACKEND:** Minimal robots.txt with sitemap reference, without hiding noindex previews from crawlers.
- [ ] **F01 | FILMMAKER | P0 | BACKEND + maybe VISIBLE:** Fix filmmaker homepage missing H1. Prefer semantic markup of existing hero without changing typography; if new visible headline proposed, review first.
- [ ] **F02 | FILMMAKER | P0 | SEARCH:** Rewrite filmmaker landing title/description; no visible website change.
- [ ] **A01/A02 | ATHLETE | P0 | SEARCH:** Improve title/description to include active parkour performer intent, not just coordinator; no visible website change.
- [ ] **F05 | FILMMAKER | P0 | SEARCH + BACKEND:** Improve 23 project descriptions centrally in `_build/build.py` and source content; no visible website change if restricted to metadata.

## Priority 1: Strong improvements without changing the visual design

- [ ] **O05 | OVERALL | P1 | SEARCH:** Unique, intent-specific titles and meta descriptions across all intended indexable pages.
- [ ] **O06 | OVERALL | P1 | SEARCH:** Absolute Open Graph images, correct OG titles/descriptions and test social cards.
- [ ] **O07 | OVERALL | P1 | BACKEND:** Accurate Person, Website, ProfilePage, Service or CreativeWork structured data as appropriate, schema validated.
- [ ] **O08 | OVERALL | P1 | BACKEND:** Add automated HTML/SEO checks to deployment, including no accidental preview indexing.
- [ ] **A03/A04/A05 | ATHLETE | P1 | BACKEND + SEARCH:** Athlete canonical, share image, validated professional profile schema.
- [ ] **F03/F04/F06 | FILMMAKER | P1 | BACKEND + SEARCH:** Film canonical, share image and schema across generated work pages, services and landing pages.
- [ ] **O09/O10 | OVERALL | P1 | VERIFY:** Check HTTPS host redirects, Google indexing, and Search Console sitemap/canonical/search terms.
- [ ] **O12/O13 | OVERALL | P1 | VERIFY:** Live crawl all current production URLs, then mobile/desktop Lighthouse and Core Web Vitals tests.
- [ ] **O14 | OVERALL | P1 | BACKEND:** Optimize proven image/video bottlenecks only after measurement; retain originals and original film appearance.

## Priority 1: Suggested visible changes, approval needed

- [ ] **O17 | OVERALL | P1 | VISIBLE only if new content added:** Give root meaningful H1; try existing brand markup first so visual appearance can remain identical.
- [ ] **A09 | ATHLETE | P0 | VISIBLE:** Make active athlete/freerunner/acrobat/stunt performer status explicit in the first paragraphs without diminishing coordinator/movement director work.
- [ ] **A10 | ATHLETE | P1 | VISIBLE:** Clarify performer-booking CTA distinct from coordination work.
- [ ] **A11 | ATHLETE | P1 | VISIBLE:** Audit credits, showreel and externally linked proof for accuracy and hireability.
- [ ] **F12/F13 | FILMMAKER | P0/P1 | VISIBLE:** Add a short, authentic filmmaker/DoP intro above or immediately below portfolio hero; preserve current cinematic design.
- [ ] **F14/F15 | FILMMAKER | P1 | VISIBLE:** Add accurate project role/brief/approach details to selected priority case studies; explicitly label spec ads.
- [ ] **F16 | FILMMAKER | P1 | VISIBLE:** Make service page copy client-centric and clear about specific deliverables.
- [ ] **F18 | FILMMAKER | P2 | VISIBLE:** Improve enquiry CTA labels and path without clutter.

## Priority 2: Additional improvements

- [ ] **O15/O16 | OVERALL | P2 | BACKEND:** Decide indexation/format for equipment HTML fragments and the noindex equipment page.
- [ ] **O19/O20 | OVERALL | P2 | VISIBLE:** Add useful career cross-links and section-specific booking routes.
- [ ] **O22 | OVERALL | P2 | VISIBLE:** Consider genuine Romanian translation only if audience demand supports it; then correct hreflang.
- [ ] **A06/A07 | ATHLETE | P2 | BACKEND:** Review alt text, page weight and mobile loading based on real measurements.
- [ ] **A12/A13/A14 | ATHLETE | P2 | VISIBLE:** Optional filmmaking crossover link, clear performer capabilities/specifications, short capability sections.
- [ ] **F07 | FILMMAKER | P2 | BACKEND:** Review images/video posters and responsive media behavior across templates.
- [ ] **F08/F09/F10 | FILMMAKER | P2 | BACKEND:** Preserve preview noindex; review equipment indexing; maintain legacy redirect hygiene.
- [ ] **F17/F19/F20 | FILMMAKER | P2 | VISIBLE:** Richer About, selected meaningful captions and contextual project-to-service links.
- [ ] **O11 | OVERALL | P2 | BACKEND:** Consent-aware GA4 and optional event tracking for real enquiries. No tracking installed as part of this audit.

## Scope-specific impact at a glance

| Scope | What visitors currently see | What only search engines / backend would change | What could visibly change later |
|---|---|---|---|
| **OVERALL** | Same two-choice athlete/filmmaker homepage | Sitemap, canonicals, robots, schema, OG, deploy tests, GSC/GA4 | Optional brief person/role intro and links |
| **ATHLETE** | Same portfolio and showreel | Role-focused metadata, canonical, share image, schema | Clearly active performer positioning, hiring CTA, selected copy and cross-link |
| **FILMMAKER** | Same cinematic hero, 23 films and service pages | Better snippets, H1 semantics where visual-neutral, canonical, OG, project metadata/schema | Short DoP intro, real case studies, client-facing service copy and CTA refinements |

## Suggested release order

**Release 1 (backend/search only, after review):** O01-O08, A01-A05, F01-F06 when visual-neutral. Change nothing visible if possible. Validate that deployment, domain and previews remain intact.

**Release 2 (visitor-visible, after reviewing exact copy):** A09, A10, F12-F16. Change only approved sections and retain existing layout, photography and animations.

**Release 3 (measure and iterate):** Connect GSC and GA4 where appropriate, check indexing and actual acquisition, fix speed bottlenecks confirmed by Lighthouse, and make smaller site-specific improvements.

## OpenSEO free validation playbook

1. Connect a site audit in [OpenSEO](https://www.openseo.so/docs/site-audits) or use self-hosted open source code.
2. Start at `https://bogdanpascal.com/`, cap 50 pages on free tier, exclude `/filmmaker/v2/` and `/filmmaker/v3/` so previews cannot consume the limit.
3. Set Lighthouse **OFF** and JavaScript rendering **OFF** for the first crawl to avoid optional charges.
4. Confirm the crawler actually reached each production landing page and checked statuses; a "no issues" report from blocked pages is not a clean bill of health.
5. Check: pages crawled, HTTP status, missing H1, title/meta duplication, canonical/indexability, redirects, link errors, orphan content and robots/sitemap.
6. Export report as JSON/CSV, compare findings against the IDs above, and retest after fixes. Only enable JS rendering for pages the non-rendering crawler cannot read.
7. Separately run PageSpeed Insights on representative pages and check Search Console for indexing and query data.

**Not done here:** An actual OpenSEO crawl, live HTTP status scan, Lighthouse tests, GSC verification or real keyword research. No credentials were available. This checklist is based on a code review plus OpenSEO's documented audit methods.

## Acceptance checklist for any actual implementation

- [ ] Live domain, assets, reels and custom-domain routing remain working.
- [ ] Both `/athlete/` and `/filmmaker/` stay accessible, distinct and indexable.
- [ ] Preview V2/V3 URLs remain noindex, not in sitemap; legacy on-set remains out of sitemap.
- [ ] Indexable URLs have the correct unique title, meaningful H1, canonical, metadata and valid structured data.
- [ ] Social cards show the right image.
- [ ] No additional visible design or copy changes beyond approved changes.
- [ ] Mobile layout, keyboard navigation, load speed and video playback remain functional.
- [ ] Search Console can discover the sitemap and chosen landing-page URLs.
- [ ] Every factual credit/role is verified; spec work is not mislabelled as paid client work.
