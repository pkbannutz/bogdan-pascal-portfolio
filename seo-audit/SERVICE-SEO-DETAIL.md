# Standalone SEO audit: every filmmaker service page

**Date:** 18 November 2026  
**Scope:** `/filmmaker/services/`, all five active service pages, equipment, and supporting About/Contact pages. The old `on-set` route is treated as a redirect, not an independent service. V2/V3 excluded.  
**Status:** Audit and proposed changes only. None implemented.

## Core decision

**YES: Treat each current service URL as an independent landing page with its own audience, search intent, evidence, internal links and enquiry action.** Do not make five nearly identical "I make films" pages. They are already substantive, not blank templates: the browser's rough visible-text counts are about 502 words for DoP, 597 for FPV, 1,008 for Editing, 576 for Colour and 535 for Sound. Quantity is not the same as useful information. Improve *specificity, truthful proof and discoverability* before merely adding more words.

**What the previous audit missed:** The earlier documentation considered service SEO generally but did **not** provide this service-by-service query targeting, content gap, conversion path and media budget. This file closes that gap.

**Shared page requirements (BACKEND/SEARCH):**
- One unique, natural `<title>` and meta description per service URL.
- Self-canonical absolute URL; correct OG/Twitter share metadata and representative hero image.
- Descriptive H1 or close-by descriptive lead; preserving cinematic typography is fine.
- `Person` connected to an accurate `Service` description when useful; `BreadcrumbList` if the visible navigation supports that hierarchy. Google does **not** offer a generic guaranteed rich result for ordinary service schema.
- Relevant work examples linking to their individual project pages **and reciprocal links back** to the relevant service.
- Demonstrated role or deliverable in project case study; do not confuse `this film is in my portfolio` with `I personally performed every production role`.
- Clear route to an enquiry. One distinct event name per service for consenting analytics, if implemented.
- Real client proof/portfolio outcomes only. Avoid invented review scores, insurance, flight certifications, geographic availability or results.
- Structured and visible content must agree. No hidden keyword blocks.

## 01. Services overview: `/filmmaker/services/`

**Already:** Title `Film services | Bogdan Pascal`; has H1 `ONE VISION. EVERY FRAME.`, five linked services, two logical groupings (shooting and post-production), around 289 words. At load ~1,126 KiB images.

**Search intent:** Hiring an individual capable of end-to-end commercial filmmaking or a specialist for one production stage. This is a **hub page**, not the place to compete with every specialist keyword.

**Proposed search title (SEARCH):** `Filmmaking Services | Cinematography, Editing & Colour | Bogdan Pascal`.

**BACKEND/SEARCH:**
- [ ] S00-01: Unique description summarizing shooting + post, not a list of generic discipline names.
- [ ] S00-02: Self-canonical, social image, accurate Person/Service or CollectionPage/BreadcrumbList as appropriate.
- [ ] S00-03: Make the five service URLs clear crawlable text links, retain their current cards.
- [ ] S00-04: Add a contextual text link to selected films and a clear contact destination.
- [ ] S00-05: Audit whether images used by the service cards can use `srcset` without affecting visual results.

**VISIBLE proposal:**
- [ ] S00-06: Optional 1-2-sentence statement above service cards: work independently on a phase OR across a whole production. Current text already does this well; only change if clarity testing suggests improvement.
- [ ] S00-07: Optional honest scope indicators under each service card, e.g. "On-set image capture", "FPV shot planning", "Editing and multiple deliverables", without duplicating full landing-page copy.

## 02. Director of Photography: `/filmmaker/services/dop/`

**Already:** Title `DoP | Director of Photography | Bogdan Pascal`; H1 `LIGHT. MOTION. TIMING.`; narrative includes commercials, branded films, music videos, shorts, on-set shot-making, camera operation, movement expertise, Sony FX3 / RS3 Pro, process and visual demonstrations. One direct project link to GeoDomeX was found in source. At load ~411 KiB; after full scroll ~2,094 KiB images.

**Primary search intent:** A director, agency or producer hiring a **Director of Photography / cinematographer**, or separate camera operator for commercial and action/movement work.

**Suggested query cluster (NOT actual search volume):** `director of photography`, `commercial cinematographer`, `DoP for music videos`, `camera operator`, `action cinematography`, `movement-led cinematography`. Add location modifiers only when confirmed relevant.

**Proposed search title (SEARCH):** `Director of Photography & Commercial Cinematographer | Bogdan Pascal`.

**BACKEND/SEARCH:**
- [ ] S01-01: Self-canonical `/filmmaker/services/dop/`, unique OG social card, truthful Service/Person data.
- [ ] S01-02: Verify search snippet speaks to hiring, not just specific gear.
- [ ] S01-03: Link 3-5 **verified DoP examples** from the archive, not only GeoDomeX; candidates from source project credits include TUI Romania, Therme, Renais (director + DoP), and GeoDomeX (co-DoP). Credit labels must be accurate.
- [ ] S01-04: Link from each of those project pages back to this service where the credited role is correct.
- [ ] S01-05: Measure and improve responsive frame explorer lazy loading and mobile tap handling.

**VISIBLE proposal:**
- [ ] S01-06: Give the existing artistic heading a short nearby descriptive line, e.g. "Director of Photography for commercials, branded films, music videos and movement-led productions". Avoid adding a second competing visual hero.
- [ ] S01-07: Add brief **what clients can hire me for** bullets/panels only if the current sections are not sufficient, distinguishing DoP from camera operating and drone work.
- [ ] S01-08: Link 1-2 proof examples with exact production role and a clear "Discuss cinematography" route to contact. Current page links to the central contact page; a direct mailto is optional, not mandatory.
- [ ] S01-09: Mention crew scale/availability only if verified. Do not market kit specifications as the core differentiator.

**What NOT to do:** Create near-duplicate `/dop/` and `/cinematographer/` pages targeting synonyms.

## 03. FPV and drone cinematography: `/filmmaker/services/fpv/`

**Already:** Title `FPV & Drone Cinematography | Bogdan Pascal`; H1 `CAMERA IN MOTION.`; substantial ~597-word copy describing FPV, conventional drone, planning, route, safety, camera moves, interactive flight planner, four linked films (Thorpe Park, Therme, TUI Romania, Speedo Push Repeat). ~1,088 KiB observed image weight. JavaScript animation loop starts on user Play and stops when document becomes hidden: positive.

**Primary search intent:** A film production seeking **FPV drone pilot/cinematographer**, fast moving action shots, or controlled aerial cinematography. These are related but not identical buyer intents.

**Suggested query cluster:** `FPV drone cinematography`, `FPV drone operator for film`, `cinematic drone filming`, `aerial cinematographer`, `FPV action tracking`, `drone commercial filming`.

**Proposed search title (SEARCH):** `FPV Drone Pilot & Aerial Cinematography | Bogdan Pascal` (only if the pilot role is accurate).

**BACKEND/SEARCH:**
- [ ] S02-01: Add canonical, OG and accurate Service schema.
- [ ] S02-02: Check that the FPV interactive flight-planning illustration is accessible and does not hide primary hiring copy from crawlers; text already exists in source.
- [ ] S02-03: Test active simulation CPU, frame rate, audio and reduced-motion behavior on a real phone. Initial image payload alone is not a performance problem.
- [ ] S02-04: Verify permissions, credentials, aircraft platform and any insurance claims before publishing. Do not invent them.
- [ ] S02-05: **Important attribution rule:** The current page says its linked films are examples of *wider cinematography* and movement storytelling. Project credits mostly say DoP, not explicitly FPV operator. Do not imply every featured clip was captured by FPV without verifying footage.
- [ ] S02-06: Consider dedicated text descriptions or verified media examples for FPV-specific manoeuvres if real footage exists.

**VISIBLE proposal:**
- [ ] S02-07: Separate two clear options, `FPV close-action shots` and `cinematic aerial/drone coverage`, within existing layout. Helps producers identify the correct service immediately.
- [ ] S02-08: Brief booking essentials: country/region of operation, shot environment, approvals, production constraints and what to send for a quote. Use only accurate information.
- [ ] S02-09: Explicit "Discuss your FPV shot" CTA with subject line; present email action already exists.
- [ ] S02-10: Optional FAQ based on actual enquiries (e.g. planning, indoor operation, permissions); not an FAQ-rich-results hack.

## 04. Editing and delivery: `/filmmaker/services/editing/`

**Already:** Title `Film Editing | Bogdan Pascal`; H1 `THE ART OF THE CUT.`; ~1,008 words across strong sections on story, timing, viewing room, frames, formats, widescreen/vertical, client-ready delivery. Interactive film viewer, 10 video elements and an iframe in inspected browser. At load ~2.2-3.3MiB images; after full scroll ~7.0MiB, **video stream costs not measured**.

**Primary search intent:** Producer/agency hiring **commercial video editor**, brand film editor or editing + versioning for platforms.

**Suggested query cluster:** `commercial video editor`, `brand film editing`, `film editing services`, `video editing and delivery`, `social cutdown editor`, `vertical video editing`. Only mention software like DaVinci Resolve as a supporting fact if useful and accurate.

**Proposed search title (SEARCH):** `Commercial Video Editing & Post-Production | Bogdan Pascal`.

**BACKEND/SEARCH:**
- [ ] S03-01: Canonical, absolute OG and truthful Service schema.
- [ ] S03-02: Prioritize initial load and first-screen visuals; use appropriately sized gallery previews, not full resolution for tiny film-frame strips.
- [ ] S03-03: Profile full interactions: selecting films, playing video, preview-on-hover and rotating video elements. Check transfer, main thread and consent/third-party embedding.
- [ ] S03-04: Ensure videos load only on play/selection, check MP4 ranges and player posters; keep mobile behavior predictable.
- [ ] S03-05: Link project pages with specific **verified editing** roles or production-company post-production responsibilities; do not automatically attribute editing personally when project data lists only DoP.

**VISIBLE proposal:**
- [ ] S03-06: Add a plainly worded subheading under the artistic hero explaining commercial editing, narrative edits, cutdowns and deliverables.
- [ ] S03-07: Surface a compact "what gets delivered" list (master, aspect-ratio variants, subtitles, review rounds) only for deliverables you actually offer.
- [ ] S03-08: Show 1-3 labeled before/after edit examples if permission allows, without adding dozens of heavy auto-loaded clips.
- [ ] S03-09: One service-specific enquiry CTA, which already has an email subject line. Avoid extra competing forms.

## 05. Colour grading and look development: `/filmmaker/services/colour-grading/`

**Already:** Title `Colour grading | Bogdan Pascal`; H1 `COLOUR. WITH INTENT.`; ~576-word technical/artistic copy on exposure, white balance, matching, skin, narrative tone and consistency. Six film selections with frame explorer, contact sheet and hosted film playback. At load ~1.4-3.2MiB images depending request timing, after scroll ~3.2MiB. One `geodome/02.jpg` frame ~1.2MiB.

**Primary search intent:** Director/agency hiring a **film colourist / colour grader** for a commercial, music video, branded content or short film.

**Suggested query cluster:** `colour grading services`, `commercial colourist`, `film colourist`, `cinematic colour grading`, `colour correction and grading`, `DaVinci Resolve colourist`. Optional US spelling `color grading` in natural on-page text to capture international searches; do not keyword stuff.

**Proposed search title (SEARCH):** `Film Colour Grading & Commercial Colourist | Bogdan Pascal`.

**BACKEND/SEARCH:**
- [ ] S04-01: Canonical, absolute OG, accurate Service schema and social screenshot.
- [ ] S04-02: Use reduced-resolution preloaded comparisons and load high-res only in lightbox; ensure accurate colour profiles/gamut and no unwanted browser colour shifts.
- [ ] S04-03: Check correctness of the page statement "Every project featured here was colour graded by me"; verify credits before applying schema or stronger claims.
- [ ] S04-04: Link six featured films to their own pages with truthful role assertions and reciprocal links only when individually verified.
- [ ] S04-05: Add colour/grade-specific alt and captions on genuinely illustrative frames; not meaningless `Frame 1` everywhere.

**VISIBLE proposal:**
- [ ] S04-06: Clear microcopy near artistic H1: `Colour grading and look development for commercials, branded films and music videos`.
- [ ] S04-07: Explain client handoff requirements (locked edit, source footage, reference look, output format) where it adds practical value.
- [ ] S04-08: Show a controlled grade demonstration with side-by-side/slider where technically faithful and colour-managed, not a misleading extreme saturation effect.
- [ ] S04-09: Keep direct `Colour grading enquiry` email path.

## 06. Sound design and SFX: `/filmmaker/services/sound-design/`

**Already:** Title `Sound Design & SFX | Bogdan Pascal`; H1 `SOUND IS THE FEELING.`; ~535 words about dialogue, layered SFX, atmosphere, ambience, final mix and interactive sound layers. One direct GeoDomeX project link, 3 image tags and ~902 KiB observed image requests. Video/audio interactions not fully measured.

**Primary search intent:** Filmmaker or brand agency hiring sound designer / effects editor / dialogue cleanup / sound post-production.

**Suggested query cluster:** `sound design for film`, `commercial sound design`, `SFX design for video`, `dialogue editing`, `sound post production`, `film atmosphere sound design`.

**Proposed search title (SEARCH):** `Film Sound Design, SFX & Audio Post | Bogdan Pascal`.

**BACKEND/SEARCH:**
- [ ] S05-01: Canonical, absolute OG, truthful Service schema and link to actual work.
- [ ] S05-02: Audit sound demo file formats/size/network on play and check `preload` does not unnecessarily stream audio when not requested.
- [ ] S05-03: Add accessible captions/transcript or text description for essential audio demonstrations, with fallback if audio is muted.
- [ ] S05-04: **Attribution:** Page currently states your role varies by project and viewers should check credits. Keep that caveat; do not imply every displayed film is individually sound-designed by you without verifying.
- [ ] S05-05: Measure on mobile after toggling sound layers, with headphones and assistive tech if possible.

**VISIBLE proposal:**
- [ ] S05-06: Add a short, unambiguous sentence about `Sound design, dialogue cleanup and effects for films and commercials` near H1.
- [ ] S05-07: Make the interaction obvious: labelled A/B or separate layer buttons with the audio differences described in text.
- [ ] S05-08: Explain what clients need to provide and what final file/mix options you offer if these are real services.
- [ ] S05-09: Keep existing direct sound-design enquiry CTA; do not bury contact after audio interaction.

## 07. Equipment: `/filmmaker/equipment/`

**Already:** H1 `IN-HOUSE EQUIPMENT.`; detailed camera, lenses, sound, stabilisation and further categories. The page currently has **`noindex, nofollow`**: it is not being presented as a search landing page by design. Two HTML fragments are required for expansion. Fully expanded page can request ~27.2MiB of images.

**Decision needed, not automatic:** Is equipment intended only as **client due-diligence** ("what kit does Bogdan own?"), or an SEO entry point for searches around hired camera operator + owned kit? If the first, keep noindex and ensure internal links work. If the second, the page needs value beyond a raw equipment inventory before making it indexable.

**BACKEND/SEARCH:**
- [ ] S06-01: Prioritize responsive transparent cutouts and only on-demand loading for 97 possible image tags. Never eliminate functional `motion-sections.html` or `extra-sections.html`.
- [ ] S06-02: Verify physical image dimensions, caching, file formats and lazy-loading for hidden categories.
- [ ] S06-03: Confirm noindex policy; if intentionally indexable later, add description, self-canonical, site-map inclusion and clear written gear/service context.
- [ ] S06-04: Keep README/source instructions out of production deployment if they are not needed at runtime.

**VISIBLE proposal:**
- [ ] S06-05: Optional one-sentence explanation of why owning this equipment benefits productions (speed, flexibility, consistency), not arbitrary equipment-only keywords.
- [ ] S06-06: Helpful `Request a kit-supported shoot` link; avoid implying equipment rental is offered if it isn't.
- [ ] S06-07: Consider separating equipment browsing into tabs or progressive reveal if user feedback supports it, but no redesign without approval.

## 08. About and contact support pages

### `/filmmaker/about/`

**Already:** Title `About | Bogdan Pascal, Filmmaker`; H1 `About me.`; ~96 words, a photo ~245 KiB, existing narrative includes partnership with Anda Teglas and a `London based` production duo claim.

**BACKEND/SEARCH:** Unique canonical, social preview, Person/occupation/links and internal career connection; support credibility for service landing pages. No generic empty "About" SEO competition. **Verify whether "London based" reflects the current production business location** before extending the text.

**VISIBLE:** Add 1-2 truthful paragraphs explaining relevant production experience, client formats and verified role credentials. Link to services and credits, not a long personal biography. Do not accidentally diminish your athlete career.

### `/filmmaker/contact/`

**Already:** Title `Contact | Bogdan Pascal, Filmmaker`; H1 `Let's talk.`; very lightweight, near zero image weight; client-facing 41 words and email route.

**BACKEND/SEARCH:** Self-canonical; clear identity/contact metadata; consent-aware event if tracking email clicks. No need to artificially lengthen page.

**VISIBLE:** Optional short note on details to provide: production type, location, dates, scope, desired services. Do not invent phone, address or company registration.

### `/filmmaker/services/on-set/`

This is an old redirect to `/filmmaker/services/dop/`, already `noindex` and canonically points to DoP. It should **not** be treated as an independent optimized service page. Retain until backlinks/traffic are checked; if changing hosting, use a genuine HTTP 301 rather than client-side redirection where possible.

## Design preservation rules

- `BACKEND` changes can add canonical, OG, JSON-LD, analytics and better asset delivery without changing layout. Test appearance anyway.
- `SEARCH` changes improve snippets, titles and sharing cards, but Google may choose its own display.
- `VISIBLE` changes are copy/CTA/behavior: present exact text and placements for review first.
- Never create multiple thin service URLs for synonyms to manipulate search results. One detailed page per actual distinct service is sufficient.

## How to measure each service independently

Google Search Console: filter by exact page URL; look at queries, impressions, clicks, position trends and country. GA4: if configured with appropriate privacy/consent controls, track `enquiry_dop`, `enquiry_fpv`, `enquiry_editing`, `enquiry_colour`, `enquiry_sound` (conceptual event names, not installed) and compare qualified enquiries, not only traffic.

**References:** [Google Search Essentials](https://developers.google.com/search/docs/essentials) and [Google structured data quality policy](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
