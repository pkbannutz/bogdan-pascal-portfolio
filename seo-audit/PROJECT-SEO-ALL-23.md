# Project-by-project SEO, evidence and gallery audit (all 23 films)

**Date:** 18 November 2026  
**Scope:** Every `/filmmaker/work/{slug}/` production page. No V2/V3 pages included.  
**Evidence:** Each public page loaded in a browser and was fully scrolled for image-resource measurements; metadata/HTML reviewed; individual credited roles cross-checked against the repository's `filmmaker/_build/projects.json`.  
**State:** Recommendations only. No live page or metadata edits.

## The global problem

All 23 project pages have their own URL, page title and one H1. That is a good foundation. **But most project pages contain only around 40-70 words of visible explanatory text** (GeoDomeX around 112 in one browser test), consisting largely of title, category, production credits and navigation. Meta descriptions are commonly auto-generated as `Project name. Category.` They are visually rich but give Google and potential clients little **page-specific explanation of what Bogdan did and why the work matters**.

**Search architecture:** These should be **portfolio evidence/case-study pages**, not 23 near-identical generic service pages. Their natural search intent is each project/brand/film title plus the specific production work; each case study should link back to relevant service landing pages.

## Non-negotiable shared improvements

### BACKEND + SEARCH (invisible on the page)
- [ ] **P-BASE-01 P0:** Replace generic `Project name. Category.` metadata with a distinct, role-accurate description. Implement in `filmmaker/_build/build.py` plus validated project source data, not 23 fragile one-off edits.
- [ ] **P-BASE-02 P0:** Add self-canonical absolute URL for each indexable work page. Include those URLs in sitemap.
- [ ] **P-BASE-03 P1:** Use absolute HTTPS Open Graph images with project-specific title and description for link sharing.
- [ ] **P-BASE-04 P1:** Add appropriate `CreativeWork` schema. Use `VideoObject` only where a **real, playable, prominent video** is present, with verified thumbnail and publication metadata. Generic Service/Person links can connect the author to verified roles. Structured data cannot manufacture a video result.
- [ ] **P-BASE-05 P1:** Use image thumbnails/compressed responsive formats for on-page galleries and only fetch original full-res image when lightbox opens. Retain originals as masters.
- [ ] **P-BASE-06 P1:** Add individual work-to-service internal links only where the credits verify the service role. Do not link all films indiscriminately to DoP, FPV, Editing, Colour and Sound simultaneously.
- [ ] **P-BASE-07 P1:** Verify the film embed/player on each page; do not imply a video is playable where the page is actually photo-only. Check third-party embed errors, licensing, player accessibility and video posters.
- [ ] **P-BASE-08 P1:** Reconcile `filmmaker/_build/build.py` with current production navigation and SEO behavior before rebuilding. Its shared `NAV` string currently lacks a Services link whereas the current filmmaker landing navigation has one. A rebuild could overwrite manually improved output with older templates.
- [ ] **P-BASE-09 P2:** Check open-lightbox keyboard handling/focus; the temporary `<img alt="">` created with no src is **not** a broken gallery asset.

### VISIBLE copy proposal (not applied)
- [ ] **P-BASE-10 P1:** Add 1 concise paragraph for each project: format, your **exact verified role**, the creative/technical challenge (only if real), and the result/deliverable. Even 70-150 useful words is better than generic filler. Never invent results.
- [ ] **P-BASE-11 P1:** Add a small `My role` label near existing credits, not rewriting collaborator credits. If appropriate, give 2-3 factual `How it was filmed` or `What I delivered` details.
- [ ] **P-BASE-12 P1:** Add one or two relevant links: `Explore my cinematography`, `Explore my colour grading`, or another correct service role. Keep the cinematic visual layout, still galleries and project navigation.
- [ ] **P-BASE-13 P1:** For still-only pages, clearly indicate `Photo/stills gallery` or `Selected frames` instead of promising playable film; optionally add the film only if it is actually available and licensed.
- [ ] **P-BASE-14 P2:** Add genuinely informative captions/alt descriptions to selected distinctive stills, particularly lighting, camera placement, movement and grade. Avoid repetitive `Project still 1`.

## Individual 23-page action map

**Image figures:** measured after full-page scroll, KiB transferred as reported by browser resource timing, excluding external video stream bytes. See [SPEED-ALL-PAGES.md](SPEED-ALL-PAGES.md) for exact at-load values and methodological caveats.

| # | Project URL suffix | Repository credits identifying your role | Gallery image KiB after scroll | Individual SEO/content recommendation |
|---|---|---|---:|---|
| 01 | `tui-romania/` | **DoP: Bogdan Pascal** | 4,609 | Clarify role as cinematography on TUI Romania commercial; link to DoP service; optimize early-loaded large stills. Vimeo embed present in DOM. |
| 02 | `yutaka/` | **DoP: Bogdan Pascal** | 2,715 | Give food/commercial cinematography context and exact role; add film only if licensed/available. **No iframe/video detected** in inspected live project page. |
| 03 | `dyla/` | **DoP: Bogdan Pascal** | 6,656 | Describe portrait-documentary cinematography and collaboration; extensive stills best served at responsive gallery sizes. Vimeo present. |
| 04 | `therme/` | **DoP: Bogdan Pascal** | **11,148** | **Top gallery performance priority.** Add documentary/branded-film cinematography summary, role detail, responsive still derivatives, and proper video metadata if film is prominent. Vimeo present. |
| 05 | `geodome/` | **Co-DoP: Bogdan Pascal and Dragos Teglas**; post-production credited to BTHEVISUAL | 6,890 | Always say **co-DoP** rather than sole DoP. Distinguish personal role from company post-production. Several hosted videos; strong candidate for accurate film case study. |
| 06 | `speedo/` | **DoP: Bogdan Pascal**; production/post credited BTHEVISUAL | 2,115 | Explain online content series and cinematography. **No iframe/video element detected** during inspected page load. Add real video if available. |
| 07 | `leo/` | **DoP: Bogdan Pascal** | 4,210 | Explain what the Dear Leo series involved using actual brief/role; one native video observed. Avoid just title + series label. |
| 08 | `sky-above/` | **DoP: Bogdan Pascal** | 2,012 | Focus on sci-fi short-film cinematography; accurate crew/format notes, cinematic technique if documented; Vimeo present. |
| 09 | `inanimate-girl/` | **DoP: Bogdan Pascal** | 2,666 | Specify music-video cinematography for Fauness, creative concept/approach once confirmed; native video observed. |
| 10 | `push/` | **DoP: Bogdan Pascal** | 1,699 | Differentiate `Speedo: Push. Repeat` from the separate Speedo series to avoid near-duplicate intent. Native video observed. |
| 11 | `particle/` | **DoP: Bogdan Pascal** | 4,654 | Commercial cinematography case study with lighting/framing details if true, then link to DoP service. Native video observed. |
| 12 | `ffern/` | **DoP: Bogdan Pascal**, **Spec Ad** | 3,383 | Preserve clear `Spec Ad` labeling; do not imply commissioned brand production. Explain creative/look work, native video observed. |
| 13 | `thorpepark/` | **DoP: Bogdan Pascal** | 3,355 | Explain branded Thrill Runners cinematography and movement only if verified; **do not claim FPV drone footage solely from placement on FPV page**. YouTube player present. |
| 14 | `mojo-skincare/` | **Source lists DoP: Simon Rowling; production company BTHEVISUAL**. No personal Bogdan role specified in project credits. | 957 | **Attribution verification priority.** Confirm your personal contribution before adding `Bogdan shot this commercial` language or personal DoP schema. Company production involvement is not automatically personal cinematography. Vimeo present. |
| 15 | `had-a-dream/` | **DoP: Bogdan Pascal** | 3,208 | Explain beauty-film cinematography and aesthetic choices factually; Vimeo present, with relevant DoP link. |
| 16 | `new-grounds/` | **DoP: Bogdan Pascal** | 3,321 | Fashion-film case study, light/production method if documented; **no video element/iframe detected** in inspected live page. |
| 17 | `this-is-an-ode/` | **DoP: Bogdan Pascal**, **Spec Ad** | 2,267 | Preserve visible spec-ad distinction; describe real creative intention and cinematography. Vimeo present. |
| 18 | `lorange/` | **DoP: Bogdan Pascal** | 1,726 | Describe online content format and your cinematography role, not generic "online content series" repeated. Native video present. |
| 19 | `miki/` | **DoP: Bogdan Pascal**; post credited BTHEVISUAL | **10,223** | **P0 gallery weight.** Compress responsive stills and emphasize verified commercial cinematography; two native video elements observed. |
| 20 | `rawpot/` | **DoP: Bogdan Pascal** | **9,049** | **P0 large early and full-gallery data.** Explain health-product content series/cinematography, avoid unverified business outcomes; three native videos observed. |
| 21 | `renais/` | **Director and DoP: Bogdan Pascal**; post credited BTHEVISUAL | 5,415 | **Strategic credibility opportunity:** Unlike most projects, this source credits you as director **and** DoP. Highlight accurately in relevant search metadata, services proof and visible role. Native video present. |
| 22 | `sarah/` | **DoP: Bogdan Pascal** | 1,442 | Beauty/product content cinematography role, three native videos observed; strong lightweight starting point. |
| 23 | `mojo-hair/` | **Colour Grading and Graphics: Bogdan Pascal**; **DoP: Simon Rowling** | 1,574 | **Do not market as your DoP job.** Link primarily to Colour Grading/Post-Production (and graphics where offered); clarify collaborators' camera credit. **No iframe/video element detected**. |

## Extra search opportunities and safeguards

### A. Four current work pages appear to be still-only

The browser did not detect a `<video>` or `<iframe>` on `yutaka/`, `speedo/`, `new-grounds/`, and `mojo-hair/`. That does **not** prove a film doesn't exist elsewhere; it means a visitor to these particular pages may only see stills. If the landing advertises "23 films", consider whether playable material should be linked or whether gallery presentation should be explicit. This is **VISIBLE** if altered. Do not add a fake player.

### B. Shared builder must be updated first

The `project_pages()` generator currently constructs metadata using:

```python
head(full_title(p) + " | Bogdan Pascal, Filmmaker", "%s. %s." % (full_title(p), p["category"]), t)
```

One reusable fix can upgrade all 23 pages **only if the generator is synchronized with the current published markup**. Do not overwrite newer manual design and navigation when rebuilding.

### C. Credits differ from service claims

- All DoP content should distinguish sole DoP, co-DoP, director/DoP, and a collaborator's DoP.
- Editing/colour/sound service pages must connect to film examples only where personal role is documented or confirmed.
- A production-company credit does not imply that every employee personally worked every role.
- Spec advertisements stay explicitly labeled spec, even when brands are named.
- Testimonials should be used only when attributable and permitted.

### D. Video and image search eligibility

Google video features prioritize pages whose main purpose is to watch the video; use real prominent videos, stable thumbnails and accurate `VideoObject` fields only where eligible. `VideoObject` is not suitable for still-only pages. Thumbnails and title descriptions should correspond to page content, and copyright permissions must be respected.

### E. Search Console measurement

Segment exact URL and query per project. Some project-title searches will be very narrow, but can provide strong trust signals for a hiring producer. **Do not sacrifice the filmic gallery to inflate generic keyword counts.** The service pages are where generic `hire a colourist` or `commercial DoP` queries should be targeted.

## Implementation sequence

1. Verify all personal credits, especially Mojo Skincare, Mojo Hair, GeoDomeX and Renais.
2. Update shared builder/templates and data source to support per-project descriptions, canonical, OG and truthful schema.
3. Build **responsive still thumbs** and full-resolution-on-lightbox architecture, starting with Therme, Miki, RawPot, GeoDomeX, Dyla and Renais.
4. Add concise authentic case study paragraphs and relevant reciprocal service links. **Visible copy approval required.**
5. Test real videos/embeds, accessibility, mobile touch navigation, screenshot diffs and live Google/Search Console indexing.

**No production changes applied in this audit.**
