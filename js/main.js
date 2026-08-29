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

  /* ==================== 询价表单发送配置 ====================
   * 客户点击 Request a Quote 后，信息如何送到您的邮箱？
   *
   * 【推荐 · GitHub Pages 免费方案】Web3Forms 中转（不弹邮箱软件）：
   *   1. 打开 https://web3forms.com ，用 sales@longdeyizhi.com 注册；
   *   2. 把网站生成的 Access Key 填到下方 web3forms_key 引号里；
   *   3. 保存后上传，客户提交询价 → 邮件直接发到您的邮箱（不再弹邮箱软件）。
   *
   * 【服务器方案】部署到支持 PHP 的服务器（Hostinger / 阿里云）后，
   *   保持 web3forms_key 为空，脚本会自动改用 send_mail.php 发送。
   *   本地双击预览（无服务器）时，仍会退回调用邮箱软件的方式。
   * ========================================================== */
  const FORM_CONFIG = {
    web3forms_key: "1a79cad1-a0c1-42bc-a32e-d51225ca4e09"   // Web3Forms 的 Access Key
  };

  /* ---------- 获取初始语言：优先地址栏 ?lang=，其次本地记忆，默认英文 ---------- */
  function getInitialLang() {
    try {
      const urlLang = new URLSearchParams(window.location.search).get("lang");
      if (urlLang && LANGS.includes(urlLang)) return urlLang;
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && LANGS.includes(saved)) return saved;
    } catch (e) { /* 忽略存储异常 */ }
    return DEFAULT_LANG;
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

  /* ---------- 渲染产品分类卡片 ---------- */
  function renderCategories() {
    const grid = document.getElementById("categoryGrid");
    if (!grid) return;
    const t = TRANSLATIONS[currentLang];
    grid.innerHTML = t.categories.map(function (c, i) {
      return (
        '<a class="category-card" href="#cat-' + c.id + '" data-cat="' + c.id + '">' +
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

  /* ---------- 渲染每个分类下的具体产品 ---------- */
  function renderCategoryProducts() {
    const wrap = document.getElementById("categoryProducts");
    if (!wrap) return;
    const t = TRANSLATIONS[currentLang];
    wrap.innerHTML = t.categories.map(function (c) {
      const cards = c.products.map(function (p) {
        return (
          '<div class="p-card">' +
            '<div class="p-media"><img src="' + p.img + '" alt="' + esc(p.name) + '" loading="lazy"></div>' +
            '<div class="p-body"><h4 class="p-name">' + esc(p.name) + "</h4>" +
            '<p class="p-desc">' + esc(p.desc) + "</p></div>" +
          "</div>"
        );
      }).join("");
      return (
        '<div class="cat-block" id="cat-' + c.id + '">' +
          '<div class="cat-block-head">' +
            '<h3 class="cat-block-title">' + esc(c.name) + "</h3>" +
            '<a class="cat-block-link" href="#contact">' + esc(t.quote_btn) + "</a>" +
          "</div>" +
          '<div class="p-grid">' + cards + "</div>" +
        "</div>"
      );
    }).join("");
  }

  /* ---------- 渲染 OEM/ODM 流程 ---------- */
  function renderOemSteps() {
    const grid = document.getElementById("oemGrid");
    if (!grid) return;
    const t = TRANSLATIONS[currentLang];
    grid.innerHTML = t.oem_steps.map(function (s) {
      return (
        '<div class="oem-card">' +
          '<div class="oem-num">' + s.num + "</div>" +
          '<h3 class="oem-title">' + esc(s.title) + "</h3>" +
          '<p class="oem-desc">' + esc(s.desc) + "</p>" +
        "</div>"
      );
    }).join("");
  }

  /* ---------- 渲染工厂图片 ---------- */
  function renderFactory() {
    const grid = document.getElementById("factoryGrid");
    if (!grid) return;
    const t = TRANSLATIONS[currentLang];
    grid.innerHTML = t.factory_tiles.map(function (f) {
      return (
        '<figure class="factory-tile">' +
          '<img src="' + f.img + '" alt="' + esc(f.label) + '" loading="lazy">' +
          "<figcaption>" + esc(f.label) + "</figcaption>" +
        "</figure>"
      );
    }).join("");
  }

  /* ---------- 填充询价表单的产品分类下拉 ---------- */
  function fillCategoryOptions() {
    const sel = document.getElementById("cfCategory");
    if (!sel) return;
    const t = TRANSLATIONS[currentLang];
    sel.innerHTML = t.categories.map(function (c) {
      return '<option value="' + esc(c.name) + '">' + esc(c.name) + "</option>";
    }).join("");
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
    renderCategoryProducts();
    renderOemSteps();
    renderFactory();
    fillCategoryOptions();

    // 语言按钮状态（右上角图标按钮）
    document.querySelectorAll(".lang-switch button[data-lang]").forEach(function (b) {
      b.classList.toggle("active", b.dataset.lang === lang);
    });
  }

  /* ---------- 语言切换（右上角图标按钮） ---------- */
  const langSwitch = document.getElementById("langSwitch");
  langSwitch.addEventListener("click", function (e) {
    const btn = e.target.closest("button[data-lang]");
    if (!btn) return;
    applyLang(btn.dataset.lang, true);
    try { localStorage.setItem(STORAGE_KEY, btn.dataset.lang); } catch (err) { /* 忽略 */ }
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

  /* ---------- 询价表单：优先提交到服务器 send_mail.php ---------- */
  const contactForm = document.getElementById("contactForm");
  const submitBtn = contactForm.querySelector("button[type=submit]");
  const modalOverlay = document.getElementById("formModal");
  const modalIcon = document.getElementById("modalIcon");
  const modalTitle = document.getElementById("modalTitle");
  const modalOk = document.getElementById("modalOk");
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

    let endpoint = "send_mail.php";
    let viaWeb3 = false;
    if (FORM_CONFIG.web3forms_key) {
      viaWeb3 = true;
      endpoint = "https://api.web3forms.com/submit";
      formData.set("access_key", FORM_CONFIG.web3forms_key);
      formData.set(
        "subject",
        "[" + LANG_NAMES[currentLang] + "] " + t.mail_subject +
        (company ? " - " + company : "") +
        (product ? " - " + product : "")
      );
    }

    fetch(endpoint, { method: "POST", body: formData })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        submitBtn.disabled = false;
        if ((data && data.ok) || (viaWeb3 && data && data.success)) {
          contactForm.reset();
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
})();
