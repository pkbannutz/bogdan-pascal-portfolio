# Whole-site SEO and professional booking plan for BogdanPascal.com

**Date:** 18 November 2026. **Status:** DONE for seven core research families, **NOT APPLIED TO THE WEBSITE**. Primary market researched: UK English. All visible or production technical changes require explicit owner approval.

## Executive decision: fix indexability before chasing additional keywords

**The single most consequential technical finding is a live noindex directive on three public service pages.**

| Public service page | HTTP | Robots meta observed in live raw HTML | HTML canonical |
|---|---:|---|---|
| /filmmaker/services/fpv/ | 200 | noindex,nofollow | Missing |
| /filmmaker/services/editing/ | 200 | noindex, nofollow | Missing |
| /filmmaker/services/colour-grading/ | 200 | noindex, nofollow | Missing |
| /filmmaker/services/dop/ | 200 | None observed | Missing |
| /filmmaker/services/sound-design/ | 200 | None observed | Missing |

Source: fresh uncached live rawHtml retrieval and actual source files, 18 Nov 2026. [Complete indexing diagnosis and proposed controlled solution](LIVE-INDEXING-BLOCKERS-2026-11-18.md).

If FPV, Editing and Colour Grading are intended to attract Google bookings, their deployed noindex directives directly conflict with the goal. **After confirming intent and getting permission**, remove noindex only from these production service pages, retain deliberate noindex on V2/V3 previews, equipment reference and appropriate legacy redirects. Verify raw HTML and Google Search Console. The actual Google indexed status can lag the page instructions.

A second independently checked issue: both public https://bogdanpascal.com/sitemap.xml and https://bogdanpascal.com/robots.txt returned **HTTP 404 on 18 November 2026**, as in prior audit. The build workflow .github/workflows/deploy-pages.yml copies selected root assets and needs deliberate updating to publish new root SEO files. Sitemap aids URL discovery, not guaranteed ranking; lack of robots.txt is not an automatic Google penalty.

**Other highest-value confirmed opportunities:** distinguish active performer identity from parkour coordination, clarify on-set crew roles and proof, reduce approximately 4.7–4.8 MB of thumbnail loading on the initial filmmaker homepage, and remove the current two-tap mobile project-card navigation pattern.

## 1. Final cross-site professional naming and page allocation

These are verified job-title and client-outcome recommendations, not a contest to pick the largest generic keyword.

| Family | Recommended visible professional name | Buyer and real role distinction | Existing URL / report |
|---|---|---|---|
| Athlete | **Parkour Athlete · Stunt Performer · Parkour Coordinator** | Active physical casting, and separately specialist parkour movement design; never imply full Stunt Coordinator status without documented role | /athlete/; [report](ATHLETE-INDUSTRY-NAMES-AND-SEO-RANKED.md) |
| FPV and drone | **FPV Drone Pilot · Aerial Cinematography** | Specialist action fly-through/tracking versus conventional aerial coverage; airspace/flight approvals and personally captured shots matter | /filmmaker/services/fpv/; [report](FPV-DRONE-AERIAL-SEO-RANKED.md) |
| DoP/camera | **Director of Photography (DoP) · Cinematographer**, with **Camera Operator** and **DJI Ronin Gimbal Operator** | Distinguish creative DoP leadership, another DoP's operator, and RS3 Pro specialist; **not** an automatic Steadicam Operator | /filmmaker/services/dop/; [report](CINEMATOGRAPHY-CAMERA-GIMBAL-SEO-RANKED.md) |
| Commercial film | Person: **Freelance Commercial Filmmaker**. Service: **Branded Films & Commercial Video Production** | Agency, production company and brand hires an individual or bounded small crew; do not claim a full production company team | /filmmaker/ and /filmmaker/services/; [report](COMMERCIAL-FILMMAKING-SEO-RANKED.md) |
| Editing | **Commercial Video Editor · Film Editing & Post-Production** | Film/advert picture cut, story, rhythm, platform formats; avoid turning company post credits into personal editor credits | /filmmaker/services/editing/; [report](VIDEO-EDITING-SEO-RANKED.md) |
| Colour | **Film & Commercial Colourist · Colour Grading & Look Development** | Creative grading, shot matching and consistent film look; not generic hair colour correction or unverified mastering services | /filmmaker/services/colour-grading/; [report](COLOUR-GRADING-SEO-RANKED.md) |
| Sound | **Film Sound Designer · Sound Effects & Audio Post-Production** | Film audio, dialogue/effects/ambience, not visual-effects SFX, music composer, Foley stage or production sound mixer by assumption | /filmmaker/services/sound-design/; [report](SOUND-DESIGN-SFX-SEO-RANKED.md) |

**Do not add a separate landing page for each variant.** DoP, Director of Photography and Cinematographer can coexist naturally in one genuine service page. Likewise, American color spelling belongs only in relevant natural text, not duplicated thin pages. The same applies to film editor vs video editor and FPV drone operator vs FPV drone pilot.

**Optional additional skill:** Underwater Camera Operator / Underwater Cinematography is not presently demonstrated by independently verified publicly credited reels or offered scope, so do not market it yet; see [gated screening](ADDITIONAL-VERIFIED-SERVICES-SCREENING.md).

## 2. What the keyword and Trends work actually establishes

Across seven completed UK families, **432 researched query strings** were checked, **306 returning numeric average monthly search-volume estimates**, **126 returning null/unknown**.

| Family | UK keyword strings | Numeric | Unknown |
|---|---:|---:|---:|
| Athlete | 76 | 44 | 32 |
| FPV/drone | 51 | 31 | 20 |
| DoP/camera/gimbal | 61 | 37 | 24 |
| Commercial filmmaking | 57 | 53 | 4 |
| Editing | 61 | 50 | 11 |
| Colour grading | 62 | 39 | 23 |
| Sound design | 64 | 52 | 12 |

Provider: DataForSEO / Google Ads estimated UK English searches/month, monthly history Nov 2025 to Oct 2026; third-party SEO keyword difficulty and automated intent were also collected. Google Trends windows cover 2004-present, five years, twelve months and three months. Google desktop SERP attempts were separately stored. Results commonly contain 8–9 provider-ranked organic items, wrapped Google links, unrelated content or provider failures; **do not claim a certified complete Google top ten or competitor traffic from these snapshots**.

**Demand is not bookings.** Broad high-count phrases (parkour, cinematographer, video editor, colour correction, sound effects) mix informational, software, gaming, job-seeking, education and entertainment intent. Specific hiring phrases have smaller or even unmeasured volumes, yet may match casting directors and production leads far better. Never sum search volumes across likely grouped close variants; never confuse Google Ads advertiser competition, third-party organic difficulty and 0–100 normalized Google Trends indices.

**No current Google Search Console data, indexed status, actual site queries, rankings, qualified leads, or real Lighthouse scores obtained.** That is a verification limit, not a missing-data invitation to invent.

## 3. Implementation backlog by business impact

### P0, immediate upon explicit approval

| Rank | Classification | Proposed change | Objective test and constraint |
|---|---|---|---|
| **1** | BACKEND | Remove verified noindex/nofollow from the **three intended public service landing pages**, only after confirming they should rank | Raw live HTML no longer contains noindex on FPV, Editing and Colour; intentionally unindexed previews/equipment still remain excluded. Confirm GSC indexing eligibility, not instant ranking. |
| **2** | BACKEND | Add absolute self-referencing canonicals to intended indexable pages, including the five service pages, root, athlete, filmmaker, about/contact and 23 generated project pages | Canonical reflects HTTPS bogdanpascal.com and correct URL; legacy on-set remains canonicalized to DoP; correct project-specific canonical remains distinct. |
| **3** | BACKEND | Publish root sitemap.xml of indexable canonical URLs plus optional minimal robots.txt with sitemap reference. Modify deployment copy whitelist to actually ship both. | Live HTTP 200 valid XML, include 23 actual projects, exclude V2/V3, equipment if still intentionally noindex, redirects and fragments. Preserve GitHub Pages CNAME/custom domain. |
| **4** | VISIBLE | Athlete first-screen label expressly includes active Parkour Athlete and Stunt Performer, with a separate Parkour Coordination hire path | Casting director can immediately identify and contact the performer, not mistake him for a retired athlete or only management. Preserve filmic design. |
| **5** | SEARCH / PROOF | Write truthful per-page meta titles/descriptions, adjacent readable service identity and verify exact role attribution | Match an industry hiring search and an actual portfolio case. No hidden keyword bank. Google may rewrite snippets. |

### P1, high-impact UX and credibility

| Rank | Classification | Proposed change |
|---|---|---|
| **6** | PERFORMANCE | Fix filmmaker homepage's eager loading of all **23 tiles (~4.7–4.8 MB initially)** despite lazy image attributes; investigate CSS background overlays and hero layers, use responsive/lazy image variants, compare before/after cold mobile network waterfall. Preserve cinematic grade, texture and motion. |
| **7** | VISIBLE / MOBILE | Make project cards open on first tap, or provide a clearly separated preview control; enlarge functional mobile navigation/contact hit areas. Current audit found tiny ~15–16 px link boxes and 2 taps to open a project. Test on a real phone. |
| **8** | PROOF / CONTENT | Replace generic descriptions on 23 film work pages with concise **personally credited** role + production challenge/outcome, using shared generator filmmaker/_build/build.py and validated source data, not fragile manual edits. Add correctly relevant reciprocal service links. |
| **9** | CLAIM ACCURACY | Preserve: **GeoDomeX is Co-DoP** with Dragos Teglas; **Renais is Director + DoP**; **Mojo Hair credits Bogdan for Colour Grading & Graphics, DoP Simon Rowling**; **Mojo Skincare credits Simon Rowling as DoP, Bogdan personal camera role not verified**; **Ffern and This Is an Ode are spec ads**. Check real FPV shot reel, editing, colour and sound individual roles before presenting their clips as personal examples. |
| **10** | SEARCH / SCHEMA | Unique absolute OG images/title/description/URL and appropriate real Person/ProfilePage, Service, Breadcrumb and (only for eligible visible work) VideoObject structured data, verified against actual credits. Schema is not a ranking guarantee. |
| **11** | MEASUREMENT | Set up/access Google Search Console domain verification, inspect page index status, query impressions/CTR and selected canonicals. Segment UK vs Romania and different booking intents. If analytics is authorized, track privacy-conscious qualified enquiry starts/contacts, not just traffic. |
| **12** | PERFORMANCE | Mobile LCP, INP, CLS and interaction/media audits: equipment expanded ~27.2 MiB of images, Therme ~10.9 MiB, Miki ~10 MiB, RawPot ~8.8 MiB on full scroll. Use derivatives and on-demand full-res loading; **do not delete functional equipment fragments or originals**. Earlier official PageSpeed API returned 429; none of these numbers are Lighthouse scores. |

### P2, after actual site query and booking data

- Improve real IMDb/industry crew directories and legitimate credited case-study links from partners and productions, instead of buying low-quality backlinks or adding 100 thin pages.
- Ensure client-facing geographic availability is true: avoid claims of London residence or a UK studio without verification; historical UK search volume must not be passed off as Romania/global demand.
- Consider new detail URLs **only** for separately booked work with substantial unique proof and distinct client queries, such as a particularly strong parkour coordination case or FPV sequence collection.
- Use short personal-role reels and genuine demonstrations: active athlete showreel, FPV-only operated shots, actual RS3 gimbal sequence, personally edited versions, true grade comparisons, and a sound A/B clip produced by Bogdan.
- Investigate older preview access, deployment safety and equipment indexability separately; noindex is not access control and existing previews must not be deleted casually.

## 4. Proposed search title and page-intent map

| Existing page | Proposed title after review | Client question answered |
|---|---|---|
| / | Preserve clean two-choice personal identity | Is this the athlete or the filmmaker? |
| /athlete/ | Bogdan Pascal \| Parkour Athlete, Stunt Performer & Coordinator | Can I cast or hire him for parkour or specialist movement? |
| /filmmaker/ | Commercial Filmmaker & Cinematographer \| Bogdan Pascal | Is he the right filmmaker and creative operator? |
| /filmmaker/services/ | Commercial Filmmaking, Cinematography & Post \| Bogdan Pascal | Which real production services can he deliver? |
| /filmmaker/services/dop/ | Director of Photography & Cinematographer \| Bogdan Pascal | Can I book him as DoP or camera/gimbal operator? |
| /filmmaker/services/fpv/ | FPV Drone Pilot & Aerial Cinematography \| Bogdan Pascal | Can he operate the camera/drone movement I need? |
| /filmmaker/services/editing/ | Commercial Video Editor & Film Editing \| Bogdan Pascal | Can I hire him to cut and deliver this project? |
| /filmmaker/services/colour-grading/ | Film Colourist & Commercial Colour Grading \| Bogdan Pascal | Can he produce a consistent, cinematic final look? |
| /filmmaker/services/sound-design/ | Film Sound Designer & Audio Post-Production \| Bogdan Pascal | Can he build the sound effects, dialogue and atmosphere? |
| /filmmaker/work/{slug}/ | Project name + verified role + film category (unique) | What exactly did he do and what was the outcome? |

**H1 approach:** Retain artistic/filmic headers such as LIGHT. MOTION. TIMING., THE ART OF THE CUT., COLOUR. WITH INTENT., SOUND IS THE FEELING. Adjacent human-readable crawlable roles can resolve search intent without uglifying the design. Each service's own completed report contains exact proposed intro, search title, description and meaningful keyword clusters.

## 5. Controlled release and approval boundaries

**Release A: indexability and technical foundation.** After owner consent, inspect current main SHA and workflow, stage only intended noindex repairs, canonical tags and sitemap/robots deployment; test output and live code, preserve custom domain, old redirects and noindex previews. No visual redesign required, but it is still a production change requiring approval.

**Release B: role clarity, authentic evidence and conversion.** Present exact visible copy/CTA changes; implement only after approval, with proper performer/coordination branching and 23 project credit verification, no false agency/crew role.

**Release C: mobile/video/photo performance.** Change lazy loading and two-tap card behavior using actual phone/network testing; preserve the same images, color grade and editorial style. Compress delivery variants but retain original masters.

**Release D: empirical iteration.** After GSC and relevant analytics access, compare impressions, search queries, real indexability and qualified enquiries; decide whether extra specialized landing pages or geographic content has proven benefit.

**Deployment QA gate:** valid sitemap/canonical, no accidental noindex on public services, intentional preview noindex intact, unique titles/appropriate descriptions, canonical vs redirect parity, correct asset links and responsive images, credible project-role data, functioning phone navigation/video, and no em dashes in new site copy.

## 6. Evidence confidence and limits

**HIGH:** Actual live noindex HTML on three service pages; missing canonical on five tested pages; two 404 root SEO endpoints; GitHub build copy constraints; current hero/service/credit labels; resource and mobile tap observations from earlier browser audits; professional terms confirmed through industry bodies and real supplier pages.

**MEDIUM:** Potential keyword opportunities. DataForSEO and Google Ads are estimates; organic KD is third-party; intent classification is automated; Google Trends is relative; many provider desktop SERPs were partially returned, noisy or redirect-wrapped rather than a verified literal Google ranking census.

**NOT YET VERIFIED:** Search Console indexed URLs and actual booking conversion, current competing site traffic, phone CWV, future rankings, exact individual roles for some FPV/editing/colour/sound clips, complete jurisdiction-specific drone operation scope, optional underwater professional service.

**All research is strictly documentation. No production HTML, CSS, JS, images, domains, deployment workflows, redirects or public SEO metadata were edited.**

## Link index

- [All research phases and roadmap](RESEARCH-ROADMAP.md), [Verified critical live indexing blockers](LIVE-INDEXING-BLOCKERS-2026-11-18.md).
- Seven finished chapters: [Athlete](ATHLETE-INDUSTRY-NAMES-AND-SEO-RANKED.md), [FPV](FPV-DRONE-AERIAL-SEO-RANKED.md), [DoP/camera](CINEMATOGRAPHY-CAMERA-GIMBAL-SEO-RANKED.md), [Commercial film](COMMERCIAL-FILMMAKING-SEO-RANKED.md), [Editing](VIDEO-EDITING-SEO-RANKED.md), [Colour](COLOUR-GRADING-SEO-RANKED.md), [Sound](SOUND-DESIGN-SFX-SEO-RANKED.md).
- [Unverified optional skills](ADDITIONAL-VERIFIED-SERVICES-SCREENING.md), [Initial overall audit](../OVERALL.md), [Deep live audit](../DEEP-DIVE-2026-11-18.md), [Page-by-page speed evidence](../SPEED-ALL-PAGES.md), [23 project credits](../PROJECT-SEO-ALL-23.md), [Research decision principles](../RESEARCH-DECISION-PRINCIPLES.md).
