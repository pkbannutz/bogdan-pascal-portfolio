# Hidden routes, deployed bloat and cleanup candidates

**Date:** 18 November 2026  
**Scope:** Every HTML route/page-like file in the main production tree, excluding detailed analysis of `/filmmaker/v2/` and `/filmmaker/v3/` previews as requested. Preview *deployment* is considered only for cleanup.  
**Status:** **Audit only. Nothing deleted, moved or excluded from the live deployment.**

## Most important distinction

**An unused HTML file or image in a GitHub repository does not slow ordinary visitors merely by existing.** Network speed is affected by resources the browser *actually requests*, plus any ongoing scripts/animations on the page they visit. Hidden or unlinked previews can use deployment/storage space or be accessible publicly, but **do not run 24/7** and do not automatically consume every visitor's bandwidth.

A large file that *is* downloaded on scroll (such as a GIF, a camera cutout, or gallery still) is a very different problem. Focus on actual network requests first.

## Actual production HTML inventory

- **35 normal production content pages:** homepage, athlete, filmmaker homepage, filmmaker about/contact/equipment/services, 5 distinct service pages and 23 project pages. Live crawler returned HTTP 200 for all 35 in a bounded test.
- **1 legacy redirect:** `/filmmaker/services/on-set/`, a separate HTML file canonicalizing/redirecting to `/filmmaker/services/dop/`. Not an independent service.
- **2 equipment HTML fragments:** `/filmmaker/equipment/motion-sections.html` and `extra-sections.html`. Not full landing pages; loaded by JavaScript when user clicks Show More.
- **Excluded from detailed audit by request:** all `/filmmaker/v2/` and `/filmmaker/v3/` preview pages and scripts.

This means **38 non-V2/V3 HTML files** in the repository, of which 35 are normal content pages, 1 is a redirect, and 2 are functional fragments. There is no mysterious second full website hidden elsewhere in the HTML file inventory of the current main branch.

## What is already protected correctly?

- `.github/workflows/deploy-pages.yml` only copies root `index.html`, `assets/`, `athlete/`, `filmmaker/` and then removes `_site/filmmaker/_build`.
- The internal builder source `filmmaker/_build/build.py`, `projects.json`, `videos-r2.json` is **removed from the published website**. Keep that: it is needed to build the site, not to serve visitors.
- Root `README.md`, `.github/`, and the `seo-audit/` folder are not copied by the current publish workflow.
- V2/V3 representative pages already include `noindex`. The equipment landing page is intentionally `noindex, nofollow`.
- Browser testing showed old `on-set` routes lead visitors to current DoP page; keep a legacy path unless verified unnecessary.

## Hidden, unlisted or internal resources to review

| File/folder | Present in published output? | Used by live public functionality? | Recommendation | User-visible impact |
|---|---|---|---|---|
| `filmmaker/equipment/motion-sections.html` | Yes | **YES**, first Show More click fetches it with `?v=20261112` | **KEEP**; optimize images inside it instead | None if optimized correctly; deleting would BREAK equipment feature |
| `filmmaker/equipment/extra-sections.html` | Yes | **YES**, second Show More click fetches it with `?v=20261112b` | **KEEP**; consider separate API/fragment handling only after testing | Deleting would BREAK feature |
| `filmmaker/equipment/README.md` | Yes, because entire `filmmaker/` folder is copied | NO known runtime dependency; maintenance instructions | **Candidate to exclude from deployment** while retaining in GitHub | None expected |
| `filmmaker/services/on-set/index.html` | Yes | Redirect/legacy URL; only when explicitly requested | **KEEP for now** until backlinks and inbound links checked; consider true 301 with future hosting | Removing breaks old links |
| `filmmaker/v2/` | Yes | Working preview copies; currently not in main site navigation | **Do NOT delete while redesign is active**. Later exclude from production deployment or put under authenticated staging if no longer needed | V2 review URLs stop working if excluded |
| `filmmaker/v3/` | Yes | Working colour-page preview, noindex | Same as V2 | V3 preview URLs stop working if excluded |
| `filmmaker/_build/` | No, intentionally removed | Build-time only | **KEEP in repo, KEEP excluded at deploy** | None |
| Root `seo-audit/` | No, docs live only in repo | Audit documentation | **KEEP** | None |
| `filmmaker/js/*.js` and `filmmaker/css/*.css` | Yes | Many used by interactive live service pages | **Do not blanket-delete**; do explicit dependency tracking | Could break interactivity |
| Raw originals in `assets/` | Yes | Some currently requested on athlete/equipment/projects | Retain masters in source if desired; serve optimized derivatives on pages | No change if serving equivalent derivatives |

**Public does not mean indexed:** noindex pages may still be opened directly. Conversely, merely adding `robots.txt` to disallow a preview can prevent Google from seeing its `noindex` directive. Do not use that as a privacy control.

## Repository size and exact duplicates

Inspection of the current Git tree found:
- **488 tracked file blobs**, totaling about **157.1 MB** (decimal).
- **375 files under `assets/`**, totaling about **156.2 MB** (decimal). This is storage/build output, NOT every visitor's download size.
- **39 V2 files** totaling about **230 KB** and **4 V3 files** totaling about **25 KB**; together only ~256 KB of source. So preview pages are **not** the main site-weight problem.
- **Two byte-identical duplicate pairs identified by Git blob SHA**:
  1. `assets/filmmaker/studio/fx3-cut.png` and `assets/filmmaker/studio/fx3.png`, each 1,089,764 bytes.
  2. `assets/filmmaker/studio/gimbal.png` and `assets/filmmaker/studio/support-ronin.webp`, each 633,669 bytes, even though they have different extensions. Verify actual content format/usage before changing anything.
- The pairs are potential **~1.72 MB repository/deployment duplication**, but removing one might break links or change naming. Search all source refs and validate actual browser requests before deduplicating. Even deleting both duplicate copies would NOT reduce transfer for pages that currently load only one.

## What REALLY consumes transfer on normal pages

### Athlete
- `assets/the-1975-original.gif` ~7.6MiB when scrolled into view.
- `assets/milan-fashion-week-original.png` ~3.1MiB.
- `assets/13-shades-of-romanian-cover.png` ~1.4MiB.
- **Recommendation:** replace visible delivery with optimized equivalents; retain archive masters as long as useful. Deleting hidden previews is less important than these active images.

### Filmmaker homepage
- All 23 card preview JPGs loaded on initial visit (~4.7MiB) despite `loading="lazy"` on most `img` elements.
- **Recommendation:** investigate CSS-background overlays that cause eager requests; do not delete gallery cards.

### Equipment
- 20 image tags in collapsed page, 97 after both Show More clicks; heavy transparent cutouts reached ~27.2MiB in the complete expansion test.
- **Recommendation:** responsive transparent card images, lazy-load and only reveal what user needs. Deleting HTML fragments would make this worse for the viewer by breaking functionality.

### Heavy project galleries
- Therme, Miki, RawPot, GeoDomeX, Dyla and Renais have large galleries, fully explored images around 5-11MiB each.
- **Recommendation:** thumbnails in page, masters in on-demand lightbox.

## Safe cleanup plan, in the right order

### BACKEND only, low-risk candidates
- [ ] **C01:** Modify publish folder preparation to exclude `filmmaker/equipment/README.md`, after confirming no runtime reference; retain GitHub source.
- [ ] **C02:** Keep `filmmaker/_build` excluded and test that no generated build metadata is accidentally published.
- [ ] **C03:** Identify unused project/assets with a dependency-aware manifest of HTML, CSS, JS, JSON and dynamically assembled URLs. **Do not run blind file deletion based only on no text match.**
- [ ] **C04:** Investigate two SHA-identical asset pairs; redirect all actual references to one canonical asset and verify before deleting duplicate copies.
- [ ] **C05:** Add a deploy-time check that unexpected `README.md`, build sources, staging-only or backup files do not enter the artifact.

### Depends on current workflow needs (not safe to remove automatically)
- [ ] **C06:** If you finish redesign and no longer need V2/V3 online, exclude `_site/filmmaker/v2` and `_site/filmmaker/v3` in deployment; **keep in repo** unless you separately want history cleaned. Do not do this while you are using preview links.
- [ ] **C07:** If previews contain production-sensitive work, serve them from access-controlled staging. `noindex` does not prevent public viewing.
- [ ] **C08:** Keep the old `on-set` redirect while unknown backlinks exist. If a future host supports it, replace client/meta refresh with an actual HTTP 301.
- [ ] **C09:** Decide whether `equipment/` should stay noindex (client reference only) or be upgraded to a searchable equipment page. Noindex is a deliberate strategy, not a broken page.
- [ ] **C10:** Keep the two equipment HTML fragments unless the loader architecture is intentionally changed. They are legitimate on-demand content.

### Actually useful performance improvements
- [ ] **C11:** Optimize live-loaded GIF/PNG/JPG/WebP assets and add responsive sizes; measure image bytes before and after.
- [ ] **C12:** Ensure cards/gallery images don't download full masters until viewed enlarged; keep nice film grain and photographic quality.
- [ ] **C13:** Avoid work while the document is hidden and stop offscreen animations where possible. Note FPV script already stops after visibility change on the tested code path.
- [ ] **C14:** Measure activated video/audio and third-party embed costs separately, then optimize.
- [ ] **C15:** Verify no old source maps, test-only build outputs, orphan scripts, unmanaged personal data or API keys are present in **future** deployments. No such sensitive content has been claimed or demonstrated by this review.

## What not to delete to make the site faster

- Do not remove functional equipment fragment files.
- Do not delete an old redirect before checking that inbound links are no longer used.
- Do not delete V2/V3 during active redesign merely because they are unlisted.
- Do not remove `_build` from GitHub; it is needed for project generation even though it should not be published.
- Do not delete original masters before optimized replacements are verified in the browser.
- Do not assume preview files use CPU/network while untouched. They don't.

## Completion checklist for cleanup

- Every current published non-preview page still loads 200 and interactive features still work.
- Both Show More expansion steps work and images load after interaction.
- No visible design/content change occurs without review.
- Root sitemap contains only canonical production URLs, not legacy redirects, preview pages, README files or raw fragment URLs.
- Production builds are reproducible; the current `build.py` template should be reconciled with manually updated production navigation before any regeneration.
- Compare actual network image bytes, not just repository file count.
