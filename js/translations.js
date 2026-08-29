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
    "nav_factory": "工厂",
    "nav_about": "关于我们",
    "nav_contact": "联系我们",
    "quote_btn": "获取报价",
    "hero_badge": "EVA · TPU · PVC 制造商",
    "hero_title": "为您的品牌定制产品",
    "hero_sub": "为婴幼儿、儿童与办公用品提供 OEM/ODM 生产制造。",
    "hero_cta1": "查看产品",
    "hero_cta2": "获取报价",
    "tagline": "支持 OEM / ODM 定制 · 一站式打样量产 · 面向全球客户",
    "sec_products_tag": "产品中心",
    "sec_products_title": "产品分类",
    "sec_products_sub": "探索我们为儿童与办公应用提供的产品解决方案。",
    "products_cta": "查看分类",
    "products_more": "没有找到需要的产品？告诉我们您的需求 →",
    "categories": [
      {
        "id": "baby",
        "name": "儿童用品",
        "intro": "为婴幼儿和儿童提供柔软、安全、防水的 EVA、TPU、PVC 产品。",
        "img": "images/cat-baby.svg",
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
        "img": "images/cat-office.svg",
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
    "sec_factory_title": "中国东莞制造",
    "sec_factory_sub": "EVA · TPU · PVC 制造 —— 支持 OEM / ODM",
    "factory_tiles": [
      {
        "img": "images/factory-factory.svg",
        "label": "工厂"
      },
      {
        "img": "images/factory-welding.svg",
        "label": "高频焊接"
      },
      {
        "img": "images/factory-production.svg",
        "label": "生产车间"
      },
      {
        "img": "images/factory-workers.svg",
        "label": "生产工人"
      },
      {
        "img": "images/factory-qc.svg",
        "label": "品质检验"
      },
      {
        "img": "images/factory-products.svg",
        "label": "成品"
      }
    ],
    "sec_about_tag": "关于我们",
    "sec_about_title": "关于 LongDe Yizhi",
    "about_p1": "LongDe Yizhi 是一家位于中国东莞的制造工厂，专注于 EVA、TPU、PVC 产品。",
    "about_p2": "我们为婴幼儿、儿童与办公应用开发和生产产品，为国际客户提供 OEM 和 ODM 服务。",
    "about_values": [
      "EVA · TPU · PVC",
      "OEM / ODM",
      "定制制造"
    ],
    "sec_contact_tag": "联系我们",
    "sec_contact_title": "让我们携手合作",
    "sec_contact_sub": "有产品想法或需要定制解决方案？告诉我们您的项目。",
    "contact_addr_label": "公司地址",
    "contact_addr": "广东省东莞市寮步镇进士路56号2栋301室",
    "contact_phone_label": "联系电话",
    "contact_phone": "+86 0769-86317399",
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
    "form_product": "产品",
    "form_qty": "数量",
    "form_msg": "留言内容",
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
    "meta_title": "龙德益智（东莞）新材料有限公司｜EVA/TPU/PVC 儿童用品与办公用品制造商",
    "meta_desc": "龙德益智（东莞）新材料有限公司是位于中国东莞的 EVA、TPU、PVC 产品制造商，为婴幼儿、儿童与办公应用开发和生产产品，为国际客户提供 OEM/ODM 制造服务。"
  },

  zh_tw:   {
    "brand_short": "LongDe Yizhi",
    "brand_name": "龍德益智（東莞）新材料有限公司",
    "nav_products": "產品中心",
    "nav_oem": "OEM / ODM",
    "nav_factory": "工廠",
    "nav_about": "關於我們",
    "nav_contact": "聯繫我們",
    "quote_btn": "獲取報價",
    "hero_badge": "EVA · TPU · PVC 製造商",
    "hero_title": "為您的品牌客製產品",
    "hero_sub": "為嬰幼兒、兒童與辦公用品提供 OEM/ODM 生產製造。",
    "hero_cta1": "查看產品",
    "hero_cta2": "獲取報價",
    "tagline": "支援 OEM / ODM 客製 · 一站式打樣量產 · 面向全球客戶",
    "sec_products_tag": "產品中心",
    "sec_products_title": "產品分類",
    "sec_products_sub": "探索我們為兒童與辦公應用提供的產品解決方案。",
    "products_cta": "查看分類",
    "products_more": "沒有找到需要的產品？告訴我們您的需求 →",
    "categories": [
      {
        "id": "baby",
        "name": "兒童用品",
        "intro": "為嬰幼兒和兒童提供柔軟、安全、防水的 EVA、TPU、PVC 產品。",
        "img": "images/cat-baby.svg",
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
        "img": "images/cat-office.svg",
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
    "sec_factory_title": "中國東莞製造",
    "sec_factory_sub": "EVA · TPU · PVC 製造 —— 支援 OEM / ODM",
    "factory_tiles": [
      {
        "img": "images/factory-factory.svg",
        "label": "工廠"
      },
      {
        "img": "images/factory-welding.svg",
        "label": "高頻焊接"
      },
      {
        "img": "images/factory-production.svg",
        "label": "生產車間"
      },
      {
        "img": "images/factory-workers.svg",
        "label": "生產工人"
      },
      {
        "img": "images/factory-qc.svg",
        "label": "品質檢驗"
      },
      {
        "img": "images/factory-products.svg",
        "label": "成品"
      }
    ],
    "sec_about_tag": "關於我們",
    "sec_about_title": "關於 LongDe Yizhi",
    "about_p1": "LongDe Yizhi 是一家位於中國東莞的製造工廠，專注於 EVA、TPU、PVC 產品。",
    "about_p2": "我們為嬰幼兒、兒童與辦公應用開發和生產產品，為國際客戶提供 OEM 和 ODM 服務。",
    "about_values": [
      "EVA · TPU · PVC",
      "OEM / ODM",
      "客製製造"
    ],
    "sec_contact_tag": "聯繫我們",
    "sec_contact_title": "讓我們攜手合作",
    "sec_contact_sub": "有產品想法或需要客製解決方案？告訴我們您的專案。",
    "contact_addr_label": "公司地址",
    "contact_addr": "廣東省東莞市寮步鎮進士路56號2棟301室",
    "contact_phone_label": "聯絡電話",
    "contact_phone": "+86 0769-86317399",
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
    "form_product": "產品",
    "form_qty": "數量",
    "form_msg": "留言內容",
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
    "meta_title": "龍德益智（東莞）新材料有限公司｜EVA/TPU/PVC 兒童用品與辦公用品製造商",
    "meta_desc": "龍德益智（東莞）新材料有限公司是位於中國東莞的 EVA、TPU、PVC 產品製造商，為嬰幼兒、兒童與辦公應用開發和生產產品，為國際客戶提供 OEM/ODM 製造服務。"
  },

  /* ---------------- English ---------------- */
  en: {
    "brand_short": "LongDe Yizhi",
    "brand_name": "LongDe Yizhi (Dongguan) New Materials Co., Ltd.",
    "nav_products": "Products",
    "nav_oem": "OEM / ODM",
    "nav_factory": "Factory",
    "nav_about": "About",
    "nav_contact": "Contact",
    "quote_btn": "Request a Quote",
    "hero_badge": "EVA · TPU · PVC MANUFACTURER",
    "hero_title": "Custom Products Made for Your Brand",
    "hero_sub": "OEM & ODM manufacturing for Baby, Kids & Office Products.",
    "hero_cta1": "View Products",
    "hero_cta2": "Request a Quote",
    "tagline": "OEM / ODM Customization · One-stop Sampling & Production · Serving Global Customers",
    "sec_products_tag": "Products",
    "sec_products_title": "Product Categories",
    "sec_products_sub": "Explore our product solutions for Baby, Kids and Office applications.",
    "products_cta": "View Category",
    "products_more": "Don't see your product? Tell us what you need →",
    "categories": [
      {
        "id": "baby",
        "name": "Baby & Kids Products",
        "intro": "Soft, safe and waterproof EVA, TPU and PVC products for babies and kids.",
        "img": "images/cat-baby.svg",
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
        "intro": "Practical and durable folders, binders and covers for everyday office use.",
        "img": "images/cat-office.svg",
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
        "name": "Custom Products",
        "intro": "Develop products in your own shape, size, printing and packaging.",
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
    "sec_oem_tag": "OEM / ODM",
    "sec_oem_title": "From Your Idea to Finished Product",
    "sec_oem_sub": "A simple four-step process to turn your concept into products.",
    "oem_steps": [
      {
        "num": "01",
        "title": "Design",
        "desc": "Send us your drawing, sample or idea."
      },
      {
        "num": "02",
        "title": "Prototype",
        "desc": "We develop the product and sample."
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
    "oem_cta": "Start Your Project",
    "sec_factory_tag": "Factory",
    "sec_factory_title": "Made in Dongguan, China",
    "sec_factory_sub": "EVA · TPU · PVC Manufacturing — OEM / ODM Available",
    "factory_tiles": [
      {
        "img": "images/factory-factory.svg",
        "label": "Factory"
      },
      {
        "img": "images/factory-welding.svg",
        "label": "High-Frequency Welding"
      },
      {
        "img": "images/factory-production.svg",
        "label": "Production"
      },
      {
        "img": "images/factory-workers.svg",
        "label": "Workers"
      },
      {
        "img": "images/factory-qc.svg",
        "label": "Quality Inspection"
      },
      {
        "img": "images/factory-products.svg",
        "label": "Finished Products"
      }
    ],
    "sec_about_tag": "About",
    "sec_about_title": "About LongDe Yizhi",
    "about_p1": "LongDe Yizhi is a manufacturer based in Dongguan, China, specializing in EVA, TPU and PVC products.",
    "about_p2": "We develop and manufacture products for Baby, Kids and Office applications, with OEM and ODM services for international customers.",
    "about_values": [
      "EVA · TPU · PVC",
      "OEM / ODM",
      "Custom Manufacturing"
    ],
    "sec_contact_tag": "Contact",
    "sec_contact_title": "Let's Work Together",
    "sec_contact_sub": "Have a product idea or need a custom solution? Tell us about your project.",
    "contact_addr_label": "Address",
    "contact_addr": "Room 301, Building 2, No. 56 Jinshi Road, Liaobu Town, Dongguan, Guangdong, China",
    "contact_phone_label": "Phone",
    "contact_phone": "+86 0769-86317399",
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
    "form_product": "Product",
    "form_qty": "Quantity",
    "form_msg": "Message",
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
    "footer_blurb": "A professional manufacturer of EVA, TPU and PVC products for Baby, Kids and Office applications, providing OEM & ODM manufacturing for international customers.",
    "footer_links_title": "Quick Links",
    "footer_products_title": "Products",
    "footer_contact_title": "Contact",
    "footer_bottom": "© 2026 LongDe Yizhi (Dongguan) New Materials Co., Ltd. All rights reserved.",
    "footer_oem": "OEM / ODM Customization · Welcome to Cooperate",
    "meta_title": "LongDe Yizhi | EVA/TPU/PVC Manufacturer for Baby, Kids & Office Products",
    "meta_desc": "LongDe Yizhi is a manufacturer in Dongguan, China, specializing in EVA, TPU and PVC products for Baby, Kids and Office applications, with OEM & ODM manufacturing for international customers."
  },

  /* ---------------- 日本語 ---------------- */
  ja: {
    "brand_short": "LongDe Yizhi",
    "brand_name": "龍德益智（東莞）新材料有限公司",
    "nav_products": "製品情報",
    "nav_oem": "OEM / ODM",
    "nav_factory": "工場",
    "nav_about": "会社概要",
    "nav_contact": "お問い合わせ",
    "quote_btn": "見積りを依頼",
    "hero_badge": "EVA · TPU · PVC メーカー",
    "hero_title": "御社ブランドのためのカスタム製品",
    "hero_sub": "ベビー・キッズ・オフィス用品の OEM/ODM 製造。",
    "hero_cta1": "製品を見る",
    "hero_cta2": "見積りを依頼",
    "tagline": "OEM/ODM カスタマイズ対応 · サンプルから量産までワンストップ · 世界中のお客様へ",
    "sec_products_tag": "製品情報",
    "sec_products_title": "製品カテゴリー",
    "sec_products_sub": "ベビー・キッズ・オフィス向けの製品ソリューションをご覧ください。",
    "products_cta": "カテゴリーを見る",
    "products_more": "お探しの製品がない場合は、ご要望をお聞かせください →",
    "categories": [
      {
        "id": "baby",
        "name": "ベビー・キッズ用品",
        "intro": "赤ちゃんと子供向けの柔らかく安全な防水 EVA・TPU・PVC 製品。",
        "img": "images/cat-baby.svg",
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
        "img": "images/cat-office.svg",
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
    "sec_factory_title": "中国東莞で製造",
    "sec_factory_sub": "EVA・TPU・PVC 製造 —— OEM / ODM 対応",
    "factory_tiles": [
      {
        "img": "images/factory-factory.svg",
        "label": "工場"
      },
      {
        "img": "images/factory-welding.svg",
        "label": "高周波溶着"
      },
      {
        "img": "images/factory-production.svg",
        "label": "生産ライン"
      },
      {
        "img": "images/factory-workers.svg",
        "label": "生産スタッフ"
      },
      {
        "img": "images/factory-qc.svg",
        "label": "品質検査"
      },
      {
        "img": "images/factory-products.svg",
        "label": "完成品"
      }
    ],
    "sec_about_tag": "会社概要",
    "sec_about_title": "LongDe Yizhi について",
    "about_p1": "LongDe Yizhi は中国東莞に拠点を置く、EVA・TPU・PVC 製品専門のメーカーです。",
    "about_p2": "ベビー・キッズ・オフィス向け製品の開発・製造を行い、海外のお客様に OEM・ODM サービスを提供しています。",
    "about_values": [
      "EVA · TPU · PVC",
      "OEM / ODM",
      "カスタム製造"
    ],
    "sec_contact_tag": "お問い合わせ",
    "sec_contact_title": "一緒に始めましょう",
    "sec_contact_sub": "製品アイデアやカスタムソリューションが必要ですか？プロジェクトについてお聞かせください。",
    "contact_addr_label": "所在地",
    "contact_addr": "中国広東省東莞市寮歩鎮進士路56号2棟301室",
    "contact_phone_label": "電話",
    "contact_phone": "+86 0769-86317399",
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
    "form_product": "製品名",
    "form_qty": "数量",
    "form_msg": "メッセージ",
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
    "meta_title": "龍德益智（東莞）新材料有限公司｜EVA/TPU/PVC ベビー・キッズ・オフィス用品メーカー",
    "meta_desc": "龍德益智（東莞）新材料有限公司は中国東莞に拠点を置く EVA・TPU・PVC メーカーで、ベビー・キッズ・オフィス向け製品を開発・製造し、海外のお客様に OEM/ODM 製造サービスを提供しています。"
  },

  /* ---------------- 한국어 ---------------- */
  ko: {
    "brand_short": "LongDe Yizhi",
    "brand_name": "룽더이즈(둥관) 신소재 유한회사",
    "nav_products": "제품",
    "nav_oem": "OEM / ODM",
    "nav_factory": "공장",
    "nav_about": "회사 소개",
    "nav_contact": "문의하기",
    "quote_btn": "견적 요청",
    "hero_badge": "EVA · TPU · PVC 제조업체",
    "hero_title": "고객 브랜드를 위한 맞춤 제품",
    "hero_sub": "베이비·키즈·오피스 제품 OEM/ODM 제조.",
    "hero_cta1": "제품 보기",
    "hero_cta2": "견적 요청",
    "tagline": "OEM/ODM 맞춤 제작 · 샘플부터 양산까지 원스톱 · 전 세계 고객 지원",
    "sec_products_tag": "제품",
    "sec_products_title": "제품 카테고리",
    "sec_products_sub": "베이비·키즈·오피스용 제품 솔루션을 만나보세요.",
    "products_cta": "카테고리 보기",
    "products_more": "필요한 제품이 없으신가요? 요구사항을 알려주세요 →",
    "categories": [
      {
        "id": "baby",
        "name": "베이비·키즈용품",
        "intro": "아기와 아이를 위한 부드럽고 안전한 방수 EVA·TPU·PVC 제품.",
        "img": "images/cat-baby.svg",
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
        "img": "images/cat-office.svg",
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
    "sec_factory_title": "중국 둥관에서 제조",
    "sec_factory_sub": "EVA·TPU·PVC 제조 — OEM / ODM 가능",
    "factory_tiles": [
      {
        "img": "images/factory-factory.svg",
        "label": "공장"
      },
      {
        "img": "images/factory-welding.svg",
        "label": "고주파 용접"
      },
      {
        "img": "images/factory-production.svg",
        "label": "생산 라인"
      },
      {
        "img": "images/factory-workers.svg",
        "label": "생산 직원"
      },
      {
        "img": "images/factory-qc.svg",
        "label": "품질 검사"
      },
      {
        "img": "images/factory-products.svg",
        "label": "완제품"
      }
    ],
    "sec_about_tag": "회사 소개",
    "sec_about_title": "LongDe Yizhi 소개",
    "about_p1": "LongDe Yizhi는 중국 둥관에 위치한 EVA·TPU·PVC 제품 전문 제조업체입니다.",
    "about_p2": "베이비·키즈·오피스용 제품을 개발·제조하며, 해외 고객을 위한 OEM·ODM 서비스를 제공합니다.",
    "about_values": [
      "EVA · TPU · PVC",
      "OEM / ODM",
      "맞춤 제조"
    ],
    "sec_contact_tag": "문의하기",
    "sec_contact_title": "함께 시작합시다",
    "sec_contact_sub": "제품 아이디어나 맞춤 솔루션이 필요하신가요? 프로젝트에 대해 알려주세요.",
    "contact_addr_label": "주소",
    "contact_addr": "중국 광둥성 둥관시 랴오부진 진스루 56호 2동 301호",
    "contact_phone_label": "전화",
    "contact_phone": "+86 0769-86317399",
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
    "form_product": "제품",
    "form_qty": "수량",
    "form_msg": "메시지",
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
    "meta_title": "룽더이즈(둥관) 신소재 유한회사｜EVA/TPU/PVC 베이비·키즈·오피스 제품 제조업체",
    "meta_desc": "룽더이즈(둥관) 신소재 유한회사는 중국 둥관에 위치한 EVA·TPU·PVC 제조업체로, 베이비·키즈·오피스용 제품을 개발·제조하고 해외 고객을 위한 OEM/ODM 제조 서비스를 제공합니다."
  },

  /* ---------------- Français ---------------- */
  fr: {
    "brand_short": "LongDe Yizhi",
    "brand_name": "LongDe Yizhi (Dongguan) New Materials Co., Ltd.",
    "nav_products": "Produits",
    "nav_oem": "OEM / ODM",
    "nav_factory": "Usine",
    "nav_about": "À propos",
    "nav_contact": "Contact",
    "quote_btn": "Demander un devis",
    "hero_badge": "FABRICANT EVA · TPU · PVC",
    "hero_title": "Des produits sur mesure pour votre marque",
    "hero_sub": "Fabrication OEM & ODM pour produits Bébé, Enfants et Bureau.",
    "hero_cta1": "Voir les produits",
    "hero_cta2": "Demander un devis",
    "tagline": "Personnalisation OEM/ODM · Échantillonnage et production clés en main · Clients dans le monde entier",
    "sec_products_tag": "Produits",
    "sec_products_title": "Catégories de produits",
    "sec_products_sub": "Découvrez nos solutions pour applications Bébé, Enfants et Bureau.",
    "products_cta": "Voir la catégorie",
    "products_more": "Vous ne trouvez pas votre produit ? Dites-nous ce dont vous avez besoin →",
    "categories": [
      {
        "id": "baby",
        "name": "Produits Bébé & Enfants",
        "intro": "Des produits EVA, TPU et PVC souples, sûrs et imperméables pour bébés et enfants.",
        "img": "images/cat-baby.svg",
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
        "img": "images/cat-office.svg",
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
    "sec_factory_title": "Fabriqué à Dongguan, Chine",
    "sec_factory_sub": "Fabrication EVA · TPU · PVC — OEM / ODM disponible",
    "factory_tiles": [
      {
        "img": "images/factory-factory.svg",
        "label": "Usine"
      },
      {
        "img": "images/factory-welding.svg",
        "label": "Soudure haute fréquence"
      },
      {
        "img": "images/factory-production.svg",
        "label": "Production"
      },
      {
        "img": "images/factory-workers.svg",
        "label": "Personnel"
      },
      {
        "img": "images/factory-qc.svg",
        "label": "Contrôle qualité"
      },
      {
        "img": "images/factory-products.svg",
        "label": "Produits finis"
      }
    ],
    "sec_about_tag": "À propos",
    "sec_about_title": "À propos de LongDe Yizhi",
    "about_p1": "LongDe Yizhi est un fabricant basé à Dongguan, en Chine, spécialisé dans les produits EVA, TPU et PVC.",
    "about_p2": "Nous développons et fabriquons des produits pour applications Bébé, Enfants et Bureau, avec des services OEM et ODM pour les clients internationaux.",
    "about_values": [
      "EVA · TPU · PVC",
      "OEM / ODM",
      "Fabrication sur mesure"
    ],
    "sec_contact_tag": "Contact",
    "sec_contact_title": "Travaillons ensemble",
    "sec_contact_sub": "Vous avez une idée de produit ou besoin d'une solution sur mesure ? Parlez-nous de votre projet.",
    "contact_addr_label": "Adresse",
    "contact_addr": "Salle 301, Bâtiment 2, n° 56 route Jinshi, ville de Liaobu, Dongguan, Guangdong, Chine",
    "contact_phone_label": "Téléphone",
    "contact_phone": "+86 0769-86317399",
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
    "form_product": "Produit",
    "form_qty": "Quantité",
    "form_msg": "Message",
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
    "meta_title": "LongDe Yizhi | Fabricant EVA/TPU/PVC pour produits Bébé, Enfants & Bureau",
    "meta_desc": "LongDe Yizhi est un fabricant basé à Dongguan, en Chine, spécialisé dans les produits EVA, TPU et PVC pour applications Bébé, Enfants et Bureau, avec fabrication OEM & ODM pour les clients internationaux."
  },
};
