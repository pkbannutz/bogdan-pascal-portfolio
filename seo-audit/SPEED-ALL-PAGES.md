# Full site speed and resource-weight audit

**Date:** 18 November 2026  
**Scope:** Every 35 production URL on bogdanpascal.com, plus the legacy redirect and dynamically loaded equipment HTML fragments. V2/V3 previews excluded from performance scoring as requested.  
**Result:** **Measured image-resource audit for all 35 public content pages, and full-scroll passes on all 23 film galleries.** This is not an official Lighthouse/PageSpeed/Core Web Vitals score.  
**Code changes:** None.

## Official PageSpeed Insights attempt

A direct mobile `runPagespeed` API request for `https://bogdanpascal.com/filmmaker/` was attempted during this audit. Google returned **HTTP 429, daily API quota exceeded**, so **no official Lighthouse/PageSpeed score was obtained**. Do not interpret the browser's observed navigation duration or transferred bytes as a substitute. Future official reports require an available API quota/key or manual PageSpeed Insights run.

## How to read the measurements

- **At load:** Image bytes observed in Chrome Resource Timing around the browser's page load event at an approximately **390 × 844 CSS-pixel mobile viewport**.
- **After full scroll:** Same page, incrementally scrolled through its complete height, allowing native lazy images to load.
- **Expanded equipment:** Additional interaction with both "SHOW MORE EQUIPMENT" stages, followed by scrolling the expanded content.
- **Unit:** KiB, 1,024 bytes per KiB. For rough MiB divide by 1,024. `encodedBodySize` is summed for JPG/PNG/WebP/GIF/AVIF resources in the browser's resource list; it is not memory use, GPU decode size, total bandwidth consumed by all third parties, or Core Web Vitals.
- **Caveats:** Browser tests were repeated with cache disabled via CDP, but lazy prefetch, timing, network and page interactions vary. A single page can show different "at load" values across runs. Cross-origin videos, embedded players, some fonts and third-party requests may be missing or undercounted. Some pages have large videos that will consume more data when played. A single simulated viewport is not a physical iPhone network test.
- **NO speed scores fabricated:** No authoritative LCP, INP, CLS, Lighthouse number, real-user CrUX data or cross-region statistics available. `performance.navigation.duration` from these unthrottled tests is not a valid substitute.

## 1. Overall, athlete, filmmaker and service pages

| Page | At load image KiB | After normal full scroll image KiB | Additional interaction | Main findings |
|---|---:|---:|---|---|
| `/` career selector | 349 | 349 | None | Lightweight; two background images. Optimize only if measured need. |
| `/athlete/` | 212 | ~13,788 to 14,817 | Reel iframe excluded | Heavy original GIF and PNGs load when visitor scrolls through long portfolio. Initial screen is lightweight. |
| `/filmmaker/` | 4,717 | 4,717 | Mobile card interactions | All 23 portfolio thumbnails load even without scrolling. High-priority initial-load waste. |
| `/filmmaker/about/` | 245 | 245 | None | Lightweight. Focus on message/trust, not byte optimization. |
| `/filmmaker/contact/` | 0 | 0 | None | No images. Already lightweight. |
| `/filmmaker/services/` | 1,126 | 1,126 | None | Six service imagery requests; moderate weight for a services index. |
| `/filmmaker/services/dop/` | 411 | 2,094 | Interactive frame explorer | Moderate after scroll; more important to validate responsive layout and client CTA. |
| `/filmmaker/services/fpv/` | ~1,088 | ~1,088 | Interactive flight simulator NOT fully interacted with | Reasonable image load; test animation CPU and battery while playing. Script already stops animation when document hidden. |
| `/filmmaker/services/editing/` | ~2,200 to 3,300 | ~7,131 | Viewing room/video playback not included | Heavy images on long interactive page. Separate video delivery audit required. |
| `/filmmaker/services/colour-grading/` | ~1,443 to 3,241 | ~3,241 | Film selector and full-screen viewer not fully exercised | Large film frames; avoid unnecessary full-resolution downloads for three-frame preview. |
| `/filmmaker/services/sound-design/` | ~902 | ~902 | Sound layering/audio demo not exercised | Moderate images; audio sources/player behavior need separate user-action measurement. |
| `/filmmaker/equipment/` | ~4,438 to 6,832 | ~13,535 to 14,735 (collapsed) | **~27,862 KiB** after both "SHOW MORE" stages and full scroll | Highest full-experience image weight observed; heavy transparent equipment cutouts. Its two extra HTML fragments are necessary for expansion and are fetched **on click**, not initially. |

**Conversion of key full-experience image figures:** equipment expanded ~27.2 MiB; athlete ~13.5-14.5 MiB; editing ~7.0 MiB; filmmaker homepage initial ~4.6 MiB. Do not compare these to an external PageSpeed "performance score".

## 2. Every film-project page, measured individually

All 23 projects are separate, indexable-intent HTML pages with unique project titles and one H1 in the inspected source. The following readings are from the **image** resource records, not total site weight.

| Project path under `/filmmaker/work/` | At load (KiB) | After full scroll (KiB) | Priority and why |
|---|---:|---:|---|
| `tui-romania/` | 3,025 | **4,609** | P1: Initial still downloads already heavy. |
| `yutaka/` | 1,245 | 2,715 | P2: Responsive still sizing. |
| `dyla/` | 99 | **6,656** | P1: 22+ gallery frames, impressive lazy loading initially; total gallery weight high. |
| `therme/` | 326 | **11,148** | **P0: Largest fully explored film gallery**; some individual JPGs near 0.9MB. |
| `geodome/` | 1,774 | **6,890** | P1: Large hero/stills; single `geodome/02.jpg` ~1.2MB. |
| `speedo/` | 240 | 2,115 | P2: Reasonable initial, inspect grid imagery. |
| `leo/` | 149 | **4,210** | P1/P2: Long gallery, optimize thumbnails. |
| `sky-above/` | 1,715 | 2,012 | P2: Several stills already loaded at page load. |
| `inanimate-girl/` | 1,939 | 2,666 | P2: Check eager/higher resolution early frames. |
| `push/` | 1,699 | 1,699 | P2: All image payload observed at load, but small overall. |
| `particle/` | 185 | **4,654** | P1: Lazy loading works initially; large full gallery. |
| `ffern/` | 1,874 | 3,383 | P2: Early image weight; verify poster/first frame. |
| `thorpepark/` | 2,167 | 3,355 | P2: Early image weight; source has a YouTube embed (excluded from image tally). |
| `mojo-skincare/` | 135 | 957 | P2: Lightweight. |
| `had-a-dream/` | 167 | 3,208 | P2: Lazy initial, moderate gallery. |
| `new-grounds/` | 306 | 3,321 | P2: Moderate gallery. |
| `this-is-an-ode/` | 140 | 2,267 | P2: Lightweight initial, moderate gallery. |
| `lorange/` | 1,726 | 1,726 | P2: All observed image data already at load, moderate total. |
| `miki/` | 274 | **10,223** | **P0: Second-heaviest full gallery**, including 1.4MB still. |
| `rawpot/` | 2,506 | **9,049** | **P0: Large early load AND long gallery**, including ~1MB still. |
| `renais/` | 205 | **5,415** | P1: Long gallery, optimize full images. |
| `sarah/` | 103 | 1,442 | P2: Lightweight initial and gallery. |
| `mojo-hair/` | 921 | 1,574 | P2: Lightweight/moderate gallery. |

**Important:** The 23 project-page tests initially reported a "broken image" each. Closer inspection of a representative project page showed that this was an **unassigned `<img alt="">` placeholder in the closed JS lightbox**, not a missing public still/404. Do **not** create a false broken-image fix ticket from this metric. Validate real failed network requests separately.

## 3. What is heavy and why?

### P0-A: Filmmaker homepage: eager thumbnails despite `loading="lazy"`

- **Evidence:** 23 image resources observed around initial page load; ~4.7MiB image payload.
- **Likely contributing code:** Each home grid card includes a `<div class="mk" style="background-image:url(...)">` plus a separate underlying `<img loading="lazy">`. CSS background images may fetch eagerly even when the `img` is lazy. The six layered hero stills are also inserted as CSS backgrounds on page load.
- **Fix proposal (BACKEND with minimal visible risk):** Replace duplicate CSS-background fetches with a technique reusing the already-decoded image, or set `background-image` only for cards near the viewport; preload only the first hero still and schedule later hero stills before rotation.
- **Acceptance:** Fresh mobile network waterfall loads only visible/near-visible cards; preserves exact filmic hover/tap effect and no blank backgrounds while scrolling.

### P0-B: Equipment: unusually large transparent assets

- **Evidence:** First visit ~4.4-6.8MiB; scrolling collapsed page ~13.5-14.7MiB; after both Show More clicks and full expansion ~27.2MiB images. The route contains **20 image elements before expansion and 97 after both clicks**, although only a subset are downloaded in one visit.
- **Files with high payload observed:** `studio/support-fxlion.webp` ~2.8MiB; `studio/support-monitor.webp` ~2.2MiB; `studio/support-npf.webp` ~2.1MiB; `kit/sandbags-clean.png` ~2.2MiB; `kit/vaxis-atom-500.png` ~1.6MiB; `kit/nitze-feelworld-monitor-cage.png` ~1.6MiB; `studio/lens75.png` ~1.5MiB.
- **Fix proposal (BACKEND):** Generate card-sized transparent WebP/AVIF image derivatives and accurate `srcset`/sizes, retain original cutouts in source. Avoid loading 1500-3000px pictures to display 200-400px gear cards. Consider one expansion category at a time with continued lazy-loading/virtualization; do **not** remove functional fragment files.
- **Acceptance:** Same image quality/transparency at card size; large reduction in transferred bytes and reasonable scroll responsiveness.

### P0-C: Athlete: one animation dominates full-scroll weight

- **Evidence:** `assets/the-1975-original.gif` ~7.6MiB alone; `assets/milan-fashion-week-original.png` ~3.2MiB; `assets/13-shades-of-romanian-cover.png` ~1.47MiB.
- **Fix proposal (BACKEND; same appearance where possible):** Convert the long GIF to a looped, muted, inline MP4/WebM with poster and reduced-motion fallback. Use responsive formats for large original PNGs, preserving original assets for archival. Avoid eager external embed loads.
- **Acceptance:** Same visible motion/look to people who want animation, light preview for slower/mobile users and appropriate fallback.

### P1-D: Individual project galleries

- **Evidence:** Therme, Miki, RawPot, GeoDomeX, Dyla and Renais each exceed ~5MiB of full-scroll JPGs.
- **Fix proposal (BACKEND with visual QA):** Use dedicated gallery thumbnails in modern formats and responsive `srcset` sizes. Fetch full-resolution masters only when the user opens the lightbox. Consider 2x device-pixel-ratio thumbnails and visible compression review to retain cinematic grain and subtle colour.
- **Avoid:** Re-encoding a film frame too aggressively and ruining grain, texture or carefully graded skin; inspect pixel-level visual diffs.

### P1-E: Editing/colour interactive content and video

- The editing page showed 10 `<video>` elements and an iframe in one initial test; many videos use metadata preload. Total image bytes ~7MiB after scroll **do not include full player traffic or interactive video selection/hover playback**.
- Colour page also includes a video element and iframe, plus high-resolution frame controls.
- **Fix proposal (BACKEND):** Keep video `preload="none"` or `metadata` as appropriate; download media only on selection/play and avoid hover-autoplay on touch if not intentional. Test external CDN byte-range and cache headers. Ensure selecting frames does not download full-size images unnecessarily.
- **Acceptance:** Compare network and CPU traces after user interactions, not only page load.

### P2-F: Sound and FPV interactive CPU/audio

- FPV animation loop is explicitly started by the user's Play action and stopped on `visibilitychange`: this is positive; **do not characterize FPV as a perpetual CPU drain**.
- Sound-design audio layers and interactive demos were not exercised by this browser measurement.
- **Fix proposal:** Profile performance during active use (FPS, long tasks, battery and audio bytes), pause on hidden document; no large speed refactor until a problem is demonstrated.

## 4. Tests needed before changing production

1. Run **Google PageSpeed Insights** mobile and desktop on at least root, athlete, filmmaker, equipment, editing, colour grading, FPV, DoP and the three heaviest gallery pages. Capture Lighthouse LCP, CLS, TBT, actual bytes and screenshots. Do not invent scores.
2. Use Chrome DevTools Performance + Network on a real iPhone or throttled mobile browser with cache off, repeat cold twice. Observe JavaScript main-thread time, hero LCP, repeated request initiation, and user-tap interactions.
3. Use Search Console Core Web Vitals if enough real traffic exists; individual pages may have insufficient CrUX field data.
4. Re-run initial + complete-scroll + expansion tests after each isolated change, not a full redesign.
5. Monitor live loading as well as filmic visual fidelity. Optimization must **not** degrade the design.

**References:** [Google PageSpeed Insights](https://pagespeed.web.dev/) and [PageSpeed data guide](https://developers.google.com/speed/docs/insights/v5/about).

## 5. Not measured; don't overclaim

- Actual page speed on a physical device, different countries or cellular connections.
- Independent Lighthouse score for each URL.
- Full bandwidth of embedded Vimeo/YouTube players, direct R2 MP4 streams, or audio files when activated.
- INP and Core Web Vitals field data for the entire site.
- All on-demand photo/lightbox/film selector variants.
- Cache policy and HTTP/2 multiplexing details for every third-party host.

This is a reproducible **per-page image transfer investigation**, not evidence that all pages are subjectively slow. The low initial bytes on many gallery pages is a positive sign; the high full-scroll bytes are an optimization opportunity for people who explore deeply.
