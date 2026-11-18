/* Minimal browser simulation for the consent-based event collector. */
"use strict";
const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("assets/analytics-events.js", "utf8");

function createHarness(consent) {
  const calls = [];
  const docListeners = {};
  const windowListeners = {};
  const location = {
    pathname: "/filmmaker/",
    href: "https://bogdanpascal.com/filmmaker/",
    origin: "https://bogdanpascal.com"
  };
  const document = {
    readyState: "complete",
    body: { scrollHeight: 2000 },
    documentElement: { scrollHeight: 2000 },
    querySelectorAll() { return []; },
    addEventListener(name, callback) { docListeners[name] = callback; }
  };
  const window = {
    innerHeight: 600,
    scrollY: 0,
    gtag(...args) { calls.push(args); },
    addEventListener(name, callback) { windowListeners[name] = callback; }
  };
  const localStorage = { getItem() { return consent; } };
  vm.runInNewContext(source, {
    window, document, localStorage, location, URL
  }, { timeout: 1000 });
  return { calls, window, document, docListeners, windowListeners, location };
}

function makeLink(href) {
  return {
    href: new URL(href, "https://bogdanpascal.com/filmmaker/").href,
    getAttribute(name) { return name === "href" ? href : null; },
    closest(selector) {
      if (selector === "a[href]") return this;
      return null;
    }
  };
}

test("no tracking handlers when consent was declined", () => {
  const h = createHarness("no");
  assert.equal(h.docListeners.click, undefined);
  assert.equal(h.windowListeners.scroll, undefined);
  assert.equal(h.calls.length, 0);
});

test("email click tracks intent but never transmits the address or subject", () => {
  const h = createHarness("yes");
  h.docListeners.click({
    target: makeLink("mailto:hello@bogdanpascal.com?subject=Private%20Details")
  });
  assert.equal(h.calls.length, 1);
  assert.equal(h.calls[0][1], "contact_click");
  assert.equal(h.calls[0][2].contact_method, "email");
  assert.equal(JSON.stringify(h.calls).includes("hello@"), false);
  assert.equal(JSON.stringify(h.calls).includes("Private"), false);
});

test("service click records path, not query string or fragment", () => {
  const h = createHarness("yes");
  h.docListeners.click({
    target: makeLink("/filmmaker/services/dop/?secret=hidden#section")
  });
  assert.equal(h.calls[0][1], "service_click");
  assert.equal(h.calls[0][2].destination_path, "/filmmaker/services/dop/");
  assert.equal(JSON.stringify(h.calls).includes("hidden"), false);
});

test("scroll thresholds trigger once per page", () => {
  const h = createHarness("yes");
  h.window.scrollY = 600;
  h.windowListeners.scroll();
  h.windowListeners.scroll();
  h.window.scrollY = 1300;
  h.windowListeners.scroll();
  assert.equal(h.calls.filter(item => item[1] === "scroll_depth").length, 4);
  assert.deepEqual(h.calls.filter(item => item[1] === "scroll_depth")
    .map(item => item[2].percent_scrolled), [25, 50, 75, 90]);
});

test("confirmed leads must be sent through an explicit success hook", () => {
  const h = createHarness("yes");
  assert.equal(h.calls.some(item => item[1] === "generate_lead"), false);
  h.window.BPAnalyticsEvents.trackConfirmedLead();
  assert.equal(h.calls[0][1], "generate_lead");
});
