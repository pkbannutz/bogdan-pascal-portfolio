/* Optional analytics, heatmaps and session replays on public portfolio pages.
 * GA4 and Microsoft Clarity require separate explicit consent.
 */
(function () {
  "use strict";

  var GA_ID = "G-X789N5N0QX";
  var CLARITY_ID = "zfp1d5boaq";
  var GA_KEY = "bp_analytics_consent_v1";
  var CLARITY_KEY = "bp_clarity_consent_v1";
  var gaLoaded = false;
  var clarityLoaded = false;

  function readChoice(key) {
    try { return localStorage.getItem(key); }
    catch (error) { return null; }
  }

  function saveChoices(allowGa, allowClarity) {
    try {
      localStorage.setItem(GA_KEY, allowGa ? "yes" : "no");
      localStorage.setItem(CLARITY_KEY, allowClarity ? "yes" : "no");
      return true;
    } catch (error) {
      return false;
    }
  }

  function loadAnalytics() {
    if (gaLoaded || readChoice(GA_KEY) !== "yes") return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);

    var events = document.createElement("script");
    events.async = true;
    events.src = "/assets/analytics-events.js";
    document.head.appendChild(events);

    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(script);
  }

  function maskInputs() {
    var nodes = document.querySelectorAll("form, input, textarea, select, [contenteditable]");
    Array.prototype.forEach.call(nodes, function (node) {
      node.setAttribute("data-clarity-mask", "True");
    });
  }

  function loadClarity() {
    if (clarityLoaded || readChoice(CLARITY_KEY) !== "yes") return;
    clarityLoaded = true;
    maskInputs();
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
    window.clarity("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: "granted"
    });
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.clarity.ms/tag/" + CLARITY_ID;
    document.head.appendChild(script);
  }

  function clearOptionalCookies() {
    document.cookie.split(";").forEach(function (part) {
      var name = part.split("=")[0].trim();
      if (!/^(_ga($|_)|_gid$|_gat($|_)|_clck$|_clsk$)$/.test(name)) return;
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
      document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=." + location.hostname;
    });
  }

  function initialize() {
    var style = document.createElement("style");
    style.textContent = [
      "#bp-privacy-open{position:fixed;bottom:12px;left:12px;z-index:2147483646;padding:7px 10px;border:1px solid #bcbcbc;border-radius:7px;background:#fff;color:#111;font:12px/1.2 system-ui,sans-serif;cursor:pointer;box-shadow:0 2px 12px #0002}",
      "#bp-privacy-box{position:fixed;bottom:54px;left:12px;z-index:2147483647;width:min(410px,calc(100vw - 24px));padding:18px;background:#fff;color:#111;border:1px solid #ddd;border-radius:12px;box-shadow:0 6px 30px #0003;font:14px/1.5 system-ui,sans-serif}",
      "#bp-privacy-box h2{margin:0 0 7px;font:bold 16px/1.3 system-ui,sans-serif;color:#111;letter-spacing:normal;text-transform:none}",
      "#bp-privacy-box p{margin:0 0 12px;color:#333;font:13px/1.5 system-ui,sans-serif}",
      "#bp-privacy-box .bp-option{display:flex;gap:9px;align-items:flex-start;margin:12px 0;font:13px/1.4 system-ui,sans-serif;color:#111}",
      "#bp-privacy-box .bp-option input{margin:3px 0 0;width:16px;height:16px;flex:none;accent-color:#111}",
      "#bp-privacy-box .bp-option small{display:block;margin-top:3px;color:#555;font:12px/1.4 system-ui,sans-serif}",
      "#bp-privacy-box .bp-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}",
      "#bp-privacy-box button{padding:10px 13px;border:1px solid #111;border-radius:6px;font:600 12px/1.2 system-ui,sans-serif;cursor:pointer}",
      "#bp-privacy-save{background:#111;color:#fff}",
      "#bp-privacy-all,#bp-privacy-decline{background:#fff;color:#111}",
      "#bp-privacy-status{display:block;margin-top:7px;color:#af2525;font:12px/1.4 system-ui,sans-serif}"
    ].join("\n");
    document.head.appendChild(style);

    var opener = document.createElement("button");
    opener.type = "button";
    opener.id = "bp-privacy-open";
    opener.textContent = "Privacy choices";
    opener.setAttribute("aria-label", "Review website tracking preferences");
    document.body.appendChild(opener);

    var box = document.createElement("section");
    box.id = "bp-privacy-box";
    box.setAttribute("role", "region");
    box.setAttribute("aria-label", "Optional tracking preferences");
    box.innerHTML = [
      "<h2>Privacy choices</h2>",
      "<p>Both services are optional. Choose which website tracking you allow. We do not send your form entries to analytics.</p>",
      '<p><a href="/privacy/" style="color:inherit;text-decoration:underline">Read our Privacy Policy</a> for how tracking data is used, stored and managed.</p>',
      '<label class="bp-option"><input id="bp-consent-ga" type="checkbox"><span>Google Analytics<small>Page visits, clicks and scrolling.</small></span></label>',
      '<label class="bp-option"><input id="bp-consent-clarity" type="checkbox"><span>Microsoft Clarity<small>Heatmaps and replays of page activity, such as mouse movement and scrolling. Personal input fields are masked.</small></span></label>',
      '<div class="bp-actions"><button id="bp-privacy-save" type="button">Save choices</button><button id="bp-privacy-all" type="button">Accept both</button><button id="bp-privacy-decline" type="button">Decline both</button></div>',
      '<span id="bp-privacy-status" role="status" aria-live="polite"></span>'
    ].join("");

    var gaOption = box.querySelector("#bp-consent-ga");
    var clarityOption = box.querySelector("#bp-consent-clarity");
    var status = box.querySelector("#bp-privacy-status");

    function showChoices() {
      gaOption.checked = readChoice(GA_KEY) === "yes";
      clarityOption.checked = readChoice(CLARITY_KEY) === "yes";
      status.textContent = "";
      if (!box.parentNode) document.body.appendChild(box);
    }

    function hideChoices() {
      if (box.parentNode) box.parentNode.removeChild(box);
    }

    function choose(allowGa, allowClarity) {
      var previousGa = readChoice(GA_KEY);
      var previousClarity = readChoice(CLARITY_KEY);
      if (!saveChoices(allowGa, allowClarity)) {
        status.textContent = "Your browser could not save your choices. No new tracking was enabled.";
        return;
      }

      hideChoices();
      var gaRevoked = previousGa === "yes" && !allowGa;
      var clarityRevoked = previousClarity === "yes" && !allowClarity;

      if (gaRevoked && typeof window.gtag === "function") {
        window.gtag("consent", "update", { analytics_storage: "denied" });
      }
      if (clarityRevoked && typeof window.clarity === "function") {
        window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "denied" });
      }

      if (gaRevoked || clarityRevoked) {
        clearOptionalCookies();
        location.reload();
        return;
      }
      if (allowGa) loadAnalytics();
      if (allowClarity) loadClarity();
    }

    box.querySelector("#bp-privacy-save").addEventListener("click", function () {
      choose(gaOption.checked, clarityOption.checked);
    });
    box.querySelector("#bp-privacy-all").addEventListener("click", function () {
      choose(true, true);
    });
    box.querySelector("#bp-privacy-decline").addEventListener("click", function () {
      choose(false, false);
    });
    opener.addEventListener("click", showChoices);

    var ga = readChoice(GA_KEY);
    var clarity = readChoice(CLARITY_KEY);
    if (ga === "yes") loadAnalytics();
    if (clarity === "yes") loadClarity();

    // Existing GA4 consent never grants new permission for Clarity.
    // Re-ask consented GA4 visitors once for the additional feature.
    // Prior GA4 denials remain respected without prompting again.
    if (ga === null || (ga === "yes" && clarity === null)) showChoices();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
}());
