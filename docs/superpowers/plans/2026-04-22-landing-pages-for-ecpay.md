# 落地頁 · 綠界金流申請用 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `ching-tech.github.io` 新增 6 個頁面並微調 2 個既有頁面,產出一套完整的落地頁供綠界金流特約商店審核。

**Architecture:** 純靜態 HTML(無框架、無構建),沿用既有 inline `<style>` 模式,嚴格遵守 `github.com/ching-tech/brand`(已 clone 在 `/home/ct/SDD/brand/`)品牌系統 — 零 emoji、不具名客戶、深色 tech 美學、藍紫 + LINE 綠 + cyan 強調。

**Tech Stack:** Plain HTML5 / CSS3(inline `<style>`)/ 極少 JS(只用於 fade-in 動畫,沿用既有模式)。部署在 GitHub Pages。

**Source spec:** `/home/ct/SDD/ching-tech-billing/docs/specs/2026-04-22-billing-and-landing-design.md`

---

## File Structure

**新增:**
```
ching-tech.github.io/
├── ching-tech-os.html     # CTOS 企業版產品介紹(B2B)
├── pricing.html           # 兩產品方案與價格(價格用 XXXX)
├── terms.html             # 服務條款
├── privacy.html           # 隱私權政策
├── refund.html            # 退款/退訂政策
└── contact.html           # 聯絡資訊 + 表單
```

**修改:**
```
ching-tech.github.io/
├── index.html             # nav 加連結、footer 加公司資訊與法律連結
└── ctos-lite.html         # nav 加連結、footer 加公司資訊與法律連結、完整版 CTA 連 pricing.html
```

**共用設計原則(所有新頁面):**
- `<html lang="zh-Hant">`
- body 背景 `#0a0a0f`,文字 `#e0e0e8`
- Nav 結構、logo glow 與 `index.html` 保持一致
- Footer 統一放公司資訊 + 法律頁連結
- 字型 stack:`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", sans-serif`
- **絕對零 emoji**(包含 SVG icon 本身是可以的,但不用 😀 🚀 類 unicode)
- bullet 用 `→` 不用 `•`
- 不具名客戶

---

## 共用 Nav Block(每個新頁面貼這段)

```html
<nav>
  <div class="container">
    <a href="index.html" class="nav-logo"><img src="images/CTLogo.svg" alt="擎添工業 Logo">擎添工業 ChingTech</a>
    <div class="nav-links">
      <a href="ctos-lite.html">擎添助理</a>
      <a href="ching-tech-os.html">ChingTech OS</a>
      <a href="pricing.html">方案價格</a>
      <a href="contact.html">聯絡我們</a>
    </div>
  </div>
</nav>
```

## 共用 Footer Block(每個新頁面貼這段)

```html
<footer>
  <div class="container footer-grid">
    <div class="footer-col">
      <div class="footer-brand">擎添工業股份有限公司</div>
      <div class="footer-muted">ChingTech Co., Ltd. · 自 1984 年</div>
      <div class="footer-muted" style="margin-top: 12px;">統一編號 36274806</div>
      <div class="footer-muted">新北市五股區成泰路一段 194-8 號 J 棟(248)</div>
      <div class="footer-muted">電話 (02) 2903-2788 · 傳真 (02) 2903-9518</div>
    </div>
    <div class="footer-col">
      <div class="footer-label">產品</div>
      <a href="ctos-lite.html">擎添助理(LINE)</a>
      <a href="ching-tech-os.html">ChingTech OS(企業版)</a>
      <a href="pricing.html">方案價格</a>
    </div>
    <div class="footer-col">
      <div class="footer-label">法律與政策</div>
      <a href="terms.html">服務條款</a>
      <a href="privacy.html">隱私權政策</a>
      <a href="refund.html">退款政策</a>
    </div>
    <div class="footer-col">
      <div class="footer-label">聯絡</div>
      <a href="contact.html">聯絡表單</a>
      <a href="mailto:yazelin@ching-tech.com">yazelin@ching-tech.com</a>
      <a href="https://ching-tech.com" target="_blank">ching-tech.com</a>
    </div>
  </div>
  <div class="container footer-bottom">
    © 2026 ChingTech Co., Ltd. All rights reserved.
  </div>
</footer>
```

## 共用 Footer CSS(每個新頁面 `<style>` 裡都要有)

```css
footer {
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: 56px 0 24px; margin-top: 80px;
  font-size: 0.88rem;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 32px;
  padding-bottom: 40px;
}
.footer-col { display: flex; flex-direction: column; gap: 8px; }
.footer-brand { font-weight: 700; font-size: 1rem; color: #e0e0e8; margin-bottom: 4px; }
.footer-label {
  font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em;
  color: #a5b4fc; margin-bottom: 8px; font-weight: 600;
}
.footer-col a { color: #8888a0; transition: color 0.2s; }
.footer-col a:hover { color: #e0e0e8; }
.footer-muted { color: #6e6e78; line-height: 1.7; }
.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.04);
  padding-top: 24px; color: #555; text-align: center; font-size: 0.8rem;
}
@media (max-width: 720px) {
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 480px) {
  .footer-grid { grid-template-columns: 1fr; gap: 24px; }
}
```

## 共用 Base CSS(每個新頁面 `<style>` 開頭這段)

```css
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans TC", sans-serif;
  background: #0a0a0f;
  color: #e0e0e8;
  line-height: 1.7;
  overflow-x: hidden;
}
a { color: inherit; text-decoration: none; }
img { max-width: 100%; display: block; }
.glow-bg {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  pointer-events: none; z-index: 0;
  background:
    radial-gradient(ellipse 600px 400px at 20% 20%, rgba(56, 130, 246, 0.06), transparent),
    radial-gradient(ellipse 500px 500px at 80% 60%, rgba(139, 92, 246, 0.05), transparent);
}
.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

/* Nav */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
nav .container {
  display: flex; align-items: center; justify-content: space-between;
  height: 64px;
}
.nav-logo {
  display: flex; align-items: center; gap: 10px;
  font-size: 1.05rem; font-weight: 700; letter-spacing: -0.02em;
  background: linear-gradient(135deg, #3882f6, #8b5cf6);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
}
.nav-logo img { width: 32px; height: 32px; }
.nav-links { display: flex; gap: 24px; align-items: center; }
.nav-links a { font-size: 0.9rem; color: #888; transition: color 0.2s; }
.nav-links a:hover { color: #e0e0e8; }

/* Page header block */
.page-header {
  padding: 140px 0 48px; position: relative;
}
.page-eyebrow {
  display: inline-block; font-size: 0.78rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.18em;
  color: #a5b4fc; margin-bottom: 14px;
}
.page-title {
  font-size: clamp(2rem, 4.5vw, 3rem);
  font-weight: 800; letter-spacing: -0.02em;
  line-height: 1.15; margin-bottom: 16px;
  color: #f0f0f8;
}
.page-lede { font-size: 1.05rem; color: #8888a0; max-width: 640px; }

/* Legal article style */
.legal { padding: 24px 0 80px; }
.legal .container { max-width: 820px; }
.legal h2 {
  font-size: 1.3rem; font-weight: 700;
  margin: 40px 0 12px; color: #e0e0e8;
  padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);
}
.legal h2:first-of-type { border-top: none; padding-top: 0; margin-top: 16px; }
.legal h3 {
  font-size: 1.05rem; font-weight: 600;
  margin: 24px 0 8px; color: #d0d0d8;
}
.legal p { color: #9e9eaa; margin: 12px 0; line-height: 1.8; }
.legal ul { list-style: none; padding: 0; margin: 12px 0; }
.legal ul li {
  position: relative; padding-left: 22px; color: #9e9eaa;
  margin: 8px 0; line-height: 1.8;
}
.legal ul li::before {
  content: "→"; position: absolute; left: 0; color: #8b5cf6; font-weight: 700;
}
.legal .updated {
  font-size: 0.85rem; color: #6e6e78; margin-top: 8px;
}
.legal strong { color: #e0e0e8; font-weight: 600; }
.legal a { color: #a5b4fc; border-bottom: 1px solid rgba(165,180,252,0.3); }
.legal a:hover { color: #c7d0ff; border-color: #a5b4fc; }
```

---

## Task 1: contact.html

**Files:**
- Create: `contact.html`

- [ ] **Step 1: 建立 contact.html**

建立新檔 `/home/ct/SDD/ching-tech.github.io/contact.html`,完整內容如下(含 Base CSS + Footer CSS 之上再加本頁專屬樣式):

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>聯絡我們 — 擎添工業 ChingTech</title>
  <meta name="description" content="擎添工業股份有限公司聯絡資訊、服務專線、Email、地址、客服表單。">
  <style>
    /* (貼上「共用 Base CSS」與「共用 Footer CSS」全部內容) */

    /* 本頁專屬 */
    .contact-grid {
      display: grid; grid-template-columns: 1fr 1fr; gap: 40px;
      padding: 48px 0 80px;
    }
    .contact-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px; padding: 32px;
    }
    .contact-card h2 {
      font-size: 1.1rem; font-weight: 700; color: #e0e0e8;
      margin-bottom: 20px;
    }
    .info-row {
      display: grid; grid-template-columns: 100px 1fr;
      padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
      font-size: 0.95rem;
    }
    .info-row:last-child { border-bottom: none; }
    .info-row .k {
      color: #a5b4fc; font-size: 0.78rem; letter-spacing: 0.08em;
      text-transform: uppercase; padding-top: 2px;
    }
    .info-row .v { color: #d0d0d8; }
    .info-row .v a { color: #a5b4fc; border-bottom: 1px solid rgba(165,180,252,0.3); }

    form.contact-form { display: flex; flex-direction: column; gap: 14px; }
    .form-group label {
      display: block; font-size: 0.82rem; color: #a5b4fc;
      margin-bottom: 6px; letter-spacing: 0.04em;
    }
    .form-group input, .form-group textarea {
      width: 100%; padding: 12px 14px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px; color: #e0e0e8;
      font-family: inherit; font-size: 0.95rem;
      transition: border-color 0.2s;
    }
    .form-group input:focus, .form-group textarea:focus {
      outline: none; border-color: rgba(165,180,252,0.5);
    }
    .form-group textarea { min-height: 140px; resize: vertical; }
    .btn-submit {
      padding: 14px 28px;
      background: linear-gradient(135deg, #3882f6, #6366f1);
      color: #fff; border: none; border-radius: 10px;
      font-weight: 600; cursor: pointer; font-size: 0.95rem;
      transition: all 0.25s;
    }
    .btn-submit:hover {
      box-shadow: 0 8px 32px rgba(56, 130, 246, 0.4);
      transform: translateY(-2px);
    }

    @media (max-width: 720px) {
      .contact-grid { grid-template-columns: 1fr; gap: 24px; }
    }
  </style>
</head>
<body>

<div class="glow-bg"></div>

<!-- (貼上「共用 Nav Block」) -->

<header class="page-header">
  <div class="container">
    <span class="page-eyebrow">聯絡我們</span>
    <h1 class="page-title">有任何問題,我們回你。</h1>
    <p class="page-lede">40 年工程老牌,回信跟寫程式一樣實在。不會給你 SOP 罐頭回覆。</p>
  </div>
</header>

<main>
  <div class="container">
    <div class="contact-grid">
      <div class="contact-card">
        <h2>公司資訊</h2>
        <div class="info-row"><span class="k">公司</span><span class="v">擎添工業股份有限公司<br>ChingTech Co., Ltd.</span></div>
        <div class="info-row"><span class="k">統編</span><span class="v">36274806</span></div>
        <div class="info-row"><span class="k">地址</span><span class="v">新北市五股區成泰路一段 194-8 號 J 棟<br>郵遞區號 248</span></div>
        <div class="info-row"><span class="k">電話</span><span class="v"><a href="tel:+886229032788">(02) 2903-2788</a></span></div>
        <div class="info-row"><span class="k">傳真</span><span class="v">(02) 2903-9518</span></div>
        <div class="info-row"><span class="k">Email</span><span class="v"><a href="mailto:yazelin@ching-tech.com">yazelin@ching-tech.com</a></span></div>
        <div class="info-row"><span class="k">官網</span><span class="v"><a href="https://ching-tech.com" target="_blank">ching-tech.com</a></span></div>
        <div class="info-row"><span class="k">服務時間</span><span class="v">週一至週五 09:00–18:00<br>(國定假日除外)</span></div>
      </div>

      <div class="contact-card">
        <h2>留言給我們</h2>
        <form class="contact-form" action="mailto:yazelin@ching-tech.com" method="post" enctype="text/plain">
          <div class="form-group">
            <label for="name">稱呼</label>
            <input id="name" name="name" type="text" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" required>
          </div>
          <div class="form-group">
            <label for="company">公司 / 單位(選填)</label>
            <input id="company" name="company" type="text">
          </div>
          <div class="form-group">
            <label for="message">訊息</label>
            <textarea id="message" name="message" required placeholder="關於產品、合作或任何問題"></textarea>
          </div>
          <button type="submit" class="btn-submit">送出訊息</button>
        </form>
      </div>
    </div>
  </div>
</main>

<!-- (貼上「共用 Footer Block」) -->

</body>
</html>
```

- [ ] **Step 2: 瀏覽器檢查**

```bash
cd /home/ct/SDD/ching-tech.github.io && python3 -m http.server 8888 &
# 開瀏覽器訪問 http://localhost:8888/contact.html
# 檢查:nav 固定在頂部、公司資訊卡片顯示、表單可填、footer 四欄顯示、zero emoji
```

**預期**:頁面可讀、無 emoji、公司資訊完整顯示、表單欄位可輸入、Responsive 在手機寬度正常切換。

- [ ] **Step 3: 收回 HTTP server**

```bash
pkill -f "http.server 8888" || true
```

- [ ] **Step 4: Commit**

```bash
cd /home/ct/SDD/ching-tech.github.io && git add contact.html && git commit -m "feat: 新增 contact.html 公司聯絡頁"
```

---

## Task 2: privacy.html

**Files:**
- Create: `privacy.html`

- [ ] **Step 1: 建立 privacy.html**

建立新檔 `/home/ct/SDD/ching-tech.github.io/privacy.html`:

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>隱私權政策 — 擎添工業 ChingTech</title>
  <meta name="description" content="擎添工業隱私權政策,說明個資收集範圍、使用目的、第三方處理、資料保存與客戶權利。">
  <style>
    /* (貼上「共用 Base CSS」與「共用 Footer CSS」) */
  </style>
</head>
<body>

<div class="glow-bg"></div>

<!-- (貼上「共用 Nav Block」) -->

<header class="page-header">
  <div class="container">
    <span class="page-eyebrow">Privacy Policy</span>
    <h1 class="page-title">隱私權政策</h1>
    <p class="legal updated">最後更新:2026 年 4 月 22 日</p>
  </div>
</header>

<main class="legal">
  <div class="container">

<h2>1. 關於本政策</h2>
<p>擎添工業股份有限公司(統編 36274806,以下稱「本公司」)重視您的個人資料保護。本政策說明我們在提供 <strong>擎添助理(CTOS-Lite)</strong>、<strong>ChingTech OS</strong> 及相關服務時,如何收集、使用、儲存與揭露您的個人資料。</p>
<p>當您使用本公司任一產品或服務,即表示您已閱讀並同意本政策。</p>

<h2>2. 我們收集的資料</h2>
<h3>2.1 您主動提供的資料</h3>
<ul>
  <li>聯絡資料:姓名、Email、電話、公司名稱、統一編號</li>
  <li>付款相關:信用卡資訊由第三方金流業者(綠界 ECPay)處理,本公司不儲存完整卡號</li>
  <li>服務使用資料:您與 AI 助理的對話內容、上傳的文件與檔案</li>
  <li>LINE 帳號識別碼(僅 ctos-lite 用戶,用於辨識您的對話)</li>
</ul>

<h3>2.2 系統自動收集的資料</h3>
<ul>
  <li>瀏覽器類型與版本、作業系統</li>
  <li>IP 位址(僅用於安全與除錯,不作為行銷用途)</li>
  <li>服務使用時間、功能操作紀錄</li>
</ul>

<h2>3. 使用目的</h2>
<ul>
  <li>提供與改善 AI 助理、訂閱計費、發票開立等核心服務</li>
  <li>客戶支援與問題排除</li>
  <li>發送服務更新與帳務通知(不包含未經同意的行銷)</li>
  <li>依法律要求保留記錄(例如電子發票相關規定)</li>
</ul>

<h2>4. 第三方處理者</h2>
<p>為提供服務,本公司會將必要之個資交付下列第三方處理,各方僅能依其職責範圍使用您的資料:</p>
<ul>
  <li><strong>綠界科技 ECPay</strong>:信用卡定期定額、發票開立</li>
  <li><strong>LINE 株式會社</strong>:Messaging API 訊息傳遞(僅 ctos-lite 用戶)</li>
  <li><strong>雲端基礎設施供應商</strong>:伺服器與資料庫代管</li>
</ul>

<h2>5. 資料主權 · 留在台灣</h2>
<p>您在 <strong>ChingTech OS</strong> 中儲存的企業知識庫、文件與對話紀錄,原則上皆儲存於 <strong>中華民國境內</strong> 的資料中心。本公司不會未經同意將企業客戶的核心資料傳輸到境外。</p>
<p>AI 模型運算若需透過境外服務(例如 Claude API),僅傳送當次對話必要內容,不傳送完整知識庫。</p>

<h2>6. 您的權利</h2>
<ul>
  <li>查詢或閱覽您的個人資料</li>
  <li>請求製給複本</li>
  <li>請求補充或更正</li>
  <li>請求停止蒐集、處理或利用</li>
  <li>請求刪除</li>
</ul>
<p>行使上述權利請 Email 至 <a href="mailto:yazelin@ching-tech.com">yazelin@ching-tech.com</a>,我們將於 30 日內回覆。</p>

<h2>7. Cookie 使用</h2>
<p>本公司網站使用必要性 Cookie 維持登入狀態與偏好設定,不使用第三方追蹤 Cookie 進行跨站行銷。</p>

<h2>8. 資料保存期限</h2>
<ul>
  <li>帳號資料:自帳號關閉起 90 日後刪除</li>
  <li>交易與發票紀錄:依稅法規定保存 5 年</li>
  <li>系統日誌:最多保留 180 日</li>
</ul>

<h2>9. 安全措施</h2>
<p>本公司採用 HTTPS 加密傳輸、資料庫加密靜態儲存、存取權限分級控管等措施保護您的資料。若發生可能影響您的資料外洩事件,本公司將於發現後 72 小時內通知受影響的用戶並報告主管機關。</p>

<h2>10. 政策變更</h2>
<p>本政策若有重大變更,本公司將於生效日 30 天前以 Email 通知已註冊用戶,並於本頁更新最後修訂日期。</p>

<h2>11. 聯絡我們</h2>
<p>有任何隱私相關問題或權利行使請求,請聯繫:</p>
<ul>
  <li>Email:<a href="mailto:yazelin@ching-tech.com">yazelin@ching-tech.com</a></li>
  <li>電話:(02) 2903-2788</li>
  <li>地址:新北市五股區成泰路一段 194-8 號 J 棟(248)</li>
</ul>

  </div>
</main>

<!-- (貼上「共用 Footer Block」) -->

</body>
</html>
```

- [ ] **Step 2: 瀏覽器檢查**

開 `http://localhost:8888/privacy.html`,確認:每個章節清楚分節、`→` bullet 顯示、無 emoji、nav/footer 正常。

- [ ] **Step 3: Commit**

```bash
cd /home/ct/SDD/ching-tech.github.io && git add privacy.html && git commit -m "feat: 新增 privacy.html 隱私權政策"
```

---

## Task 3: terms.html

**Files:**
- Create: `terms.html`

- [ ] **Step 1: 建立 terms.html**

建立 `/home/ct/SDD/ching-tech.github.io/terms.html`(結構同 privacy.html,更換 title、eyebrow、章節與內容):

主體 `<main class="legal">` 內容(替換章節):

```html
<h2>1. 總則</h2>
<p>本條款為您(以下稱「用戶」)使用擎添工業股份有限公司(統編 36274806,以下稱「本公司」)提供之<strong>擎添助理(CTOS-Lite)</strong>、<strong>ChingTech OS</strong> 及相關服務(以下合稱「本服務」)之契約。</p>
<p>當您註冊、訂閱或使用本服務,即表示您已詳閱並同意本條款全部內容。若不同意,請停止使用本服務。</p>

<h2>2. 服務範圍</h2>
<ul>
  <li><strong>擎添助理(CTOS-Lite)</strong>:透過 LINE 提供之 AI 助理服務,含 AI 對話、個人知識庫、語音、圖片辨識等功能。</li>
  <li><strong>ChingTech OS</strong>:企業 AI 工作平台,含 Web 桌面、AI Agent、知識庫、專案管理、LINE/Telegram 整合等功能。</li>
</ul>
<p>實際功能依訂閱方案而定,詳見 <a href="pricing.html">方案價格</a>。</p>

<h2>3. 訂閱與計費</h2>
<h3>3.1 計費週期</h3>
<p>本服務採用 <strong>月付自動續訂</strong> 制。訂閱生效後,首次費用於訂閱當日扣取,後續每月於同一日期自動扣款。</p>

<h3>3.2 付款方式</h3>
<p>信用卡線上付款,由第三方金流業者綠界科技(ECPay)處理。本公司不儲存完整信用卡資訊。</p>

<h3>3.3 自動續訂</h3>
<p>訂閱一經啟用即啟動自動續訂。您可於任何時間從管理後台或聯繫客服終止自動續訂,終止後當期仍可使用至期末。</p>

<h3>3.4 價格變更</h3>
<p>本公司保留調整方案價格的權利。如有調整,將於下一計費週期前 30 日以 Email 通知,用戶可選擇繼續訂閱(接受新價格)或取消。</p>

<h2>4. 數位服務與鑑賞期</h2>
<p>依消費者保護法第 19 條第 1 項但書及「通訊交易解除權合理例外情事適用準則」第 2 條第 5 款:</p>
<p><strong>已為線上傳輸且經消費者事先同意始提供者,不適用七日鑑賞期無條件解約之規定。</strong></p>
<p>訂閱本服務時,您將於結帳頁面勾選以下選項:</p>
<ul>
  <li>「本人同意訂閱立即啟用並開始使用,理解並同意放棄七日鑑賞期解約權」</li>
</ul>
<p>若您對此有疑慮,請於下單前聯繫客服。未勾選同意者將無法完成訂閱。</p>

<h2>5. 用戶責任</h2>
<ul>
  <li>妥善保管帳號密碼,帳號遭第三人使用之損失由用戶自行承擔</li>
  <li>不得將本服務用於違法、詐欺、侵害他人權益之用途</li>
  <li>不得對本服務進行反向工程、未授權複製或散布</li>
  <li>不得上傳違反法律、第三人著作權或隱私權之內容</li>
</ul>

<h2>6. 智慧財產權</h2>
<p>本服務之所有軟體、介面、商標、文件與內容(不含用戶自行上傳者)之智慧財產權均歸本公司或其授權人所有。用戶於訂閱期間取得之授權為非專屬、不可轉讓、僅限於契約目的使用之授權。</p>
<p>用戶上傳至本服務之資料(知識庫、對話、檔案等),其智慧財產權仍歸用戶所有。本公司僅於提供服務必要範圍內處理。</p>

<h2>7. 服務中斷與變更</h2>
<p>本公司得因系統維護、升級、不可抗力或法律命令等原因暫停或中斷服務,無論是否事先通知。對於可預期之維護,本公司將儘量事先公告。</p>
<p>本公司保留隨時變更、暫停或終止本服務(或其任何功能)之權利。若為重大不利變更,將提前 30 日通知,用戶得於該期間內依 <a href="refund.html">退款政策</a> 取消訂閱。</p>

<h2>8. 免責聲明</h2>
<p>本服務依「現狀」與「可用性」提供。本公司不保證 AI 回覆之完全正確性或適用性。用戶於採用 AI 輸出內容前應自行判斷與查證。</p>
<p>在法律許可之最大範圍內,本公司對於因使用或無法使用本服務所生之任何直接、間接、衍生、附帶損害不負賠償責任,惟因本公司故意或重大過失者不在此限。</p>

<h2>9. 帳號終止</h2>
<p>本公司得於用戶違反本條款時,暫停或終止其帳號。用戶亦得隨時終止自己的帳號。帳號終止後,資料處理依 <a href="privacy.html">隱私權政策</a> 第 8 條辦理。</p>

<h2>10. 條款變更</h2>
<p>本條款若有變更,將於網站公告並以 Email 通知。自通知後 30 日生效。用戶於新條款生效後繼續使用本服務,即視為同意。若不同意,請於新條款生效前終止帳號。</p>

<h2>11. 準據法與管轄</h2>
<p>本條款之解釋與適用,以及因本條款或本服務所生之爭議,以中華民國法律為準據法。</p>
<p>因本條款所生之訴訟,雙方合意以 <strong>臺灣新北地方法院</strong> 為第一審管轄法院。</p>

<h2>12. 聯絡我們</h2>
<ul>
  <li>Email:<a href="mailto:yazelin@ching-tech.com">yazelin@ching-tech.com</a></li>
  <li>電話:(02) 2903-2788</li>
  <li>地址:新北市五股區成泰路一段 194-8 號 J 棟(248)</li>
</ul>
```

Header 區塊:
```html
<header class="page-header">
  <div class="container">
    <span class="page-eyebrow">Terms of Service</span>
    <h1 class="page-title">服務條款</h1>
    <p class="legal updated">最後更新:2026 年 4 月 22 日</p>
  </div>
</header>
```

Title 與 meta:
```html
<title>服務條款 — 擎添工業 ChingTech</title>
<meta name="description" content="擎添工業服務條款,說明訂閱計費、自動續訂、數位服務鑑賞期放棄、用戶責任與智慧財產權。">
```

- [ ] **Step 2: 瀏覽器檢查**

開 `http://localhost:8888/terms.html`,確認第 4 章數位服務鑑賞期放棄清楚標示。

- [ ] **Step 3: Commit**

```bash
cd /home/ct/SDD/ching-tech.github.io && git add terms.html && git commit -m "feat: 新增 terms.html 服務條款"
```

---

## Task 4: refund.html

**Files:**
- Create: `refund.html`

- [ ] **Step 1: 建立 refund.html**

結構同 privacy.html/terms.html,替換主體內容:

Header:
```html
<header class="page-header">
  <div class="container">
    <span class="page-eyebrow">Refund Policy</span>
    <h1 class="page-title">退款政策</h1>
    <p class="legal updated">最後更新:2026 年 4 月 22 日</p>
  </div>
</header>
```

Title/meta:
```html
<title>退款政策 — 擎添工業 ChingTech</title>
<meta name="description" content="擎添工業訂閱服務之退訂、退款規則、退款處理時間與爭議處理。">
```

主體 `<main class="legal">`:
```html
<h2>1. 退訂方式</h2>
<p>您可透過下列任一方式終止您的訂閱:</p>
<ul>
  <li>登入訂閱管理後台,點選「取消訂閱」</li>
  <li>Email 至 <a href="mailto:yazelin@ching-tech.com">yazelin@ching-tech.com</a>,主旨註明「取消訂閱」並附上註冊 Email</li>
  <li>撥打客服電話 (02) 2903-2788(週一至週五 09:00–18:00)</li>
</ul>

<h2>2. 退款規則</h2>

<h3>2.1 首次訂閱 7 日內</h3>
<p>若您為 <strong>首次訂閱</strong> 本服務,且於啟用後 <strong>7 日內</strong> 提出退款申請,並符合下列條件之一,本公司將全額退款:</p>
<ul>
  <li>實質使用紀錄低於總配額 10%(例如 ctos-lite 完整版 7 日內 AI 對話次數少於合理閾值)</li>
  <li>因本服務重大瑕疵導致無法正常使用</li>
</ul>
<p>上述條件由本公司依實際使用紀錄判斷。退款申請獲准後 14 個工作天內處理。</p>

<h3>2.2 訂閱進行中(超過 7 日)</h3>
<p>訂閱啟用超過 7 日者,依下列規則處理:</p>
<ul>
  <li><strong>已使用之當期費用不退款</strong>(含當期已產生之 AI 運算、儲存、支援成本)</li>
  <li><strong>自取消日起至當期結束之剩餘期間仍可使用</strong>,到期後自動停止續訂,不再扣款</li>
  <li><strong>年付方案(若未來提供)</strong>:未使用之完整月份按比例退款,已使用月份不退</li>
</ul>

<h3>2.3 因本公司服務中斷之補償</h3>
<p>若因本公司之故導致服務連續中斷超過 <strong>24 小時</strong>,本公司將依實際影響期間 <strong>按比例</strong> 退款或延長訂閱期間,由用戶擇一。</p>

<h3>2.4 不予退款之情形</h3>
<ul>
  <li>用戶違反 <a href="terms.html">服務條款</a> 遭終止帳號者</li>
  <li>因用戶自身設備、網路問題導致無法使用</li>
  <li>已開立電子發票且超過當月者,依稅法規定無法作廢,改以折讓單處理</li>
  <li>超過首次訂閱 7 日後,已使用之當期費用</li>
</ul>

<h2>3. 退款處理流程</h2>
<ol class="legal-ol" style="padding-left: 22px; color: #9e9eaa;">
  <li style="margin: 8px 0;">用戶提出退款申請(方式見第 1 條)</li>
  <li style="margin: 8px 0;">本公司於 3 個工作天內初步回覆</li>
  <li style="margin: 8px 0;">審核通過後,透過原付款方式退款</li>
  <li style="margin: 8px 0;">綠界 ECPay 退款於 7–14 個工作天退回原信用卡帳戶</li>
  <li style="margin: 8px 0;">銀行實際入帳時間依發卡銀行作業而定</li>
</ol>

<h2>4. 退款無法處理之情況</h2>
<ul>
  <li>原信用卡已停用、遺失或更換</li>
  <li>發卡銀行退卡或拒絕接收退款</li>
</ul>
<p>前述情況本公司將聯繫用戶協調替代退款方式(例如匯款至用戶指定帳戶,可能扣除必要手續費)。</p>

<h2>5. 電子發票處理</h2>
<ul>
  <li><strong>當月開立</strong>:可作廢,不需折讓單</li>
  <li><strong>跨月</strong>:依稅法以「折讓單」方式處理</li>
  <li>若買方為公司戶(有統編)之退款,依營業稅法規定辦理</li>
</ul>

<h2>6. 爭議處理</h2>
<p>如對退款處理有任何爭議,請聯繫客服部提出申訴:</p>
<ul>
  <li>Email:<a href="mailto:yazelin@ching-tech.com">yazelin@ching-tech.com</a></li>
  <li>電話:(02) 2903-2788</li>
</ul>
<p>本公司將於 7 個工作天內回覆。若仍無法達成共識,雙方得依 <a href="terms.html">服務條款</a> 第 11 條約定管轄。</p>
```

- [ ] **Step 2: 瀏覽器檢查**

開 `http://localhost:8888/refund.html`,確認政策條件清楚且合理(未寫「一概不退款」字樣)。

- [ ] **Step 3: Commit**

```bash
cd /home/ct/SDD/ching-tech.github.io && git add refund.html && git commit -m "feat: 新增 refund.html 退款政策"
```

---

## Task 5: pricing.html

**Files:**
- Create: `pricing.html`

- [ ] **Step 1: 建立 pricing.html**

建立 `/home/ct/SDD/ching-tech.github.io/pricing.html`,完整內容如下:

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>方案價格 — 擎添工業 ChingTech</title>
  <meta name="description" content="擎添助理 CTOS-Lite 與 ChingTech OS 企業版訂閱方案與價格,含功能對照、自動續訂說明與退款政策連結。">
  <style>
    /* (貼上「共用 Base CSS」與「共用 Footer CSS」) */

    /* 本頁專屬 */
    .product-section { padding: 64px 0; }
    .product-section + .product-section {
      border-top: 1px solid rgba(255,255,255,0.05);
    }
    .product-eyebrow {
      display: inline-block; font-size: 0.78rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.18em;
      padding: 6px 14px; border-radius: 20px; margin-bottom: 14px;
    }
    .eyebrow-jinn {
      color: #4ade80; background: rgba(6, 199, 85, 0.1);
      border: 1px solid rgba(6, 199, 85, 0.25);
    }
    .eyebrow-os {
      color: #a78bfa; background: rgba(139, 92, 246, 0.1);
      border: 1px solid rgba(139, 92, 246, 0.25);
    }
    .product-title {
      font-size: clamp(1.8rem, 3.5vw, 2.4rem);
      font-weight: 800; letter-spacing: -0.02em;
      margin-bottom: 10px; color: #f0f0f8;
    }
    .product-desc { color: #8888a0; margin-bottom: 40px; max-width: 620px; }

    .plans-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
    }
    .plan-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px; padding: 32px 28px;
      display: flex; flex-direction: column;
      transition: all 0.25s;
    }
    .plan-card:hover {
      transform: translateY(-4px);
      border-color: rgba(255,255,255,0.15);
    }
    .plan-card.featured {
      border-color: rgba(165,180,252,0.3);
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.05), rgba(56, 130, 246, 0.05));
    }
    .plan-name {
      font-size: 1.1rem; font-weight: 700; color: #e0e0e8;
      margin-bottom: 6px;
    }
    .plan-tag {
      display: inline-block; font-size: 0.72rem; letter-spacing: 0.12em;
      color: #a5b4fc; margin-bottom: 16px; text-transform: uppercase;
    }
    .plan-price {
      display: flex; align-items: baseline; gap: 6px;
      margin-bottom: 20px;
    }
    .plan-price .amount {
      font-size: 2.2rem; font-weight: 800; color: #f0f0f8;
      letter-spacing: -0.02em;
    }
    .plan-price .unit { color: #8888a0; font-size: 0.9rem; }
    .plan-price .contact {
      font-size: 1.5rem; font-weight: 700; color: #a5b4fc;
    }
    .plan-note { font-size: 0.82rem; color: #6e6e78; margin-bottom: 20px; }
    .plan-features { list-style: none; padding: 0; margin: 0 0 28px; flex: 1; }
    .plan-features li {
      position: relative; padding-left: 22px; color: #c0c0d0;
      margin: 10px 0; font-size: 0.92rem; line-height: 1.6;
    }
    .plan-features li::before {
      content: "→"; position: absolute; left: 0;
      color: #8b5cf6; font-weight: 700;
    }
    .plan-features li.muted { color: #6e6e78; }
    .plan-features li.muted::before { color: #4a4a58; }
    .btn-plan {
      display: inline-flex; justify-content: center; align-items: center;
      padding: 12px 20px; border-radius: 10px;
      font-size: 0.95rem; font-weight: 600;
      transition: all 0.25s;
      border: 1px solid rgba(165,180,252,0.3);
      background: transparent; color: #a5b4fc;
    }
    .btn-plan:hover {
      background: rgba(165,180,252,0.08);
      border-color: rgba(165,180,252,0.5);
    }
    .btn-plan.primary {
      background: linear-gradient(135deg, #3882f6, #6366f1);
      color: #fff; border: none;
      box-shadow: 0 4px 20px rgba(56, 130, 246, 0.25);
    }
    .btn-plan.primary:hover {
      box-shadow: 0 8px 32px rgba(56, 130, 246, 0.4);
      transform: translateY(-2px);
    }
    .btn-plan.line {
      background: #06c755; color: #fff; border: none;
    }
    .btn-plan.line:hover { background: #05b34b; }
    .btn-plan.disabled {
      pointer-events: none; opacity: 0.6; cursor: not-allowed;
    }

    .billing-notes {
      margin-top: 40px; padding: 24px;
      background: rgba(255,255,255,0.02);
      border-left: 2px solid #8b5cf6;
      border-radius: 8px;
    }
    .billing-notes h4 {
      font-size: 0.82rem; letter-spacing: 0.1em;
      color: #a5b4fc; text-transform: uppercase;
      margin-bottom: 12px;
    }
    .billing-notes ul { list-style: none; padding: 0; }
    .billing-notes li {
      position: relative; padding-left: 20px;
      font-size: 0.88rem; color: #9e9eaa; margin: 6px 0;
      line-height: 1.7;
    }
    .billing-notes li::before {
      content: "·"; position: absolute; left: 4px;
      color: #a5b4fc; font-weight: 700;
    }
    .billing-notes a {
      color: #a5b4fc; border-bottom: 1px solid rgba(165,180,252,0.3);
    }
  </style>
</head>
<body>

<div class="glow-bg"></div>

<!-- (共用 Nav Block) -->

<header class="page-header">
  <div class="container">
    <span class="page-eyebrow">方案與價格</span>
    <h1 class="page-title">挑一個符合你現在的階段。</h1>
    <p class="page-lede">所有方案按月計費,信用卡自動續訂,任何時間可取消。</p>
  </div>
</header>

<main>

<!-- ctos-lite -->
<section class="product-section" id="ctos-lite">
  <div class="container">
    <span class="product-eyebrow eyebrow-jinn">擎添助理 · CTOS-Lite</span>
    <h2 class="product-title">LINE AI 個人助理</h2>
    <p class="product-desc">加 LINE 5 秒上工,每天免費 50 次,升級完整版可無限使用。</p>

    <div class="plans-grid">
      <div class="plan-card">
        <div class="plan-name">試用版</div>
        <div class="plan-tag">Trial</div>
        <div class="plan-price">
          <span class="amount">NT$ 0</span>
          <span class="unit">/ 月</span>
        </div>
        <div class="plan-note">不需信用卡,加 LINE 就能用</div>
        <ul class="plan-features">
          <li>每日 50 次 AI 對話</li>
          <li>自訂 AI 個性與名字</li>
          <li>即時網路搜尋</li>
          <li>圖片辨識與生成</li>
          <li>個人知識庫</li>
          <li>長期記憶</li>
          <li>語音對話</li>
          <li>影片摘要</li>
        </ul>
        <a href="https://line.me/R/ti/p/@285fjkky" target="_blank" class="btn-plan line">加 LINE 立即試用 →</a>
      </div>

      <div class="plan-card featured">
        <div class="plan-name">完整版</div>
        <div class="plan-tag">Full</div>
        <div class="plan-price">
          <span class="amount">NT$ XXXX</span>
          <span class="unit">/ 月</span>
        </div>
        <div class="plan-note">自動續訂,隨時可取消</div>
        <ul class="plan-features">
          <li><strong>無限次</strong>AI 對話</li>
          <li>試用版全部功能</li>
          <li>ERP / 庫存整合</li>
          <li>Google Drive 同步</li>
          <li>LINE + Telegram 多平台</li>
          <li>自訂 AI 代理工作流</li>
          <li>AI 員工角色設計</li>
          <li>FDE 工程師到府協助</li>
          <li>管理後台</li>
        </ul>
        <a href="#" class="btn-plan disabled">即將開放</a>
      </div>
    </div>
  </div>
</section>

<!-- ching-tech-os -->
<section class="product-section" id="ching-tech-os">
  <div class="container">
    <span class="product-eyebrow eyebrow-os">ChingTech OS · 企業版</span>
    <h2 class="product-title">企業 AI 工作平台</h2>
    <p class="product-desc">18 模組 + 知識庫 + Agent + LINE/Telegram 整合,資料留在台灣。</p>

    <div class="plans-grid">
      <div class="plan-card">
        <div class="plan-name">基本</div>
        <div class="plan-tag">Basic · ≤5 人</div>
        <div class="plan-price">
          <span class="amount">NT$ XXXX</span>
          <span class="unit">/ 月</span>
        </div>
        <div class="plan-note">適合個人工作室、小團隊</div>
        <ul class="plan-features">
          <li>核心 AI 助理</li>
          <li>基本檔案管理</li>
          <li>LINE 整合</li>
          <li>5 位成員</li>
          <li>標準支援(Email)</li>
          <li class="muted">Socket.IO 即時協作</li>
          <li class="muted">NAS 整合</li>
        </ul>
        <a href="#" class="btn-plan disabled">即將開放</a>
      </div>

      <div class="plan-card featured">
        <div class="plan-name">專業</div>
        <div class="plan-tag">Pro · ≤30 人</div>
        <div class="plan-price">
          <span class="amount">NT$ XXXX</span>
          <span class="unit">/ 月</span>
        </div>
        <div class="plan-note">推薦 · 中型團隊首選</div>
        <ul class="plan-features">
          <li>基本方案全部功能</li>
          <li>完整 AI Skills 系統</li>
          <li>Socket.IO 即時協作</li>
          <li>NAS 檔案整合</li>
          <li>Telegram Bot</li>
          <li>自訂 Agent 與 Prompt</li>
          <li>30 位成員</li>
          <li>優先支援</li>
        </ul>
        <a href="#" class="btn-plan primary disabled">即將開放</a>
      </div>

      <div class="plan-card">
        <div class="plan-name">企業</div>
        <div class="plan-tag">Enterprise · 不限</div>
        <div class="plan-price">
          <span class="contact">聯繫報價</span>
        </div>
        <div class="plan-note">客製化、多租戶、SLA 保證</div>
        <ul class="plan-features">
          <li>專業方案全部功能</li>
          <li>不限成員數</li>
          <li>多租戶部署</li>
          <li>SSO 整合</li>
          <li>FDE 工程師專屬支援</li>
          <li>99.5% SLA</li>
          <li>資料留在台灣保證</li>
          <li>合約客製條款</li>
        </ul>
        <a href="contact.html" class="btn-plan">聯繫我們 →</a>
      </div>
    </div>

    <div class="billing-notes">
      <h4>計費與續訂說明</h4>
      <ul>
        <li>所有月費方案於訂閱當日首次扣款,後續每月於同一日期自動扣款</li>
        <li>信用卡定期定額由 <strong>綠界科技 ECPay</strong> 處理,本公司不儲存完整卡號</li>
        <li>所有列示價格為 <strong>未稅</strong>,開立發票時另加 5% 營業稅</li>
        <li>可隨時從管理後台或聯繫客服取消訂閱,當期到期後不再扣款</li>
        <li>退款條件詳見 <a href="refund.html">退款政策</a>;自動續訂機制詳見 <a href="terms.html">服務條款</a> 第 3 條</li>
        <li>訂閱本服務視同勾選「同意立即啟用並放棄七日鑑賞期」,詳見 <a href="terms.html">服務條款</a> 第 4 條</li>
      </ul>
    </div>
  </div>
</section>

</main>

<!-- (共用 Footer Block) -->

</body>
</html>
```

- [ ] **Step 2: 瀏覽器檢查**

開 `http://localhost:8888/pricing.html`,確認:
- ctos-lite 兩方案清楚、ching-tech-os 三方案清楚
- 所有 `NT$ XXXX` 佔位顯示
- 「加 LINE 立即試用」真的連到 LINE
- 「即將開放」按鈕為 disabled 狀態
- 計費說明區塊連結 terms/refund 正確
- 無 emoji

- [ ] **Step 3: Commit**

```bash
cd /home/ct/SDD/ching-tech.github.io && git add pricing.html && git commit -m "feat: 新增 pricing.html 方案定價頁(價格以 XXXX 佔位)"
```

---

## Task 6: ching-tech-os.html

**Files:**
- Create: `ching-tech-os.html`

- [ ] **Step 1: 建立 ching-tech-os.html**

這是 B2B 產品介紹頁,語氣嚴肅、強調工程深度與資料主權。

建立 `/home/ct/SDD/ching-tech.github.io/ching-tech-os.html`:

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ChingTech OS — 企業 AI 工作平台 · 擎添工業</title>
  <meta name="description" content="ChingTech OS 是擎添工業推出的企業 AI 工作平台。18 模組 + 知識庫 + Agent,資料留在台灣。40 年工程老牌,把工程力 + AI 一起打包。">
  <style>
    /* (貼上「共用 Base CSS」與「共用 Footer CSS」) */

    /* 本頁專屬 */
    .hero-os {
      min-height: 80vh; display: flex; align-items: center;
      padding: 140px 0 80px; position: relative;
    }
    .hero-os::before {
      content: ''; position: absolute; top: 30%; left: 50%;
      transform: translate(-50%, -50%);
      width: 800px; height: 800px; border-radius: 50%;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%);
      animation: pulse 6s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
      50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
    }
    .hero-os-content { position: relative; z-index: 1; }
    .hero-os-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(139, 92, 246, 0.1);
      border: 1px solid rgba(139, 92, 246, 0.25);
      color: #a78bfa; padding: 6px 16px; border-radius: 20px;
      font-size: 0.8rem; font-weight: 600; letter-spacing: 0.05em;
      margin-bottom: 24px;
    }
    .hero-os h1 {
      font-size: clamp(2.4rem, 5.5vw, 3.8rem);
      font-weight: 800; letter-spacing: -0.03em;
      line-height: 1.15; margin-bottom: 20px;
      background: linear-gradient(135deg, #fff 0%, #c7d0ff 50%, #a78bfa 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      max-width: 820px;
    }
    .hero-os p.lead {
      font-size: clamp(1rem, 2vw, 1.2rem);
      color: #8888a0; max-width: 640px; margin-bottom: 40px;
    }
    .hero-os-buttons { display: flex; gap: 16px; flex-wrap: wrap; }
    .btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 14px 28px; border-radius: 12px;
      font-size: 1rem; font-weight: 600;
      transition: all 0.25s; border: none; cursor: pointer;
    }
    .btn-primary {
      background: linear-gradient(135deg, #3882f6, #6366f1);
      color: #fff;
      box-shadow: 0 4px 24px rgba(56, 130, 246, 0.3);
    }
    .btn-primary:hover {
      box-shadow: 0 8px 32px rgba(56, 130, 246, 0.5);
      transform: translateY(-2px);
    }
    .btn-outline {
      background: transparent; color: #a5b4fc;
      border: 1px solid rgba(165, 180, 252, 0.3);
    }
    .btn-outline:hover {
      background: rgba(165, 180, 252, 0.08);
      border-color: rgba(165, 180, 252, 0.5);
    }

    section.content { padding: 80px 0; border-top: 1px solid rgba(255,255,255,0.04); }
    .section-eyebrow {
      display: inline-block; font-size: 0.78rem; font-weight: 600;
      text-transform: uppercase; letter-spacing: 0.18em;
      color: #a78bfa; margin-bottom: 14px;
    }
    .section-h2 {
      font-size: clamp(1.8rem, 3.5vw, 2.4rem);
      font-weight: 800; letter-spacing: -0.02em;
      color: #f0f0f8; margin-bottom: 14px;
    }
    .section-lead {
      color: #8888a0; max-width: 640px;
      margin-bottom: 40px; font-size: 1.02rem;
    }

    .modules-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 18px;
    }
    .module-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 14px; padding: 24px;
      transition: all 0.25s;
    }
    .module-card:hover {
      transform: translateY(-3px);
      border-color: rgba(255,255,255,0.12);
    }
    .module-icon {
      width: 42px; height: 42px; border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 14px;
    }
    .module-icon svg { width: 22px; height: 22px; }
    .mi-cyan { background: linear-gradient(135deg, #0891b2, #0e7490); }
    .mi-purple { background: linear-gradient(135deg, #a78bfa, #7c3aed); }
    .mi-blue { background: linear-gradient(135deg, #3882f6, #1d4ed8); }
    .mi-green { background: linear-gradient(135deg, #06c755, #16a34a); }
    .mi-amber { background: linear-gradient(135deg, #f7a81b, #d97706); }
    .mi-pink { background: linear-gradient(135deg, #ec4899, #be185d); }
    .module-icon svg { stroke: #fff; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
    .module-card h3 {
      font-size: 1rem; font-weight: 700; color: #e0e0e8;
      margin-bottom: 6px;
    }
    .module-card p {
      font-size: 0.88rem; color: #8888a0; line-height: 1.6;
    }

    .sovereignty {
      background: linear-gradient(135deg, rgba(34, 211, 238, 0.04), rgba(139, 92, 246, 0.04));
      border: 1px solid rgba(34, 211, 238, 0.15);
      border-radius: 20px; padding: 48px; margin-top: 48px;
    }
    .sovereignty h3 {
      font-size: 1.5rem; font-weight: 700; color: #e0e0e8;
      margin-bottom: 12px;
    }
    .sovereignty p {
      color: #a0a0b0; line-height: 1.8; max-width: 700px;
    }
    .sovereignty strong { color: #22d3ee; }

    .cta-block {
      margin-top: 48px; text-align: center;
      padding: 56px 32px; border-radius: 20px;
      background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(56, 130, 246, 0.08));
      border: 1px solid rgba(139, 92, 246, 0.15);
    }
    .cta-block h3 {
      font-size: 1.6rem; font-weight: 700; color: #f0f0f8;
      margin-bottom: 12px;
    }
    .cta-block p { color: #8888a0; margin-bottom: 28px; }
    .cta-block .btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

    @media (max-width: 640px) {
      .hero-os { padding: 100px 0 60px; }
      .modules-grid { grid-template-columns: 1fr; }
      .sovereignty { padding: 28px; }
    }
  </style>
</head>
<body>

<div class="glow-bg"></div>

<!-- (共用 Nav Block) -->

<section class="hero-os">
  <div class="container hero-os-content">
    <div class="hero-os-badge">
      <span>企業 AI 工作平台 · 自 2025</span>
    </div>
    <h1>把人從重複作業裡解放,<br>讓工程力 + AI 一起工作。</h1>
    <p class="lead">ChingTech OS 是擎添工業的企業作業系統 — 18 模組 + 知識庫 + Agent + LINE/Telegram,把公司的 SOP、報價、合約、客戶資料都串起來,AI 記得,員工不用再重複回答。</p>
    <div class="hero-os-buttons">
      <a href="pricing.html#ching-tech-os" class="btn btn-primary">查看方案價格 →</a>
      <a href="contact.html" class="btn btn-outline">預約 demo</a>
    </div>
  </div>
</section>

<section class="content">
  <div class="container">
    <span class="section-eyebrow">Core Modules</span>
    <h2 class="section-h2">18 模組,依你的業務配置。</h2>
    <p class="section-lead">不是通用 chatbot。每個模組都針對實際工作場景設計,可開可關,按公司需求組合。</p>

    <div class="modules-grid">
      <div class="module-card">
        <div class="module-icon mi-cyan">
          <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
        <h3>AI 助手</h3>
        <p>多 Agent、Prompt 編輯、對話日誌、自訂 Skills。</p>
      </div>

      <div class="module-card">
        <div class="module-icon mi-purple">
          <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        </div>
        <h3>企業知識庫</h3>
        <p>Markdown 管理、全文檢索、版本歷史、RAG 向量搜尋。</p>
      </div>

      <div class="module-card">
        <div class="module-icon mi-blue">
          <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </div>
        <h3>Web 桌面</h3>
        <p>類 macOS 桌面,多視窗、多工、亮暗主題切換。</p>
      </div>

      <div class="module-card">
        <div class="module-icon mi-green">
          <svg viewBox="0 0 24 24"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
        </div>
        <h3>專案管理</h3>
        <p>成員、會議、附件、里程碑、發包期程、廠商主檔。</p>
      </div>

      <div class="module-card">
        <div class="module-icon mi-amber">
          <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
        </div>
        <h3>物料庫存</h3>
        <p>料號、進銷存、盤點、廠商、採購單據整合管理。</p>
      </div>

      <div class="module-card">
        <div class="module-icon mi-pink">
          <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </div>
        <h3>數據分析</h3>
        <p>儀表板、圖表、報表排程,連動知識庫與業務資料。</p>
      </div>

      <div class="module-card">
        <div class="module-icon mi-cyan">
          <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13L2 4"/></svg>
        </div>
        <h3>LINE / Telegram 整合</h3>
        <p>Bot 入口,客戶端/員工端對話接入 CTOS 知識庫。</p>
      </div>

      <div class="module-card">
        <div class="module-icon mi-purple">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h3>排程與提醒</h3>
        <p>定時任務、跨模組觸發、Email/LINE 通知。</p>
      </div>

      <div class="module-card">
        <div class="module-icon mi-blue">
          <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        </div>
        <h3>檔案 / NAS</h3>
        <p>SMB/CIFS 掛載,AI 可讀寫公司 NAS 檔案。</p>
      </div>
    </div>

    <div class="sovereignty">
      <h3>資料留在台灣。</h3>
      <p>企業核心資料 — 知識庫、客戶檔案、對話紀錄 — 儲存於 <strong>中華民國境內</strong> 的資料中心。AI 推理所需的境外 API 呼叫,僅傳送當次對話必要內容,不外流完整知識庫。這不是行銷話術,是跟國外 SaaS 本質的差別。</p>
    </div>
  </div>
</section>

<section class="content">
  <div class="container">
    <span class="section-eyebrow">Why ChingTech</span>
    <h2 class="section-h2">40 年工程底子,4 個月做出 CTOS。</h2>
    <p class="section-lead">1984 年從新北五股起家,40 年做 PLC、機械手臂整合、AGV 無人搬運、KUKA/FANUC/YASKAWA 系統。服務過的產業橫跨半導體封測、PCB、面板、玻璃、CNC、光學、醫療、捷運巡檢。</p>
    <p class="section-lead">不是 AI 新創在做 AI,是 40 年的工程公司把工程力 + AI 一起打包給你。我們踩過的坑,已經內建在 CTOS 裡。</p>

    <div class="cta-block">
      <h3>準備好看看怎麼裝進你的公司了嗎?</h3>
      <p>預約 30 分鐘 demo,一起看你的實際使用情境。</p>
      <div class="btns">
        <a href="contact.html" class="btn btn-primary">預約 demo</a>
        <a href="pricing.html#ching-tech-os" class="btn btn-outline">查看方案價格</a>
      </div>
    </div>
  </div>
</section>

<!-- (共用 Footer Block) -->

</body>
</html>
```

- [ ] **Step 2: 瀏覽器檢查**

開 `http://localhost:8888/ching-tech-os.html`,確認:
- Hero 主標 gradient 文字正常
- 9 個模組卡片顯示(各顏色 gradient icon)
- 「資料留在台灣」區塊突顯
- 「40 年工程」歷史敘述無具名客戶
- CTA 連 pricing 與 contact

- [ ] **Step 3: Commit**

```bash
cd /home/ct/SDD/ching-tech.github.io && git add ching-tech-os.html && git commit -m "feat: 新增 ching-tech-os.html 企業版產品介紹"
```

---

## Task 7: 更新 index.html

**Files:**
- Modify: `index.html`(更新 nav 連結、新增 footer 區塊)

- [ ] **Step 1: 更新 nav**

找到 `<div class="nav-links">` 區塊(約 272–275 行),改為:

```html
<div class="nav-links">
  <a href="ctos-lite.html">擎添助理</a>
  <a href="ching-tech-os.html">ChingTech OS</a>
  <a href="pricing.html">方案價格</a>
  <a href="contact.html">聯絡我們</a>
</div>
```

- [ ] **Step 2: 替換 footer**

找到既有的 `<footer>...</footer>` 區塊(通常在檔案末端),整段刪除並換成:

```html
<footer>
  <div class="container footer-grid">
    <div class="footer-col">
      <div class="footer-brand">擎添工業股份有限公司</div>
      <div class="footer-muted">ChingTech Co., Ltd. · 自 1984 年</div>
      <div class="footer-muted" style="margin-top: 12px;">統一編號 36274806</div>
      <div class="footer-muted">新北市五股區成泰路一段 194-8 號 J 棟(248)</div>
      <div class="footer-muted">電話 (02) 2903-2788 · 傳真 (02) 2903-9518</div>
    </div>
    <div class="footer-col">
      <div class="footer-label">產品</div>
      <a href="ctos-lite.html">擎添助理(LINE)</a>
      <a href="ching-tech-os.html">ChingTech OS(企業版)</a>
      <a href="pricing.html">方案價格</a>
    </div>
    <div class="footer-col">
      <div class="footer-label">法律與政策</div>
      <a href="terms.html">服務條款</a>
      <a href="privacy.html">隱私權政策</a>
      <a href="refund.html">退款政策</a>
    </div>
    <div class="footer-col">
      <div class="footer-label">聯絡</div>
      <a href="contact.html">聯絡表單</a>
      <a href="mailto:yazelin@ching-tech.com">yazelin@ching-tech.com</a>
      <a href="https://ching-tech.com" target="_blank">ching-tech.com</a>
    </div>
  </div>
  <div class="container footer-bottom">
    © 2026 ChingTech Co., Ltd. All rights reserved.
  </div>
</footer>
```

- [ ] **Step 3: 加入 footer CSS**

找到 `<style>` 區塊裡既有的 `/* ── Footer ── */` 區塊(約 234–242 行),整段替換成「共用 Footer CSS」全部內容。

- [ ] **Step 4: 瀏覽器檢查**

開 `http://localhost:8888/index.html`,確認 nav 新連結、footer 四欄公司資訊完整、點擊連結可到各新頁。

- [ ] **Step 5: Commit**

```bash
cd /home/ct/SDD/ching-tech.github.io && git add index.html && git commit -m "feat: index.html 更新 nav 與 footer,加入法律頁連結"
```

---

## Task 8: 更新 ctos-lite.html

**Files:**
- Modify: `ctos-lite.html`(nav、footer、完整版升級 section 連到 pricing)

- [ ] **Step 1: 先讀完整檔案找出 sections**

```bash
wc -l /home/ct/SDD/ching-tech.github.io/ctos-lite.html
```

- [ ] **Step 2: 更新 nav**

找到 nav 的 `.nav-links` 區塊,加入 pricing 連結(保留既有 CTA 按鈕):

```html
<div class="nav-links">
  <a href="index.html">擎添工業</a>
  <a href="ching-tech-os.html">企業版</a>
  <a href="pricing.html">方案</a>
  <a href="contact.html">聯絡</a>
  <a href="https://line.me/R/ti/p/@285fjkky" target="_blank" class="nav-cta">加入 LINE</a>
</div>
```

- [ ] **Step 3: 找到「完整版升級」區塊(若存在)**

用 grep 找:
```bash
grep -n "完整版" /home/ct/SDD/ching-tech.github.io/ctos-lite.html
```

若有「完整版升級」CTA,確保其 CTA 按鈕連到 `pricing.html#ctos-lite`。若是「聯繫報價」文字,追加連結指向 `pricing.html#ctos-lite`。

- [ ] **Step 4: 替換 footer**

找到既有 footer,整段替換為「共用 Footer Block」(同 Task 7 Step 2),並在 `<style>` 裡加上「共用 Footer CSS」(若原檔 footer 樣式不同)。

- [ ] **Step 5: 瀏覽器檢查**

開 `http://localhost:8888/ctos-lite.html`:
- nav 新增的 pricing/contact 連結可點
- footer 四欄顯示公司資訊
- 「完整版」相關 CTA 連到 pricing

- [ ] **Step 6: Commit**

```bash
cd /home/ct/SDD/ching-tech.github.io && git add ctos-lite.html && git commit -m "feat: ctos-lite.html 更新 nav 與 footer,CTA 連到 pricing"
```

---

## Task 9: 整體 QA 與品牌審查

- [ ] **Step 1: 啟動 local server 做完整走查**

```bash
cd /home/ct/SDD/ching-tech.github.io && python3 -m http.server 8888 &
```

依序打開以下頁面,每頁做 checklist 檢查:

- `http://localhost:8888/index.html`
- `http://localhost:8888/ctos-lite.html`
- `http://localhost:8888/ching-tech-os.html`
- `http://localhost:8888/pricing.html`
- `http://localhost:8888/terms.html`
- `http://localhost:8888/privacy.html`
- `http://localhost:8888/refund.html`
- `http://localhost:8888/contact.html`

每頁檢查清單:
1. Nav 與 footer 一致(公司資訊、連結都在)
2. 所有內部連結可點且正確
3. 零 emoji(ctrl+F 搜 😀 🚀 ✨ 🎉 無結果)
4. 無具名客戶出現於任何位置
5. 手機寬度(Chrome DevTools 切 iPhone 尺寸)responsive 正常
6. 所有價格顯示 `NT$ XXXX`(非最終數字)
7. Title 與 meta description 正確

- [ ] **Step 2: 依品牌 checklist 複驗**

打開 `/home/ct/SDD/brand/skills/brand-check.md` 對照(如檔案不存在則跳過):

```bash
cat /home/ct/SDD/brand/skills/brand-check.md 2>/dev/null | head -60 || echo "brand-check.md not found, skipping"
```

人工對照重點:
- 色票限於 `#0e0e10` / `#0a0a0f` 底 + 藍紫調(`#3882f6` `#8b5cf6` `#a5b4fc`)+ LINE 綠(`#06c755`)+ cyan 強調(`#22d3ee` `#0891b2`)
- 字型 stack 與既有一致
- bullet 用 `→`,沒有 `•`

- [ ] **Step 3: 關閉 server**

```bash
pkill -f "http.server 8888" || true
```

- [ ] **Step 4: Commit 任何 QA 修正**

若 QA 過程發現小問題(typo、連結錯誤),一次 commit:
```bash
cd /home/ct/SDD/ching-tech.github.io && git add -A && git commit -m "fix: 落地頁 QA 修正"
```

若無修正,跳過。

---

## Task 10: Push 到 GitHub Pages

- [ ] **Step 1: 確認 remote 與 branch**

```bash
cd /home/ct/SDD/ching-tech.github.io && git remote -v && git branch --show-current && git log --oneline -10
```

- [ ] **Step 2: 請示使用者再 push**

Push 是對外可見操作(立刻上到 GitHub Pages),本任務 **不自動執行 push**,由 Claude 列出待 push 清單後詢問 user 是否進行。

回報格式:
```
Phase 1 落地頁實作完成,本地 commits:
  - <sha> feat: 新增 contact.html
  - <sha> feat: 新增 privacy.html
  - ...
預計 push 至 ching-tech/ching-tech.github.io main branch,GitHub Pages 會立即上線。
是否 push?(yes/no)
```

等 user 回覆 yes 後:
```bash
cd /home/ct/SDD/ching-tech.github.io && git push origin main
```

- [ ] **Step 3: 告知下一步**

Push 完成後回報:
1. 線上網址清單(`https://ching-tech.github.io/pricing.html` 等)
2. 提醒 user 可開始向綠界提出特約商店申請,提供上述網址
3. 提醒 Phase 2 billing service plan 將於 Phase 1 完成後撰寫

---

## Self-review checklist(寫完 plan 後自檢)

- [x] 每個頁面都涵蓋 spec §9 要求的內容
- [x] 無 placeholder(`XXXX` 是刻意佔位,使用者已確認)
- [x] 函數名/檔名/連結在 tasks 間一致
- [x] 每個 task 都有 commit step
- [x] 公司資訊(統編 36274806、地址、電話、Email)在所有 footer 與 contact 一致
- [x] 品牌規範(零 emoji、不具名、arrow bullet)貫穿
- [x] push 步驟明確要求 user 確認(對外可見操作)
