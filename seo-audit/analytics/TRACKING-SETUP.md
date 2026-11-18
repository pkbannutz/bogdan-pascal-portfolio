# Website tracking plan and GA4 event reference

Updated: 2026-11-18

## Live accounts

- Website: https://bogdanpascal.com
- Google Analytics 4: Bogdan Pascal Portfolio, measurement ID `G-X789N5N0QX`
- Google Search Console: domain property `bogdanpascal.com`
- OpenSEO: https://app.openseo.so/p/e1f98904-1b3a-4e68-8ae2-f6b3cbdcf8fc
- Microsoft Clarity: Bogdan Pascal Portfolio, project ID `zfp1d5boaq`, created 2026-11-18

## How tracking is installed

- GitHub Actions generates a sitemap and injects `assets/analytics-consent.js` into public pages in the deployment folder.
- Google Analytics and Microsoft Clarity each have their own unchecked opt-in choice for new visitors.
- The Google Analytics tag loads only after **Google Analytics** permission; that loader also loads `assets/analytics-events.js`.
- The Microsoft Clarity tag loads only after separate **Microsoft Clarity** permission. Its `consentv2` call grants analytics storage while denying advertising storage.
- Previously stored GA4 permission is carried forward but never silently reused as permission for Clarity. Visitors who already accepted GA4 see the new Clarity choice once.
- Rejecting all choices loads neither provider. Withdrawing either permission stops further tracking and reloads the website.
- Tracking is deliberately excluded from preview and noindex pages. The source HTML files remain untouched.
- The deployment workflow validates JavaScript syntax and runs GA4 event and Clarity consent tests before publishing.

## Which events are measured

| Event name | What it means | Important parameters |
| --- | --- | --- |
| `page_view` | Automatic GA4 page visit | Standard page path and title |
| `scroll` | Enhanced measurement at roughly 90% | Automatic GA4 |
| `click` | Enhanced measurement for outbound links | Automatic GA4 |
| `file_download` | Supported file download | Automatic GA4 |
| `contact_click` | Visitor clicked an email or telephone link | `contact_method`, `click_area` |
| `contact_page_click` | Visitor opened the contact page | `destination_path`, `click_area` |
| `service_click` | Visitor selected a service page | `destination_path`, `click_area` |
| `project_click` | Visitor selected a film project | `destination_path`, `click_area` |
| `internal_link_click` | Other internal navigation | `destination_path`, `click_area` |
| `social_or_video_link_click` | Visitor clicked a social or video site link | `destination_host`, `platform` |
| `external_link_click` | Visitor clicked another external website | `destination_host` |
| `interface_click` | Button, theme, menu, tab or filter interaction | `control_type`, `control_id` |
| `scroll_depth` | Visitor reached 25%, 50%, 75% or 90% | `percent_scrolled` |
| `section_view` | A named page section became visible | `section_id` |
| `native_video_play` | Visitor started an HTML video | `video_id` |
| `native_video_complete` | Visitor finished an HTML video | `video_id` |
| `form_submit_attempt` | Browser triggered a form submit event | `form_id` |
| `generate_lead` | Only on explicit confirmed successful form submission | `lead_source` |

All custom event names and parameter values are case-sensitive. Custom events carry `page_group` to distinguish homepage, athlete, filmmaker, services, equipment, work, about and contact.

### Accuracy boundaries

- The public site currently uses `mailto:` contact links. `contact_click` means an email link was clicked, not that an email was sent or a client booked.
- No completed contact form has been found on the currently public contact pages. The `generate_lead` event is **not** fired on attempts. When a future form confirms success, its success handler can call `window.BPAnalyticsEvents.trackConfirmedLead()` after consent.
- Automatic GA4 YouTube video events depend on player compatibility. The custom native-video events only cover HTML `<video>` elements.
- Click and scroll events are collected only with analytics consent. Ad blockers and browser privacy settings can suppress results.
- We never transmit form text, emails, phone numbers, link query parameters, or dynamic link labels to GA4.

## Where to see the results

1. **GA4 Realtime** for a quick test, usually within minutes.
2. **GA4 Reports > Engagement > Events** for a list of custom event counts once processing catches up.
3. **GA4 Explore > Path exploration** for navigation and where visitors go before contact pages.
4. **OpenSEO** for the integrated first-party Google Analytics and Search Console reports. The OpenSEO connector does not guarantee every custom event is surfaced in its built-in reports.

For fine-grained filtering by parameters, open **GA4 Admin > Data display > Custom definitions > Create custom dimension**. Use *Event* scope for these recommended parameter names:

| Display name | Event parameter |
| --- | --- |
| Destination path | `destination_path` |
| Click area | `click_area` |
| Page group | `page_group` |
| Contact method | `contact_method` |
| Scroll percentage | `percent_scrolled` |
| Section ID | `section_id` |
| Control type | `control_type` |
| Platform | `platform` |

This extra GA4 UI setup cannot be performed by the site's GitHub build. Register custom definitions soon because their reports are generally not retroactive. Contact clicks can optionally be configured as a GA4 **key event**, but should be labelled "contact intent" rather than confirmed leads. Reserve the `generate_lead` key event for future genuinely successful enquiries.

For longer event-level exploration history, review **GA4 Admin > Data collection and modification > Data retention** and choose the suitable permitted retention (standard GA4 properties support up to 14 months). This changes only GA4 storage settings, not GitHub or OpenSEO.

## Microsoft Clarity, heatmaps and replay

- Project: **Bogdan Pascal Portfolio**
- Clarity project ID: `zfp1d5boaq`
- Dashboard: https://clarity.microsoft.com/projects/view/zfp1d5boaq/gettingstarted
- Public website: https://bogdanpascal.com
- Tracking method: Clarity JavaScript tag is added only after explicit Clarity opt-in through `assets/analytics-consent.js`. The script is never inserted on denied or undecided visits.
- The Clarity consent V2 API sends `analytics_Storage: granted` and `ad_Storage: denied`. No advertising permission is given.
- Sensitive form fields and contenteditable regions are explicitly marked for masking prior to Clarity loading. Clarity's own built-in masking is an additional layer.
- Optional GA4 permission and optional Clarity permission can be changed any time with the site's **Privacy choices** control.
- Recordings are reconstructions of page activity, not webcam videos or native videos of visitors' entire computers.
- Recordings and heatmaps are stored in Microsoft's Clarity service, not GitHub. Ordinary recordings typically remain available 30 days; see Microsoft's latest retention policy for exceptions.

### Actions the website owner still needs inside Clarity

1. **Settings > Masking:** Choose **Strict** for the greatest privacy, at least until you've reviewed what appears in example recordings. Note: it hides most website text. Clarity defaults to **Balanced**, and the explicit form masking code is already included.
2. **Settings > Setup > Google Analytics integration:** Select **Get Started**, sign in to the Google account with access to the property, and connect **Bogdan Pascal Portfolio**. GA4 property ID is `565047122`, Account ID is `130547458` and Measurement ID is `G-X789N5N0QX`.
3. **Test:** Visit the public site in a fresh browser, accept Clarity separately, click and scroll. Check **Settings > Setup** for installation status, then **Recordings** and **Heatmaps** once data arrives.
4. **Privacy notice:** Publish/update a privacy notice explaining Google Analytics, Microsoft Clarity, consent changes and how recordings are handled. Review compliance for relevant visitor jurisdictions.

Clarity doesn't automatically connect to OpenSEO through the existing GA4 and Search Console integration. Use the Clarity dashboard to replay sessions and view heatmaps, and OpenSEO for search and GA4 performance. Optional API/MCP integration can be evaluated separately.

### Reference material

- Clarity installation: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup
- ConsentV2: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2
- Masking: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking
- Google Analytics integration: https://learn.microsoft.com/en-us/clarity/ga-integration/ga-integration
- Retention: https://learn.microsoft.com/en-us/clarity/setup-and-installation/data-retention

## Documentation

- GA4 events: https://developers.google.com/analytics/devguides/collection/ga4/events
- GA4 custom dimensions: https://support.google.com/analytics/answer/14239696
- Clarity retention: https://learn.microsoft.com/en-us/clarity/setup-and-installation/data-retention
- Clarity GA4 integration: https://learn.microsoft.com/en-us/clarity/ga4-integration
- Clarity export API: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-export-api
