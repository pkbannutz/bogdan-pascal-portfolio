# Athlete SEO: bogdanpascal.com/athlete/

**Scope:** Parkour athlete, freerunner, acrobat, stunt performer, parkour coordinator, movement director.  
**Status:** Audit only, nothing changed on the published site.  
**Page inspected:** `athlete/index.html`.

## Findings in current code

### Strengths (already present)
- Distinct directory and a dedicated URL that Google can understand as its own search landing page.
- One semantic H1 (`Bogdan Pascal.`) and a focused title: `Bogdan Pascal | Parkour Coordinator · Stunt Performer · Movement Director`.
- Current description: `Bogdan Pascal, parkour coordinator, stunt performer and movement director. Specialist action choreography, performer networks and camera-led movement for film, TV, commercials and live production.`
- Film, live-show and performance credits with reel, social and industry links; strong first-hand evidence for a professional portfolio.
- Sampled images have alt attributes. Some deliberately empty `alt=""` attributes can be correct for purely decorative images.
- Structured body copy and many relevant sections.

### Improvement opportunities
1. **Search intent mismatch:** Title/description emphasize coordination but do not clearly say active `parkour athlete`, `freerunner` or `acrobat`. That can be a discoverability and booking-message gap for productions hiring an on-camera performer, not only a coordinator.
2. **Headings:** The H1 is the name only. This is not automatically wrong, but the immediately adjacent readable intro should explicitly communicate the working roles, not merely the identity.
3. **Metadata:** No self-canonical or schema JSON-LD found; no `og:image` tag found in inspected athlete HTML. Common infrastructure fixes belong in OVERALL.
4. **Cross-career discovery:** No href to `/filmmaker/` found in the athlete page's anchor links. At least one contextual filmmaking crossover could help viewers who need movement-led camera work, but should not distract from athlete hireability.
5. **Performance:** The athlete HTML file itself is roughly 122 KB and includes substantial embedded CSS/content. That is not proof of poor real-world speed. Measure mobile LCP/CLS first, then decide whether styles or hero assets should be optimized.
6. **Search evidence gap:** Cannot tell from repo whether Google indexes the athlete page or which performer keywords generate impressions. Search Console needed.

## Action list

### BACKEND + SEARCH, no planned visual changes
- [ ] **A01 P0 | SEARCH** Rewrite the athlete page title to combine active performer identity with stunt work, without stuffing every job label. Candidate: `Bogdan Pascal | Parkour Athlete & Stunt Performer`.
- [ ] **A02 P0 | SEARCH** Rewrite the meta description to mention `professional parkour athlete`, `freerunner`, `stunt performer`, and international production credits, while reflecting only verified role credits.
- [ ] **A03 P0 | BACKEND** Add self-referencing canonical `https://bogdanpascal.com/athlete/`.
- [ ] **A04 P1 | SEARCH** Add a suitable absolute athlete share image (`og:image`), `og:title` and `og:description`. Test mobile messaging preview.
- [ ] **A05 P1 | BACKEND** Add validated Person/ProfilePage structured data with truthful name, occupation, links to your IMDb/social profiles and only demonstrable credits. Avoid claiming unsupported award wins.
- [ ] **A06 P2 | BACKEND** Review semantic heading structure and image descriptions. Preserve blank alt for decorative assets; improve descriptive alt for evidence/hero photographs where it adds useful context.
- [ ] **A07 P1 | BACKEND** Test actual page weight and film/reel/image lazy loading, hero image priority, contrast and layout on an average mobile connection.
- [ ] **A08 P1 | VERIFY DATA** Filter Search Console by Page = `/athlete/`; inspect `parkour athlete`, `freerunning`, `stunt performer`, `acrobat`, `movement director`, `parkour coordinator`, and name-based queries. Do not invent search volumes or ranking positions.

### VISIBLE proposals, require review before applying
- [ ] **A09 P0 | VISIBLE** In the first readable paragraph, call yourself a **currently active parkour athlete, freerunner/acrobat and stunt performer**, then describe coordinating/movement-direction work. This is a positioning adjustment, **not** a change to your real credits or visual style.
- [ ] **A10 P1 | VISIBLE** Give casting/stunt teams an unambiguous performer hiring action (for example, `Book as Athlete / Performer`) alongside `Parkour Coordination`, if the existing contact section can accommodate it without clutter.
- [ ] **A11 P1 | VISIBLE** Keep a sharp showreel and evidence-led credits with accurate descriptions of what you did on Wicked, Cinderella, Jingle Jangle and live shows. Link relevant, authoritative proofs when permitted.
- [ ] **A12 P2 | VISIBLE** Add one low-friction link to the filmmaker portfolio, framed as `Movement-led cinematography` or similar, rather than a prominent second competing hero CTA.
- [ ] **A13 P2 | VISIBLE** If casting teams search for physical abilities, ensure performer skills, acrobatics, parkour, camera work, availability and current physical specs remain easy to find and accessible from mobile.
- [ ] **A14 P2 | VISIBLE** Consider brief, specific evidence-led capability paragraphs (parkour performance, action choreography, live shows and camera-specific stunts), rather than long generic copy or keyword lists.

## Proposed search-result example (not applied)

**Title**  
`Bogdan Pascal | Parkour Athlete & Stunt Performer`

**Description**  
`Bogdan Pascal is a professional parkour athlete, freerunner and stunt performer with credits including Wicked, Cinderella and Jingle Jangle. Available for international productions.`

These are candidate metadata only. Google may rewrite snippets.

## Preserving the user-facing design
- Keep photography, existing reel, featured-credit treatment and visual hierarchy.
- A canonical, metadata, JSON-LD and alt-text pass can be done without adding visible panels.
- A09 through A14 **do change what people read or click** and should be approved after copy and placement are shown.
- Do not describe Bogdan as a former athlete, or market solely as coordinator/director if performer jobs are still a primary goal.
- Do not add unverified stunt credits, titles, qualifications or dates.

## Completion criteria
1. Google Search Console URL Inspection confirms indexability and expected canonical for `/athlete/`.
2. Mobile preview of the site remains visually correct.
3. Google results can distinguish this landing page from the filmmaker page by role and content.
4. Relevant casting/contact engagement is measurable with consent-aware tracking if enabled.
5. No false claims or keyword-stuffed copy.
