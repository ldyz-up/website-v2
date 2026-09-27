(function () {
  "use strict";

  const STORAGE_KEY = "ldyz_first_party_attribution_v1";
  const OWNERS = new Set(["LDYZ", "LDPLASTIC"]);
  const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
  const IDLE_TOUCH = 30 * 60 * 1000;
  const fields = [
    "original_source_owner", "original_utm_source", "original_utm_medium", "original_utm_campaign", "original_utm_content",
    "original_landing_page", "original_referrer", "original_touch_time", "last_source_owner", "last_utm_source",
    "last_utm_medium", "last_utm_campaign", "last_utm_content", "last_landing_page", "last_referrer", "last_touch_time", "attribution_status"
  ];

  function text(value, max) {
    return String(value || "").trim().replace(/[\u0000-\u001f\u007f]/g, "").slice(0, max);
  }

  function safeOwner(value) {
    const owner = text(value, 20).toUpperCase();
    return OWNERS.has(owner) ? owner : "";
  }

  function safeReferrer(value) {
    try {
      const url = new URL(value);
      if (url.protocol !== "http:" && url.protocol !== "https:") return "";
      return text(url.origin + url.pathname, 500);
    } catch (_) { return ""; }
  }

  function channelFromHost(host) {
    const h = String(host || "").toLowerCase();
    if (/(^|\.)google\./.test(h)) return ["google", "organic"];
    if (/(^|\.)bing\.com$/.test(h)) return ["bing", "organic"];
    if (/(^|\.)duckduckgo\.com$/.test(h)) return ["duckduckgo", "organic"];
    if (/(^|\.)facebook\.com$|(^|\.)fb\.com$/.test(h)) return ["facebook", "social"];
    if (/(^|\.)linkedin\.com$/.test(h)) return ["linkedin", "social"];
    if (/(^|\.)instagram\.com$/.test(h)) return ["instagram", "social"];
    if (/(^|\.)t\.co$|(^|\.)x\.com$|(^|\.)twitter\.com$/.test(h)) return ["x", "social"];
    if (/(^|\.)youtube\.com$|(^|\.)youtu\.be$/.test(h)) return ["youtube", "social"];
    if (/(^|\.)mail\./.test(h)) return ["email", "email"];
    return [h || "unknown", h ? "referral" : "unknown"];
  }

  function readStored() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (!value || !value.savedAt || Date.now() - value.savedAt > MAX_AGE) return null;
      return value;
    } catch (_) { return null; }
  }

  function currentTouch() {
    const params = new URLSearchParams(window.location.search);
    const owner = safeOwner(params.get("src_owner"));
    const source = text(params.get("utm_source"), 80).toLowerCase();
    const medium = text(params.get("utm_medium"), 80).toLowerCase();
    const campaign = text(params.get("utm_campaign"), 120);
    const content = text(params.get("utm_content"), 120);
    const referrer = safeReferrer(document.referrer);
    let externalHost = "";
    try {
      const parsed = new URL(document.referrer);
      if (parsed.hostname && parsed.hostname !== window.location.hostname) externalHost = parsed.hostname;
    } catch (_) { /* No usable referrer. */ }

    const hasCampaign = Boolean(params.has("src_owner") || source || medium || campaign || content);
    if (!hasCampaign && !externalHost) return { isTouch: false };
    let inferred = ["direct", "none"];
    if (externalHost) inferred = channelFromHost(externalHost);
    return {
      isTouch: true,
      owner: owner || "SHARED",
      source: source || (hasCampaign ? "other" : inferred[0]),
      medium: medium || (hasCampaign ? "unknown" : inferred[1]),
      campaign,
      content,
      landingPage: text(window.location.pathname || "/", 300),
      referrer,
      time: new Date().toISOString(),
      confirmedOwner: Boolean(owner)
    };
  }

  function asRecord(touch) {
    return {
      owner: touch.owner || "SHARED",
      source: touch.source || "unknown",
      medium: touch.medium || "unknown",
      campaign: touch.campaign || "",
      content: touch.content || "",
      landingPage: touch.landingPage || "/",
      referrer: touch.referrer || "",
      time: touch.time || new Date().toISOString(),
      confirmedOwner: Boolean(touch.confirmedOwner)
    };
  }

  function initialize() {
    const now = Date.now(), incoming = currentTouch();
    let stored = readStored();
    if (!stored) {
      const initial = incoming.isTouch ? asRecord(incoming) : asRecord({ owner: "SHARED", source: "direct", medium: "none", landingPage: location.pathname, time: new Date().toISOString() });
      stored = { original: initial, last: initial, savedAt: now, lastActivity: now };
    } else {
      if (incoming.isTouch) {
        const touch = asRecord(incoming);
        const originalSource = stored.original && stored.original.source;
        const originalIsDirect = !stored.original || !originalSource || originalSource === "direct" || originalSource === "unknown";
        if (originalIsDirect) stored.original = touch;
        else if (touch.confirmedOwner && !(stored.original && stored.original.confirmedOwner)) {
          stored.original.owner = touch.owner;
          stored.original.confirmedOwner = true;
        }
        stored.last = touch;
      } else if (now - Number(stored.lastActivity || 0) > IDLE_TOUCH) {
        stored.last = asRecord({ owner: "SHARED", source: "direct", medium: "none", landingPage: location.pathname, time: new Date().toISOString() });
      }
      stored.savedAt = now;
      stored.lastActivity = now;
    }

    const originalOwner = safeOwner(stored.original && stored.original.owner) || "SHARED";
    const lastOwner = safeOwner(stored.last && stored.last.owner) || "SHARED";
    const status = originalOwner === "LDYZ" || originalOwner === "LDPLASTIC" ? "TAGGED" : "SHARED";
    const record = {
      original_source_owner: originalOwner,
      original_utm_source: text(stored.original && stored.original.source, 80),
      original_utm_medium: text(stored.original && stored.original.medium, 80),
      original_utm_campaign: text(stored.original && stored.original.campaign, 120),
      original_utm_content: text(stored.original && stored.original.content, 120),
      original_landing_page: text(stored.original && stored.original.landingPage, 300),
      original_referrer: text(stored.original && stored.original.referrer, 500),
      original_touch_time: text(stored.original && stored.original.time, 40),
      last_source_owner: lastOwner,
      last_utm_source: text(stored.last && stored.last.source, 80),
      last_utm_medium: text(stored.last && stored.last.medium, 80),
      last_utm_campaign: text(stored.last && stored.last.campaign, 120),
      last_utm_content: text(stored.last && stored.last.content, 120),
      last_landing_page: text(stored.last && stored.last.landingPage, 300),
      last_referrer: text(stored.last && stored.last.referrer, 500),
      last_touch_time: text(stored.last && stored.last.time, 40),
      attribution_status: status
    };

    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stored)); } catch (_) { /* Continue with in-memory attribution for this page. */ }
    document.querySelectorAll("form").forEach(function (form) {
      fields.forEach(function (name) {
        let input = form.querySelector('input[type="hidden"][name="' + name + '"]');
        if (!input) {
          input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          form.appendChild(input);
        }
        input.value = record[name] || "";
      });
    });
    window.LDYZAttribution = {
      get: function () { return Object.assign({}, record); },
      addToFormData: function (formData) {
        fields.forEach(function (name) { formData.set(name, record[name] || ""); });
        return formData;
      }
    };
  }

  initialize();
}());
