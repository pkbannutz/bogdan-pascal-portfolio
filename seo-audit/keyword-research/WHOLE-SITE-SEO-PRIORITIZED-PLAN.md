# bogdanpascal.com: Integrated SEO, professional naming and booking conversion plan

**Created:** 18 November 2026  
**State:** **DECISION-READY DRAFT, NOT APPLIED.** This synthesizes all **seven requested researched service families**. The optional eighth family (additional verified specialties such as underwater shooting) is a **separate outstanding discovery**, not silently included as complete.  
**Scope:** public-facing personal `/athlete/` and `/filmmaker/` families. **Site preservation rule:** All current content/layout/SEO/deploy files remain untouched until explicit approval. Only documentation in `seo-audit/` has been edited.

## Executive recommendation

The best strategy is not “rank for the biggest keyword” or to turn the portfolio into a full-service agency website. It is a **two-audience personal specialist portfolio** in which actual hiring buyers instantly see what Bogdan does, which role they can book, real project/reel proof, and the next contact action. Preserve the Apple-like editorial film experience; clarify professional terminology in short accessible HTML near each existing hero; remove indexing obstacles only after approval.

**Distinct top-level hiring routes:**
1. **Athlete / movement:** **Parkour Athlete & Freerunner** and **Stunt Performer (Parkour Specialist)** for **on-camera bookings**, plus **Parkour Coordinator** and **Movement Director** for **specialist action/movement design**. Do not imply general Stunt Coordinator accreditation.
2. **Filmmaking / physical production:** **Freelance Commercial Filmmaker & Cinematographer** leading to individually bookable **Director of Photography (DoP)**, **Camera Operator**, **FPV Drone Pilot** and **Aerial Cinematographer** services; a full branded film only when actual producing/collaborator responsibilities are clear.
3. **Post-production:** **Commercial Video Editor**, **Film & Commercial Colourist**, and **Film Sound Designer / Sound Effects Editor**, each supported by specific real deliverables, accurate personal credits, and one straightforward enquiry route.

**The highest-impact SEO finding is technical, not wording:** as of 18 Nov 2026 the **LIVE** public **FPV, Editing and Colour Grading** service pages send `noindex,nofollow`. This conflicts with the goal of generating search bookings *if* those pages are meant to be indexed. Investigate intended staging policy then propose an owner-approved, limited fix. See [evidence](LIVE-INDEXING-BLOCKERS-2026-11-18.md). DoP and Sound did not have explicit robots meta in inspected live HTML; that does not confirm Google's index status. This cannot be solved by extra meta keywords or stuffing headers.

## 1. Seven service chapters and recommended visible naming

| Priority / family | Main visitor-facing service | Human bookable role / support | Existing URL | Completed evidence |
|---|---|---|---|---|
| **Athlete** | **Parkour Athlete & Freerunner** | **Stunt Performer**, Parkour Coordinator, Movement Director, Acrobat | `/athlete/` | [Athlete report](ATHLETE-INDUSTRY-NAMES-AND-SEO-RANKED.md), 76 UK queries; act/performance and specialist movement briefs |
| **FPV & aerial** | **FPV Drone Filming & Aerial Cinematography** | FPV Drone Pilot, Drone Operator, Aerial Cinematographer | `/filmmaker/services/fpv/` | [FPV report](FPV-DRONE-AERIAL-SEO-RANKED.md), 57 UK queries and live index blocker |
| **DoP & camera** | **Director of Photography / Cinematography** | Camera Operator, Gimbal Camera Operator, movement-led camera specialist | `/filmmaker/services/dop/` | [DoP report](CINEMATOGRAPHY-CAMERA-GIMBAL-SEO-RANKED.md), 61 UK queries |
| **Commercial filmmaking** | **Branded Films & Commercial Video Production** | Commercial Filmmaker, Director of Photography, approved collaboration/crew where true | `/filmmaker/` + `/filmmaker/services/` | [Commercial film report](COMMERCIAL-FILMMAKING-SEO-RANKED.md), 57 UK queries |
| **Editing** | **Commercial Video Editing & Post-Production** | Freelance Commercial Video Editor, Film Editor; actual cutdowns/versions | `/filmmaker/services/editing/` | [Editing report](VIDEO-EDITING-SEO-RANKED.md), 61 UK queries and live index blocker |
| **Colour** | **Colour Grading & Look Development** | Film & Commercial Colourist, grading, matching and correction | `/filmmaker/services/colour-grading/` | [Colour report](COLOUR-GRADING-SEO-RANKED.md), 62 UK queries and live index blocker |
| **Sound** | **Film Sound Design & Audio Post-Production** | Sound Designer, Sound Effects Editor, dialogue/ambience/mix only as offered | `/filmmaker/services/sound-design/` | [Sound report](SOUND-DESIGN-SFX-SEO-RANKED.md), 64 UK queries, interactive demo/credit caveats |

**Total source coverage across these reports: 438 tracked keyword strings** (76+57+61+57+61+62+64). This is **not 438 unique demand pools**, not a list of rankings and not proof of 438 buy-intent queries. Several families and spelling variants overlap. Each chapter has its own UK paid search-volume estimates, organic KD, classified intent, historical/recent Trends, sample desktop Google SERPs and source limitations. Most SERP result URLs are wrapped and some provider calls failed; none proves a stable Google top-ten position for the owner or a competitor.

## 2. Highest-value edits ranked by actual expected outcome, not cosmetic convenience

| Priority | Area | Exact recommendation | Why it matters | Can execute now? |
|---|---|---|---|---|
| **P0** | **BACKEND indexing** | Review and, only with approval, remove `noindex,nofollow` on **three intended indexable production services**: FPV, Editing, Colour | Without indexability, their organic booking entry pages are directly excluded | **NO, approval required** |
| **P0** | **BACKEND verification** | Before any edits, collect Google Search Console URL Inspection for athlete/filmmaker/7 key service URLs, Google-selected canonical, indexability and UK queries | Differentiates confirmed obstacles from presumed ones; sets baseline | **Only if GSC connected** |
| **P0** | **VISIBLE athlete** | Make **active Parkour Athlete** and **Stunt Performer** at least as prominent as **Coordinator**, not a former athlete manager profile | Clear performer casting, high-value fit, distinct commission types | **NO, approval required** |
| **P0** | **VISIBLE conversion** | Show one **Perform / Book me** and one **Coordinate / Plan a sequence** route on athlete; on filmmaker, two distinct **Join production as crew / Discuss full film** explanations | Reduces wrong-fit enquiries while keeping one simple email destination | **NO, approval required** |
| **P0** | **VERIFY claims** | Check actual co-DoP/editor/colour/sound roles, spec ads, location, UK pilot permissions/insurance and any stunt status before copying into metadata or schema | Prevents misleading industry and eligibility claims | **Review with owner/source evidence** |
| **P1** | **SEARCH discoverability** | Implement accurate unique title/description, self-canonical, social OG URL/image and sensible page/Person schema on actual indexable pages | Search result relevance, sharing, identity and canonical hygiene | **NO, approval required** |
| **P1** | **BACKEND infrastructure** | Validate `/sitemap.xml` and `/robots.txt` deployment, host redirect + trailing slash, valid 200 pages and no unintended index blockers | Supports crawl discovery; prior audits reported 404, verify again before fix | **NO, approval required** |
| **P1** | **VISIBLE trust proof** | Add **role-accurate** `My role / What I delivered` to 3–5 representative project pages, links to matching services only | A verified portfolio proves work better than extra unverified service claims | **NO, approval required** |
| **P1** | **BACKEND templates** | Fix shared project metadata from verified `filmmaker/_build/projects.json` and builder rather than hand-editing 23 generated project pages | Consistency and avoid fragile build regressions | **NO, approval required** |
| **P1** | **VISIBLE sound** | Show a genuine self-produced sound-design A/B only if isolated material and rights exist; otherwise keep current **explanatory**, not audio-playing, layers clear | Actual sonic craft much stronger sales proof than a silent track selector | **Only if real source stems and approval** |
| **P2** | **MOBILE UX / CWV** | Audit real mobile LCP/INP/CLS, hero prioritization, gallery still variants, video preload, reduced motion, touch/keyboard access | Film experience must remain quick and usable on phones | **Measure first, then approve changes** |
| **P2** | **SEO analytics** | Track GSC service page impressions/clicks by country; keep qualified performer/DoP/FPV/editor/colour/sound enquiries distinct | Choose future pages by booked projects, not popular search keywords | **Depends on connected accounts / consent** |
| **P3** | **Content expansion** | Create distinct new service/location pages only if a real separate buyer scope, original proof and measured query gap justify it | Prevents cannibalisation, thin keyword doorway pages, maintenance load | **NOT RECOMMENDED NOW** |

**Do not automatically change** intentionally unindexed equipment details, legacy redirects, internal preview routes, unlaunched pages or any other `noindex` files. Before deploy, use an allowlist of exact intended production paths; test current live HTML, indexing headers and build outputs.

## 3. Proposed page-by-page title and first-screen text (copy approval before deployment)

**These are recommended candidates, not source modifications.** Preserve distinct poetic H1s when they serve the design; an additional accessible service descriptor can carry the professional identity. Do not create artificial exact-match headings everywhere.

| Page | Proposed SEARCH title | Proposed first-screen VISIBLE role / context |
|---|---|---|
| `/athlete/` | `Bogdan Pascal | Parkour Athlete & Stunt Performer` | `PARKOUR ATHLETE · STUNT PERFORMER · PARKOUR COORDINATOR` plus `Freerunner, acrobat and specialist movement direction for film, TV, commercials and live performance` |
| `/filmmaker/` | `Commercial Filmmaker & DoP | Bogdan Pascal` | `COMMERCIAL FILMMAKER · DIRECTOR OF PHOTOGRAPHY`, one line of actual commissioned film types. Preserve `Every frame. On purpose.` editorial look |
| `/filmmaker/services/` | `Filmmaking Services | Cinematography & Post | Bogdan Pascal` | `CINEMATOGRAPHY · FPV DRONE FILMING · EDITING · COLOUR · SOUND` short service labels and clear per-service deep links |
| `/filmmaker/services/fpv/` | `FPV Drone Filming & Aerial Cinematography | Bogdan Pascal` | `FPV DRONE PILOT · AERIAL CINEMATOGRAPHER` with actual film movement deliverables, operating compliance on request |
| `/filmmaker/services/dop/` | `Director of Photography & Camera Operator | Bogdan Pascal` | `DIRECTOR OF PHOTOGRAPHY (DoP) · CAMERA OPERATOR`, secondary `Gimbal Camera Operation` |
| `/filmmaker/services/editing/` | `Commercial Video Editor & Film Editing | Bogdan Pascal` | `COMMERCIAL VIDEO EDITOR · FILM EDITOR`, story-driven cutdowns and honest client delivery |
| `/filmmaker/services/colour-grading/` | `Film Colourist & Commercial Colour Grading | Bogdan Pascal` | `FILM & COMMERCIAL COLOURIST`, shot matching and look development |
| `/filmmaker/services/sound-design/` | `Film Sound Designer & SFX Editing | Bogdan Pascal` | `FILM SOUND DESIGN · SOUND EFFECTS EDITING`, clarify audio SFX versus practical/visual effects |

**All titles require final Google snippet length and mobile tests; Google may rewrite them.** Title words are not a substitute for real proof and indexed pages.

## 4. Evidence standards for projects, accreditations and client trust

**Film/production portfolio:**
- **Renais**: project data explicitly credits Bogdan as **Director and DoP**. Powerful director+cinematographer proof. Do not use this to assert director credits on every other project.
- **GeoDomeX**: **co-DoP with Dragos Teglas**, not lone DoP; company post-production credit **BTHEVISUAL** does **not** automatically mean Bogdan personally edited, graded and mixed every layer.
- **Mojo Hair**: explicit personal **Colour Grading and Graphics: Bogdan Pascal**; **DoP: Simon Rowling**. Important distinct colourist proof, **not** Bogdan cinematography evidence.
- **Mojo Skincare**: existing project says **DoP Simon Rowling** and BTHEVISUAL production; Bogdan personal role must be verified before adding any exclusive credit.
- **Ffern / This Is an Ode**: **spec advertisements**, not commissioned brand clients; label clearly.
- Personal FPV/aerial shot attribution must be confirmed on examples; working as DoP on a film does not prove it contains Bogdan's drone footage.
- The sound page displays complete projects but says **`My role varies by project`**, which is correct. The layer UI is **text explanation**, not isolated audio playback; don't market fake before/after stems.
- Athlete performer credits and parkour coordinator roles deserve separate project labels; a stunt performer is not automatically the stunt coordinator. Current UK certification/registration and booking responsibilities need exact owner verification.
- Current physical operating base and London-based BTHEVISUAL statement need confirmation; UK target search region, UK right-to-work and physical address/location are **different facts**.
- A2 CofC, operator/flyer IDs, permissions, commercial insurance and appropriate flight authorisations depend on the actual proposed work. Do not claim a generic legacy “CAA commercial drone licence” or ability to fly any venue.
- Never infer a specific award won, a client commission, a crew department lead, copyright to audio assets, official licence, facility or training from aspirational language.

**Visitor trust recommendation:** Accurate credits, useful behind-the-scenes/role explanations and playable real examples generally produce better client understanding than vague superlatives or forcing awards/brand logos above everything. Confirm the right to display logos/testimonials and any model/location releases.

## 5. Search demand and source quality: how to decide future changes

Seven primary family reports contain **country-specific estimated keyword demand**, automated organic KD and intent, UK Google SERP attempts, and Google Trends **since 2004, 5y, 12m and 3m**. These are **research proxies**, not the true search analytics or conversion data for this domain.

**Highest-quality analysis rules:**
- `parkour` ~18,100 UK/month and `sound effects` ~22,200 UK/month have **large educational/gaming/download** components, not a pipeline of equally numerous client bookings.
- `video editor` ~14,800 UK/month and `colour correction` ~8,100 UK/month heavily include **software, courses, tutorials**, rather than freelance hiring.
- Exact high-fit phrases `parkour performer` ~10, `fpv drone pilot` ~30, `film sound designer` ~20 or `freelance colourist` ~20 may be commercially more useful *for this individual portfolio* even with fewer searches.
- Duplicate variants `freerunner/free running/freerunning`, UK/US colour spelling, and `sound effects editor/editing` may share platform grouping and intent. **Never sum** to invent a bigger total reachable demand.
- Google Ads monthly estimates are not Search Console impressions, and organic KD is not Google competition score nor guaranteed ease of ranking. KD=0 may be sample/sparse evidence.
- Google Trends scores are **relative to each term comparison and time range**; a 12-month index 60 and 3-month index 20 are not necessarily a fall. Sparse niche 0s do **not** mean no customers.
- The provider's `rank_group` in SERP snapshots is an original transient label and result destinations can be wrapped `google.com/goto`, often with missing/cross-intent items. Do not claim verified persistent top ten or competitor authority/organic traffic without stronger evidence.
- Social buzz around consumer FPV drones or AI editing tools is not an identified increase in UK film crew production bookings.
- In the first 60–90 days of any **approved** implementation, measure **qualified enquiries and booked jobs** by service and actual entrance page, alongside GB and non-GB GSC impressions/clicks/CTR. Do not optimize to broad “parkour” clicks that never hire.

## 6. Minimal-change approved future implementation sequence

**Release 0: Baseline and scoped approval**
1. Get owner approval for exact visible and backend files separately, verify true professional titles and physical base.
2. Collect GSC inspection/status if connected, record existing live meta/headers/URLs screenshots, build hashes, backup source branch and deployment process.
3. Confirm site build pipeline for static GitHub Pages; changes should be reviewable on a **non-public preview/PR**, not silently pushed to production.

**Release 1: Indexing and crawlability (highest priority)**
1. Review intentional index rules and propose to remove `noindex,nofollow` on three verified intended public pages only.
2. Add self-referencing canonical on each indexable public path and consistent actual `https://bogdanpascal.com` host/trailing slash rules.
3. Provide accurate indexable URLs in sitemap with stable root deployment and robots sitemap hint; retest. Validate headers, generated pages and redirects.
4. Verify no new loss of video, animations, existing noindex preview or equipment policy; submit URLs/sitemap to GSC only after live approved release.

**Release 2: Naming and qualified booking flow**
1. Athlete first, clarify working active performance and separate parkour coordination.
2. Filmmaker landing and service overview, clarify personal crew hire versus commissioned full brand film.
3. FPV/DoP individual hiring wording and accurate shot roles.
4. Editing/Colour/Sound each one accessible role label, short client outcomes and one already functioning CTA, not a crowded services wall.
5. Unique title/meta and accurate social sharing on same approved files. Include accurate visible content, no auto-generated AI filler.

**Release 3: Film proof, assets and performance**
1. Improve 3–5 representative portfolio cases with role-accurate captions and optionally timecoded video evidence.
2. Optimize template-driven project descriptions and service links from `filmmaker/_build/projects.json` and build script, not 23 manual generated HTML edits.
3. Audit mobile LCP/INP/CLS, poster, first frame/video loading, user-triggered audio, responsive true-colour stills and reduced-motion behavior. Preserve cinema-style typography and composition.
4. If credible source audio stems exist, introduce one verified sound design comparison as separate approved component. If not, don't fabricate.
5. Preserve accessibility: semantically readable service name, visible mobile CTA, keyboard and descriptive text for critical media.

**Release 4: Actual evaluation**
1. Inspect GSC for indexing and page per-query entries; do not promise index timing.
2. Track service-specific qualified emails and actual production bookings, with privacy-conscious consent where needed.
3. Make future marketing decisions on real search outcomes/production revenue, not only modeled volume, third-party KD or Trends.
4. Only then consider individual location/specialty landing pages if genuinely useful, original and non-duplicative.

**Changes in this research turn:** GitHub **documentation only**. No website HTML, CSS, JS, metadata, search directives, DNS, Actions/deployment or GitHub Pages config altered.

## 7. Outstanding evidence and deferred optional research

**HIGH PRIORITY before publication:**
- Verify actual current physical base vs UK/London statements, current UK work/flight requirements and suitable insurance, parkour/stunt coordinator contractual qualification and line responsibility.
- Verify direct individual shooting/editing/colour/sound role per showcased project, especially co-DoP/company post and spec ads.
- Search Console and actual qualified booking/conversion data not provided; no real Google index/traffic performance can be asserted.
- Confirm required production footage, rights and sources before video/audio comparisons or testimonials.
- QA redirects, `robots.txt`, sitemap, canonical and service URLs after a future authorized deployment.

**Optional #8:** additional verified specialties, for example underwater pool filming or action-follow camera work, should first be checked against actual public work, equipment, ability/insurance and buyer demand. They do not automatically deserve a new service page. The [research roadmap](RESEARCH-ROADMAP.md) keeps this an independent open chapter until primary evidence is gathered. No volume or ranking for unstudied specialties is fabricated.

## 8. Sources and navigation

**Seven complete decision reports:**
1. [ATHLETE professional naming & SEO](ATHLETE-INDUSTRY-NAMES-AND-SEO-RANKED.md)
2. [FPV / drone / aerial cinematography](FPV-DRONE-AERIAL-SEO-RANKED.md)
3. [Director of Photography / Camera / Gimbal](CINEMATOGRAPHY-CAMERA-GIMBAL-SEO-RANKED.md)
4. [Commercial Filmmaking / Brand Films](COMMERCIAL-FILMMAKING-SEO-RANKED.md)
5. [Editing & Post](VIDEO-EDITING-SEO-RANKED.md)
6. [Film & Commercial Colourist](COLOUR-GRADING-SEO-RANKED.md)
7. [Sound Design / Film SFX / Audio Post](SOUND-DESIGN-SFX-SEO-RANKED.md)

**Shared source evidence:** [Verified live indexing blocker report](LIVE-INDEXING-BLOCKERS-2026-11-18.md), [research roadmap and raw dataset index](RESEARCH-ROADMAP.md), [decision principles](../RESEARCH-DECISION-PRINCIPLES.md), [23-project credit and technical audit](../PROJECT-SEO-ALL-23.md), [service-specific UX audit](../SERVICE-SEO-DETAIL.md), [original handoff](../START-HERE-NEXT-CHAT.md).

**Official Google references:** [Search Essentials](https://developers.google.com/search/docs/essentials), [robots meta instructions](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview), [canonical methods](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), [Search Console](https://search.google.com/search-console/about), [Google Trends relative normalization](https://support.google.com/trends/answer/4365533).

**Approval status: NONE OF THE PROPOSED WEBSITE CHANGES HAVE BEEN APPLIED.**
