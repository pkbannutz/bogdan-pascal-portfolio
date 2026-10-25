# Bogdan Pascal | Parkour & Stunts

Personal portfolio website for Bogdan Pascal. Inspired by the clean, monochrome editorial direction of the separately maintained Chima Akenzua portfolio.

## Preview

This is a standalone static site. Open `index.html` in a browser, or deploy the repository using GitHub Pages (Settings → Pages → Deploy from a branch → main / root).

## Features

- Responsive mobile/desktop layouts
- Light default on desktop, dark default on mobile, manual preference persists
- Your official BP logos, light/dark branding and four original professional photographs
- Searchable, category-filtered credits
- Scrolling selected brand/production wordmarks
- Movement skills and booking section
- Direct IMDb and social links
- No build tools or dependencies required
- Honors reduced-motion accessibility preferences

## Source notes

The career facts and credits are adapted from the user's 10-page Canva portfolio and IMDb profile. Some dates in the Canva PDF are historical, so dates are omitted where unverified. Brand wordmarks are **typographic treatments**, not official logo assets. The moving list represents brands/productions associated with the portfolio, not necessarily direct contracts with every named entity.

The hero photograph, portrait, Ninja Warrior image and Romania's Got Talent group image are the original user-supplied photos, permanently stored in `assets/` (not hotlinked to temporary media URLs). The showreel section links to YouTube until a direct, reliable video source can be added. No stock footage has been substituted.

## Editorial rules (must follow for all future site edits)

- **Never use em dashes in website text.** Unicode `U+2014` is forbidden in headings, paragraphs, credits, metadata, image alt text, buttons, placeholder labels, and JavaScript-generated text. Use a period, comma, colon, slash, or parentheses instead. Do not use it as a placeholder for unknown dates; leave unknown years blank. The GitHub Pages workflow checks this automatically.
- **Put Bogdan's movement work first.** For each film, documentary, music video, commercial, and live performance, highlight his specific, factual parkour, freerunning, stunt, acrobatic, dance, or other movement involvement. Avoid generic descriptions such as "featured story" when the role can be described accurately. In particular, `13 Shades of Romanian` features his personal parkour beginnings and movement journey as one of the 13 primary documentary stories.
- **Keep the public-facing tone positive and achievement-focused.** Describe the interesting movement work, teamwork, performances, recognition and growth in an affirmative, professional way. Do not insert negative opinions, criticism of productions or people, or defensive disclaimers into website copy. Keep claims accurate and source-supported; never imply individual awards or specific scenes without evidence. Credit OK WorldWide as Bogdan's team for Britain's Got Talent, Romania's Got Talent and Tú Sí Que Vales.
- **Keep awards accurately attributed.** A production's wins or nominations are not necessarily individual awards for Bogdan. Preserve his explicitly credited SAG stunt-ensemble nomination separately.

## Editing

- Main site and data: `index.html`
- Filmography: `const credits = [...] ` near the end of the HTML
- Brand wordmarks: `const logos = [...] `
- Skill list: `const skills = [...] `
- Contact email: `hello@bogdanpascal.com`

## Contact

hello@bogdanpascal.com
