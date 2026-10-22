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

## Editing

- Main site and data: `index.html`
- Filmography: `const credits = [...] ` near the end of the HTML
- Brand wordmarks: `const logos = [...] `
- Skill list: `const skills = [...] `
- Contact email: `hello@bogdanpascal.com`

## Contact

hello@bogdanpascal.com
