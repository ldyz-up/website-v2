/*
 * Google Analytics 4 configuration
 * Paste your GA4 Measurement ID (format: G-XXXXXXXXXX) below to enable tracking.
 * Do not send names, emails, phone numbers, file names or artwork to GA4.
 */
(function () {
  "use strict";

  const MEASUREMENT_ID = "";

  function isConfigured() {
    return /^G-[A-Z0-9]+$/i.test(MEASUREMENT_ID);
  }

  function init() {
    if (!isConfigured() || document.querySelector('script[data-ldyz-ga4]')) return;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(MEASUREMENT_ID);
    script.dataset.ldyzGa4 = "true";
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", MEASUREMENT_ID, { anonymize_ip: true });
  }

  window.LDYZAnalytics = {
    track: function (eventName, parameters) {
      if (!isConfigured()) return;
      init();
      window.gtag("event", eventName, parameters || {});
    },
    configured: isConfigured
  };

  init();
})();
