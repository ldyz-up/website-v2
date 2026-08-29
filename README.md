# 龙德益智（东莞）新材料有限公司 · 官网

一个多语言官网（默认英文，可切换 中文 / 繁體中文 / English / 日本語 / 한국어 / Français）。
本地预览无需服务器；上线到阿里云服务器后，询价表单会自动把客户信息发到您的邮箱。

---

## 版本记录

### V3.5 版（2026-08-29，当前版本）
- 询价表单提交结果改为**弹窗提示**（发送中 / 成功 / 失败），不再是小字状态。
- 表单必填项调整为：**姓名、公司名称、邮箱**；邮箱会做格式校验，随便填不能提交；留言、电话、微信等均为选填。
- 新增选填联系方式字段：**电话、微信、其他 App（WhatsApp / LINE / Telegram 等）**，方便主动联系客户。
- `send_mail.php`（服务器方案）升级：客户信息按**表格**形式发送到邮箱（邮件内是整齐的表格，便于阅读），同时在服务器 `inquiries/inquiries.csv` 按表格格式备份，可用 Excel 打开统计。
- Web3Forms 方案（GitHub Pages）：提交记录可在 **web3forms.com 后台查看和导出**（见下文说明）。

### V3.4 版（2026-08-29，当前版本）
- 询价表单新增 **Web3Forms 免费中转** 方案：部署在 GitHub Pages（纯静态、无 PHP）时，填好 Access Key 后客户提交询价会**直接发邮件到您的邮箱**，不再弹出手机/电脑的邮箱软件。
- `js/main.js` 顶部新增「表单发送配置」区：填了 Web3Forms Key 用中转发信；没填且部署在支持 PHP 的服务器时自动用 `send_mail.php`；本地预览才退回邮箱软件。
- 补充 GitHub Pages 免费托管的限制说明（见下文「GitHub Pages 免费托管」）。

### V3.3 版（2026-08-29，当前版本）
- 联系方式下方新增客服二维码：**微信客服（客服1、客服2）+ LINE 客服同一行并排展示**，微信用浅蓝方框、LINE 用浅绿方框区分。
- 询价表单收件脚本 `send_mail.php` 的 SMTP 改为 **企业微信邮箱（企微邮箱）**：`smtp.exmail.qq.com`，客户留言直接发到企微邮箱，手机企业微信 App 可收到提醒。
- 部署文档（`Hostinger上线步骤.md` / `阿里云上线步骤.md`）同步更新为企微邮箱收信方案。

### V3.2 版（2026-08-29，当前版本）
- 新增**繁體中文**：右上角语言图标由 5 个增加到 6 个（EN / 中 / 繁 / 日 / 한 / FR），台湾、香港客户可直接切换繁体浏览。
- 新增 `zh_tw` 语言块，全部内容为台湾习惯用语的繁体版本（如「客製產品」「聯絡我們」「獲取報價」）。

### V3.1 版（2026-08-22）
- 询价表单接入 **PHP 收件脚本**：客户提交后，信息通过企业邮箱 SMTP 自动发到您的收件邮箱，并在服务器保存一份 CSV 备份（防止邮件丢失）。
- 新增文件：`send_mail.php`（收件脚本，上线前需填写 SMTP 配置）、`test_mail.php`（发信测试页，测完删除）、`阿里云上线步骤.md`（傻瓜版部署教程）。
- 表单新增反垃圾隐藏字段与提交状态提示（发送中 / 成功 / 失败）；本地双击预览时自动退回“打开邮箱软件”的旧方式，不会报错。

### V3 版（2026-08-19）
- 网站定位改为 **Clean & Professional B2B Manufacturer Website**（专业 B2B 制造商网站），面向欧美、日韩的 B 端客户（婴童品牌、办公文具品牌、进口商、经销商、批发商、OEM/ODM 买家）。
- 英文品牌统一为 **LongDe Yizhi**，中文全称“龙德益智（东莞）新材料有限公司”。
- 配色改为 **Deep Navy 深海军蓝 `#16324F` + Warm White 暖米白 `#F7F6EF`** 为主视觉，Soft Blue `#5B9BD5`、Sage Green `#8BAF9B` 少量点缀；不再使用大面积鲜艳色，不儿童玩具风。
- 产品改为「**产品分类 → 具体产品**」结构，目前三个大类：
  - Baby & Kids Products（洗澡书 / 布书 / 防水儿童用品）
  - Office & Stationery Products（文件袋 / 活页本 / 笔记本封皮 / 文件袋夹层）
  - Custom Products（EVA / TPU / PVC 定制）
- 页面结构：Hero → Products（分类 + 具体产品）→ OEM / ODM（4 步流程）→ Factory（工厂图片）→ About → Contact（询价表单）。
- 顶部导航：Products / OEM / ODM / Factory / About / Contact，右上角为 **Request a Quote** 按钮 + 5 个语言圆形图标（EN 排最前）。
- 询价表单字段：Name / Company / Email / Product Category（下拉）/ Product / Quantity / Message，客户点击 Request a Quote 提交询价。
- 所有图片均为占位图（已生成到 `images/`），后期直接同名替换为真实照片即可，无需改代码。
- 未编造任何工厂数据（面积、人数、产能、认证、客户数量等均未写），等您提供真实资料后再补充。

### V2 版（2026-08-18）
- 清新活力绿色系配色；右上角 5 个语言图标；品牌曾临时改为 LongMind（已被 V3 的 LongDe Yizhi 覆盖）。

### V1 版（2026-08-18）
- 五语言单页官网，参考 Done by Deer（丹麦）柔和风格，底部常驻联系条，真实 Logo 接入。

---

## 一、怎么预览网站

**最简单的方法：**
1. 双击打开文件夹里的 `index.html`，浏览器就会显示网站。
2. 点右上角 6 个圆形语言图标（EN / 中 / 繁 / 日 / 한 / FR），可以切换 6 种语言；当前语言会高亮。
3. 默认语言是 **English**，也支持在网址后加 `?lang=zh` 直接进入指定语言。

**以后改完文字/图片：** 直接刷新浏览器（Mac 快捷键 `Cmd + R`）即可看到最新效果。

---

## 二、文件结构说明

```
公司官网 ai 工作文件夹/
├── index.html              ← 页面结构（一般不用动）
├── css/style.css           ← 样式（颜色、大小，一般不用动）
├── js/translations.js      ← ★ 网站所有文字都在这里（重点）
├── js/main.js              ← 语言切换、产品渲染、表单逻辑（一般不用动）
├── images/                 ← 图片文件夹（占位图，直接同名替换即可）
│   ├── logo.png                     ← 真实 Logo（已在网页中使用）
│   ├── cat-baby.svg                 ← 分类图：儿童用品（占位）
│   ├── cat-office.svg               ← 分类图：办公及文具用品（占位）
│   ├── cat-custom.svg               ← 分类图：定制产品（占位）
│   ├── product-bathbook.svg         ← 洗澡书（占位）
│   ├── product-softbook.svg         ← 布书 / 软质书（占位）
│   ├── product-waterproof.svg       ← 防水儿童用品（占位）
│   ├── product-folder.svg           ← 文件袋（占位）
│   ├── product-ringbinder.svg       ← 活页本（占位）
│   ├── product-notebookcover.svg    ← 笔记本封皮（占位）
│   ├── product-filepocket.svg       ← 文件袋夹层（占位）
│   ├── product-customeva.svg        ← 定制 EVA 产品（占位）
│   ├── product-customtpu.svg        ← 定制 TPU 产品（占位）
│   ├── product-custompvc.svg        ← 定制 PVC 产品（占位）
│   ├── factory-factory.svg          ← 工厂（占位）
│   ├── factory-welding.svg          ← 高周波焊接（占位）
│   ├── factory-production.svg       ← 生产（占位）
│   ├── factory-workers.svg          ← 工人（占位）
│   ├── factory-qc.svg               ← 质检（占位）
│   ├── factory-products.svg         ← 成品（占位）
│   ├── qr-wechat-1.png              ← 微信客服 1 二维码
│   ├── qr-wechat-2.png              ← 微信客服 2 二维码
│   └── qr-line.png                  ← LINE 客服二维码
├── send_mail.php             ← ★ PHP 收件脚本（上线前填邮箱配置）
├── test_mail.php             ← 邮箱发信测试页（测完删除）
├── 阿里云上线步骤.md          ← 阿里云部署傻瓜教程
└── README.md               ← 本说明文件
```

---

## 三、怎么修改文字（最重要）

所有文字都集中在 `js/translations.js` 一个文件里，按语言分块：

```js
zh: { ... },   ← 中文
en: { ... },   ← English（默认语言）
ja: { ... },   ← 日本語
ko: { ... },   ← 한국어
fr: { ... },   ← Français
```

**例子：** 想改英文首页大标题，找到 `en` 里的：

```js
"hero_title": "Custom Products Made for Your Brand",
```

把引号里的文字改掉，保存，刷新网页即可。

**注意事项：**
- 引号必须用英文引号 `"`，不能用中文引号 `“ ”`，否则网页会出错。
- 电话、地址等每语言各有一份，建议所有语言都同步修改。
- 所有语言的内容必须一一对应（每种语言都有同样的键名），漏掉会显示空白。

### 增加产品分类（未来加新品类）

在 `translations.js` 里找到任意语言的 `categories: [ ... ]`，复制一段完整对象，改成新内容即可，例如：

```js
{
  "id": "travel",
  "name": "Travel Products",
  "intro": "Custom travel organizers for everyday use.",
  "img": "images/cat-travel.svg",
  "products": [
    { "img": "images/product-travelpouch.svg", "name": "Travel Pouches", "desc": "Compact organizers for travel." },
    { "img": "images/product-travelbag.svg",  "name": "Travel Bags",    "desc": "Lightweight waterproof bags." }
  ]
}
```

- 所有语言都要加一份同样的结构（`id` 相同、名称/介绍/描述翻译成对应语言）。
- `id` 不要重复、不要有空格；`img` 指向 `images/` 里的图片文件名。
- 放一张图片到 `images/` 文件夹后，网页会自动显示，**不需要改 HTML**。

---

## 四、怎么替换图片

**替换 Logo：**
- 覆盖 `images/logo.png` 即可（建议正方形、尺寸 900×900 以上），网页会自动更新。

**替换产品 / 分类 / 工厂图（建议尺寸 1000×750）：**
1. 把真实照片保存为对应的文件名（如 `product-bathbook.png`、`cat-baby.png`、`factory-welding.png`）。
2. 覆盖到 `images/` 文件夹，网页自动生效，**不用改代码**。

> 也可以直接把图片发给我，我帮你全部处理好。

**替换客服二维码（微信 / LINE）：**
1. 把新的微信二维码分别保存为 `qr-wechat-1.png`、`qr-wechat-2.png`，LINE 二维码保存为 `qr-line.png`。
2. 覆盖到 `images/` 文件夹，网页自动生效（图片建议正方形，尺寸 500×500 以上）。

---

## 五、发布上线（阿里云服务器）

### GitHub Pages 免费托管（当前正在用）

**适合前期流量不大的阶段，免费且没有"超量收费"机制**：
- 带宽：每月 **100GB**（网页 + 图片约 2MB/次访问，够支撑几万次访问）；
- 站点大小：仓库和发布站点建议 **1GB** 以内（超了 GitHub 会发邮件提醒，不是收费）；
- 构建：公开仓库每 15 分钟最多 10 次（普通更新完全够用）；
- 纯静态：**不能运行 PHP / 数据库**，所以 `send_mail.php` 在 GitHub Pages 上不生效，需要用 Web3Forms 中转（见下文）；
- 使用条款：不能做电商直接卖货，企业介绍 + 询盘表单没问题。

> 免费额度对当前官网绰绰有余；真到带宽不够时（意味着日访问量已很大），再考虑升级到 Hostinger / 阿里云服务器，网站文件原样搬走即可。

### 询价表单在 GitHub Pages 上的收信配置（约 5 分钟）

因为 GitHub Pages 不能运行 PHP，推荐用免费的 **Web3Forms** 把客户留言转到您邮箱：

1. 电脑浏览器打开 **https://web3forms.com**，注册时收件邮箱填 `sales@longdeyizhi.com`；
2. 注册完成会得到一串 **Access Key**（形如 `a1b2c3d4-xxxx-...`）；
3. 用记事本/VS Code 打开 `js/main.js`，在顶部「表单发送配置」里，把 Key 填进：
```js
web3forms_key: ""   // ← 改成 web3forms_key: "您的AccessKey"
```
4. 保存后提交到 GitHub，网站自动更新；此时客户提交询价 → 邮件**直接发到 sales@longdeyizhi.com**，不再弹邮箱软件。

> 以后如果搬到 Hostinger / 阿里云（支持 PHP），把 Key 清空即可，脚本会自动改用 `send_mail.php` 收信。

### 客户留言怎么统计（表格记录）

**当前 GitHub Pages + Web3Forms 方案：**
- 每一条客户提交，都可以在 **web3forms.com 后台**看到（登录后主页就是提交记录列表，含时间、字段内容）；
- 后台一般提供 **导出 / Export（CSV）** 按钮，导出的文件可以直接用 Excel 打开，按"姓名 / 公司 / 邮箱 / 电话 / 微信 / 产品 / 留言"逐列统计；
- 收到的**通知邮件**也可以在后台设置里改成"表格样式"模板（设置 → Email Template，把字段用表格排列）。

**以后搬到 Hostinger / 阿里云（推荐，数据完全在自己手里）：**
- 客户提交 → 邮件以**表格**形式发到企微邮箱；
- 同时在服务器自动保存 `inquiries/inquiries.csv`（Excel 可直接打开，每一行是一条客户记录，按列统计）；
- CSV 字段：时间 / IP / 姓名 / 公司 / 邮箱 / 电话 / 微信 / 其他联系方式 / 产品分类 / 产品 / 数量 / 留言 / 邮件是否发送成功。

**方案 A：Hostinger 共享主机（推荐，适合小白 + 海外客户）** — 打开 **`Hostinger上线步骤.md`**：网页版后台，零命令行、免备案，上传网站 → 绑定域名 → 免费 SSL 即可。
**方案 B：阿里云轻量服务器（海外节点）** — 打开 **`阿里云上线步骤.md`**：需要 SSH + 宝塔面板，适合想完全掌控服务器的情况。
两种方案共用同一套网站文件和 `send_mail.php`（收件邮箱 SMTP 配置不变）。

**上线前必做：**
- 在 `send_mail.php` 顶部「配置区」填入：企微邮箱的 SMTP 客户端授权密码（在 https://exmail.qq.com → 设置 → 收发信设置 → 客户端设置 里生成，不是登录密码）。
- 访问 `你的域名/test_mail.php` 发送测试邮件，确认收信成功后再删除该文件。
- 替换产品占位图、工厂占位图和客服二维码。
- 提供真实工厂资料（面积、人数、产能、认证等）后，我再补充到工厂区块。

---

## 六、常见问题

**问：改了文字但网页没变化？**
答：保存文件后，按浏览器刷新按钮（Mac 快捷键 `Cmd + R`）。

**问：可以再加一种语言吗？**
答：可以，告诉我加哪种语言，我来添加。

**问：客户提交询价后，我怎么收到信息？**
答：分两种情况：① 网站部署在 **GitHub Pages**（现在）：按上方「Web3Forms 收信配置」填好 Access Key 后，客户提交 → Web3Forms 直接发邮件到 `sales@longdeyizhi.com`；② 网站部署在 **支持 PHP 的服务器**（Hostinger / 阿里云）：`send_mail.php` 通过企微邮箱 SMTP 发信到您的**企业微信邮箱**（手机企业微信 App 会收到提醒），同时在服务器 `inquiries/inquiries.csv` 保存备份。

**问：为什么点"获取报价"会弹出邮箱软件？**
答：V3.5 版开始已**去掉弹邮箱软件**的方式：GitHub Pages 未配置 Web3Forms 时，会弹出"提交失败"提示框（内含直接发邮件到 sales@longdeyizhi.com 的说明），不会再调用本机邮箱软件。按上方「Web3Forms 收信配置」填好 Key 后即可正常收信。

**问：GitHub Pages 免费托管会不会突然收费？**
答：不会收费。GitHub Pages 是免费服务，没有"超额付费"机制；超过带宽（100GB/月）或站点大小（1GB）限制时，GitHub 只是发邮件提醒或限制访问，不会扣钱。对目前的官网流量来说完全够用。

**问：想加产品图片、加更多产品分类？**
答：把资料发我，我帮你加；也可以按上面第三节的方法自己加。

**问：这个网站能放在手机上看吗？**
答：能，页面已自动适配手机、平板、电脑，手机端底部常驻“电话 / 邮箱 / 获取报价”入口。
