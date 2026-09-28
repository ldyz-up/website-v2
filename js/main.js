/* ============================================================
   LongDe Yizhi 官网 - 交互脚本（V3）
   包含：语言切换、产品分类/产品渲染、询价表单等
   ============================================================ */

(function () {
  "use strict";

  const LANGS = ["en", "zh", "zh_tw", "ja", "ko", "fr"];
  const LANG_NAMES = { en: "English", zh: "中文", zh_tw: "繁體中文", ja: "日本語", ko: "한국어", fr: "Français" };
  const LANG_CODES = { en: "en", zh: "zh-CN", zh_tw: "zh-TW", ja: "ja", ko: "ko", fr: "fr" };
  const STORAGE_KEY = "longde_site_lang";
  const DEFAULT_LANG = "en";
  const COUNTRY_LANGS = { CN: "zh", TW: "zh_tw", HK: "zh_tw", MO: "zh_tw", JP: "ja", KR: "ko", FR: "fr" };
  let hasExplicitLanguageChoice = false;

  /* ==================== 询价表单发送配置 ====================
   * GitHub Pages is static, so inquiry email is sent through our
   * Cloudflare Worker. Keep all provider credentials on the Worker.
   * ========================================================== */
  const INQUIRY_ENDPOINT = "https://forms.ldyzgroup.com/submit";

  /* ---------- 获取初始语言：优先地址栏 ?lang=，其次本地记忆，默认英文 ---------- */
  function getInitialLang() {
    try {
      const urlLang = new URLSearchParams(window.location.search).get("lang");
      if (urlLang && LANGS.includes(urlLang)) {
        hasExplicitLanguageChoice = true;
        return urlLang;
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LANGS.includes(saved)) {
        hasExplicitLanguageChoice = true;
        return saved;
      }
    } catch (e) { /* 忽略存储异常 */ }
    const browserLang = getBrowserLanguage();
    if (browserLang) return browserLang;
    return DEFAULT_LANG;
  }

  function getBrowserLanguage() {
    const languages = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language]).filter(Boolean);
    for (let i = 0; i < languages.length; i += 1) {
      const code = String(languages[i]).toLowerCase().replace("_", "-");
      if (code === "zh-tw" || code === "zh-hk" || code === "zh-mo") return "zh_tw";
      if (code.indexOf("zh") === 0) return "zh";
      if (code.indexOf("ja") === 0) return "ja";
      if (code.indexOf("ko") === 0) return "ko";
      if (code.indexOf("fr") === 0) return "fr";
      if (code.indexOf("en") === 0) return "en";
    }
    return null;
  }

  function applyCountryLanguageFallback() {
    if (hasExplicitLanguageChoice || getBrowserLanguage() || !window.fetch) return;
    fetch("visitor-country.php", { cache: "no-store", headers: { Accept: "application/json" } })
      .then(function (response) { return response.ok ? response.json() : null; })
      .then(function (data) {
        const lang = data && COUNTRY_LANGS[String(data.country || "").toUpperCase()];
        if (lang && !hasExplicitLanguageChoice && currentLang === DEFAULT_LANG) applyLang(lang, false);
      })
      .catch(function () { /* 本地预览或非 PHP 主机上静默回退至浏览器语言/英语 */ });
  }

  let currentLang = getInitialLang();

  /* ---------- 深层取值：支持 "categories.0.name" 这样的路径 ---------- */
  function getText(lang, key) {
    return key.split(".").reduce(function (obj, k) {
      return obj && obj[k] != null ? obj[k] : null;
    }, TRANSLATIONS[lang]);
  }

  function esc(s) {
    return String(s == null ? "" : s);
  }

  function getCategories(t) {
    const babyCategory = Object.assign({}, t.categories[0], {
      img: "website-images/Codex输出图片/Bath Book and Waterproof Kids Products/category-hero-baby-kids-web.jpg"
    });
    const officeCategory = Object.assign({}, t.categories[1], {
      img: "website-images/Codex输出图片/办公及文具用品/活页本/floral-six-ring-binder-hero-web.jpg"
    });
    // 首页只展示未来 12 个月的重点获客品类；其他能力保留在独立页面和询价沟通中。
    return [babyCategory, officeCategory];
  }

  /* ---------- 渲染产品分类卡片 ---------- */
  function renderCategories() {
    const grid = document.getElementById("categoryGrid");
    if (!grid) return;
    const t = TRANSLATIONS[currentLang];
    grid.innerHTML = getCategories(t).map(function (c, i) {
      const categoryLinks = {
        baby: "bath-books.html",
        office: "stationery-office-products.html",
        bags: "bags-pouches.html",
        custom: "custom-rf-welded-products.html"
      };
      const categoryLink = categoryLinks[c.id] || "#products";
      return (
        '<a class="category-card" href="' + categoryLink + '" data-cat="' + c.id + '">' +
          '<div class="category-media"><img src="' + c.img + '" alt="' + esc(c.name) + '" loading="lazy"></div>' +
          '<div class="category-body">' +
            '<span class="category-num">0' + (i + 1) + "</span>" +
            '<h3 class="category-name">' + esc(c.name) + "</h3>" +
            '<p class="category-intro">' + esc(c.intro) + "</p>" +
            '<span class="category-cta">' + esc(t.products_cta) + ' <span aria-hidden="true">→</span></span>' +
          "</div>" +
        "</a>"
      );
    }).join("");
  }

  /* ---------- 渲染 OEM/ODM 流程 ---------- */
  function renderOemSteps() {
    const journey = document.getElementById("oemJourney");
    if (!journey) return;
    const t = TRANSLATIONS[currentLang];
    const visualClasses = ["journey-idea", "journey-sample", "journey-production", "journey-delivery"];
    journey.innerHTML = '<div class="journey-track" aria-hidden="true"><i></i></div>' + t.oem_steps.map(function (s, i) {
      const visuals = [
        '<div class="journey-visual journey-idea" aria-hidden="true"><span class="journey-board"><b></b><em></em></span><span class="journey-pen"></span></div>',
        '<div class="journey-visual journey-sample" aria-hidden="true"><span class="sample-mold"></span><span class="sample-sheet"></span><span class="sample-book sample-book-a"></span><span class="sample-book sample-book-b"></span></div>',
        '<div class="journey-visual journey-production" aria-hidden="true"><span class="production-machine"><b></b></span><span class="production-worker"><b></b><i></i></span><span class="production-piece"></span></div>',
        '<div class="journey-visual journey-delivery" aria-hidden="true"><span class="delivery-box delivery-box-a"></span><span class="delivery-box delivery-box-b"></span><span class="delivery-truck"><b></b><i></i><i></i></span></div>'
      ];
      const visual = visuals[i] || visuals[0];
      return (
        '<article class="oem-card journey-stage">' +
          visual +
          '<div class="oem-num">' + s.num + "</div>" +
          '<h3 class="oem-title">' + esc(s.title) + "</h3>" +
          '<p class="oem-desc">' + esc(s.desc) + "</p>" +
        "</article>"
      );
    }).join("");
    activateJourney(journey);
  }

  function activateJourney(journey) {
    journey.classList.remove("is-active");
    if (!("IntersectionObserver" in window)) {
      journey.classList.add("is-active");
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        journey.classList.add("is-active");
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(journey);
  }

  /* ---------- 渲染工厂图片 ---------- */
  let factorySlides = [];
  let factoryOffset = 0;
  let factoryStep = 0;
  let factoryCycleWidth = 0;
  let factoryFrame = null;
  let factoryLastTime = 0;
  let factoryManualMove = null;
  let factoryKeyboardPaused = false;
  let factoryHovered = false;
  let factoryInView = false;
  let factoryCarouselReady = false;
  let factorySuppressClick = false;

  function factoryReducedMotion() {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function factoryCanAdvance() {
    const lightbox = document.getElementById("factoryLightbox");
    return !factoryKeyboardPaused && !factoryHovered && factoryInView && !document.hidden && !factoryReducedMotion() && (!lightbox || lightbox.hidden);
  }

  function positionFactoryCarousel() {
    const track = document.getElementById("factoryTrack");
    if (!track || !factorySlides.length || !factoryStep) return;
    track.style.transform = "translate3d(" + (-factoryOffset) + "px, 0, 0)";
  }

  function sizeFactoryCarousel() {
    const track = document.getElementById("factoryTrack");
    if (!track || !track.children.length) return;
    const oldCycle = factoryCycleWidth;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
    factoryStep = track.children[0].getBoundingClientRect().width + gap;
    factoryCycleWidth = factoryStep * factorySlides.length;
    factoryOffset = oldCycle ? (factoryOffset % oldCycle) / oldCycle * factoryCycleWidth : 0;
    factoryManualMove = null;
    positionFactoryCarousel();
  }

  function factoryTick(time) {
    factoryFrame = null;
    const elapsed = factoryLastTime ? Math.min(time - factoryLastTime, 64) : 0;
    factoryLastTime = time;
    if (factoryManualMove) {
      if (!factoryManualMove.started) factoryManualMove.started = time;
      const progress = Math.min((time - factoryManualMove.started) / 650, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      factoryOffset = factoryManualMove.from + (factoryManualMove.to - factoryManualMove.from) * eased;
      if (progress === 1) {
        factoryOffset = ((factoryOffset % factoryCycleWidth) + factoryCycleWidth) % factoryCycleWidth;
        factoryManualMove = null;
      }
      positionFactoryCarousel();
    } else if (factoryCanAdvance() && factoryCycleWidth) {
      // A constant, slow travel reads like a continuous production gallery rather than a slideshow.
      factoryOffset = (factoryOffset + elapsed * 0.042) % factoryCycleWidth;
      positionFactoryCarousel();
    }
    if (factoryManualMove || factoryCanAdvance()) factoryFrame = window.requestAnimationFrame(factoryTick);
    else factoryLastTime = 0;
  }

  function ensureFactoryTicker() {
    if (factoryFrame == null && (factoryManualMove || factoryCanAdvance())) {
      factoryLastTime = 0;
      factoryFrame = window.requestAnimationFrame(factoryTick);
    }
  }

  function updateFactoryAutoplay() {
    ensureFactoryTicker();
  }

  function moveFactorySlide(direction) {
    if (!factorySlides.length || !factoryStep) return;
    factoryManualMove = null;
    if (factoryReducedMotion()) {
      factoryOffset = ((Math.floor(factoryOffset / factoryStep) + direction) * factoryStep + factoryCycleWidth) % factoryCycleWidth;
      positionFactoryCarousel();
      return;
    }
    if (direction < 0 && factoryOffset < factoryStep) factoryOffset += factoryCycleWidth;
    const target = direction > 0
      ? (Math.floor(factoryOffset / factoryStep) + 1) * factoryStep
      : (Math.ceil(factoryOffset / factoryStep) - 1) * factoryStep;
    factoryManualMove = { from: factoryOffset, to: target, started: 0 };
    ensureFactoryTicker();
  }

  function initFactoryCarousel() {
    if (factoryCarouselReady) return;
    const carousel = document.getElementById("factoryCarousel");
    const track = document.getElementById("factoryTrack");
    if (!carousel || !track) return;
    factoryCarouselReady = true;
    const viewport = document.getElementById("factoryViewport");
    let swipeStart = null;
    viewport.addEventListener("pointerdown", function (event) { swipeStart = event.clientX; });
    viewport.addEventListener("pointerup", function (event) {
      if (swipeStart == null) return;
      const delta = event.clientX - swipeStart;
      swipeStart = null;
      if (Math.abs(delta) > 45) {
        factorySuppressClick = true;
        moveFactorySlide(delta < 0 ? 1 : -1);
        window.setTimeout(function () { factorySuppressClick = false; }, 0);
      }
    });
    viewport.addEventListener("pointercancel", function () { swipeStart = null; });
    carousel.addEventListener("pointerenter", function () { factoryHovered = true; updateFactoryAutoplay(); });
    carousel.addEventListener("pointerleave", function () { factoryHovered = false; updateFactoryAutoplay(); });
    carousel.addEventListener("focusin", function (event) {
      if (event.target.matches(":focus-visible")) { factoryKeyboardPaused = true; updateFactoryAutoplay(); }
    });
    carousel.addEventListener("focusout", function (event) {
      if (!carousel.contains(event.relatedTarget)) { factoryKeyboardPaused = false; updateFactoryAutoplay(); }
    });
    window.addEventListener("resize", sizeFactoryCarousel);
    document.addEventListener("visibilitychange", updateFactoryAutoplay);
    const motionQuery = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motionQuery && motionQuery.addEventListener) motionQuery.addEventListener("change", updateFactoryAutoplay);
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(function (entries) {
        factoryInView = entries[0].isIntersecting;
        updateFactoryAutoplay();
      }, { threshold: 0.15 });
      observer.observe(carousel);
    } else { factoryInView = true; updateFactoryAutoplay(); }
  }

  function renderFactory() {
    const track = document.getElementById("factoryTrack");
    if (!track) return;
    const t = TRANSLATIONS[currentLang];
    factorySlides = t.factory_tiles;
    factoryOffset = 0;
    factoryCycleWidth = 0;
    function tile(f, index, clone) {
      const label = f.label;
      return (
        '<figure class="factory-tile"' + (clone ? ' aria-hidden="true" tabindex="-1"' : ' role="button" tabindex="0" data-factory-index="' + index + '"') + '>' +
          '<img src="' + f.img + '" alt="' + esc(label) + '" loading="lazy">' +
          "<figcaption>" + esc(label) + "</figcaption>" +
        "</figure>"
      );
    }
    // Repeat the complete sequence so the last photo flows into the first without a visible jump.
    track.innerHTML = factorySlides.map(function (photo, index) { return tile(photo, index, false); }).join("") + factorySlides.map(function (photo, index) { return tile(photo, index, true); }).join("");
    initFactoryCarousel();
    sizeFactoryCarousel();
    updateFactoryAutoplay();
  }

  /* ---------- 工厂图片当前页放大预览 ---------- */
  const factoryLightbox = document.getElementById("factoryLightbox");
  const factoryLightboxImage = document.getElementById("factoryLightboxImage");
  if (factoryLightbox && factoryLightboxImage) {
    const factoryTrack = document.getElementById("factoryTrack");
    function openFactoryLightbox(tile) {
      const image = tile.querySelector("img");
      factoryLightboxImage.src = image.currentSrc || image.src;
      factoryLightboxImage.alt = image.alt;
      factoryLightbox.hidden = false;
      document.body.style.overflow = "hidden";
      updateFactoryAutoplay();
    }
    factoryTrack.addEventListener("click", function (event) {
      if (factorySuppressClick) { event.preventDefault(); return; }
      const tile = event.target.closest(".factory-tile");
      if (!tile) return;
      openFactoryLightbox(tile);
    });
    factoryTrack.addEventListener("keydown", function (event) {
      const tile = event.target.closest(".factory-tile:not([aria-hidden='true'])");
      if (tile && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); openFactoryLightbox(tile); }
    });
    function closeFactoryLightbox() {
      factoryLightbox.hidden = true;
      factoryLightboxImage.src = "";
      document.body.style.overflow = "";
      updateFactoryAutoplay();
    }
    factoryLightbox.addEventListener("click", function (event) {
      if (event.target === factoryLightbox || event.target.classList.contains("factory-lightbox-close")) closeFactoryLightbox();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && !factoryLightbox.hidden) closeFactoryLightbox();
    });
  }

  /* ---------- 填充询价表单的产品分类下拉 ---------- */
  function fillCategoryOptions() {
    const sel = document.getElementById("cfCategory");
    if (!sel) return;
    const t = TRANSLATIONS[currentLang];
    sel.innerHTML = getCategories(t).map(function (c) {
      return '<option value="' + esc(c.name) + '" data-category-id="' + esc(c.id) + '">' + esc(c.name) + "</option>";
    }).join("");
  }

  let inquiryPrefillApplied = false;
  function applyInquiryPrefill() {
    if (inquiryPrefillApplied) return;
    const params = new URLSearchParams(window.location.search);
    const product = params.get("product");
    const brief = params.get("brief");
    const categoryId = params.get("category_id");
    const targetMarket = params.get("target_market");
    if (!product && !brief && !categoryId && !targetMarket) return;
    inquiryPrefillApplied = true;
    const category = document.getElementById("cfCategory");
    if (category && categoryId) {
      const option = Array.prototype.find.call(category.options, function (item) { return item.dataset.categoryId === categoryId; });
      if (option) category.value = option.value;
    }
    if (product) document.getElementById("cfProduct").value = product;
    if (targetMarket) document.getElementById("cfTargetMarket").value = targetMarket;
    if (brief) document.getElementById("cfMsg").value = "Product configuration:\n" + brief;
    params.delete("product");
    params.delete("brief");
    params.delete("category_id");
    params.delete("target_market");
    const cleanUrl = window.location.pathname + (params.toString() ? "?" + params.toString() : "") + window.location.hash;
    try { window.history.replaceState({}, "", cleanUrl); } catch (e) { /* file:// previews may not allow URL cleanup */ }
  }

  /* ---------- 应用语言 ---------- */
  function applyLang(lang, save) {
    if (!TRANSLATIONS[lang]) lang = DEFAULT_LANG;
    currentLang = lang;
    const t = TRANSLATIONS[lang];

    document.documentElement.lang = LANG_CODES[lang];

    // 更新所有带 data-i18n 的文字
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const txt = getText(lang, el.dataset.i18n);
      if (txt != null) el.textContent = txt;
    });

    // 更新输入框占位文字
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      const txt = getText(lang, el.dataset.i18nPh);
      if (txt != null) el.setAttribute("placeholder", txt);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      const txt = getText(lang, el.dataset.i18nAria);
      if (txt != null) el.setAttribute("aria-label", txt);
    });

    // 品牌名：拉丁字母时启用宽字距样式
    document.querySelectorAll(".brand-name").forEach(function (el) {
      el.classList.toggle("brand-name-latin", /^[A-Za-z]/.test((el.textContent || "").trim()));
    });

    // 更新标题与描述
    if (t.meta_title) document.title = t.meta_title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t.meta_desc) metaDesc.setAttribute("content", t.meta_desc);

    // 重新生成内容
    renderCategories();
    renderOemSteps();
    renderFactory();
    fillCategoryOptions();
    applyInquiryPrefill();

    // 语言按钮状态（右上角图标按钮）
    document.querySelectorAll(".lang-switch button[data-lang]").forEach(function (b) {
      b.classList.toggle("active", b.dataset.lang === lang);
      b.setAttribute("aria-pressed", b.dataset.lang === lang ? "true" : "false");
    });
    const mobileLangSelect = document.getElementById("mobileLangSelect");
    if (mobileLangSelect) mobileLangSelect.value = lang;
  }

  /* ---------- 语言切换：页首与询价区共用 ---------- */
  document.addEventListener("click", function (e) {
    const btn = e.target.closest(".lang-switch button[data-lang]");
    if (!btn) return;
    hasExplicitLanguageChoice = true;
    applyLang(btn.dataset.lang, true);
    try { localStorage.setItem(STORAGE_KEY, btn.dataset.lang); } catch (err) { /* 忽略 */ }
  });
  const mobileLangSelect = document.getElementById("mobileLangSelect");
  if (mobileLangSelect) mobileLangSelect.addEventListener("change", function (e) {
    hasExplicitLanguageChoice = true;
    applyLang(e.target.value, true);
    try { localStorage.setItem(STORAGE_KEY, e.target.value); } catch (err) { /* Continue without persistence. */ }
  });

  /* ---------- 移动端菜单 ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  navToggle.addEventListener("click", function () {
    const open = mainNav.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  mainNav.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      mainNav.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- 页头滚动样式 + 回到顶部 ---------- */
  const header = document.getElementById("siteHeader");
  const backTop = document.getElementById("backTop");

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("scrolled", y > 10);
    backTop.classList.toggle("show", y > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- 主页询价表单：提交到 Cloudflare Worker ---------- */
  const contactForm = document.getElementById("contactForm");
  const submitBtn = contactForm.querySelector("button[type=submit]");
  const attachmentInput = document.getElementById("cfAttachments");
  const chooseAttachmentsBtn = document.getElementById("cfChooseFiles");
  const attachmentNames = document.getElementById("cfAttachmentNames");
  chooseAttachmentsBtn.addEventListener("click", function () { attachmentInput.click(); });
  attachmentInput.addEventListener("change", function () {
    const files = Array.from(attachmentInput.files);
    if (files.length) {
      attachmentNames.removeAttribute("data-i18n");
      attachmentNames.textContent = files.map(function (file) { return file.name; }).join(", ");
    } else {
      attachmentNames.dataset.i18n = "form_no_files";
      attachmentNames.textContent = TRANSLATIONS[currentLang].form_no_files;
    }
  });
  const modalOverlay = document.getElementById("formModal");
  const modalIcon = document.getElementById("modalIcon");
  const modalTitle = document.getElementById("modalTitle");
  const modalOk = document.getElementById("modalOk");
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  let inquiryStarted = false;
  let inquiryViewed = false;

  function track(eventName, parameters) {
    if (window.LDYZAnalytics && typeof window.LDYZAnalytics.track === "function") {
      window.LDYZAnalytics.track(eventName, parameters);
    }
  }

  if ("IntersectionObserver" in window) {
    const inquiryObserver = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !inquiryViewed) {
        inquiryViewed = true;
        track("view_rfq_form", { page_type: "home", language: currentLang });
        inquiryObserver.disconnect();
      }
    }, { threshold: 0.2 });
    inquiryObserver.observe(contactForm);
  }

  contactForm.addEventListener("focusin", function () {
    if (inquiryStarted) return;
    inquiryStarted = true;
    track("begin_rfq", { page_type: "home", language: currentLang });
  });

  function showModal(kind, text) {
    modalIcon.textContent = kind === "ok" ? "✓" : "!";
    modalIcon.className = "modal-icon " + (kind === "ok" ? "ok" : "err");
    modalTitle.textContent = text;
    modalOk.hidden = kind === "sending";
    modalOverlay.hidden = false;
  }

  function hideModal() { modalOverlay.hidden = true; }

  modalOk.addEventListener("click", hideModal);
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) hideModal();
  });

  function getFormVal(id) {
    return (document.getElementById(id).value || "").trim();
  }

  function markInvalid(id, bad) {
    document.getElementById(id).classList.toggle("is-invalid", bad);
  }

  // 必填字段输入时即时清除红框
  ["cfName", "cfCompany", "cfEmail"].forEach(function (id) {
    document.getElementById(id).addEventListener("input", function () {
      markInvalid(id, false);
    });
  });

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const t = TRANSLATIONS[currentLang];
    const name = getFormVal("cfName");
    const company = getFormVal("cfCompany");
    const email = getFormVal("cfEmail");
    const category = getFormVal("cfCategory");
    const product = getFormVal("cfProduct");
    const qty = getFormVal("cfQty");
    const msg = getFormVal("cfMsg");
    const attachmentBytes = Array.from(attachmentInput.files).reduce(function (sum, file) { return sum + file.size; }, 0);

    if (attachmentBytes > 15 * 1024 * 1024) {
      showModal("err", t.form_attachments_too_large);
      return;
    }

    // 必填校验：名称、公司名称、邮箱（邮箱必须是正确的邮件格式）
    let valid = true;
    let emailBad = false;
    if (!name) { markInvalid("cfName", true); valid = false; }
    if (!company) { markInvalid("cfCompany", true); valid = false; }
    if (!email) { markInvalid("cfEmail", true); valid = false; }
    else if (!EMAIL_RE.test(email)) { markInvalid("cfEmail", true); emailBad = true; valid = false; }
    if (!valid) {
      showModal("err", emailBad ? t.form_email_invalid : t.form_required);
      return;
    }

    submitBtn.disabled = true;
    showModal("sending", t.form_sending);

    const formData = new FormData(contactForm);
    formData.set("lang", currentLang);
    if (window.LDYZAttribution) window.LDYZAttribution.addToFormData(formData);

    fetch(INQUIRY_ENDPOINT, { method: "POST", body: formData, headers: { Accept: "application/json" } })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        submitBtn.disabled = false;
        if (data && data.success === true) {
          track("generate_lead", {
            lead_type: "rfq",
            page_type: "home",
            product_category: category || "not_specified",
            language: currentLang
          });
          contactForm.reset();
          attachmentNames.dataset.i18n = "form_no_files";
          attachmentNames.textContent = t.form_no_files;
          showModal("ok", t.form_success);
        } else {
          showModal("err", t.form_error);
        }
      })
      .catch(function () {
        submitBtn.disabled = false;
        showModal("err", t.form_error);
      });
  });

  /* ---------- 滚动入场动画 ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- 启动：应用初始语言（默认英文） ---------- */
  applyLang(currentLang, false);
  applyCountryLanguageFallback();
})();
