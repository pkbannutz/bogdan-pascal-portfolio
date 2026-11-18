/* GA4 event tracking for the public portfolio, loaded only after analytics consent.
 * Never send input values, form content, email addresses, URL query strings, or page text.
 * Automatic GA4 measurement continues to handle page views and supported downloads.
 */
(function () {
  "use strict";
  var CONSENT_KEY = "bp_analytics_consent_v1";
  var started = false;

  function consented() {
    try { return localStorage.getItem(CONSENT_KEY) === "yes"; }
    catch (error) { return false; }
  }

  function pageGroup() {
    var path = location.pathname;
    if (path === "/") return "homepage";
    if (path.indexOf("/athlete/") === 0) return "athlete";
    if (path.indexOf("/filmmaker/work/") === 0) return "film_project";
    if (path.indexOf("/filmmaker/services/") === 0) return "film_service";
    if (path.indexOf("/filmmaker/equipment/") === 0) return "equipment";
    if (path.indexOf("/filmmaker/contact/") === 0) return "contact";
    if (path.indexOf("/filmmaker/about/") === 0) return "about";
    return "filmmaker";
  }

  function safeKey(value) {
    return typeof value === "string" && /^[a-zA-Z0-9_-]{1,64}$/.test(value) ? value : "unlabelled";
  }

  function clickArea(node) {
    if (node.closest("header, .hero, .svc-hero")) return "header_or_hero";
    if (node.closest("nav, .nav, .rail, .mast")) return "navigation";
    if (node.closest("footer, .foot, .svc-end")) return "footer";
    if (node.closest(".credits-list, .featured, #work, .grid, .film-grid")) return "portfolio";
    if (node.closest(".svc-service-grid, .roles-grid, .svc, #services")) return "services";
    if (node.closest("#contact, .contacts, .contact-block, .svc-cta")) return "contact";
    if (node.closest("main")) return "main";
    return "other";
  }

  function track(eventName, details) {
    if (!consented() || typeof window.gtag !== "function") return;
    var params = { page_group: pageGroup(), transport_type: "beacon" };
    Object.keys(details || {}).forEach(function (key) {
      params[key] = details[key];
    });
    window.gtag("event", eventName, params);
  }

  function onClick(event) {
    var node = event.target && event.target.nodeType === 1
      ? event.target : event.target && event.target.parentElement;
    if (!node || !node.closest) return;
    if (node.closest("#bp-privacy-open, #bp-privacy-box")) return;

    var link = node.closest("a[href]");
    if (link) {
      var href = link.getAttribute("href") || "";
      var scheme = href.trim().toLowerCase();
      var area = clickArea(link);
      if (scheme.indexOf("mailto:") === 0) {
        track("contact_click", { contact_method: "email", click_area: area });
        return;
      }
      if (scheme.indexOf("tel:") === 0) {
        track("contact_click", { contact_method: "phone", click_area: area });
        return;
      }
      var url;
      try { url = new URL(link.href, location.href); }
      catch (error) { return; }
      if (url.protocol !== "http:" && url.protocol !== "https:") return;
      if (url.origin === location.origin) {
        // No URL query string or fragment content is transferred.
        var destination = url.pathname.slice(0, 160);
        var kind = "internal_link_click";
        if (destination.indexOf("/filmmaker/work/") === 0) kind = "project_click";
        else if (destination.indexOf("/filmmaker/services/") === 0) kind = "service_click";
        else if (destination.indexOf("/filmmaker/contact/") === 0) kind = "contact_page_click";
        track(kind, { destination_path: destination, click_area: area });
        return;
      }

      var host = url.hostname.toLowerCase().slice(0, 100);
      var platform = "";
      if (host === "instagram.com" || host === "www.instagram.com") platform = "instagram";
      else if (host === "youtube.com" || host === "www.youtube.com" || host === "youtu.be") platform = "youtube";
      else if (host === "tiktok.com" || host === "www.tiktok.com") platform = "tiktok";
      else if (host === "imdb.com" || host === "www.imdb.com") platform = "imdb";
      else if (host === "vimeo.com" || host === "www.vimeo.com") platform = "vimeo";
      track(platform ? "social_or_video_link_click" : "external_link_click", {
        destination_host: host, platform: platform || "other", click_area: area
      });
      return;
    }

    var control = node.closest("button, [role='button'], [role='tab']");
    if (!control) return;
    if (control.closest("#bp-privacy-open, #bp-privacy-box")) return;
    var type = control.getAttribute("role") === "tab" ? "tab"
      : control.matches("[data-theme-toggle], #theme") ? "theme"
      : control.matches("[aria-expanded], .mobile-menu") ? "menu"
      : control.matches(".filter") ? "filter" : "button";
    track("interface_click", {
      control_type: type,
      control_id: safeKey(control.getAttribute("data-analytics-id") || control.id),
      click_area: clickArea(control)
    });
  }

  function trackScrollDepth() {
    var thresholds = [25, 50, 75, 90];
    var seen = Object.create(null);
    function checkScroll() {
      if (!consented()) return;
      var height = Math.max(document.documentElement.scrollHeight,
        document.body ? document.body.scrollHeight : 0);
      if (height <= window.innerHeight + 5) return;
      var pct = Math.min(100, Math.floor(
        100 * (window.scrollY + window.innerHeight) / height
      ));
      thresholds.forEach(function (threshold) {
        if (pct >= threshold && !seen[threshold]) {
          seen[threshold] = true;
          track("scroll_depth", { percent_scrolled: threshold });
        }
      });
    }
    window.addEventListener("scroll", checkScroll, { passive: true });
  }

  function trackSections() {
    if (typeof IntersectionObserver !== "function") return;
    var sections = document.querySelectorAll("section[id], main [data-analytics-section]");
    var seen = Object.create(null);
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting || !consented()) return;
        var id = safeKey(entry.target.getAttribute("data-analytics-section") || entry.target.id);
        if (id === "unlabelled" || seen[id]) return;
        seen[id] = true;
        track("section_view", { section_id: id });
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -30% 0px", threshold: 0 });
    Array.prototype.forEach.call(sections, function (section) { observer.observe(section); });
  }

  function trackVideo(event) {
    var node = event.target;
    if (!node || node.nodeName !== "VIDEO") return;
    track(event.type === "play" ? "native_video_play" : "native_video_complete", {
      video_id: safeKey(node.id || node.getAttribute("data-analytics-id"))
    });
  }

  function trackFormAttempt(event) {
    var form = event.target;
    if (!form || form.nodeName !== "FORM") return;
    // A submit event is an attempt, not proof that a server received an enquiry.
    track("form_submit_attempt", { form_id: safeKey(form.id || form.getAttribute("data-analytics-id")) });
  }

  function init() {
    if (started || !consented()) return;
    started = true;
    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", trackFormAttempt, true);
    document.addEventListener("play", trackVideo, true);
    document.addEventListener("ended", trackVideo, true);
    trackScrollDepth();
    trackSections();
  }

  // Only call after the website confirms a successful enquiry submission.
  // There is currently no submission form on the public portfolio.
  window.BPAnalyticsEvents = {
    trackConfirmedLead: function () {
      track("generate_lead", { lead_source: "confirmed_form" });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
}());
