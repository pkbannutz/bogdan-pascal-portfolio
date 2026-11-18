# Website tracking plan and GA4 event reference

Updated: 2026-11-18

## Live accounts

- Website: https://bogdanpascal.com
- Google Analytics 4: Bogdan Pascal Portfolio, measurement ID `G-X789N5N0QX`
- Google Search Console: domain property `bogdanpascal.com`
- OpenSEO: https://app.openseo.so/p/e1f98904-1b3a-4e68-8ae2-f6b3cbdcf8fc
- Microsoft Clarity: not installed yet, awaiting the owner's Clarity project

## How tracking is installed

- GitHub Actions generates a sitemap and injects `assets/analytics-consent.js` into public pages in the deployment folder.
- The Google Analytics tag only loads after visitors select **Accept analytics**.
- Once accepted, that loader also loads `assets/analytics-events.js`.
- Declining leaves GA4 unloaded. Withdrawing consent prevents new events and refreshes the page.
- Tracking is deliberately excluded from preview and noindex pages. The source HTML files remain untouched.
- The deployment workflow validates JavaScript syntax and runs privacy and event tests before publishing.

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

## Microsoft Clarity follow-up

Clarity is not yet installed. Create a free project at https://clarity.microsoft.com and save its Project ID. A separate, optional session-replay consent category is recommended before installation. Do not commit Clarity API tokens or allow recordings to capture form contents, personal messages or sensitive fields.

Clarity records visual reconstructions of interactions, not literal webcam or screen video. Recordings and heatmaps live in Microsoft's Clarity dashboard, and they are not stored in this GitHub repository.

After Clarity setup, connect Google Analytics within Clarity (Settings > Integrations) for a combined view. OpenSEO remains the hub for search and GA4 metrics; native Clarity heatmaps and replays remain in Clarity.

Clarity's aggregate export API can supply a separate private reporting dashboard, limited by its API quota and date range. The official Clarity MCP server may also support AI analysis with an API token, but it is not automatically connected to OpenSEO or ChatGPT.

## Documentation

- GA4 events: https://developers.google.com/analytics/devguides/collection/ga4/events
- GA4 custom dimensions: https://support.google.com/analytics/answer/14239696
- Clarity retention: https://learn.microsoft.com/en-us/clarity/setup-and-installation/data-retention
- Clarity GA4 integration: https://learn.microsoft.com/en-us/clarity/ga4-integration
- Clarity export API: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-data-export-api
