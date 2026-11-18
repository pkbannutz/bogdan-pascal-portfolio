# BogdanPascal.com: Website SEO, indexing, analytics and privacy setup log

**Record date:** 18 November 2026  
**Type:** Internal project handoff and operational history  
**Website:** https://bogdanpascal.com/  
**Repository:** https://github.com/pkbannutz/bogdan-pascal-portfolio  
**Status:** Core connections and public tracking are installed. Indexing continues to develop over time.

> **Important:** This document is in the GitHub repository but NOT included in the GitHub Pages website. The repository itself is PUBLIC, so anybody browsing its GitHub files can read this document. Do not add passwords, API tokens, verification TXT values, or personal credentials. These records describe setup as of 18 November 2026 and are not live monitoring.

## 1. Quick reference: what is connected?

| System | Setup or current state | Where to open |
| --- | --- | --- |
| Website | Live on custom domain, published from GitHub Actions | https://bogdanpascal.com/ |
| Source and changes | GitHub repo, PRs merged into `main` | https://github.com/pkbannutz/bogdan-pascal-portfolio |
| Search Console | Domain property verified; selected inside OpenSEO | https://search.google.com/search-console/ |
| Google sitemap | Generated and deployed automatically; **36 published public URLs** after the privacy-page addition | https://bogdanpascal.com/sitemap.xml |
| Robots instructions | Present; allows crawling and points to sitemap | https://bogdanpascal.com/robots.txt |
| GA4 | Connected, receiving at least a test visit, with custom interaction events | https://analytics.google.com/ |
| OpenSEO | Project connected to both Search Console and GA4 | https://app.openseo.so/p/e1f98904-1b3a-4e68-8ae2-f6b3cbdcf8fc |
| Microsoft Clarity | Installed with separate consent; first recordings observed | https://clarity.microsoft.com/projects/view/zfp1d5boaq/dashboard |
| Clarity plus GA4 | User verified **Connected** and **Active** in Clarity Settings | https://clarity.microsoft.com/projects/view/zfp1d5boaq/settings#setup |
| Privacy policy | Published on our own domain and linked in the original site footers | https://bogdanpascal.com/privacy/ |

### IDs and names to keep together

| Item | Value or note |
| --- | --- |
| Public domain | `bogdanpascal.com` |
| GitHub owner/repo | `pkbannutz/bogdan-pascal-portfolio` |
| Primary website Google connection | `hello@bogdanpascal.com` |
| Search Console property | `sc-domain:bogdanpascal.com` |
| GA4 account display name | `pkbannutz` |
| GA4 account ID | `130547458` |
| GA4 property name | `Bogdan Pascal Portfolio` |
| GA4 property ID | `565047122` (API form: `properties/565047122`) |
| GA4 web stream name | `Bogdan Pascal Website` |
| GA4 stream ID | `16367205609` |
| GA4 measurement ID | `G-X789N5N0QX` |
| Clarity project | `Bogdan Pascal Portfolio` |
| Clarity project ID | `zfp1d5boaq` |
| OpenSEO project | `Bogdan Pascal Portfolio` |
| OpenSEO project ID | `e1f98904-1b3a-4e68-8ae2-f6b3cbdcf8fc` |
| OpenSEO research market | UK, English, location code `2826` |

These identifiers are for selecting the correct properties, not authentication secrets. The actual account login and any tokens must be kept private.

## 2. How the website and domain are organized

1. The earlier site used Wix. The domain's DNS was still managed through Wix during this setup, but the **live portfolio website is served from GitHub Pages**, not hosted on Wix.
2. The main public site consists of the split homepage `/`, the active athlete portfolio `/athlete/`, the filmmaker portfolio `/filmmaker/`, service and work pages, equipment, and the new privacy page.
3. The publication method uses **GitHub Actions**, not GitHub Pages' older "Deploy from a branch" method. Website edits still happen through branches, commits and pull requests. Once merged into `main`, the Action automatically prepares and publishes the site.
4. GitHub workflow source: [deploy-pages.yml](../../.github/workflows/deploy-pages.yml). It copies the root homepage, `robots.txt`, `CNAME` if present, `assets/`, `athlete/`, `filmmaker/`, and `privacy/` into a temporary `_site/` publication directory. It does **not** copy `seo-audit/`, this operational log, or other research documents.
5. The GitHub workflow also checks that website content contains **no em dashes**, validates GA4/Clarity event and consent scripts, builds the sitemap, injects analytics into public pages, adds privacy links inside existing footers, and deploys to Pages.
6. Source files stay editable in GitHub. An older section of the repository's README had described branch-based Pages deployment; the working deployment workflow is the current source of truth.

**Do not confuse:** A repository Markdown file that GitHub displays publicly is not automatically a published website page. Conversely, a page in the `privacy/` directory is deliberately copied and therefore appears on the website.

## 3. Search Console verification and indexing history

### 3.1 Initial Google Search Console setup

- We set up and verified the **Domain property** `bogdanpascal.com` in Google Search Console using a DNS TXT verification record at the DNS provider. The exact verification token is intentionally not repeated here.
- There were different Google logins in use. Search Console was initially verified through one account; we added `hello@bogdanpascal.com` as a **Full user** under Search Console's **Settings > Users and permissions**, allowing OpenSEO to access the correct property from that connected Google account.
- The other property initially visible to OpenSEO, `sc-domain:ancapascal.com`, is a separate domain and **not** this website. Be careful not to select it by mistake.
- Search Console's property selector should be `sc-domain:bogdanpascal.com`, not the old Wix URL-prefix property or a different person's domain.

### 3.2 Sitemap and robots.txt

- At the start, a current sitemap at `https://bogdanpascal.com/sitemap.xml` was missing or returned 404 in previous technical SEO checks.
- We implemented a generated XML sitemap and a root `robots.txt` file, and made the GitHub Actions deployment include them automatically.
- `robots.txt` currently has `User-agent: *`, `Allow: /`, and a `Sitemap: https://bogdanpascal.com/sitemap.xml` directive. The file is source-controlled at [robots.txt](../../robots.txt).
- Sitemap generator: [generate_sitemap.py](../../.github/scripts/generate_sitemap.py). It selects actual public `index.html` routes, excludes explicit noindex/redirect pages, V2/V3 preview routes, and the `/filmmaker/services/on-set/` route. Equipment **is included**. It checks that required public routes are present.
- We submitted `https://bogdanpascal.com/sitemap.xml` in Search Console. The user saw **Success** and **35 URLs discovered** on 18 November.
- Later, adding `https://bogdanpascal.com/privacy/` increased the production sitemap to **36 URLs**. The automated privacy build test confirmed 36 pages. Search Console may still display 35 until Google reads the updated sitemap again. No second sitemap configuration is required.
- An older Wix sitemap (`https://www.bogdanpascal.com/sitemap.xml`) existed in Search Console from a historical submission in 2018. It showed zero URLs. That historical entry is not the current generated sitemap and can be removed from the Search Console sitemap list if desired.
- A sitemap is a discovery list of URLs, **not a graphical spider web** and not a guarantee of indexing or ranking. It should update automatically when public pages are added or removed and a GitHub Pages deployment succeeds.

### 3.3 Indexing request and status changes

**Historical first inspection:** Google had successfully crawled the homepage on 13 November, but its Search Console state was **Crawled, currently not indexed**. A live URL test said the homepage was available to Google. The user then clicked **Request Indexing**, and Search Console acknowledged that the URL was added to the crawl queue.

**Latest API recheck on 18 November 2026 through OpenSEO:**

| URL | Google Search Console state | Interpretation |
| --- | --- | --- |
| `https://bogdanpascal.com/` | **Submitted and indexed**; verdict PASS | Homepage indexing has succeeded; Google selected the correct homepage canonical |
| `https://bogdanpascal.com/athlete/` | **URL is unknown to Google** | Do not interpret this as a crawl ban; revisit in Search Console after further discovery |
| `https://bogdanpascal.com/filmmaker/` | **Discovered, currently not indexed** | Google knows the URL but had not indexed it at this check |
| `https://bogdanpascal.com/privacy/` | **URL is unknown to Google** | Newly published page; indexing status expected to lag |

The homepage's most recent reported Google crawl was **18 November 2026 at 13:13:02 UTC**; it was fetched successfully as a mobile crawler, with crawling and indexing allowed, and `https://bogdanpascal.com/` selected as Google canonical. These are point-in-time observations, not permanent states.

**Search performance data:** The OpenSEO read of the connected Search Console property for 19 October to 15 November 2026 returned **zero daily performance rows**. The property was newly configured, and Google search impressions/clicks have not yet populated in that historical window. Zero historical data does not mean the website is malfunctioning.

**Next checks:** Revisit Search Console Pages and inspect the athlete/filmmaker URLs after Google has time to process the sitemap. Check whether page-specific robots/canonical directives are correct. Avoid repeatedly requesting the homepage; it is now indexed. The older research notes in `seo-audit/` contain historical 404 and noindex snapshots from earlier on 18 November and are **not necessarily current** after later site changes.

## 4. Google Analytics 4: account, installation and tests

1. Opened Google Analytics and found an existing Analytics account named `pkbannutz` with no GA4 property.
2. Created a **new property** named `Bogdan Pascal Portfolio`, not a second Analytics account.
3. Created a **Web** data stream for `https://bogdanpascal.com` named `Bogdan Pascal Website`. Enabled Enhanced measurement, including page views, scrolling, outbound clicks and other supported events.
4. Google briefly displayed a tag setup snippet referencing `GTM-PMJMPSJ6`. We did **not** copy this snippet or add a second independent tag. We used the actual GA4 measurement ID `G-X789N5N0QX` taken from the Web stream details.
5. Implemented Google tracking through the GitHub site with consent. Code: [analytics-consent.js](../../assets/analytics-consent.js). It is injected only into sitemap-listed public pages through [inject_analytics.py](../../.github/scripts/inject_analytics.py).
6. On the Analytics homepage, the user saw **one active visitor in the last 30 minutes**, located in the Netherlands, after visiting the site. This is evidence that GA4 was receiving visitor data. The normal historical report initially showed zeros because it had just been created.
7. Optional Google Analytics is consent-gated. The website does not intentionally load the GA4 script for users who have not accepted its option.

**How to view:** [Google Analytics](https://analytics.google.com/) > the `Bogdan Pascal Portfolio` property > **Reports > Realtime** for a quick visit test. Use reports and Explorations for aggregated engagement and navigation patterns. Historical data may take time to populate.

## 5. Custom GA4 interaction tracking

We added [analytics-events.js](../../assets/analytics-events.js) so the website measures useful interactions beyond basic page views. Tracking is sent only if GA4 consent is accepted.

| Event or class | What it represents |
| --- | --- |
| `page_view`, enhanced `scroll`, outbound `click`, `file_download` | Supported automatic GA4 events |
| `contact_click` | Click on an email or telephone link, not proof a message was sent |
| `contact_page_click` | Navigation to the portfolio contact page |
| `service_click` | Navigation to an internal filmmaker service page |
| `project_click` | Navigation to a film project page |
| `internal_link_click` | Other internal navigation |
| `social_or_video_link_click` | Click to Instagram, YouTube, TikTok, IMDb, Vimeo, etc. |
| `external_link_click` | Other outbound links |
| `interface_click` | Buttons, menus, tabs, theme toggles and similar controls |
| `scroll_depth` | First reach of 25%, 50%, 75%, or 90% scroll depth on a page |
| `section_view` | A named page section becomes visible |
| `native_video_play`, `native_video_complete` | Native HTML video playback milestones when supported |
| `form_submit_attempt` | A form submit attempt, **not** a confirmed lead |
| `generate_lead` | Reserved for explicit confirmed successful form submission |

**Important limits:** The current public contact areas primarily use `mailto:` links, not an enquiry form with server-confirmed submission. `contact_click` measures contact **intent**, not a booking or an email actually sent. The `generate_lead` success hook is prepared for future forms but is **not** proof that a real lead happened. Embedded YouTube tracking is subject to the embed's own compatibility. The custom code avoids sending form text, full email addresses or link query strings as event parameters.

### Four GA4 custom dimensions, created manually in the UI

The user created all four dimensions and confirmed them in a screenshot. OpenSEO later verified exactly **4 event-scoped custom dimensions** with zero reported setup issues:

| GA4 display name | Scope | Event parameter | Purpose |
| --- | --- | --- | --- |
| Destination path | Event | `destination_path` | Which project, service or internal URL was clicked |
| Click area | Event | `click_area` | Header, navigation, portfolio, footer, etc. |
| Section ID | Event | `section_id` | Which named section was viewed |
| Page group | Event | `page_group` | Athlete, filmmaker, service, equipment, etc. |

They are configured **once for the whole GA4 property**, not once per website page. GA4 may take roughly 24 to 48 hours to surface new custom dimensions in detailed reports. Access via **GA4 > Admin > Data display > Custom definitions**.

For detailed reporting, build an **Explore > Free-form** or Path Exploration using Event name, Destination path, Page group, and Event count. GA4 does not automatically create a complete custom reporting dashboard just because dimensions are defined.

**Key event caution:** At the final OpenSEO check, GA4 had three configured key-event names: `purchase`, `qualify_lead`, and `close_convert_lead`. These are configuration entries, **not proof of sales or actual bookings**. The custom `contact_click` event had not yet been expressly marked as a key event. If added later, label it as contact-link intent, not confirmed leads.

## 6. OpenSEO connection and what it can see

- OpenSEO project created: **Bogdan Pascal Portfolio**, domain `bogdanpascal.com`, market UK, language English.
- Project dashboard: https://app.openseo.so/p/e1f98904-1b3a-4e68-8ae2-f6b3cbdcf8fc
- Integrations: https://app.openseo.so/p/e1f98904-1b3a-4e68-8ae2-f6b3cbdcf8fc/settings/integrations
- Connected the Google account `hello@bogdanpascal.com` to OpenSEO.
- **Search Console:** explicitly selected `sc-domain:bogdanpascal.com` (Full user). Another domain named `ancapascal.com` was visible but is unrelated and must not be selected.
- **Google Analytics:** explicitly selected GA4 property `Bogdan Pascal Portfolio` / `properties/565047122` associated with the Analytics account named `pkbannutz`.
- Tested both connections using OpenSEO's read-only tools. GSC returned empty recent performance rows because the property was new; GA4 organic overview was also empty early in setup. The tools worked without connection errors.
- OpenSEO's measurement health check verified the Web stream and all four custom dimensions. No setup issues were reported.
- These connection and measurement-health reads did **not** use OpenSEO's paid research credits. The account had previously shown 500 research credits; the setup work did not intentionally spend them.
- OpenSEO is the useful hub for search performance and supported GA4 analysis. It does **not** automatically provide all custom GA4 event drill-downs or Microsoft Clarity session replays.

## 7. Microsoft Clarity: heatmaps and session replays

1. Created the free Microsoft Clarity website project **Bogdan Pascal Portfolio** for `https://bogdanpascal.com`, choosing **Entertainment** as the website industry.
2. Project ID is `zfp1d5boaq`, visible in the Clarity URL. We installed Clarity from GitHub, not by pasting code into Wix or individual pages.
3. Modified [analytics-consent.js](../../assets/analytics-consent.js) so GA4 and Clarity have **independent optional consent**. An earlier GA4 "yes" is not interpreted as a Clarity "yes". New visitors can choose either, both or neither.
4. The Clarity loading code uses the service's consent V2 call with analytics storage granted only when accepted and advertising storage denied. Input fields, forms and editable areas are flagged for masking before the tag is loaded.
5. The visitor can reopen **Privacy choices** and withdraw permission; the website reloads when a previously allowed service is revoked.
6. GitHub Actions consent and privacy tests passed before the Clarity change was merged. Clarity's **Live users** tile showed **1** shortly after the new deployment. The user subsequently saw **2 actual recordings**, confirming replay data was arriving.
7. Clarity was initially configured with **Strict** masking as a privacy-first starting point. Later we recommended **Balanced** for this public portfolio, because it makes otherwise public page content visible in replays while retaining masking of sensitive inputs. **The user's final selected masking mode has not been independently verified in the chat.** Check **Clarity > Settings > Masking**.
8. In Clarity Settings > Setup, the user showed the **Google Analytics integration as Connected and Active**, connected to `https://bogdanpascal.com`. No further action is required for that connection.

**A replay is not a webcam or full-screen video.** Clarity reconstructs clicks, scrolls, pointer movement and page interactions. Recordings and heatmaps are held by Microsoft's Clarity service, **not in GitHub or OpenSEO**. Normal recordings have a limited retention window, commonly around 30 days; exceptions and aggregate retention rules are provider-specific and can change.

**Where to view:**
- Dashboard: https://clarity.microsoft.com/projects/view/zfp1d5boaq/dashboard
- Recordings: https://clarity.microsoft.com/projects/view/zfp1d5boaq/impressions
- Settings: https://clarity.microsoft.com/projects/view/zfp1d5boaq/settings#setup

**AI/plugin status:** There was no connected Microsoft Clarity ChatGPT plugin available in this workflow. Microsoft's official Clarity MCP server and data export API are possible **future integrations**, but neither was installed as a ChatGPT integration or connected to OpenSEO. Clarity + GA4 was connected inside the Clarity product itself, which is a different integration.

## 8. Privacy, consent and website footers

- Published a first-party Privacy Policy at https://bogdanpascal.com/privacy/ , stored at [privacy/index.html](../../privacy/index.html).
- It covers site operation and GitHub Pages, Google Analytics, Microsoft Clarity session replay, cookies, preferences, retention, email enquiries, privacy rights and a contact address.
- Added a **Privacy Policy** link inside the **existing** athlete footer and the existing filmmaker/service/equipment footer components. Did not redesign those footers.
- The full-screen split entry page has no ordinary footer, so it received only a small standalone legal-style link.
- Added a Privacy Policy link inside the existing visitor **Privacy choices** panel.
- Footers are updated at publication time via [inject_privacy_footer.py](../../.github/scripts/inject_privacy_footer.py), which operates on public pages listed in the sitemap. Noindex/draft V2/V3 pages are left alone.
- Automated build verified that the privacy page and links were included across **36 public sitemap pages**, and checked that preview boundaries were respected.
- Published policy text is an operational disclosure, **not independent legal advice**. Review it if technology, retention settings, legal jurisdiction or data collection changes. The public repository is not a safe place for confidential visitor data.

**Visitor storage:** GA4 and Clarity store their respective analytics at Google and Microsoft. The site's consent decisions are stored locally in the visitor's browser under `bp_analytics_consent_v1` and `bp_clarity_consent_v1`. These local keys are not a centralized visitor database.

## 9. GitHub change history and verified deployments

The following work was implemented and merged:

| PR | Change | Status |
| --- | --- | --- |
| [#25](https://github.com/pkbannutz/bogdan-pascal-portfolio/pull/25) | Install consent-based GA4 tracking on public portfolio pages | **Merged** 18 Nov 2026 |
| [#26](https://github.com/pkbannutz/bogdan-pascal-portfolio/pull/26) | Add interaction events, scroll depth, link clicks and CI tests | **Merged** 18 Nov 2026 |
| [#27](https://github.com/pkbannutz/bogdan-pascal-portfolio/pull/27) | Install Clarity with independent visitor consent and masking | **Merged** 18 Nov 2026 |
| [#28](https://github.com/pkbannutz/bogdan-pascal-portfolio/pull/28) | Add first-party privacy page and links inside existing footers | **Merged** 18 Nov 2026 |

Important checks and run links:
- GA4 events CI successful: https://github.com/pkbannutz/bogdan-pascal-portfolio/actions/runs/44353681990
- Clarity privacy tracking CI successful: https://github.com/pkbannutz/bogdan-pascal-portfolio/actions/runs/44366853495
- Privacy and footer CI successful: https://github.com/pkbannutz/bogdan-pascal-portfolio/actions/runs/44372482367
- Privacy and footer deployment successful: https://github.com/pkbannutz/bogdan-pascal-portfolio/actions/runs/44372595759

Other site changes and deployments may have occurred independently that day. Always check the most recent successful `Deploy portfolio to GitHub Pages` Action after any merge.

**Main implementation files:**
- [Deploy action](../../.github/workflows/deploy-pages.yml)
- [Sitemap generator](../../.github/scripts/generate_sitemap.py)
- [Sitemap consent injector](../../.github/scripts/inject_analytics.py)
- [Policy footer injector](../../.github/scripts/inject_privacy_footer.py)
- [Analytics and Clarity consent](../../assets/analytics-consent.js)
- [GA4 event definitions](../../assets/analytics-events.js)
- [GA4 events tests](../../tests/analytics-events.test.cjs)
- [Clarity consent tests](../../tests/analytics-consent.test.cjs)
- [Privacy footer tests](../../tests/privacy_footer_test.py)
- [Detailed tracking reference](../analytics/TRACKING-SETUP.md)

## 10. Practical checklist for a future website session

### To confirm everything is functioning

1. Open https://bogdanpascal.com/ and check the live pages and footer privacy links.
2. Open https://bogdanpascal.com/sitemap.xml and https://bogdanpascal.com/robots.txt.
3. In GitHub Actions, open the latest **Deploy portfolio to GitHub Pages** run and check for **success**.
4. In Search Console, choose **Domain: bogdanpascal.com**. Check **Sitemaps**, **Pages**, and inspect the athlete/filmmaker URLs. Note the date before comparing states.
5. In GA4, select **Bogdan Pascal Portfolio**, check **Reports > Realtime**, **Events**, and the four **Custom definitions**. Use a real test visit with GA4 permission accepted if you need to test events.
6. In Clarity, open **Dashboard**, **Recordings** and **Heatmaps**. Session data requires a visit with explicit Clarity permission. Ensure GA4 integration remains **Connected**.
7. In OpenSEO, open the **Bogdan Pascal Portfolio** project and verify it still has both GSC and GA4 connected to this domain.

### Current remaining items and priorities

| Priority | Item | Reason or limitation |
| --- | --- | --- |
| P1 | Monitor Search Console indexing for `/athlete/` and `/filmmaker/` | Homepage is indexed; other pages had not yet fully appeared in Google at the latest API check |
| P1 | Confirm Search Console rereads the updated **36-URL sitemap** | Initial Search Console success showed 35 before the privacy page was added |
| P1 | Continue technical SEO validation on important public service pages | Older research found missing canonicals and historical noindex cases; do not assume those observations are still current without checking actual live source |
| P2 | Review Clarity masking, especially whether Balanced is selected | Last choice not verified; public portfolio text can be useful in recordings, but personal inputs must stay masked |
| P2 | Consider excluding your own testing traffic | Your visits can distort small early traffic samples |
| P2 | Build a useful GA4 report or Exploration | New custom dimensions were registered, but a tailored most-clicked-services dashboard was not yet built |
| P2 | Decide whether `contact_click` should be an explicitly labelled **intent** key event | Do not confuse an email-link click with a submitted enquiry |
| P2 | Add confirmed-submission tracking if you later introduce a true enquiry form | No verified submitted-lead pipeline exists in the current public site |
| Ongoing | Review your privacy policy and consent setup as tools change | Policy statements and third-party behavior can change |
| Optional | Investigate a unified Clarity/GA4/OpenSEO dashboard or Clarity MCP | Not automatically available just because Google Analytics is linked to Clarity |

### SEO research and older notes

The project already has extensive separate studies in [seo-audit/](../README.md), including [the SEO research principles](../RESEARCH-DECISION-PRINCIPLES.md), [the whole-site SEO plan](../keyword-research/WHOLE-SITE-SEO-PRIORITIZED-PLAN.md), and [individual service research](../keyword-research/individual/). Those documents were authored at different moments on 18 November. Some intentionally preserve pre-implementation observations such as sitemap 404s or historical noindex states. **Do not use older research as the current live deployment status without a new verification.**

## 11. How to update this record later

- Treat this file as a dated snapshot of the setup and its decisions.
- When a connection changes, append a dated entry below or add a newer dated log in this folder. Note exactly what changed, why, which property/project was affected, and the verifying PR or screenshot.
- Avoid editing historical results so that the timeline remains understandable.
- Never store OAuth credentials, Clarity API tokens, DNS TXT verification tokens, session content, email messages or other private data in this public repository.

### Update journal

**18 Nov 2026:** Initial consolidated setup record created after verifying source files, PRs #25-28, Search Console indexing inspection, OpenSEO's linked properties, four GA4 custom dimensions, and successful privacy deployment. Open items are listed in section 10.
