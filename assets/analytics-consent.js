/* Optional, consent-based Google Analytics for the public portfolio. */
(function () {
  "use strict";
  var MEASUREMENT_ID = "G-X789N5N0QX";
  var STORAGE_KEY = "bp_analytics_consent_v1";
  var loaded = false;

  function getChoice() {
    try { return localStorage.getItem(STORAGE_KEY); }
    catch (error) { return null; }
  }

  function saveChoice(value) {
    try { localStorage.setItem(STORAGE_KEY, value); }
    catch (error) { /* Private browsing can disable storage. */ }
  }

  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID);
    var events = document.createElement("script");
    events.async = true;
    events.src = "/assets/analytics-events.js";
    document.head.appendChild(events);
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(MEASUREMENT_ID);
    document.head.appendChild(script);
  }

  function initialize() {
    var style = document.createElement("style");
    style.textContent = [
      "#bp-privacy-open{position:fixed;bottom:12px;left:12px;z-index:2147483646;padding:7px 10px;border:1px solid #bcbcbc;border-radius:7px;background:#fff;color:#111;font:12px/1.2 system-ui,sans-serif;cursor:pointer;box-shadow:0 2px 12px #0002}",
      "#bp-privacy-box{position:fixed;bottom:54px;left:12px;z-index:2147483647;width:min(390px,calc(100vw - 24px));padding:18px;background:#fff;color:#111;border:1px solid #ddd;border-radius:12px;box-shadow:0 6px 30px #0003;font:14px/1.5 system-ui,sans-serif}",
      "#bp-privacy-box p{margin:0 0 12px;color:#333;font:inherit}",
      "#bp-privacy-box h2{margin:0 0 7px;font:bold 16px/1.3 system-ui,sans-serif;color:#111;letter-spacing:normal;text-transform:none}",
      "#bp-privacy-box .bp-actions{display:flex;gap:8px;flex-wrap:wrap}",
      "#bp-privacy-box button{padding:10px 15px;border:1px solid #111;border-radius:6px;font:600 13px/1.2 system-ui,sans-serif;cursor:pointer}",
      "#bp-privacy-accept{background:#111;color:#fff}",
      "#bp-privacy-decline{background:#fff;color:#111}"
    ].join("\n");
    document.head.appendChild(style);

    var opener = document.createElement("button");
    opener.type = "button";
    opener.id = "bp-privacy-open";
    opener.textContent = "Privacy choices";
    opener.setAttribute("aria-label", "Review analytics privacy choices");
    document.body.appendChild(opener);

    var box = document.createElement("section");
    box.id = "bp-privacy-box";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-label", "Website analytics privacy choices");
    box.innerHTML = [
      "<h2>Optional website analytics</h2>",
      "<p>With your permission, Google Analytics measures page visits, clicks and scrolling to improve this portfolio. We do not send form messages or email addresses. No analytics loads unless you accept.</p>",
      '<div class="bp-actions"><button id="bp-privacy-accept" type="button">Accept analytics</button><button id="bp-privacy-decline" type="button">Decline</button></div>'
    ].join("");

    function showChoices() {
      if (!box.parentNode) document.body.appendChild(box);
    }

    function hideChoices() {
      if (box.parentNode) box.parentNode.removeChild(box);
    }

    function choose(value) {
      var wasAccepted = getChoice() === "yes";
      saveChoice(value);
      hideChoices();
      if (value === "yes") loadAnalytics();
      else if (wasAccepted && loaded) {
        // Immediately stop future events, revoke consent and clear our GA cookies.
        if (typeof window.gtag === "function") {
          window.gtag("consent", "update", { analytics_storage: "denied" });
        }
        document.cookie.split(";").forEach(function (part) {
          var name = part.split("=")[0].trim();
          if (!/^_ga($|_)|^_gid$|^_gat($|_)/.test(name)) return;
          document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
          document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=." + location.hostname;
        });
        location.reload();
      }
    }

    box.querySelector("#bp-privacy-accept").addEventListener("click", function () { choose("yes"); });
    box.querySelector("#bp-privacy-decline").addEventListener("click", function () { choose("no"); });
    opener.addEventListener("click", showChoices);

    var choice = getChoice();
    if (choice === "yes") loadAnalytics();
    else if (choice !== "no") showChoices();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
}());
