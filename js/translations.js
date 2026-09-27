/* ============================================================
   网站多语言内容文件（V3）
   语言代码：zh=中文  en=英语  ja=日语  ko=韩语  fr=法语
   【改字方法】找到对应语言的引号内容修改，保存并刷新网页即可。
   注意：引号请使用英文引号 " "，不要用中文引号“ ”。
   【增加产品】在对应语言的 categories 数组里：
     新增分类：复制一个 { id, name, intro, img, products: [...] } 对象；
     新增产品：在某个分类的 products 数组里加一条 { img, name, desc }。
   ============================================================ */

const TRANSLATIONS = {

  /* ---------------- 中文 ---------------- */
  zh: {
    "brand_short": "LongDe Yizhi",
    "brand_name": "龙德益智（东莞）新材料有限公司",
    "nav_products": "产品中心",
    "nav_oem": "OEM / ODM",
    "nav_factory": "工厂与品控",
    "nav_about": "公司背景",
    "nav_contact": "联系我们",
    "quote_btn": "获取报价",
    "hero_title": "为品牌与进口商定制洗澡书和活页夹",
    "hero_materials": "采用 EVA、PVC 与 TPU 制造",
    "hero_sub": "面向儿童用品与文具品牌，支持从图纸、样品或构想开始的定制制造。",
    "hero_proof": ["近 20 年制造经验积累", "OEM / 定制开发", "EVA · PVC · TPU", "高频焊接制造"],
    "hero_cta1": "获取报价",
    "hero_cta2": "探索洗澡书",
    "hero_card_bath": "洗澡书",
    "hero_card_binder": "活页本",
    "hero_capability_tag": "定制制造",
    "hero_capability_detail": "高频焊接 · 装配",
    "tagline": "支持 OEM / ODM 定制 · 一站式打样量产 · 面向全球客户",
    "sec_products_tag": "产品中心",
    "sec_products_title": "产品分类",
    "sec_products_sub": "重点品类为洗澡书与定制活页夹，并可按项目评估其他软质塑料产品。",
    "sec_commercial_tag": "合作基准",
    "sec_commercial_title": "重点 OEM 产品，从清晰的合作预期开始",
    "sec_commercial_sub": "在正式报价前先明确关键预期，便于您的团队规划项目。",
    "commercial_moq_label": "洗澡书起订量",
    "commercial_moq_value": "3,000 件起",
    "commercial_sample_label": "打样周期",
    "commercial_sample_value": "洗澡书：约 10 个工作日 · 活页本：约 3 个工作日",
    "commercial_delivery_label": "常规量产交付",
    "commercial_delivery_value": "样品确认后约 45 天",
    "commercial_reply_label": "询盘回复",
    "commercial_reply_value": "1 个工作日内",
    "commercial_note": "洗澡书 MOQ 及项目周期将依据最终规格、图稿、测试、包装及交付要求确认。",
    "products_cta": "查看分类",
    "products_more": "没有找到需要的产品？告诉我们您的需求 →",
    "bags_name": "袋类与收纳包",
    "bags_intro": "定制拉链袋、收纳袋及产品包装解决方案。",
    "categories": [
      {
        "id": "baby",
        "name": "儿童用品",
        "intro": "为婴幼儿和儿童提供柔软、安全、防水的 EVA、TPU、PVC 产品。",
        "img": "website-images/Codex输出图片/Bath Book and Waterproof Kids Products/category-hero-baby-kids.png",
        "products": [
          {
            "img": "images/product-bathbook.svg",
            "name": "洗澡书",
            "desc": "柔软防水的婴幼儿沐浴阅读书。"
          },
          {
            "img": "images/product-softbook.svg",
            "name": "布书 / 软质书",
            "desc": "为婴幼儿和儿童设计的柔软轻便产品。"
          },
          {
            "img": "images/product-waterproof.svg",
            "name": "防水儿童用品",
            "desc": "为儿童定制的防水产品。"
          }
        ]
      },
      {
        "id": "office",
        "name": "办公及文具用品",
        "intro": "适用于日常办公的实用、耐用的文件袋、活页本与封面。",
        "img": "website-images/categories/category-office-ring-binder.png",
        "products": [
          {
            "img": "images/product-folder.svg",
            "name": "文件袋",
            "desc": "用于文件存储与整理的定制文件袋。"
          },
          {
            "img": "images/product-ringbinder.svg",
            "name": "活页本",
            "desc": "办公文具应用的定制 EVA / PVC 活页本。"
          },
          {
            "img": "images/product-notebookcover.svg",
            "name": "笔记本封面",
            "desc": "笔记本与计划本的定制封面。"
          },
          {
            "img": "images/product-filepocket.svg",
            "name": "文件插袋",
            "desc": "灵活的文件存储解决方案。"
          }
        ]
      },
      {
        "id": "custom",
        "name": "定制产品",
        "intro": "按您的形状、尺寸、印刷与包装要求开发产品。",
        "img": "images/cat-custom.svg",
        "products": [
          {
            "img": "images/product-customeva.svg",
            "name": "定制 EVA 产品",
            "desc": "按您的设计定制的柔软轻便 EVA 产品。"
          },
          {
            "img": "images/product-customtpu.svg",
            "name": "定制 TPU 产品",
            "desc": "按您的设计定制的透明耐用 TPU 产品。"
          },
          {
            "img": "images/product-custompvc.svg",
            "name": "定制 PVC 产品",
            "desc": "按您的设计定制的柔性 PVC 产品。"
          }
        ]
      }
    ],
    "sec_oem_tag": "OEM / ODM",
    "sec_oem_title": "从您的想法到成品",
    "sec_oem_sub": "四个简单步骤，将您的概念变成产品。",
    "sec_oem_detail": "无论您提供图纸、现有样品或产品构想，我们均可支持材料选择、打样、印刷、裁切、高频焊接、装配与最终包装。",
    "oem_steps": [
      {
        "num": "01",
        "title": "设计",
        "desc": "发送您的图纸、样品或想法。"
      },
      {
        "num": "02",
        "title": "打样",
        "desc": "我们开发产品并制作样品。"
      },
      {
        "num": "03",
        "title": "量产",
        "desc": "根据确认样品进行批量生产。"
      },
      {
        "num": "04",
        "title": "交付",
        "desc": "检验、包装与发货。"
      }
    ],
    "oem_cta": "启动您的项目",
    "sec_factory_tag": "工厂",
    "sec_factory_title": "工厂展示",
    "sec_factory_sub": "材料选择 · 印刷 · 裁切 · 高频焊接 · 装配 · 检查 · 包装",
    "factory_previous": "查看上一组工厂照片",
    "factory_next": "查看下一组工厂照片",
    "factory_slides": "工厂照片导航",
    "factory_slide_label": "第",
    "factory_lightbox": "工厂照片预览",
    "factory_close": "关闭照片预览",
    "factory_pause": "暂停播放",
    "factory_play": "继续播放",
    "sec_quality_tag": "品质与测试支持",
    "sec_quality_title": "从确认产品规格开始做好品质",
    "sec_quality_sub": "生产前确认产品需求与样品。检验方式及第三方测试按项目和目标市场沟通确认。",
    "quality_item_1_title": "规格确认",
    "quality_item_1_desc": "与客户确认材料、结构、图稿、尺寸及包装要求。",
    "quality_item_2_title": "样品确认",
    "quality_item_2_desc": "量产前共同确认参考样品及产品关键细节。",
    "quality_item_3_title": "检验与测试协调",
    "quality_item_3_desc": "沟通项目检验要点，并在需要时协调适用的第三方测试。",
    "quality_bsci_title": "amfori BSCI 社会责任审核",
    "quality_bsci_desc": "社会责任审核资料可应合格采购客户要求提供。",
    "factory_tiles": [
      { "img": "website-images/Codex输出图片/工厂与品质/factory-exterior-no-cars.jpg", "label": "工厂外观" },
      { "img": "website-images/Codex输出图片/工厂与品质/sample-library-redacted.png", "label": "样品室" },
      { "img": "website-images/Codex输出图片/工厂与品质/high-frequency-welding-redacted.png", "label": "高频焊接" },
      { "img": "website-images/Codex输出图片/工厂与品质/workshop-high-frequency-redacted.png", "label": "高频焊接" },
      { "img": "website-images/Codex输出图片/工厂与品质/production-line.png", "label": "印刷生产线" },
      { "img": "website-images/Codex输出图片/工厂与品质/film-laminating-redacted.png", "label": "切料生产" },
      { "img": "website-images/Codex输出图片/工厂与品质/manual-assembly-redacted.png", "label": "手工装配" },
      { "img": "website-images/Codex输出图片/工厂与品质/team-inspection-redacted.png", "label": "员工培训" },
      { "img": "website-images/Codex输出图片/工厂与品质/tooling-storage.png", "label": "模具管理" },
      { "img": "website-images/Codex输出图片/工厂与品质/container-loading.png", "label": "装柜与发运" }
    ],
    "sec_heritage_tag": "公司背景",
    "sec_heritage_title": "依托龙德塑胶近 20 年经验，稳步开拓新业务",
    "heritage_p1": "龙德益智是东莞龙德塑胶制品面向新业务设立的新公司，依托龙德塑胶近 20 年的产品开发与制造经验，专注开拓新业务、研发新产品。",
    "heritage_p2": "现阶段，我们重点发展洗澡书与定制活页夹，并围绕客户需求持续完善产品与制造方案。",
    "heritage_cta": "洽谈您的项目",
    "heritage_points": [
      { "title": "近 20 年", "desc": "龙德塑胶的产品开发与制造经验" },
      { "title": "新业务方向", "desc": "持续拓展业务并研发新产品" },
      { "title": "当前重点", "desc": "洗澡书与定制活页夹" }
    ],
    "sec_about_tag": "关于我们",
    "sec_about_title": "关于 LongDe Yizhi",
    "about_p1": "龙德益智位于中国东莞，围绕洗澡书、活页夹及其他软质塑料产品承接定制项目。",
    "about_p2": "我们与客户沟通产品需求，并围绕确认的材料、样品、生产、检验与包装要求推进项目。",
    "about_values": [
      "EVA · TPU · PVC",
      "OEM / ODM",
      "定制制造"
    ],
    "sec_contact_tag": "联系我们",
    "contact_language_prompt": "选择询价表单语言：",
    "contact_language_group": "选择询价表单语言",
    "sec_contact_title": "让我们携手合作",
    "sec_contact_sub": "有产品想法或需要定制解决方案？告诉我们您的项目。",
    "contact_addr_label": "公司地址",
    "contact_addr": "广东省东莞市寮步镇进士路56号2栋301室",
    "contact_email_label": "邮箱",
    "contact_email": "sales@longdeyizhi.com",
    "qr_wechat_title": "微信客服",
    "qr_wechat_1": "微信客服 1",
    "qr_wechat_2": "微信客服 2",
    "qr_line_title": "LINE 客服",
    "qr_line": "LINE 客服",
    "contact_hours_label": "工作时间",
    "contact_hours": "周一至周六 8:30 – 18:00",
    "map_link": "在 Google 地图中查看",
    "form_name": "您的姓名",
    "form_company": "公司名称",
    "form_email": "您的邮箱",
    "form_category": "产品分类",
    "form_market": "目标市场",
    "form_market_ph": "例如：欧盟、美国、日本、韩国",
    "form_product": "产品",
    "form_qty": "数量",
    "form_msg": "留言内容",
    "form_attachments": "上传附件（可选）",
    "form_attachments_note": "可添加图纸、参考图片或 Logo，附件总大小不超过 15 MB。",
    "form_attachments_too_large": "附件总大小不能超过 15 MB，请移除部分文件后重试。",
    "form_phone": "电话",
    "form_wechat": "微信",
    "form_contact_app": "其他联系方式（WhatsApp / LINE 等）",
    "form_send": "获取报价",
    "form_note": "提交后我们会尽快通过邮件回复您，请留意查收。",
    "form_sending": "正在发送…",
    "form_success": "提交成功！我们会尽快通过邮件回复您。",
    "form_error": "提交失败，请稍后重试，或直接发送邮件到 sales@longdeyizhi.com。",
    "form_required": "请填写所有必填项（姓名、公司名称、邮箱）。",
    "form_email_invalid": "邮箱格式不正确，请检查后重新填写。",
    "modal_ok": "好的",
    "mail_intro": "您好，我的姓名是",
    "mail_subject": "官网询盘",
    "footer_blurb": "专注于 EVA、TPU、PVC 产品的专业制造商，为婴幼儿、儿童与办公应用提供产品，为国际客户提供 OEM/ODM 制造服务。",
    "footer_links_title": "快速导航",
    "footer_products_title": "产品中心",
    "footer_contact_title": "联系方式",
    "footer_bottom": "© 2026 龙德益智（东莞）新材料有限公司 版权所有",
    "footer_oem": "支持 OEM / ODM 定制 · 期待与您合作",
    "meta_title": "龙德益智｜洗澡书与活页夹定制制造｜B2B OEM/ODM",
    "meta_desc": "龙德益智位于中国东莞，为品牌商、进口商及产品团队提供洗澡书、活页夹和软质塑料产品定制开发。",
  },

  zh_tw:   {
    "brand_short": "LongDe Yizhi",
    "brand_name": "龍德益智（東莞）新材料有限公司",
    "nav_products": "產品中心",
    "nav_oem": "OEM / ODM",
    "nav_factory": "工廠與品管",
    "nav_about": "公司背景",
    "nav_contact": "聯繫我們",
    "quote_btn": "獲取報價",
    "hero_title": "為品牌與進口商客製洗澡書和活頁本",
    "hero_materials": "採用 EVA、PVC 與 TPU 製造",
    "hero_sub": "面向兒童用品與文具品牌，支援從圖紙、樣品或構想開始的客製製造。",
    "hero_proof": ["近 20 年製造經驗累積", "OEM / 客製開發", "EVA · PVC · TPU", "高頻焊接製造"],
    "hero_cta1": "獲取報價",
    "hero_cta2": "探索洗澡書",
    "hero_card_bath": "洗澡書",
    "hero_card_binder": "活頁本",
    "hero_capability_tag": "客製製造",
    "hero_capability_detail": "高頻焊接 · 組裝",
    "tagline": "支援 OEM / ODM 客製 · 一站式打樣量產 · 面向全球客戶",
    "sec_products_tag": "產品中心",
    "sec_products_title": "產品分類",
    "sec_products_sub": "重點品類為洗澡書與客製活頁本，並可依專案評估其他軟質塑膠產品。",
    "sec_commercial_tag": "合作基準",
    "sec_commercial_title": "重點 OEM 產品，從清晰的合作預期開始",
    "sec_commercial_sub": "在正式報價前先明確關鍵預期，便於您的團隊規劃專案。",
    "commercial_moq_label": "洗澡書最低訂購量",
    "commercial_moq_value": "3,000 件起",
    "commercial_sample_label": "打樣週期",
    "commercial_sample_value": "洗澡書：約 10 個工作日 · 活頁本：約 3 個工作日",
    "commercial_delivery_label": "一般量產交期",
    "commercial_delivery_value": "樣品確認後約 45 天",
    "commercial_reply_label": "詢盤回覆",
    "commercial_reply_value": "1 個工作日內",
    "commercial_note": "洗澡書 MOQ 及專案週期將依最終規格、圖稿、測試、包裝及交付要求確認。",
    "products_cta": "查看分類",
    "products_more": "沒有找到需要的產品？告訴我們您的需求 →",
    "bags_name": "袋類與收納包",
    "bags_intro": "客製拉鍊袋、收納袋及產品包裝解決方案。",
    "categories": [
      {
        "id": "baby",
        "name": "兒童用品",
        "intro": "為嬰幼兒和兒童提供柔軟、安全、防水的 EVA、TPU、PVC 產品。",
        "img": "website-images/Codex输出图片/Bath Book and Waterproof Kids Products/category-hero-baby-kids.png",
        "products": [
          {
            "img": "images/product-bathbook.svg",
            "name": "洗澡書",
            "desc": "柔軟防水的嬰幼兒沐浴閱讀書。"
          },
          {
            "img": "images/product-softbook.svg",
            "name": "布書 / 軟質書",
            "desc": "為嬰幼兒和兒童設計的柔軟輕便產品。"
          },
          {
            "img": "images/product-waterproof.svg",
            "name": "防水兒童用品",
            "desc": "為兒童客製的防水產品。"
          }
        ]
      },
      {
        "id": "office",
        "name": "辦公及文具用品",
        "intro": "適用於日常辦公的實用、耐用的文件袋、活頁本與封面。",
        "img": "website-images/categories/category-office-ring-binder.png",
        "products": [
          {
            "img": "images/product-folder.svg",
            "name": "文件袋",
            "desc": "用於文件儲存與整理的客製文件袋。"
          },
          {
            "img": "images/product-ringbinder.svg",
            "name": "活頁本",
            "desc": "辦公文具應用的客製 EVA / PVC 活頁本。"
          },
          {
            "img": "images/product-notebookcover.svg",
            "name": "筆記本封面",
            "desc": "筆記本與計畫本的客製封面。"
          },
          {
            "img": "images/product-filepocket.svg",
            "name": "文件插袋",
            "desc": "靈活的文件儲存解決方案。"
          }
        ]
      },
      {
        "id": "custom",
        "name": "客製產品",
        "intro": "按您的形狀、尺寸、印刷與包裝要求開發產品。",
        "img": "images/cat-custom.svg",
        "products": [
          {
            "img": "images/product-customeva.svg",
            "name": "客製 EVA 產品",
            "desc": "按您的設計客製的柔軟輕便 EVA 產品。"
          },
          {
            "img": "images/product-customtpu.svg",
            "name": "客製 TPU 產品",
            "desc": "按您的設計客製的透明耐用 TPU 產品。"
          },
          {
            "img": "images/product-custompvc.svg",
            "name": "客製 PVC 產品",
            "desc": "按您的設計客製的柔性 PVC 產品。"
          }
        ]
      }
    ],
    "sec_oem_tag": "OEM / ODM",
    "sec_oem_title": "從您的想法到成品",
    "sec_oem_sub": "四個簡單步驟，將您的概念變成產品。",
    "sec_oem_detail": "無論您提供圖紙、現有樣品或產品構想，我們均可支援材料選擇、打樣、印刷、裁切、高頻焊接、組裝與最終包裝。",
    "oem_steps": [
      {
        "num": "01",
        "title": "設計",
        "desc": "發送您的圖紙、樣品或想法。"
      },
      {
        "num": "02",
        "title": "打樣",
        "desc": "我們開發產品並製作樣品。"
      },
      {
        "num": "03",
        "title": "量產",
        "desc": "根據確認樣品進行批量生產。"
      },
      {
        "num": "04",
        "title": "交付",
        "desc": "檢驗、包裝與發貨。"
      }
    ],
    "oem_cta": "啟動您的專案",
    "sec_factory_tag": "工廠",
    "sec_factory_title": "工廠展示",
    "sec_factory_sub": "材料選擇 · 印刷 · 裁切 · 高週波焊接 · 組裝 · 檢查 · 包裝",
    "factory_previous": "查看上一組工廠照片",
    "factory_next": "查看下一組工廠照片",
    "factory_slides": "工廠照片導覽",
    "factory_slide_label": "第",
    "factory_lightbox": "工廠照片預覽",
    "factory_close": "關閉照片預覽",
    "factory_pause": "暫停播放",
    "factory_play": "繼續播放",
    "sec_quality_tag": "品質與測試支援",
    "sec_quality_title": "從確認產品規格開始做好品質",
    "sec_quality_sub": "生產前確認產品需求與樣品。檢驗方式及第三方測試依專案與目標市場溝通確認。",
    "quality_item_1_title": "規格確認",
    "quality_item_1_desc": "與客戶確認材料、結構、圖稿、尺寸及包裝要求。",
    "quality_item_2_title": "樣品確認",
    "quality_item_2_desc": "量產前共同確認參考樣品及產品關鍵細節。",
    "quality_item_3_title": "檢驗與測試協調",
    "quality_item_3_desc": "溝通專案檢驗要點，並在需要時協調適用的第三方測試。",
    "quality_bsci_title": "amfori BSCI 社會責任審核",
    "quality_bsci_desc": "社會責任審核資料可依合格採購客戶要求提供。",
    "factory_tiles": [
      { "img": "website-images/Codex输出图片/工厂与品质/factory-exterior-no-cars.jpg", "label": "工廠外觀" },
      { "img": "website-images/Codex输出图片/工厂与品质/sample-library-redacted.png", "label": "樣品室" },
      { "img": "website-images/Codex输出图片/工厂与品质/high-frequency-welding-redacted.png", "label": "高頻焊接" },
      { "img": "website-images/Codex输出图片/工厂与品质/workshop-high-frequency-redacted.png", "label": "高頻焊接" },
      { "img": "website-images/Codex输出图片/工厂与品质/production-line.png", "label": "印刷生產線" },
      { "img": "website-images/Codex输出图片/工厂与品质/film-laminating-redacted.png", "label": "切料生產" },
      { "img": "website-images/Codex输出图片/工厂与品质/manual-assembly-redacted.png", "label": "手工裝配" },
      { "img": "website-images/Codex输出图片/工厂与品质/team-inspection-redacted.png", "label": "員工培訓" },
      { "img": "website-images/Codex输出图片/工厂与品质/tooling-storage.png", "label": "模具管理" },
      { "img": "website-images/Codex输出图片/工厂与品质/container-loading.png", "label": "裝櫃與發運" }
    ],
    "sec_heritage_tag": "公司背景",
    "sec_heritage_title": "依託龍德塑膠近 20 年經驗，穩步開拓新業務",
    "heritage_p1": "龍德益智是東莞龍德塑膠制品面向新業務設立的新公司，依託龍德塑膠近 20 年的產品開發與製造經驗，專注開拓新業務、研發新產品。",
    "heritage_p2": "現階段，我們重點發展洗澡書與客製活頁本，並圍繞客戶需求持續完善產品與製造方案。",
    "heritage_cta": "洽談您的專案",
    "heritage_points": [
      { "title": "近 20 年", "desc": "龍德塑膠的產品開發與製造經驗" },
      { "title": "新業務方向", "desc": "持續拓展業務並研發新產品" },
      { "title": "目前重點", "desc": "洗澡書與客製活頁本" }
    ],
    "sec_about_tag": "關於我們",
    "sec_about_title": "關於 LongDe Yizhi",
    "about_p1": "龍德益智位於中國東莞，承接洗澡書、活頁本及其他軟質塑膠產品的客製專案。",
    "about_p2": "我們與客戶溝通產品需求，並依確認的材料、樣品、生產、檢查與包裝要求推進專案。",
    "about_values": [
      "EVA · TPU · PVC",
      "OEM / ODM",
      "客製製造"
    ],
    "sec_contact_tag": "聯繫我們",
    "contact_language_prompt": "選擇詢價表單語言：",
    "contact_language_group": "選擇詢價表單語言",
    "sec_contact_title": "讓我們攜手合作",
    "sec_contact_sub": "有產品想法或需要客製解決方案？告訴我們您的專案。",
    "contact_addr_label": "公司地址",
    "contact_addr": "廣東省東莞市寮步鎮進士路56號2棟301室",
    "contact_email_label": "電子郵件",
    "contact_email": "sales@longdeyizhi.com",
    "qr_wechat_title": "微信客服",
    "qr_wechat_1": "微信客服 1",
    "qr_wechat_2": "微信客服 2",
    "qr_line_title": "LINE 客服",
    "qr_line": "LINE 客服",
    "contact_hours_label": "工作時間",
    "contact_hours": "週一至週六 8:30 – 18:00",
    "map_link": "在 Google 地圖中查看",
    "form_name": "您的姓名",
    "form_company": "公司名稱",
    "form_email": "您的電子郵件",
    "form_category": "產品分類",
    "form_market": "目標市場",
    "form_market_ph": "例如：歐盟、美國、日本、韓國",
    "form_product": "產品",
    "form_qty": "數量",
    "form_msg": "留言內容",
    "form_attachments": "上傳附件（選填）",
    "form_attachments_note": "可加入圖面、參考圖片或 Logo，附件總大小不得超過 15 MB。",
    "form_attachments_too_large": "附件總大小不得超過 15 MB，請移除部分檔案後重試。",
    "form_phone": "電話",
    "form_wechat": "微信",
    "form_contact_app": "其他聯絡方式（WhatsApp / LINE 等）",
    "form_send": "獲取報價",
    "form_note": "提交後我們會盡快透過電子郵件回覆您，請留意查收。",
    "form_sending": "正在發送…",
    "form_success": "提交成功！我們會盡快透過電子郵件回覆您。",
    "form_error": "提交失敗，請稍後重試，或直接發送郵件到 sales@longdeyizhi.com。",
    "form_required": "請填寫所有必填項目（姓名、公司名稱、電子郵件）。",
    "form_email_invalid": "電子郵件格式不正確，請檢查後重新填寫。",
    "modal_ok": "好的",
    "mail_intro": "您好，我的姓名是",
    "mail_subject": "官網詢盤",
    "footer_blurb": "專注於 EVA、TPU、PVC 產品的專業製造商，為嬰幼兒、兒童與辦公應用提供產品，為國際客戶提供 OEM/ODM 製造服務。",
    "footer_links_title": "快速導覽",
    "footer_products_title": "產品中心",
    "footer_contact_title": "聯絡方式",
    "footer_bottom": "© 2026 龍德益智（東莞）新材料有限公司 版權所有",
    "footer_oem": "支援 OEM / ODM 客製 · 期待與您合作",
    "meta_title": "龍德益智｜洗澡書與活頁本客製製造｜B2B OEM/ODM",
    "meta_desc": "龍德益智位於中國東莞，為品牌商、進口商與產品團隊提供洗澡書、活頁本及軟質塑膠產品客製開發。"
  },

  /* ---------------- English ---------------- */
  en: {
    "brand_short": "LongDe Yizhi",
    "brand_name": "LongDe Yizhi (Dongguan) New Materials Co., Ltd.",
    "nav_products": "Products",
    "nav_oem": "OEM / ODM",
    "nav_factory": "Factory & Quality",
    "nav_about": "Company Background",
    "nav_contact": "Contact",
    "quote_btn": "Request a Quote",
    "hero_title": "Custom Bath Books & Ring Binders",
    "hero_materials": "Made in EVA, PVC & TPU",
    "hero_sub": "Custom manufacturing for children's and stationery brands. Start with a drawing, sample or product idea.",
    "hero_proof": ["Nearly 20 Years of Manufacturing Experience", "OEM / Custom Development", "EVA · PVC · TPU", "RF Welding Manufacturing"],
    "hero_cta1": "Request a Quote",
    "hero_cta2": "Explore Bath Books",
    "hero_card_bath": "Bath Books",
    "hero_card_binder": "Ring Binders",
    "hero_capability_tag": "Custom Manufacturing",
    "hero_capability_detail": "RF Welding · Assembly",
    "tagline": "Custom EVA · PVC · TPU Manufacturing · RF Welding · Global B2B Projects",
    "sec_products_tag": "Products",
    "sec_products_title": "Product Categories",
    "sec_products_sub": "Our focus is bath books and custom ring binders, with other soft-plastic products reviewed project by project.",
    "sec_commercial_tag": "Project Framework",
    "sec_commercial_title": "Clear Project Expectations for Our Flagship OEM Products",
    "sec_commercial_sub": "Clear expectations help your team plan a project before requesting a formal quotation.",
    "commercial_moq_label": "Bath book MOQ",
    "commercial_moq_value": "From 3,000 pcs",
    "commercial_sample_label": "Sampling lead time",
    "commercial_sample_value": "Bath books: 10 days · Ring binders: 3 days",
    "commercial_delivery_label": "Typical production delivery",
    "commercial_delivery_value": "Approx. 45 days after sample approval",
    "commercial_reply_label": "Inquiry response",
    "commercial_reply_value": "Within 1 working day",
    "commercial_note": "Bath book MOQ and project timing are confirmed against the final specification, artwork, testing, packaging and delivery requirements.",
    "products_cta": "View Category",
    "products_more": "Don't see your product? Tell us what you need →",
    "bags_name": "Bags & Pouches",
    "bags_intro": "Custom zipper pouches, storage bags and packaging solutions.",
    "bags_products": [
      { "name": "Zipper Pouches", "desc": "Custom pouches for storage, organization and promotion." },
      { "name": "Storage Bags", "desc": "Flexible bags made around your size, closure and material requirements." },
      { "name": "Packaging Pouches", "desc": "Custom pouch and packaging solutions for your product." }
    ],
    "categories": [
      {
        "id": "baby",
        "name": "Bath Books & Kids Products",
        "intro": "Waterproof soft books and custom EVA/PVC children's products.",
        "img": "website-images/Codex输出图片/Bath Book and Waterproof Kids Products/category-hero-baby-kids.png",
        "products": [
          {
            "img": "images/product-bathbook.svg",
            "name": "Bath Books",
            "desc": "Soft and waterproof books for baby bath time."
          },
          {
            "img": "images/product-softbook.svg",
            "name": "Soft Books",
            "desc": "Soft and lightweight products designed for babies and kids."
          },
          {
            "img": "images/product-waterproof.svg",
            "name": "Waterproof Kids Products",
            "desc": "Custom waterproof products for children."
          }
        ]
      },
      {
        "id": "office",
        "name": "Office & Stationery Products",
        "intro": "Document bags, folders, binders and custom office products.",
        "img": "website-images/categories/category-office-ring-binder.png",
        "products": [
          {
            "img": "images/product-folder.svg",
            "name": "Document Folders",
            "desc": "Custom folders for document storage and organization."
          },
          {
            "img": "images/product-ringbinder.svg",
            "name": "Ring Binders",
            "desc": "Custom EVA / PVC ring binders for office and stationery applications."
          },
          {
            "img": "images/product-notebookcover.svg",
            "name": "Notebook Covers",
            "desc": "Custom covers for notebooks and planners."
          },
          {
            "img": "images/product-filepocket.svg",
            "name": "File Pockets",
            "desc": "Flexible document and file storage solutions."
          }
        ]
      },
      {
        "id": "custom",
        "name": "Custom RF Welded Products",
        "intro": "Bring us your drawing, sample or concept. We help turn it into production.",
        "img": "images/cat-custom.svg",
        "products": [
          {
            "img": "images/product-customeva.svg",
            "name": "Custom EVA Products",
            "desc": "Soft, lightweight EVA products made to your design."
          },
          {
            "img": "images/product-customtpu.svg",
            "name": "Custom TPU Products",
            "desc": "Clear, durable TPU products made to your design."
          },
          {
            "img": "images/product-custompvc.svg",
            "name": "Custom PVC Products",
            "desc": "Flexible PVC products made to your design."
          }
        ]
      }
    ],
    "sec_oem_tag": "More Than Standard Products",
    "sec_oem_title": "Your Product. Our Manufacturing Capability.",
    "sec_oem_sub": "LDYZ specializes in custom EVA, PVC and TPU product manufacturing with RF welding technology.",
    "sec_oem_detail": "Whether you have a drawing, an existing sample or simply a product concept, we support material selection, prototyping, printing, cutting, RF welding, assembly and final packaging.",
    "oem_steps": [
      {
        "num": "01",
        "title": "Design",
        "desc": "Send us your drawing, sample or idea."
      },
      {
        "num": "02",
        "title": "Sampling",
        "desc": "We develop the product and make a sample."
      },
      {
        "num": "03",
        "title": "Production",
        "desc": "Mass production based on approved samples."
      },
      {
        "num": "04",
        "title": "Delivery",
        "desc": "Inspection, packing and shipment."
      }
    ],
    "oem_cta": "Start Your Custom Project",
    "sec_factory_tag": "Manufacturing Capability",
    "sec_factory_title": "Factory Gallery",
    "sec_factory_sub": "Material Selection · Printing · Cutting · RF Welding · Assembly · Inspection · Packaging",
    "factory_previous": "View previous factory photos",
    "factory_next": "View next factory photos",
    "factory_slides": "Factory photo navigation",
    "factory_slide_label": "Slide",
    "factory_lightbox": "Factory photo preview",
    "factory_close": "Close photo preview",
    "factory_pause": "Pause slideshow",
    "factory_play": "Resume slideshow",
    "sec_quality_tag": "Quality & Testing Support",
    "sec_quality_title": "Quality Starts with an Agreed Product Specification",
    "sec_quality_sub": "We align product requirements and sample approval before production. Inspection and any third-party testing are discussed for each project and target market.",
    "quality_item_1_title": "Specification review",
    "quality_item_1_desc": "Confirm material, construction, artwork, dimensions and packaging requirements with your team.",
    "quality_item_2_title": "Sample approval",
    "quality_item_2_desc": "Review the agreed reference sample and key details before moving to production.",
    "quality_item_3_title": "Inspection & testing coordination",
    "quality_item_3_desc": "Discuss project inspection points and arrange applicable third-party tests when required.",
    "quality_bsci_title": "amfori BSCI social audit",
    "quality_bsci_desc": "Social compliance audit information is available for qualified buyer review on request.",
    "factory_tiles": [
      { "img": "website-images/Codex输出图片/工厂与品质/factory-exterior-no-cars.jpg", "label": "Factory exterior" },
      { "img": "website-images/Codex输出图片/工厂与品质/sample-library-redacted.png", "label": "Sample room" },
      { "img": "website-images/Codex输出图片/工厂与品质/high-frequency-welding-redacted.png", "label": "RF welding" },
      { "img": "website-images/Codex输出图片/工厂与品质/workshop-high-frequency-redacted.png", "label": "RF welding" },
      { "img": "website-images/Codex输出图片/工厂与品质/production-line.png", "label": "Printing production line" },
      { "img": "website-images/Codex输出图片/工厂与品质/film-laminating-redacted.png", "label": "Material cutting" },
      { "img": "website-images/Codex输出图片/工厂与品质/manual-assembly-redacted.png", "label": "Manual assembly" },
      { "img": "website-images/Codex输出图片/工厂与品质/team-inspection-redacted.png", "label": "Employee training" },
      { "img": "website-images/Codex输出图片/工厂与品质/tooling-storage.png", "label": "Tooling management" },
      { "img": "website-images/Codex输出图片/工厂与品质/container-loading.png", "label": "Container loading & dispatch" }
    ],
    "sec_heritage_tag": "Company Background",
    "sec_heritage_title": "A New Business Built on Nearly 20 Years of Manufacturing Experience",
    "heritage_p1": "LongDe Yizhi is a new company established by Dongguan Longde Plastic Products to develop new business. It builds on Longde Plastic’s nearly 20 years of product development and manufacturing experience, with a focus on new products and markets.",
    "heritage_p2": "Our current focus is bath books and custom ring binders, with product and manufacturing solutions developed around each customer’s requirements.",
    "heritage_cta": "Discuss Your Project",
    "heritage_points": [
      { "title": "Nearly 20 Years", "desc": "Product development and manufacturing experience at Longde Plastic" },
      { "title": "New Business", "desc": "Developing new products and expanding into new markets" },
      { "title": "Current Focus", "desc": "Bath books and custom ring binders" }
    ],
    "sec_about_tag": "Why LDYZ",
    "sec_about_title": "A Manufacturing Partner for Custom Projects",
    "about_p1": "Based in Dongguan, China, LongDe Yizhi develops custom bath books, ring binders and other soft-plastic products.",
    "about_p2": "We work with customers to align requirements and coordinate materials, sample approval, production, inspection and packaging for B2B projects.",
    "about_values": [
      "EVA · TPU · PVC",
      "OEM / ODM",
      "Custom Manufacturing"
    ],
    "sec_contact_tag": "Contact",
    "contact_language_prompt": "View this inquiry form in:",
    "contact_language_group": "Choose inquiry form language",
    "sec_contact_title": "Have a Product in Mind?",
    "sec_contact_sub": "Send us your drawing, sample or product idea. Let's discuss how to manufacture it.",
    "contact_addr_label": "Address",
    "contact_addr": "Room 301, Building 2, No. 56 Jinshi Road, Liaobu Town, Dongguan, Guangdong, China",
    "contact_email_label": "Email",
    "contact_email": "sales@longdeyizhi.com",
    "qr_wechat_title": "WeChat Customer Service",
    "qr_wechat_1": "WeChat Support 1",
    "qr_wechat_2": "WeChat Support 2",
    "qr_line_title": "LINE Customer Service",
    "qr_line": "LINE Support",
    "contact_hours_label": "Working Hours",
    "contact_hours": "Mon – Sat, 8:30 – 18:00",
    "map_link": "View on Google Maps",
    "form_name": "Name",
    "form_company": "Company",
    "form_email": "Email",
    "form_category": "Product Category",
    "form_market": "Target Market",
    "form_market_ph": "e.g. EU, USA, Japan, South Korea",
    "form_product": "Product",
    "form_qty": "Quantity",
    "form_msg": "Message",
    "form_attachments": "Attachments (optional)",
    "form_attachments_note": "Add drawings, reference images or a logo. Up to 15 MB total.",
    "form_attachments_too_large": "Attachments must total 15 MB or less. Remove some files and try again.",
    "form_phone": "Phone",
    "form_wechat": "WeChat",
    "form_contact_app": "Other Contact (WhatsApp / LINE / Telegram…)",
    "form_send": "Request a Quote",
    "form_note": "We will reply to your inquiry by email as soon as possible.",
    "form_sending": "Sending…",
    "form_success": "Thank you! Your request has been sent. We will get back to you by email soon.",
    "form_error": "Sorry, something went wrong. Please try again, or email us directly at sales@longdeyizhi.com.",
    "form_required": "Please fill in all required fields (Name, Company, Email).",
    "form_email_invalid": "Please enter a valid email address.",
    "modal_ok": "OK",
    "mail_intro": "Hello, my name is",
    "mail_subject": "Website Inquiry",
    "footer_blurb": "A custom EVA, PVC and TPU product manufacturer with RF welding capability, supporting B2B projects from concept to production.",
    "footer_links_title": "Quick Links",
    "footer_products_title": "Products",
    "footer_contact_title": "Contact",
    "footer_bottom": "© 2026 LongDe Yizhi (Dongguan) New Materials Co., Ltd. All rights reserved.",
    "footer_oem": "Custom Manufacturing · RF Welding · OEM / ODM",
    "meta_title": "LongDe Yizhi | Custom Bath Books & Ring Binders | B2B OEM/ODM",
    "meta_desc": "Dongguan-based custom manufacturing partner for bath books, ring binders and soft-plastic products. Supporting brands, importers and product teams."
  },

  /* ---------------- 日本語 ---------------- */
  ja: {
    "brand_short": "LongDe Yizhi",
    "brand_name": "龍德益智（東莞）新材料有限公司",
    "nav_products": "製品情報",
    "nav_oem": "OEM / ODM",
    "nav_factory": "工場・品質",
    "nav_about": "会社概要",
    "nav_contact": "お問い合わせ",
    "quote_btn": "見積りを依頼",
    "hero_title": "カスタムバスブックとリングバインダー",
    "hero_materials": "EVA・PVC・TPUで製造",
    "hero_sub": "子ども用品・文具ブランド向けのカスタム製造。図面、サンプル、アイデアからご相談ください。",
    "hero_proof": ["約20年の製品開発・製造経験", "OEM / カスタム開発", "EVA・PVC・TPU", "高周波溶着製造"],
    "hero_cta1": "見積りを依頼",
    "hero_cta2": "バスブックを見る",
    "hero_card_bath": "バスブック",
    "hero_card_binder": "リングバインダー",
    "hero_capability_tag": "カスタム製造",
    "hero_capability_detail": "高周波溶着・組立",
    "tagline": "OEM/ODM カスタマイズ対応 · サンプルから量産までワンストップ · 世界中のお客様へ",
    "sec_products_tag": "製品情報",
    "sec_products_title": "製品カテゴリー",
    "sec_products_sub": "主力はバスブックとカスタムリングバインダーです。その他の軟質プラスチック製品は案件ごとにご相談ください。",
    "sec_commercial_tag": "プロジェクトの目安",
    "sec_commercial_title": "主力 OEM 製品の明確なプロジェクト目安",
    "sec_commercial_sub": "正式なお見積りの前に主要な目安を共有し、プロジェクト計画を支援します。",
    "commercial_moq_label": "バスブックの最小発注数量",
    "commercial_moq_value": "3,000 個から",
    "commercial_sample_label": "サンプル製作期間",
    "commercial_sample_value": "バスブック：約 10 営業日 · リングバインダー：約 3 営業日",
    "commercial_delivery_label": "標準的な量産納期",
    "commercial_delivery_value": "サンプル承認後 約 45 日",
    "commercial_reply_label": "お問い合わせへの返信",
    "commercial_reply_value": "1 営業日以内",
    "commercial_note": "バスブックの MOQ とプロジェクト日程は、最終仕様、アートワーク、試験、包装、納品条件に基づき確認します。",
    "products_cta": "カテゴリーを見る",
    "products_more": "お探しの製品がない場合は、ご要望をお聞かせください →",
    "bags_name": "バッグ＆ポーチ",
    "bags_intro": "カスタムのジッパーポーチ、収納バッグ、包装ソリューション。",
    "categories": [
      {
        "id": "baby",
        "name": "ベビー・キッズ用品",
        "intro": "赤ちゃんと子供向けの柔らかく安全な防水 EVA・TPU・PVC 製品。",
        "img": "website-images/Codex输出图片/Bath Book and Waterproof Kids Products/category-hero-baby-kids.png",
        "products": [
          {
            "img": "images/product-bathbook.svg",
            "name": "バスブック",
            "desc": "お風呂タイム用の柔らかく防水な本。"
          },
          {
            "img": "images/product-softbook.svg",
            "name": "ソフトブック",
            "desc": "赤ちゃん・子供向けにデザインされた柔らかく軽量な製品。"
          },
          {
            "img": "images/product-waterproof.svg",
            "name": "防水キッズ用品",
            "desc": "子供向けのカスタム防水製品。"
          }
        ]
      },
      {
        "id": "office",
        "name": "オフィス・文具用品",
        "intro": "日常のオフィスで使える実用的で丈夫なファイル、バインダー、カバー。",
        "img": "website-images/categories/category-office-ring-binder.png",
        "products": [
          {
            "img": "images/product-folder.svg",
            "name": "書類ファイル",
            "desc": "書類の保管・整理のためのカスタムファイル。"
          },
          {
            "img": "images/product-ringbinder.svg",
            "name": "リングバインダー",
            "desc": "オフィス・文具用途のカスタム EVA/PVC バインダー。"
          },
          {
            "img": "images/product-notebookcover.svg",
            "name": "ノートカバー",
            "desc": "ノート・プランナー用のカスタムカバー。"
          },
          {
            "img": "images/product-filepocket.svg",
            "name": "ファイルポケット",
            "desc": "柔軟な書類収納ソリューション。"
          }
        ]
      },
      {
        "id": "custom",
        "name": "カスタム製品",
        "intro": "形状・サイズ・印刷・パッケージを自由に指定して製品を開発。",
        "img": "images/cat-custom.svg",
        "products": [
          {
            "img": "images/product-customeva.svg",
            "name": "カスタム EVA 製品",
            "desc": "御社のデザインで作る柔らかく軽量な EVA 製品。"
          },
          {
            "img": "images/product-customtpu.svg",
            "name": "カスタム TPU 製品",
            "desc": "御社のデザインで作る透明で丈夫な TPU 製品。"
          },
          {
            "img": "images/product-custompvc.svg",
            "name": "カスタム PVC 製品",
            "desc": "御社のデザインで作る柔軟な PVC 製品。"
          }
        ]
      }
    ],
    "sec_oem_tag": "OEM / ODM",
    "sec_oem_title": "アイデアから完成品まで",
    "sec_oem_sub": "コンセプトを製品にするためのシンプルな4ステップ。",
    "sec_oem_detail": "図面、既存サンプル、または製品アイデアをもとに、材料選定、試作、印刷、裁断、高周波溶着、組立、最終包装まで対応します。",
    "oem_steps": [
      {
        "num": "01",
        "title": "デザイン",
        "desc": "図面・サンプル・アイデアをお送りください。"
      },
      {
        "num": "02",
        "title": "プロトタイプ",
        "desc": "製品を開発し、サンプルを作成します。"
      },
      {
        "num": "03",
        "title": "量産",
        "desc": "承認済みサンプルに基づいて量産します。"
      },
      {
        "num": "04",
        "title": "納品",
        "desc": "検査・梱包・出荷。"
      }
    ],
    "oem_cta": "プロジェクトを開始",
    "sec_factory_tag": "工場",
    "sec_factory_title": "工場ギャラリー",
    "sec_factory_sub": "材料選定 · 印刷 · 型抜き · 高周波溶着 · 組立 · 検査 · 包装",
    "factory_previous": "前の工場写真を見る",
    "factory_next": "次の工場写真を見る",
    "factory_slides": "工場写真のナビゲーション",
    "factory_slide_label": "スライド",
    "factory_lightbox": "工場写真のプレビュー",
    "factory_close": "写真プレビューを閉じる",
    "factory_pause": "スライドショーを一時停止",
    "factory_play": "スライドショーを再開",
    "sec_quality_tag": "品質・試験サポート",
    "sec_quality_title": "製品仕様の合意から品質づくりを始めます",
    "sec_quality_sub": "量産前に製品要件とサンプルを確認します。検査方法や第三者試験は案件と対象市場に応じて協議します。",
    "quality_item_1_title": "仕様の確認",
    "quality_item_1_desc": "材料、構造、デザイン、寸法、包装要件をお客様と確認します。",
    "quality_item_2_title": "サンプルの承認",
    "quality_item_2_desc": "量産に進む前に、基準サンプルと製品の重要な点を確認します。",
    "quality_item_3_title": "検査・試験の調整",
    "quality_item_3_desc": "検査項目を相談し、必要に応じて該当する第三者試験を手配します。",
    "quality_bsci_title": "amfori BSCI 社会監査",
    "quality_bsci_desc": "社会的コンプライアンス監査に関する情報は、適格な購入者のご要望に応じて提供します。",
    "factory_tiles": [
      { "img": "website-images/Codex输出图片/工厂与品质/factory-exterior-no-cars.jpg", "label": "工場外観" },
      { "img": "website-images/Codex输出图片/工厂与品质/sample-library-redacted.png", "label": "サンプルルーム" },
      { "img": "website-images/Codex输出图片/工厂与品质/high-frequency-welding-redacted.png", "label": "高周波溶着" },
      { "img": "website-images/Codex输出图片/工厂与品质/workshop-high-frequency-redacted.png", "label": "高周波溶着" },
      { "img": "website-images/Codex输出图片/工厂与品质/production-line.png", "label": "印刷生産ライン" },
      { "img": "website-images/Codex输出图片/工厂与品质/film-laminating-redacted.png", "label": "材料の裁断" },
      { "img": "website-images/Codex输出图片/工厂与品质/manual-assembly-redacted.png", "label": "手作業組立" },
      { "img": "website-images/Codex输出图片/工厂与品质/team-inspection-redacted.png", "label": "従業員研修" },
      { "img": "website-images/Codex输出图片/工厂与品质/tooling-storage.png", "label": "金型管理" },
      { "img": "website-images/Codex输出图片/工厂与品质/container-loading.png", "label": "コンテナ積み・出荷" }
    ],
    "sec_heritage_tag": "会社概要",
    "sec_heritage_title": "龍德塑膠の約20年の経験を基盤に、新たな事業を展開",
    "heritage_p1": "LongDe Yizhiは、新たな事業の開拓を目的としてDongguan Longde Plastic Productsが設立した新会社です。龍德塑膠の約20年にわたる製品開発・製造経験を活かし、新製品の開発と事業の拡大に取り組みます。",
    "heritage_p2": "現在はバスブックとカスタムリングバインダーを重点分野とし、お客様の要件に応じた製品・製造方法を検討します。",
    "heritage_cta": "プロジェクトを相談",
    "heritage_points": [
      { "title": "約20年", "desc": "龍德塑膠の製品開発・製造経験" },
      { "title": "新たな事業", "desc": "新製品の開発と事業領域の拡大" },
      { "title": "重点分野", "desc": "バスブックとカスタムリングバインダー" }
    ],
    "sec_about_tag": "会社概要",
    "sec_about_title": "LongDe Yizhi について",
    "about_p1": "LongDe Yizhi は中国・東莞を拠点に、バスブック、リングバインダーなど軟質プラスチック製品のカスタム案件に対応します。",
    "about_p2": "お客様と仕様を確認し、材料、サンプル承認、生産、検査、包装の要件に沿ってプロジェクトを進めます。",
    "about_values": [
      "EVA · TPU · PVC",
      "OEM / ODM",
      "カスタム製造"
    ],
    "sec_contact_tag": "お問い合わせ",
    "contact_language_prompt": "お問い合わせフォームの言語：",
    "contact_language_group": "お問い合わせフォームの言語を選択",
    "sec_contact_title": "一緒に始めましょう",
    "sec_contact_sub": "製品アイデアやカスタムソリューションが必要ですか？プロジェクトについてお聞かせください。",
    "contact_addr_label": "所在地",
    "contact_addr": "中国広東省東莞市寮歩鎮進士路56号2棟301室",
    "contact_email_label": "メール",
    "contact_email": "sales@longdeyizhi.com",
    "qr_wechat_title": "WeChat（微信）客服",
    "qr_wechat_1": "WeChat 客服 1",
    "qr_wechat_2": "WeChat 客服 2",
    "qr_line_title": "LINE 客服",
    "qr_line": "LINE 客服",
    "contact_hours_label": "営業時間",
    "contact_hours": "月～土 8:30 – 18:00",
    "map_link": "Google マップで見る",
    "form_name": "お名前",
    "form_company": "会社名",
    "form_email": "メールアドレス",
    "form_category": "製品カテゴリー",
    "form_market": "対象市場",
    "form_market_ph": "例：EU、米国、日本、韓国",
    "form_product": "製品名",
    "form_qty": "数量",
    "form_msg": "メッセージ",
    "form_attachments": "添付ファイル（任意）",
    "form_attachments_note": "図面、参考画像、ロゴを添付できます。合計15 MBまで。",
    "form_attachments_too_large": "添付ファイルは合計15 MB以下にしてください。一部を削除して再試行してください。",
    "form_phone": "電話番号",
    "form_wechat": "WeChat",
    "form_contact_app": "その他の連絡先（WhatsApp / LINE など）",
    "form_send": "見積りを依頼",
    "form_note": "送信後、できるだけ早くメールでご返信いたします。",
    "form_sending": "送信中…",
    "form_success": "送信が完了しました。できるだけ早くメールでご返信いたします。",
    "form_error": "送信に失敗しました。お手数ですが再度お試しいただくか、sales@longdeyizhi.com まで直接ご連絡ください。",
    "form_required": "必須項目（お名前・会社名・メールアドレス）をすべて入力してください。",
    "form_email_invalid": "メールアドレスの形式が正しくありません。",
    "modal_ok": "OK",
    "mail_intro": "こんにちは、私は",
    "mail_subject": "ホームページからのお問い合わせ",
    "footer_blurb": "EVA・TPU・PVC 製品の専門メーカーとして、ベビー・キッズ・オフィス向け製品を開発・製造し、海外のお客様に OEM/ODM 製造サービスを提供しています。",
    "footer_links_title": "クイックリンク",
    "footer_products_title": "製品情報",
    "footer_contact_title": "お問い合わせ",
    "footer_bottom": "© 2026 龍德益智（東莞）新材料有限公司",
    "footer_oem": "OEM / ODM カスタマイズ対応 · ご連絡をお待ちしています",
    "meta_title": "LongDe Yizhi｜カスタムバスブック・リングバインダー｜B2B OEM/ODM",
    "meta_desc": "中国・東莞を拠点に、ブランドや輸入業者向けのバスブック、リングバインダー、軟質プラスチック製品をカスタム開発します。"
  },

  /* ---------------- 한국어 ---------------- */
  ko: {
    "brand_short": "LongDe Yizhi",
    "brand_name": "룽더이즈(둥관) 신소재 유한회사",
    "nav_products": "제품",
    "nav_oem": "OEM / ODM",
    "nav_factory": "공장 및 품질",
    "nav_about": "회사 소개",
    "nav_contact": "문의하기",
    "quote_btn": "견적 요청",
    "hero_title": "브랜드와 수입업체를 위한 맞춤 목욕책 및 링 바인더",
    "hero_materials": "EVA, PVC 및 TPU로 제작",
    "hero_sub": "아동용품·문구 브랜드를 위한 맞춤 제조. 도면, 샘플 또는 아이디어로 시작하세요.",
    "hero_proof": ["약 20년의 제품 개발·제조 경험", "OEM / 맞춤 개발", "EVA · PVC · TPU", "고주파 용접 제조"],
    "hero_cta1": "견적 요청",
    "hero_cta2": "목욕책 보기",
    "hero_card_bath": "목욕책",
    "hero_card_binder": "링 바인더",
    "hero_capability_tag": "맞춤 제조",
    "hero_capability_detail": "고주파 용접 · 조립",
    "tagline": "OEM/ODM 맞춤 제작 · 샘플부터 양산까지 원스톱 · 전 세계 고객 지원",
    "sec_products_tag": "제품",
    "sec_products_title": "제품 카테고리",
    "sec_products_sub": "주력 제품은 목욕책과 맞춤 링 바인더입니다. 기타 연질 플라스틱 제품은 프로젝트별로 검토합니다.",
    "sec_commercial_tag": "프로젝트 기준",
    "sec_commercial_title": "핵심 OEM 제품을 위한 명확한 프로젝트 기준",
    "sec_commercial_sub": "정식 견적 요청 전에 주요 기준을 공유하여 프로젝트 계획을 돕습니다.",
    "commercial_moq_label": "목욕책 최소 주문 수량",
    "commercial_moq_value": "3,000개부터",
    "commercial_sample_label": "샘플 제작 기간",
    "commercial_sample_value": "목욕책: 약 10영업일 · 링 바인더: 약 3영업일",
    "commercial_delivery_label": "일반 양산 납기",
    "commercial_delivery_value": "샘플 승인 후 약 45일",
    "commercial_reply_label": "문의 회신",
    "commercial_reply_value": "1영업일 이내",
    "commercial_note": "목욕책 MOQ와 프로젝트 일정은 최종 사양, 아트워크, 시험, 포장 및 납품 조건에 따라 확인됩니다.",
    "products_cta": "카테고리 보기",
    "products_more": "필요한 제품이 없으신가요? 요구사항을 알려주세요 →",
    "bags_name": "가방 및 파우치",
    "bags_intro": "맞춤 지퍼 파우치, 수납 가방 및 포장 솔루션.",
    "categories": [
      {
        "id": "baby",
        "name": "베이비·키즈용품",
        "intro": "아기와 아이를 위한 부드럽고 안전한 방수 EVA·TPU·PVC 제품.",
        "img": "website-images/Codex输出图片/Bath Book and Waterproof Kids Products/category-hero-baby-kids.png",
        "products": [
          {
            "img": "images/product-bathbook.svg",
            "name": "목욕책",
            "desc": "아기 목욕 시간을 위한 부드럽고 방수되는 책."
          },
          {
            "img": "images/product-softbook.svg",
            "name": "소프트북",
            "desc": "아기와 아이를 위해 설계된 부드럽고 가벼운 제품."
          },
          {
            "img": "images/product-waterproof.svg",
            "name": "방수 키즈 제품",
            "desc": "어린이를 위한 맞춤 방수 제품."
          }
        ]
      },
      {
        "id": "office",
        "name": "사무·문구용품",
        "intro": "일상 업무에 실용적이고 내구성 있는 폴더, 바인더, 커버.",
        "img": "website-images/categories/category-office-ring-binder.png",
        "products": [
          {
            "img": "images/product-folder.svg",
            "name": "문서 폴더",
            "desc": "문서 보관·정리를 위한 맞춤 폴더."
          },
          {
            "img": "images/product-ringbinder.svg",
            "name": "링 바인더",
            "desc": "사무·문구용 맞춤 EVA/PVC 바인더."
          },
          {
            "img": "images/product-notebookcover.svg",
            "name": "노트 커버",
            "desc": "노트·플래너용 맞춤 커버."
          },
          {
            "img": "images/product-filepocket.svg",
            "name": "파일 포켓",
            "desc": "유연한 문서 보관 솔루션."
          }
        ]
      },
      {
        "id": "custom",
        "name": "맞춤 제품",
        "intro": "원하는 모양·크기·인쇄·포장으로 제품을 개발합니다.",
        "img": "images/cat-custom.svg",
        "products": [
          {
            "img": "images/product-customeva.svg",
            "name": "맞춤 EVA 제품",
            "desc": "고객 디자인으로 만드는 부드럽고 가벼운 EVA 제품."
          },
          {
            "img": "images/product-customtpu.svg",
            "name": "맞춤 TPU 제품",
            "desc": "고객 디자인으로 만드는 투명하고 내구성 있는 TPU 제품."
          },
          {
            "img": "images/product-custompvc.svg",
            "name": "맞춤 PVC 제품",
            "desc": "고객 디자인으로 만드는 유연한 PVC 제품."
          }
        ]
      }
    ],
    "sec_oem_tag": "OEM / ODM",
    "sec_oem_title": "아이디어부터 완제품까지",
    "sec_oem_sub": "컨셉을 제품으로 만드는 간단한 4단계 프로세스.",
    "sec_oem_detail": "도면, 기존 샘플 또는 제품 아이디어를 바탕으로 소재 선정, 샘플 개발, 인쇄, 재단, 고주파 용접, 조립 및 최종 포장까지 지원합니다.",
    "oem_steps": [
      {
        "num": "01",
        "title": "디자인",
        "desc": "도면·샘플·아이디어를 보내주세요."
      },
      {
        "num": "02",
        "title": "프로토타입",
        "desc": "제품을 개발하고 샘플을 제작합니다."
      },
      {
        "num": "03",
        "title": "양산",
        "desc": "승인된 샘플 기준으로 대량 생산."
      },
      {
        "num": "04",
        "title": "납품",
        "desc": "검사·포장·선적."
      }
    ],
    "oem_cta": "프로젝트 시작하기",
    "sec_factory_tag": "공장",
    "sec_factory_title": "공장 갤러리",
    "sec_factory_sub": "소재 선택 · 인쇄 · 재단 · 고주파 용접 · 조립 · 검사 · 포장",
    "factory_previous": "이전 공장 사진 보기",
    "factory_next": "다음 공장 사진 보기",
    "factory_slides": "공장 사진 탐색",
    "factory_slide_label": "슬라이드",
    "factory_lightbox": "공장 사진 미리보기",
    "factory_close": "사진 미리보기 닫기",
    "factory_pause": "슬라이드쇼 일시 정지",
    "factory_play": "슬라이드쇼 다시 재생",
    "sec_quality_tag": "품질 및 시험 지원",
    "sec_quality_title": "합의된 제품 사양에서 품질이 시작됩니다",
    "sec_quality_sub": "양산 전에 제품 요구사항과 샘플을 확인합니다. 검사 방법과 제3자 시험은 프로젝트와 목표 시장에 따라 협의합니다.",
    "quality_item_1_title": "사양 검토",
    "quality_item_1_desc": "소재, 구조, 아트워크, 치수 및 포장 요구사항을 고객과 확인합니다.",
    "quality_item_2_title": "샘플 승인",
    "quality_item_2_desc": "양산에 앞서 기준 샘플과 주요 제품 세부사항을 확인합니다.",
    "quality_item_3_title": "검사 및 시험 조율",
    "quality_item_3_desc": "프로젝트별 검사 항목을 협의하고 필요한 경우 해당 제3자 시험을 조율합니다.",
    "quality_bsci_title": "amfori BSCI 사회적 책임 감사",
    "quality_bsci_desc": "사회적 책임 감사 정보는 적격 구매자의 요청 시 제공됩니다.",
    "factory_tiles": [
      { "img": "website-images/Codex输出图片/工厂与品质/factory-exterior-no-cars.jpg", "label": "공장 외관" },
      { "img": "website-images/Codex输出图片/工厂与品质/sample-library-redacted.png", "label": "샘플룸" },
      { "img": "website-images/Codex输出图片/工厂与品质/high-frequency-welding-redacted.png", "label": "고주파 용접" },
      { "img": "website-images/Codex输出图片/工厂与品质/workshop-high-frequency-redacted.png", "label": "고주파 용접" },
      { "img": "website-images/Codex输出图片/工厂与品质/production-line.png", "label": "인쇄 생산 라인" },
      { "img": "website-images/Codex输出图片/工厂与品质/film-laminating-redacted.png", "label": "소재 재단" },
      { "img": "website-images/Codex输出图片/工厂与品质/manual-assembly-redacted.png", "label": "수작업 조립" },
      { "img": "website-images/Codex输出图片/工厂与品质/team-inspection-redacted.png", "label": "직원 교육" },
      { "img": "website-images/Codex输出图片/工厂与品质/tooling-storage.png", "label": "금형 관리" },
      { "img": "website-images/Codex输出图片/工厂与品质/container-loading.png", "label": "컨테이너 적재 및 출하" }
    ],
    "sec_heritage_tag": "회사 배경",
    "sec_heritage_title": "룽더 플라스틱의 약 20년 경험을 바탕으로 새로운 사업을 전개합니다",
    "heritage_p1": "LongDe Yizhi는 새로운 사업 개발을 위해 Dongguan Longde Plastic Products가 설립한 신설 회사입니다. 룽더 플라스틱의 약 20년 제품 개발 및 제조 경험을 바탕으로 신제품을 개발하고 사업을 확장합니다.",
    "heritage_p2": "현재는 목욕책과 맞춤형 링 바인더에 중점을 두고, 고객 요구에 맞는 제품과 제조 방안을 검토합니다.",
    "heritage_cta": "프로젝트 상담",
    "heritage_points": [
      { "title": "약 20년", "desc": "룽더 플라스틱의 제품 개발 및 제조 경험" },
      { "title": "신규 사업", "desc": "신제품 개발 및 사업 영역 확장" },
      { "title": "주요 분야", "desc": "목욕책 및 맞춤형 링 바인더" }
    ],
    "sec_about_tag": "회사 소개",
    "sec_about_title": "LongDe Yizhi 소개",
    "about_p1": "LongDe Yizhi는 중국 둥관을 기반으로 목욕책, 링 바인더 및 기타 연질 플라스틱 제품의 맞춤 프로젝트를 진행합니다.",
    "about_p2": "고객과 요구사항을 확인하고 소재, 샘플 승인, 생산, 검사 및 포장 조건에 따라 B2B 프로젝트를 진행합니다.",
    "about_values": [
      "EVA · TPU · PVC",
      "OEM / ODM",
      "맞춤 제조"
    ],
    "sec_contact_tag": "문의하기",
    "contact_language_prompt": "문의 양식 언어 선택:",
    "contact_language_group": "문의 양식 언어 선택",
    "sec_contact_title": "함께 시작합시다",
    "sec_contact_sub": "제품 아이디어나 맞춤 솔루션이 필요하신가요? 프로젝트에 대해 알려주세요.",
    "contact_addr_label": "주소",
    "contact_addr": "중국 광둥성 둥관시 랴오부진 진스루 56호 2동 301호",
    "contact_email_label": "이메일",
    "contact_email": "sales@longdeyizhi.com",
    "qr_wechat_title": "위챗 고객 서비스",
    "qr_wechat_1": "위챗 상담 1",
    "qr_wechat_2": "위챗 상담 2",
    "qr_line_title": "LINE 고객 서비스",
    "qr_line": "LINE 상담",
    "contact_hours_label": "근무 시간",
    "contact_hours": "월~토 8:30 – 18:00",
    "map_link": "Google 지도에서 보기",
    "form_name": "이름",
    "form_company": "회사",
    "form_email": "이메일",
    "form_category": "제품 카테고리",
    "form_market": "목표 시장",
    "form_market_ph": "예: EU, 미국, 일본, 한국",
    "form_product": "제품",
    "form_qty": "수량",
    "form_msg": "메시지",
    "form_attachments": "첨부 파일 (선택 사항)",
    "form_attachments_note": "도면, 참고 이미지 또는 로고를 첨부하세요. 총 15MB까지 가능합니다.",
    "form_attachments_too_large": "첨부 파일은 총 15MB 이하여야 합니다. 일부 파일을 제거한 후 다시 시도하세요.",
    "form_phone": "전화번호",
    "form_wechat": "위챗",
    "form_contact_app": "기타 연락처 (WhatsApp / LINE 등)",
    "form_send": "견적 요청",
    "form_note": "제출 후 가능한 빨리 이메일로 회신해 드리겠습니다.",
    "form_sending": "전송 중…",
    "form_success": "제출이 완료되었습니다. 가능한 빨리 이메일로 회신해 드리겠습니다.",
    "form_error": "전송에 실패했습니다. 잠시 후 다시 시도하거나 sales@longdeyizhi.com 으로 직접 문의해 주세요.",
    "form_required": "필수 항목(이름, 회사명, 이메일)을 모두 입력해 주세요.",
    "form_email_invalid": "이메일 형식이 올바르지 않습니다.",
    "modal_ok": "확인",
    "mail_intro": "안녕하세요, 제 이름은",
    "mail_subject": "홈페이지 문의",
    "footer_blurb": "EVA·TPU·PVC 제품 전문 제조업체로서 베이비·키즈·오피스용 제품을 개발·제조하고, 해외 고객을 위한 OEM/ODM 제조 서비스를 제공합니다.",
    "footer_links_title": "바로가기",
    "footer_products_title": "제품",
    "footer_contact_title": "문의",
    "footer_bottom": "© 2026 룽더이즈(둥관) 신소재 유한회사",
    "footer_oem": "OEM / ODM 맞춤 제작 · 함께 협력하길 기대합니다",
    "meta_title": "LongDe Yizhi | 맞춤 목욕책 및 링 바인더 | B2B OEM/ODM",
    "meta_desc": "중국 둥관에서 브랜드와 수입업체를 위한 목욕책, 링 바인더 및 연질 플라스틱 제품을 맞춤 개발합니다."
  },

  /* ---------------- Français ---------------- */
  fr: {
    "brand_short": "LongDe Yizhi",
    "brand_name": "LongDe Yizhi (Dongguan) New Materials Co., Ltd.",
    "nav_products": "Produits",
    "nav_oem": "OEM / ODM",
    "nav_factory": "Usine et qualité",
    "nav_about": "À propos",
    "nav_contact": "Contact",
    "quote_btn": "Demander un devis",
    "hero_title": "Livres de bain et classeurs sur mesure",
    "hero_materials": "Fabriqués en EVA, PVC et TPU",
    "hero_sub": "Fabrication sur mesure pour les marques enfants et papeterie. Partez d’un dessin, d’un échantillon ou d’une idée.",
    "hero_proof": ["Près de 20 ans d’expérience en développement et fabrication", "OEM / développement sur mesure", "EVA · PVC · TPU", "Soudure haute fréquence"],
    "hero_cta1": "Demander un devis",
    "hero_cta2": "Voir les livres de bain",
    "hero_card_bath": "Livres de bain",
    "hero_card_binder": "Classeurs à anneaux",
    "hero_capability_tag": "Fabrication sur mesure",
    "hero_capability_detail": "Soudure HF · Assemblage",
    "tagline": "Personnalisation OEM/ODM · Échantillonnage et production clés en main · Clients dans le monde entier",
    "sec_products_tag": "Produits",
    "sec_products_title": "Catégories de produits",
    "sec_products_sub": "Nos priorités sont les livres de bain et les classeurs sur mesure. Les autres produits souples sont étudiés par projet.",
    "sec_commercial_tag": "Cadre du projet",
    "sec_commercial_title": "Des attentes claires pour nos produits OEM phares",
    "sec_commercial_sub": "Des attentes claires aident votre équipe à planifier le projet avant une demande de devis formelle.",
    "commercial_moq_label": "MOQ livres de bain",
    "commercial_moq_value": "À partir de 3 000 pièces",
    "commercial_sample_label": "Délai d'échantillonnage",
    "commercial_sample_value": "Livres de bain : 10 j. · Classeurs : 3 j.",
    "commercial_delivery_label": "Délai indicatif de production",
    "commercial_delivery_value": "Environ 45 jours après approbation de l'échantillon",
    "commercial_reply_label": "Réponse à la demande",
    "commercial_reply_value": "Sous 1 jour ouvré",
    "commercial_note": "Le MOQ des livres de bain et les délais du projet sont confirmés selon le cahier des charges final, les visuels, les essais, l'emballage et les exigences de livraison.",
    "products_cta": "Voir la catégorie",
    "products_more": "Vous ne trouvez pas votre produit ? Dites-nous ce dont vous avez besoin →",
    "bags_name": "Sacs et pochettes",
    "bags_intro": "Pochettes zippées, sacs de rangement et solutions d’emballage sur mesure.",
    "categories": [
      {
        "id": "baby",
        "name": "Produits Bébé & Enfants",
        "intro": "Des produits EVA, TPU et PVC souples, sûrs et imperméables pour bébés et enfants.",
        "img": "website-images/Codex输出图片/Bath Book and Waterproof Kids Products/category-hero-baby-kids.png",
        "products": [
          {
            "img": "images/product-bathbook.svg",
            "name": "Livres de bain",
            "desc": "Livres souples et imperméables pour le bain des bébés."
          },
          {
            "img": "images/product-softbook.svg",
            "name": "Livres souples",
            "desc": "Produits souples et légers conçus pour les bébés et les enfants."
          },
          {
            "img": "images/product-waterproof.svg",
            "name": "Produits imperméables enfants",
            "desc": "Produits imperméables sur mesure pour enfants."
          }
        ]
      },
      {
        "id": "office",
        "name": "Produits Bureau & Papeterie",
        "intro": "Pochettes, classeurs et couvertures pratiques et durables pour le bureau.",
        "img": "website-images/categories/category-office-ring-binder.png",
        "products": [
          {
            "img": "images/product-folder.svg",
            "name": "Pochettes à documents",
            "desc": "Pochettes sur mesure pour le classement et l'organisation."
          },
          {
            "img": "images/product-ringbinder.svg",
            "name": "Classeurs à anneaux",
            "desc": "Classeurs EVA/PVC sur mesure pour bureau et papeterie."
          },
          {
            "img": "images/product-notebookcover.svg",
            "name": "Couvertures de cahiers",
            "desc": "Couvertures sur mesure pour cahiers et agendas."
          },
          {
            "img": "images/product-filepocket.svg",
            "name": "Pochettes de rangement",
            "desc": "Solutions souples de rangement de documents."
          }
        ]
      },
      {
        "id": "custom",
        "name": "Produits sur mesure",
        "intro": "Développez des produits selon votre forme, taille, impression et emballage.",
        "img": "images/cat-custom.svg",
        "products": [
          {
            "img": "images/product-customeva.svg",
            "name": "Produits EVA sur mesure",
            "desc": "Produits EVA souples et légers selon votre design."
          },
          {
            "img": "images/product-customtpu.svg",
            "name": "Produits TPU sur mesure",
            "desc": "Produits TPU transparents et durables selon votre design."
          },
          {
            "img": "images/product-custompvc.svg",
            "name": "Produits PVC sur mesure",
            "desc": "Produits PVC flexibles selon votre design."
          }
        ]
      }
    ],
    "sec_oem_tag": "OEM / ODM",
    "sec_oem_title": "De votre idée au produit fini",
    "sec_oem_sub": "Un processus simple en quatre étapes pour transformer votre concept en produits.",
    "sec_oem_detail": "À partir de votre dessin, d’un échantillon existant ou d’une idée produit, nous accompagnons le choix des matériaux, l’échantillonnage, l’impression, la découpe, la soudure HF, l’assemblage et l’emballage final.",
    "oem_steps": [
      {
        "num": "01",
        "title": "Conception",
        "desc": "Envoyez-nous votre dessin, échantillon ou idée."
      },
      {
        "num": "02",
        "title": "Prototype",
        "desc": "Nous développons le produit et l'échantillon."
      },
      {
        "num": "03",
        "title": "Production",
        "desc": "Production en série sur échantillons approuvés."
      },
      {
        "num": "04",
        "title": "Livraison",
        "desc": "Contrôle, emballage et expédition."
      }
    ],
    "oem_cta": "Lancer votre projet",
    "sec_factory_tag": "Usine",
    "sec_factory_title": "Galerie de l’usine",
    "sec_factory_sub": "Sélection des matières · Impression · Découpe · Soudure HF · Assemblage · Contrôle · Emballage",
    "factory_previous": "Voir les photos précédentes",
    "factory_next": "Voir les photos suivantes",
    "factory_slides": "Navigation des photos de l’usine",
    "factory_slide_label": "Diapositive",
    "factory_lightbox": "Aperçu des photos de l’usine",
    "factory_close": "Fermer l’aperçu photo",
    "factory_pause": "Mettre le diaporama en pause",
    "factory_play": "Reprendre le diaporama",
    "sec_quality_tag": "Qualité et essais",
    "sec_quality_title": "La qualité commence par une spécification convenue",
    "sec_quality_sub": "Nous validons les exigences produit et l’échantillon avant la production. Les contrôles et essais tiers sont définis selon chaque projet et son marché cible.",
    "quality_item_1_title": "Revue de spécification",
    "quality_item_1_desc": "Confirmer avec votre équipe les matières, la construction, le visuel, les dimensions et l’emballage.",
    "quality_item_2_title": "Validation de l’échantillon",
    "quality_item_2_desc": "Examiner l’échantillon de référence et les détails clés avant la production.",
    "quality_item_3_title": "Coordination des contrôles et essais",
    "quality_item_3_desc": "Définir les points de contrôle et organiser les essais tiers applicables si nécessaire.",
    "quality_bsci_title": "Audit social amfori BSCI",
    "quality_bsci_desc": "Les informations d'audit de conformité sociale sont disponibles sur demande pour les acheteurs qualifiés.",
    "factory_tiles": [
      { "img": "website-images/Codex输出图片/工厂与品质/factory-exterior-no-cars.jpg", "label": "Extérieur de l’usine" },
      { "img": "website-images/Codex输出图片/工厂与品质/sample-library-redacted.png", "label": "Salle d’échantillons" },
      { "img": "website-images/Codex输出图片/工厂与品质/high-frequency-welding-redacted.png", "label": "Soudure haute fréquence" },
      { "img": "website-images/Codex输出图片/工厂与品质/workshop-high-frequency-redacted.png", "label": "Soudure haute fréquence" },
      { "img": "website-images/Codex输出图片/工厂与品质/production-line.png", "label": "Ligne d’impression" },
      { "img": "website-images/Codex输出图片/工厂与品质/film-laminating-redacted.png", "label": "Découpe des matières" },
      { "img": "website-images/Codex输出图片/工厂与品质/manual-assembly-redacted.png", "label": "Assemblage manuel" },
      { "img": "website-images/Codex输出图片/工厂与品质/team-inspection-redacted.png", "label": "Formation des employés" },
      { "img": "website-images/Codex输出图片/工厂与品质/tooling-storage.png", "label": "Gestion des outillages" },
      { "img": "website-images/Codex输出图片/工厂与品质/container-loading.png", "label": "Chargement et expédition" }
    ],
    "sec_heritage_tag": "Présentation de l’entreprise",
    "sec_heritage_title": "Une nouvelle activité fondée sur près de 20 ans d’expérience industrielle",
    "heritage_p1": "LongDe Yizhi est une nouvelle société créée par Dongguan Longde Plastic Products pour développer de nouvelles activités. Elle s’appuie sur près de 20 ans d’expérience de Longde Plastic en développement de produits et fabrication pour concevoir de nouveaux produits et explorer de nouveaux marchés.",
    "heritage_p2": "Nos priorités actuelles sont les livres de bain et les classeurs à anneaux sur mesure, avec des solutions étudiées selon les besoins de chaque client.",
    "heritage_cta": "Parler de votre projet",
    "heritage_points": [
      { "title": "Près de 20 ans", "desc": "Expérience en développement et fabrication chez Longde Plastic" },
      { "title": "Nouvelles activités", "desc": "Développement de produits et de marchés" },
      { "title": "Priorités actuelles", "desc": "Livres de bain et classeurs à anneaux sur mesure" }
    ],
    "sec_about_tag": "À propos",
    "sec_about_title": "À propos de LongDe Yizhi",
    "about_p1": "Basée à Dongguan, en Chine, LongDe Yizhi développe des livres de bain, classeurs à anneaux et autres produits souples sur mesure.",
    "about_p2": "Nous alignons les exigences avec nos clients et coordonnons matières, validation d’échantillon, production, contrôle et emballage pour les projets B2B.",
    "about_values": [
      "EVA · TPU · PVC",
      "OEM / ODM",
      "Fabrication sur mesure"
    ],
    "sec_contact_tag": "Contact",
    "contact_language_prompt": "Afficher ce formulaire dans :",
    "contact_language_group": "Choisir la langue du formulaire de demande",
    "sec_contact_title": "Travaillons ensemble",
    "sec_contact_sub": "Vous avez une idée de produit ou besoin d'une solution sur mesure ? Parlez-nous de votre projet.",
    "contact_addr_label": "Adresse",
    "contact_addr": "Salle 301, Bâtiment 2, n° 56 route Jinshi, ville de Liaobu, Dongguan, Guangdong, Chine",
    "contact_email_label": "E-mail",
    "contact_email": "sales@longdeyizhi.com",
    "qr_wechat_title": "Service client WeChat",
    "qr_wechat_1": "Support WeChat 1",
    "qr_wechat_2": "Support WeChat 2",
    "qr_line_title": "Service client LINE",
    "qr_line": "Support LINE",
    "contact_hours_label": "Horaires",
    "contact_hours": "Lun – Sam, 8h30 – 18h00",
    "map_link": "Voir sur Google Maps",
    "form_name": "Nom",
    "form_company": "Entreprise",
    "form_email": "E-mail",
    "form_category": "Catégorie de produit",
    "form_market": "Marché cible",
    "form_market_ph": "Ex. : UE, États-Unis, Japon, Corée du Sud",
    "form_product": "Produit",
    "form_qty": "Quantité",
    "form_msg": "Message",
    "form_attachments": "Pièces jointes (facultatif)",
    "form_attachments_note": "Ajoutez des plans, images de référence ou un logo. 15 Mo au total maximum.",
    "form_attachments_too_large": "La taille totale des pièces jointes ne doit pas dépasser 15 Mo. Supprimez des fichiers et réessayez.",
    "form_phone": "Téléphone",
    "form_wechat": "WeChat",
    "form_contact_app": "Autre contact (WhatsApp / LINE…)",
    "form_send": "Demander un devis",
    "form_note": "Nous vous répondrons par e-mail dans les plus brefs délais.",
    "form_sending": "Envoi…",
    "form_success": "Merci ! Votre demande a bien été envoyée. Nous vous répondrons par e-mail dans les plus brefs délais.",
    "form_error": "Désolé, une erreur est survenue. Veuillez réessayer ou nous écrire directement à sales@longdeyizhi.com.",
    "form_required": "Veuillez remplir tous les champs obligatoires (nom, société, e-mail).",
    "form_email_invalid": "Veuillez saisir une adresse e-mail valide.",
    "modal_ok": "OK",
    "mail_intro": "Bonjour, je m'appelle",
    "mail_subject": "Demande depuis le site web",
    "footer_blurb": "Fabricant professionnel de produits EVA, TPU et PVC pour applications Bébé, Enfants et Bureau, avec fabrication OEM & ODM pour les clients internationaux.",
    "footer_links_title": "Liens rapides",
    "footer_products_title": "Produits",
    "footer_contact_title": "Contact",
    "footer_bottom": "© 2026 LongDe Yizhi (Dongguan) New Materials Co., Ltd. Tous droits réservés.",
    "footer_oem": "Personnalisation OEM / ODM · Au plaisir de collaborer",
    "meta_title": "LongDe Yizhi | Livres de bain et classeurs sur mesure | B2B OEM/ODM",
    "meta_desc": "Fabrication sur mesure à Dongguan de livres de bain, classeurs à anneaux et produits souples pour les marques et importateurs."
  },
};
