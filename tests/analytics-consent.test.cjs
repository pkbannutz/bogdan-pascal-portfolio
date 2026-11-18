"use strict";
const assert = require("node:assert/strict");
const test = require("node:test");
const fs = require("node:fs");
const vm = require("node:vm");

const source = fs.readFileSync("assets/analytics-consent.js", "utf8");
const GA = "bp_analytics_consent_v1";
const CL = "bp_clarity_consent_v1";

function harness(initial = {}) {
  const values = new Map(Object.entries(initial));
  const head = [];
  const body = [];
  const allElements = [];
  let reloads = 0;

  function element(tag) {
    const controls = {};
    return {
      tagName: tag.toUpperCase(),
      parentNode: null,
      checked: false,
      textContent: "",
      addEventListener(name, cb) {
        this.listeners = this.listeners || {};
        this.listeners[name] = cb;
      },
      setAttribute(k, v) {
        this.attributes = this.attributes || {};
        this.attributes[k] = v;
      },
      querySelector(selector) {
        if (!controls[selector]) controls[selector] = element("button");
        return controls[selector];
      },
      appendChild(child) {
        child.parentNode = this;
        this.children = this.children || [];
        this.children.push(child);
      },
      removeChild(child) {
        this.children = this.children.filter(item => item !== child);
        child.parentNode = null;
      }
    };
  }
  const headEl = element("head");
  headEl.appendChild = function (child) { head.push(child); child.parentNode = headEl; };
  const bodyEl = element("body");
  bodyEl.appendChild = function (child) { body.push(child); child.parentNode = bodyEl; };
  bodyEl.removeChild = function (child) {
    const pos = body.indexOf(child);
    if (pos !== -1) body.splice(pos, 1);
    child.parentNode = null;
  };
  const input = element("input");
  allElements.push(input);
  const document = {
    readyState: "complete",
    head: headEl,
    body: bodyEl,
    cookie: "",
    createElement: element,
    querySelectorAll() { return allElements; }
  };
  const location = { hostname: "bogdanpascal.com", reload() { reloads++; } };
  const localStorage = {
    getItem(k) { return values.has(k) ? values.get(k) : null; },
    setItem(k, v) { values.set(k, v); }
  };
  const window = {};
  vm.runInNewContext(source, { document, location, localStorage, window, Date }, { timeout: 1000 });
  const banner = body.find(child => child.id === "bp-privacy-box");
  const privacy = body.find(child => child.id === "bp-privacy-open");
  return {
    values, window, banner, privacy, input, head, body,
    scripts: () => head.filter(child => child.src).map(child => child.src),
    reloadCount: () => reloads,
    click: (id) => {
      const pane = body.find(child => child.id === "bp-privacy-box") || banner;
      pane.querySelector("#" + id).listeners.click();
    },
    show: () => privacy.listeners.click()
  };
}

test("fresh visitor sees unchecked choices, with no tracking networks", () => {
  const h = harness();
  assert.ok(h.banner);
  assert.equal(h.scripts().length, 0);
  assert.equal(h.banner.querySelector("#bp-consent-ga").checked, false);
  assert.equal(h.banner.querySelector("#bp-consent-clarity").checked, false);
});

test("existing GA4 consent is preserved and Clarity is not silently enabled", () => {
  const h = harness({ [GA]: "yes" });
  assert.equal(h.scripts().some(url => url.includes("gtag/js")), true);
  assert.equal(h.scripts().some(url => url.includes("clarity.ms")), false);
  assert.equal(h.banner.querySelector("#bp-consent-ga").checked, true);
  assert.equal(h.banner.querySelector("#bp-consent-clarity").checked, false);
  h.click("bp-privacy-save");
  assert.equal(h.values.get(GA), "yes");
  assert.equal(h.values.get(CL), "no");
  assert.equal(h.scripts().some(url => url.includes("clarity.ms")), false);
});

test("old GA4 rejection is respected and Clarity stays unloaded", () => {
  const h = harness({ [GA]: "no" });
  assert.equal(h.banner, undefined);
  assert.equal(h.scripts().length, 0);
});

test("explicit Clarity opt-in loads its tag and sends V2 analytics consent, but no ads consent", () => {
  const h = harness();
  h.click("bp-privacy-all");
  assert.equal(h.values.get(GA), "yes");
  assert.equal(h.values.get(CL), "yes");
  assert.equal(h.scripts().filter(url => url.includes("clarity.ms/tag/")).length, 1);
  assert.equal(h.scripts().some(url => url.includes("zfp1d5boaq")), true);
  assert.equal(h.input.attributes["data-clarity-mask"], "True");
  const queued = h.window.clarity.q[0];
  assert.equal(queued[0], "consentv2");
  assert.equal(queued[1].analytics_Storage, "granted");
  assert.equal(queued[1].ad_Storage, "denied");
});

test("Clarity permission is separate from Google Analytics", () => {
  const h = harness();
  h.banner.querySelector("#bp-consent-clarity").checked = true;
  h.click("bp-privacy-save");
  assert.equal(h.values.get(GA), "no");
  assert.equal(h.values.get(CL), "yes");
  assert.equal(h.scripts().some(url => url.includes("gtag/js")), false);
  assert.equal(h.scripts().some(url => url.includes("clarity.ms/tag/")), true);
});

test("withdrawing recording consent revokes Clarity and reloads", () => {
  const h = harness({ [GA]: "yes", [CL]: "yes" });
  assert.equal(h.scripts().some(url => url.includes("clarity.ms")), true);
  h.show();
  h.banner.querySelector("#bp-consent-clarity").checked = false;
  h.click("bp-privacy-save");
  assert.equal(h.values.get(GA), "yes");
  assert.equal(h.values.get(CL), "no");
  assert.equal(h.reloadCount(), 1);
  const last = h.window.clarity.q[h.window.clarity.q.length - 1];
  assert.equal(last[0], "consentv2");
  assert.equal(last[1].analytics_Storage, "denied");
});

test("declining both never installs tracking and records both refusals", () => {
  const h = harness();
  h.click("bp-privacy-decline");
  assert.equal(h.values.get(GA), "no");
  assert.equal(h.values.get(CL), "no");
  assert.equal(h.scripts().length, 0);
});
