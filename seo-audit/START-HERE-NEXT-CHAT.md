# START HERE: Full SEO research handoff for Bogdan Pascal

> **CURRENT UPDATE, 18 NOV 2026:** The work below is the ORIGINAL historical handoff. **Do not follow its now-obsolete “finish ATHLETE next” instruction.** Seven core service-family studies and the whole-site implementation plan have been completed and saved under [the roadmap](keyword-research/RESEARCH-ROADMAP.md). Start from [the final integrated strategy](keyword-research/WHOLE-SITE-SEO-PRIORITIZED-PLAN.md) and [the verified live indexing blockers](keyword-research/LIVE-INDEXING-BLOCKERS-2026-11-18.md). Live FPV, Editing and Colour pages are **noindex,nofollow**; all five service pages lack self canonicals; sitemap and robots.txt return 404. The public website remains **UNMODIFIED**. Obtain approval before production SEO/code/visible changes. Optional underwater skill remains proof-gated.

**Prepared:** 18 November 2026  
**Repo:** https://github.com/pkbannutz/bogdan-pascal-portfolio  
**Research folder:** https://github.com/pkbannutz/bogdan-pascal-portfolio/tree/main/seo-audit  
**Live:** https://bogdanpascal.com/ | https://bogdanpascal.com/athlete/ | https://bogdanpascal.com/filmmaker/  
**Project status (latest):** Seven core research chapters and whole-site plan DONE; **no SEO changes applied to public website**. Remaining old tasks in this historical handoff are superseded.

## 1. Mission and decision-making principles

**READ [RESEARCH-DECISION-PRINCIPLES.md](RESEARCH-DECISION-PRINCIPLES.md) FIRST.** This document is a binding research guide.

The user wants the strongest *real-world* SEO and hiring results, not faithful execution of speculative tactics he suggested while learning SEO. Act as the professional strategist and researcher. Challenge wrong ideas, explain why, and find better alternatives. Research independently and document verified findings. Prefer accurate industry terminology, relevant buyers, qualified booking inquiries, truthful portfolio evidence, technical performance and sensible on-page SEO rather than keyword stuffing or vanity traffic.

**Crucial meaning of "best names for my services":** names casting directors, producers, brands and film crews *actually recognize and use*, separate from supportive query synonyms. The user initially guessed broad high-volume keywords could live secretly in the "backend." Google does not use meta-keywords for ranking. Important terms belong naturally in relevant page content, semantic headings, linked case studies and accurate technical metadata. Technical SEO is a complementary layer, not a hidden ranking keyword bank.

Two career areas on one personal domain:
- **Active athlete:** Parkour athlete, freerunner, acrobat, stunt performer, parkour/movement coordinator, action-performance and live-show work. Never position him as retired, solely an administrator, or merely a director. Only promote roles supported by evidence and appropriate professional permissions.
- **Filmmaker:** Commercial DoP/cinematographer, camera/gimbal/Ronin operator, FPV/drone cinematographer, editor, colourist, sound designer and related skills where proven. Five major filmmaking service pages, plus 23 work-project pages.

## 2. Research chronology. Read it in this order

### Stage A: Initial 10-pass source-code audit and site architecture
Read [README.md](README.md), [OVERALL.md](OVERALL.md), [ATHLETE.md](ATHLETE.md), [FILMMAKER.md](FILMMAKER.md), [CHECKLIST.md](CHECKLIST.md).

Decision: Keep one `bogdanpascal.com` brand with distinct optimized `/athlete/` and `/filmmaker/` landing pages. Identified missing canonical tags, sitemap/build deployment issue, weak filmmaker home H1/metadata and generic project snippets. No changes implemented.

### Stage B: Second 10-angle deep dive and live crawl
Read [DEEP-DIVE-2026-11-18.md](DEEP-DIVE-2026-11-18.md).

A bounded live crawl returned HTTP 200 for 35/35 production pages. `/robots.txt` and `/sitemap.xml` returned 404. Filmmaker home fetched all 23 card JPGs on initial inspection (~4.7 MB image payload), with likely background-image eager-loading interaction. Mobile filmmaking cards require a first tap to preview, then another to navigate. Touch targets are small and "See the work" disappears on narrow screens. No actual Lighthouse/CrUX score was established.

### Stage C: Every production page, service and hidden-file audit
Read [SPEED-ALL-PAGES.md](SPEED-ALL-PAGES.md), [SERVICE-SEO-DETAIL.md](SERVICE-SEO-DETAIL.md), [PROJECT-SEO-ALL-23.md](PROJECT-SEO-ALL-23.md), [HIDDEN-ROUTES-AND-CLEANUP.md](HIDDEN-ROUTES-AND-CLEANUP.md).

Measured image-resource weights at load and after full scrolling for all **35 content pages** and all **23 project galleries**; tested two functional equipment HTML expansion fragments and inventoried legacy redirect/hidden pages. V2/V3 design previews deliberately excluded from content/performance scoring. Expanded equipment about **27.2 MiB images**, athlete about **13.5 to 14.5 MiB**, Therme gallery about **10.9 MiB**, Miki about **10.0 MiB**, RawPot about **8.8 MiB**, plus other heavier galleries. These are resource measurements, **not Lighthouse scores**; video/audio playback, true mobile Web Vitals, traffic and conversions unmeasured. PageSpeed API attempt returned 429 quota.

Some film roles need precise attribution: e.g. co-DoP versus sole DoP, director + DoP versus colour/graphics. Do not invent or misrepresent credits. Active equipment HTML fragments must NOT be deleted as unused. V2/V3 are small source previews and do not slow users merely by existing.

### Stage D: Competitor keyword map and initial ranked web discovery
Read [COMPETITOR-KEYWORDS.md](COMPETITOR-KEYWORDS.md), [COMPETITORS-ALL-30.md](COMPETITORS-ALL-30.md), [COMPETITORS-ALL-30.csv](COMPETITORS-ALL-30.csv) and [COMPETITORS-GOOGLE-VERIFIED.md](COMPETITORS-GOOGLE-VERIFIED.md).

30 search categories, 10 URLs/category = **300 web-discovery search listings**, **274 unique URLs**, **189 hostnames**. WARNING: Most listings are **ranked generic web discovery**, NOT validated exact Google top-ten organic positions. The partial Google SERP checks contain unresolved redirect-wrapped URLs. Never claim verified Google rankings for all listings.

### Stage E: Service-menu extraction and expanded keyword taxonomy
Read [USER-SERVICES-KEYWORDS.md](USER-SERVICES-KEYWORDS.md), [MASTER-SERVICE-KEYWORDS.md](MASTER-SERVICE-KEYWORDS.md), [MASTER-SERVICE-KEYWORDS.csv](MASTER-SERVICE-KEYWORDS.csv), [COMPETITOR-SERVICES-BY-SITE.md](COMPETITOR-SERVICES-BY-SITE.md), [COMPETITOR-EXPANSION-UNVERIFIED.md](COMPETITOR-EXPANSION-UNVERIFIED.md), [COMPETITOR-ALL-OBSERVED-LINKS.csv](COMPETITOR-ALL-OBSERVED-LINKS.csv).

Inspected **274 unique URLs**: 248 responded HTTP 200; 26 failed, blocked or unavailable. Revisited 37 sites with particularly large menus. Identified **30 portfolio-aligned research categories + 61 competitor-evidenced additional categories = 91**, with 5 related phrases each: **455 variants / 546 primary-plus-variant entries** (545 distinct strings after exact dedup). An additional 39 candidate categories remain unverified. **NOT 91 verified personal services!** Some original categories are adjacent or credential-dependent; competitor-only offerings must not automatically be advertised by Bogdan.

### Stage F: First actual quantitative keyword study, ATHLETE
Read [keyword-research/ATHLETE-RESEARCH-STATUS.md](keyword-research/ATHLETE-RESEARCH-STATUS.md) then inspect these RAW evidence files:
- `keyword-research/athlete-data-raw-2026-11-18.json`: DataForSEO UK Google Ads approximate monthly volume, difficulty and intent across 76 phrases; Trends 5 years/12 months, related queries.
- `keyword-research/athlete-discovery-and-long-trends-2026-11-18.json`: Trends since 2004 and last 3 months; keyword-ideas request failed with HTTP 502.
- `keyword-research/athlete-google-serp-2026-11-18.json`: 10 UK desktop Google SERP query attempts; 9 queries returned 9 organic items, 1 returned no usable items; not a complete top-ten census.
- `keyword-research/ATHLETE-KEYWORD-METRICS-76.csv`: available compact tabular keyword metrics; verify against raw source when in doubt.

**76 athlete query phrases checked**: 44 non-null monthly-volume estimates, 32 null (UNKNOWN, not zero). Examples UK estimated average searches/month: `parkour` 18,100; `professional acrobat` 1,600; `freerunning` and `freerunner` each 390 (possibly grouped close variants, do not add); `stunt performer` 170; `stunt coordinator` 110; `movement director` 90; `parkour athlete` 40; `parkour performer` 10. Broad high-volume parkour queries are primarily informational, whereas very low-volume specific "for hire" phrases can signal strong buyer intent. Keyword difficulty model scores, paid ad competition and Trends indices are distinct data types.

**ATHLETE RESEARCH IS ONLY PARTIALLY COMPLETE.** Raw numbers and SERP snapshots have been gathered; no final defensible role-name rankings, complete buyer-intent study, site copy/metadata plans or family-completion document has yet been published.

## 3. Historical exact next task (NOW COMPLETED; consult current update above)

**Finish ATHLETE first.** User specifically switched initial order from FPV to athlete because that page is closest to ready.

1. Directly inspect `athlete/index.html` and the stage F evidence, not just this summary. Current hero roles are `PARKOUR COORDINATOR · STUNT PERFORMER · MOVEMENT DIRECTOR`, H1 `BOGDAN PASCAL.`; it needs to preserve visibility as a **currently active performer/acrobat/freerunner**.
2. Compare truly **industry-standard booking titles** with synonyms and wider audience phrases. Make a reasoned, prioritized list of what the visible site should *call the services* versus what related phrases should support each page.
3. Synthesize demand and professional buyer fit from UK Google Ads monthly search estimates, organic difficulty, search intent, historical Trends (since 2004), 5-year durable changes, recent 12- and 3-month shifts, seasonality and current relevant Google search results. Validate unresolved SERPs only as needed; do not invent.
4. Examine relevant actual ranked competitor pages and accurately distinguish casting directories, agencies, individuals, informational pages and ads. Rank naming/SEO opportunities by truthful service fit and qualified hiring potential, not just raw volume.
5. Produce exact **visitor-facing** role names and example copy, plus matching **SEARCH/BACKEND** SEO title/meta/H1/H2/canonical/schema/internal-link/content proposals, with benefits/confidence and no keyword stuffing.
6. Save complete results to `seo-audit/keyword-research/ATHLETE-INDUSTRY-NAMES-AND-SEO-RANKED.md`. Include provenance, geographic scope, date, uncertainty, options rejected and why. Update `keyword-research/RESEARCH-ROADMAP.md` as DONE only if acceptance criteria truly met.
7. **Do not edit the public site** during this research phase. The user approves visible/production changes separately.

**After athlete is complete**, proceed *one family at a time*: FPV/drone/aerial; DoP/cinematography/camera/gimbal/Ronin; commercial filmmaking/production; editing; colour grading; sound design/SFX; remaining verified relevant skills. Each family needs its own fully documented, ranked recommendation and evidence before moving on. See [keyword-research/RESEARCH-ROADMAP.md](keyword-research/RESEARCH-ROADMAP.md).

## 4. Research priorities and caveats

Use **actual buyer language**, search intent, accurate professional scope and service demand to decide the visitor-facing title. Google Trends is a normalized *relative* index, NOT a count of searches. Compare all-time (since 2004) for background, **5 years** for structural trends/seasonality, **12 months** for recent trajectory and **3 months** for emerging changes. Google Ads search volumes are estimates and may group close variants. Paid-ad competition is NOT organic keyword difficulty. Sparse or null data does not prove no opportunity. Competitor success depends on authority, content, links, intent fit and many factors, not simply keyword repetition.

Prioritize site-wide consistency, client trust, direct hiring CTAs and speed wherever these matter more than another synonym. Be the user's researcher and strategist, not merely a copyist of the user's imagined SEO mechanics. Challenge mistakes, propose superior methods, explain decisions in short approachable language.

**No invented numbers, rankings, credentials or personal services. No bulk editing of the live website. No automatic site redesign. No deleting live previews/fragments. No em dashes in site copy.**

## 5. Practical notes for continuing AI

Research and documentation writes in this GitHub folder are authorized; nontrivial production website modifications, purchases, credential changes and destructive operations require express user permission. Keep chat responses concise, link detailed reports. Record DONE / PARTIAL / BLOCKED, confidence and source date. Avoid duplicate large research calls unless actually necessary. Preserve all documented caveats.

**Paste-ready next conversation instruction:** [NEXT-CHAT-PROMPT.md](NEXT-CHAT-PROMPT.md).
