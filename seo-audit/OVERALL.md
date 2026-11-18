# Overall SEO: bogdanpascal.com

**Applies to:** `/` and shared site architecture for both careers.  
**State:** Recommendations only. No fixes applied.  
**Primary goal:** Make the personal brand clear while allowing athlete and filmmaker pages to compete independently for relevant searches.

## Confirmed baseline
- One short career-selector homepage with links to `/athlete/` and `/filmmaker/`.
- Current root title: `Bogdan Pascal | Athlete and Filmmaker`.
- Current root description: `Bogdan Pascal. Parkour coordinator, stunt performer and movement director. Director of photography, drone operator and colourist.`
- Root has H2s for `Athlete` and `Filmmaker`, but no H1.
- Main production pages examined have no self-referencing canonical (except the on-set redirect canonical).
- No root sitemap/robots files found in the Git tree; the deployment pipeline will not publish newly added root SEO files without modification.
- V2/V3 preview pages already use noindex in representative tested files; equipment page is noindex.
- No reliable live search traffic or indexing data has been inspected.

## Backend-only and search-result changes

- [ ] **O01 P0 | BACKEND** Update `.github/workflows/deploy-pages.yml` to publish the planned root `sitemap.xml` and `robots.txt`. Check handling of the existing root `CNAME` against GitHub Pages custom-domain settings before changing it. Confirm domain continues working after deployment.
- [ ] **O02 P0 | BACKEND** Generate a sitemap of only canonical, indexable routes. Include root, athlete, filmmaker, genuine about/contact/services and 23 work pages. Exclude `/filmmaker/v2/`, `/filmmaker/v3/`, `/filmmaker/services/on-set/`, `/filmmaker/equipment/` while it remains noindex, fragment HTML files and build/source paths.
- [ ] **O03 P0 | BACKEND** Add self-referencing absolute `rel="canonical"` for all intended indexable pages. Leave `on-set` pointing to `/filmmaker/services/dop/`; preserve appropriate noindex. Confirm every generated project page gets its own canonical through `filmmaker/_build/build.py`.
- [ ] **O04 P0 | BACKEND** Add a minimal `robots.txt` with `Sitemap: https://bogdanpascal.com/sitemap.xml`, but do **not** use `Disallow` as a substitute for noindex on previews. Default permissive crawling is fine; robots.txt is not intrinsically required for indexing.
- [ ] **O05 P1 | BACKEND + SEARCH** Improve metadata on each page without making every page say the same generic role list. Use a unique title and description per URL. Google may generate different snippets.
- [ ] **O06 P1 | BACKEND + SEARCH** Fix Open Graph and social sharing metadata using absolute `https://bogdanpascal.com/... ` image URLs, include meaningful `og:title`, `og:description`, `og:type` and optionally Twitter card metadata. Verify previews using social debugger tools.
- [ ] **O07 P1 | BACKEND** Add accurate, validated JSON-LD `Person` for the individual/brand and appropriate `WebSite` / page-level `ProfilePage`, `Service`, `CreativeWork` only where they match real content. Do not invent star ratings, reviews, offers, awards, or misrepresent production roles. Rich results are not guaranteed.
- [ ] **O08 P1 | BACKEND** Add automated checks to the deploy workflow: unique title and H1 for intended indexable pages, canonical presence, no accidental indexation of previews, linked-asset existence, sitemap URL validity, and no em dashes in public site text (preserve existing house rule).
- [ ] **O09 P1 | BACKEND** Audit canonical host, HTTPS, www/non-www, trailing slash behavior, 404s, and Google-selected canonicals using live HTTP crawler plus Google Search Console. These were NOT verified by the static audit.
- [ ] **O10 P1 | BACKEND** Link and verify the domain in Google Search Console; check indexed pages, search queries, average positions, canonical selection and sitemap status. Use the data to decide which career needs better search landing-page targeting.
- [ ] **O11 P2 | BACKEND** Add GA4 if wanted, with legal/consent handling appropriate to visitors in Romania, UK and EU. Track section-specific enquiry clicks, contact form completions and relevant business goals. Do not assume a Meta Pixel is necessary for organic SEO.
- [ ] **O12 P1 | BACKEND** Run an external crawler for status codes, failed resources, redirect chains and orphan pages. A repository path existing does not confirm an HTTP 200 response.
- [ ] **O13 P1 | BACKEND** Run mobile/desktop PageSpeed Insights or Lighthouse on root, athlete, filmmaker, a service and a project page; capture LCP, CLS, INP and main loading bottlenecks. No real-world CWV claims are made in this report.
- [ ] **O14 P2 | BACKEND** Inspect media loading: only compress/re-encode images/video/GIF actually delivered to visitors; preserve appearance and original master files. Check image dimensions, responsive `srcset/sizes`, lazy loading, hero priority and poster images.
- [ ] **O15 P2 | BACKEND** Review publicly accessible `filmmaker/equipment/extra-sections.html` and `motion-sections.html` which are partial HTML responses. Consider moving to non-document fragment responses or preventing unwanted search indexing without breaking dynamic loading.
- [ ] **O16 P2 | BACKEND** Review whether `/filmmaker/equipment/` should remain noindex. If useful to hiring clients, consider a content upgrade and indexation deliberately; do not flip it automatically.

## Visible-page proposals, NOT applied

- [ ] **O17 P1 | VISIBLE or no-change semantic adaptation** Give the homepage one meaningful H1 naming the person. Best if existing visible brand/name becomes semantic H1 through CSS without changing layout. Do not add keyword-stuffed hidden text.
- [ ] **O18 P1 | VISIBLE** Keep the two-way selector. Optionally add a very short, natural introduction that explains the two careers share action-film expertise. Show exact copy/placement for approval before changing the layout.
- [ ] **O19 P2 | VISIBLE** Add an unobtrusive link between athlete and filmmaker portfolios when contextually helpful. Do not force the two audiences to navigate through the root selector.
- [ ] **O20 P2 | VISIBLE** Ensure clear contact/booking routes for casting, stunt departments and brand-production clients. Distinct CTA labels are better than trying to sell both roles with one button.
- [ ] **O21 P2 | VISIBLE** Add selective proof links, reels, credits and relevant case studies as internal content, not arbitrary keyword lists.
- [ ] **O22 P2 | VISIBLE** Evaluate a Romanian-language version only if data or business demand supports it, and implement proper `hreflang` only when genuine translated equivalents exist.

## Examples for search snippets (proposed only)

**Root title:** `Bogdan Pascal | Parkour Athlete, Stunt Performer & Filmmaker`  
**Root description:** `Bogdan Pascal is a professional parkour athlete, stunt performer and filmmaker working on international films, commercials and live productions. Explore both portfolios.`

The homepage should **not** attempt to rank for every specialized career keyword. Each section should use its own expertise-oriented title, H1, descriptive content and links.

## Measurement plan
1. Verify Search Console for `bogdanpascal.com`, ideally a Domain property if DNS verification is accessible.
2. Compare `/`, `/athlete/`, `/filmmaker/` performance by search query and landing URL over a sensible period.
3. Monitor branded versus non-branded queries, particularly `parkour athlete`, `stunt performer`, `acrobat`, `director of photography`, `commercial filmmaker` and `FPV cinematography`, with geographic modifiers only when relevant.
4. Measure enquiries and hiring outcomes. Clicks alone are not the success metric.
5. Re-audit after each controlled rollout and log what changed. Search results can take time and are not guaranteed.

## OpenSEO contribution

OpenSEO's crawler can check broken links, titles, H1s, indexability, sitemaps and redirects without paid SEO datasets. Use the [free site-audit flow](https://www.openseo.so/docs/site-audits) or self-host with your own environment. **No OpenSEO crawl was actually executed for this audit**, since no connected account/site-audit runtime was available. An initial 50-page crawl should exclude `/filmmaker/v2/` and `/filmmaker/v3/` so previews do not crowd out production pages, with Lighthouse and JS rendering OFF to avoid optional cost. Verify crawler completion, export results, then compare against this checklist.

## Do not do
- Do not split the same person's portfolio into two new domains without data.
- Do not mass-redirect your athlete or filmmaker landing pages to the root.
- Do not noindex valuable project pages or robots-block pages to which you need to send noindex.
- Do not add fabricated keyword volumes, inaccurate credit descriptions or fake reviews.
- Do not deploy content/visual changes as part of this documentation-only audit.
