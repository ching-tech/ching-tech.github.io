# 統一版 Nav · Design Spec

> **Date**: 2026-04-22
> **Scope**: 統一 `ching-tech.github.io` 標準頁的 nav（HTML + CSS），順便修正品牌色 drift。
> **Brand source of truth**: `/home/ct/SDD/brand/docs/02-visual-system.md`、`/home/ct/SDD/brand/docs/08-product-ui-palette.md`

---

## 1. 目標

把 8 個標準頁的 nav 統一成同一套 HTML + CSS，消除以下已知問題：

1. `index.html` 的 logo 是 `<div>` 不是 `<a>`，結構跟其他頁不一致。
2. `ctos-lite.html` 用「企業版 / 聯絡」命名、logo 用絕對 URL、少了自連結——整個獨立一套。
3. Logo 漸層 `#3882f6 → #8b5cf6`（藍→紫）**違反 brand spec**：這兩色屬於「產品 UI 模組色」，brand 禁止用於品牌識別文字。
4. `index.html` 的 logo 字級（1.15rem）、gap（28px）跟其他 7 頁（1.05rem / 24px）不同。
5. `.nav-cta`（免費試用按鈕）只有 `ctos-lite.html` 有，其他頁沒有——轉換漏斗不完整。
6. Mobile 斷點只有 2 頁有（index、ctos-lite），其他 6 頁沒有。
7. CSS 寫法格式混亂（同一規則有 compact 單行版、有多行版）。

---

## 2. 範圍

### 納入（8 個標準頁）

| 檔案 | 類型 | CTA | Active 套在 |
|---|---|---|---|
| `index.html` | 產品/行銷 | ✓ | （無） |
| `ctos-lite.html` | 產品/行銷 | ✓ | `[data-nav="ctos-lite"]` |
| `ching-tech-os.html` | 產品/行銷 | ✓ | `[data-nav="ching-tech-os"]` |
| `pricing.html` | 產品/行銷 | ✓ | `[data-nav="pricing"]` |
| `contact.html` | 產品/行銷 | ✓ | `[data-nav="contact"]` |
| `privacy.html` | Legal | — | （無） |
| `terms.html` | Legal | — | （無） |
| `refund.html` | Legal | — | （無） |

### 排除（保持不動）

- `promo.html` — 獨立落地頁，nav 是刻意簡化為「logo + CTA」
- `rotary.html` — 簡報 deck（扶輪社演講）
- `jianlifeng.html` — 簡報 deck（商周 MEGA TALK）

三個非標準頁都是單向漏斗（會導流到 `ctos-lite.html`，但主站不會反向連回它們），
獨立風格是刻意的，不統一。

---

## 3. 設計決策紀錄

### 3.1 Nav 項目命名

採用目前 6 頁的既有命名：「擎添助理 / ChingTech OS / 方案價格 / 聯絡我們」。
`ctos-lite.html` 的「企業版 / 聯絡」作廢。

**原因**：6 頁已經是共識；「聯絡我們」比「聯絡」更完整；「ChingTech OS」是產品名、不用翻「企業版」。

### 3.2 CTA 策略

Product/marketing 5 頁都顯示 CTA；legal 3 頁不顯示。

**原因**：
- 每頁都有 CTA 完整轉換漏斗；法律頁移除 CTA 讓閱讀體驗更單純（使用者做法律確認時不應被 CTA 干擾）。
- 此差異是**明確刻意的**，不是 drift。

### 3.3 Logo 漸層色

從 `#3882f6 → #8b5cf6`（藍→紫）改為 `#0891b2 → #22d3ee`（brand cyan）。

**依據**：
- `brand/docs/02-visual-system.md` 第 1 節定義主色為 cyan `#0891b2` / `#22d3ee`
- `brand/docs/08-product-ui-palette.md` 明確寫：「**不要**拿來當標題文字色、CTA 按鈕色 — 那會破壞品牌識別」，指的就是 `#3882f6` / `#8b5cf6` 這類產品 UI 模組色

### 3.4 Logo 圖示

加上 brand spec 標準的 cyan glow：
```css
filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.5));
```

依據：`brand/docs/02-visual-system.md` § 3 Logo「標準處理：青色 glow」。

### 3.5 文字色階

- 一般狀態：`#a0a0a0`（brand `--text-caption`）
- Hover：`#f5f5f5`（brand `--text-strong`）
- Active：`#22d3ee`（brand `--cyan-400`）

原現況 `#888 / #e0e0e8` 是 drift，改齊 brand spec。

### 3.6 Logo 連結行為

`index.html` 的 logo 也改成 `<a href="index.html">`。
點了不會跳（已經在首頁），但語意、DOM 結構、CSS selector 都跟其他頁一致——維護成本下降。

### 3.7 Canonical 標記

Nav 區塊加上 `<!-- === Canonical Nav · 以此為準... === -->` 註解，
讓未來修改者（人類或 AI）看到這段就知道「這裡是複製貼上的共用片段」，不會只改一頁。

---

## 4. 統一版 HTML

所有 8 頁 `<nav>` 區塊都改成這個結構。當前頁對應的那條 `<a>` 由該頁自己加 `class="active"`（見第 6 節）。

```html
<!-- === Canonical Nav · 以此為準，修改請同步所有標準頁 === -->
<!-- === Source: docs/superpowers/specs/2026-04-22-unified-nav-design.md === -->
<nav>
  <div class="container">
    <a href="index.html" class="nav-logo" aria-label="擎添工業 ChingTech 首頁">
      <img src="images/CTLogo.svg" alt="擎添工業 Logo">擎添工業 ChingTech
    </a>
    <div class="nav-links">
      <a href="ctos-lite.html" data-nav="ctos-lite">擎添助理</a>
      <a href="ching-tech-os.html" data-nav="ching-tech-os">ChingTech OS</a>
      <a href="pricing.html" data-nav="pricing">方案價格</a>
      <a href="contact.html" data-nav="contact">聯絡我們</a>
      <!-- CTA（legal 頁刪除下一行）-->
      <a href="https://line.me/R/ti/p/@285fjkky" target="_blank" rel="noreferrer" class="nav-cta">免費試用</a>
    </div>
  </div>
</nav>
```

### Legal 頁差異

`privacy.html` / `terms.html` / `refund.html` 刪掉 `<a class="nav-cta">` 那一行，
其他完全相同。

---

## 5. 統一版 CSS

8 頁的 `<style>` 內都放下面這段 nav CSS。內容逐字相同、8 頁可 `diff` 驗證無差異。

```css
/* ============================================================
   Canonical Nav · 以此為準，修改請同步所有標準頁
   Source: docs/superpowers/specs/2026-04-22-unified-nav-design.md
   Brand: /home/ct/SDD/brand/docs/02-visual-system.md
   ============================================================ */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: rgba(10, 10, 15, 0.8);           /* ≈ --bg-deeper + alpha */
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
nav .container {
  display: flex; align-items: center; justify-content: space-between;
  height: 64px;
}
.nav-logo {
  display: flex; align-items: center; gap: 10px;
  font-size: 1.05rem; font-weight: 700; letter-spacing: -0.02em;
  text-decoration: none;
  background: linear-gradient(135deg, #0891b2, #22d3ee);  /* brand cyan */
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent; color: transparent;
}
.nav-logo img {
  width: 32px; height: 32px;
  filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.5));   /* brand glow */
}
.nav-links { display: flex; gap: 24px; align-items: center; }
.nav-links a {
  font-size: 0.9rem;
  color: #a0a0a0;                                          /* brand text-caption */
  text-decoration: none;
  transition: color 0.2s;
}
.nav-links a:hover { color: #f5f5f5; }                     /* brand text-strong */
.nav-links a.active { color: #22d3ee; }                    /* brand cyan-bright */

.nav-cta {
  padding: 8px 16px;
  background: #06c755;                                     /* LINE brand green */
  color: #fff !important;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  transition: background 0.2s, transform 0.2s;
}
.nav-cta:hover {
  background: #05b34b;
  transform: translateY(-1px);
  color: #fff !important;
}

@media (max-width: 720px) {
  nav .container { height: 56px; }
  .nav-logo { font-size: 0.95rem; }
  .nav-logo img { width: 28px; height: 28px; }
  .nav-links { gap: 14px; }
  .nav-links a { font-size: 0.8rem; }
  .nav-cta { padding: 6px 12px; font-size: 0.78rem; }
}
```

---

## 6. Active State 對照

每頁在 nav 對應的 `<a>` 上加 `class="active"`（靜態，不用 JS）：

| 頁面 | 要加 active 的 selector | 預期效果 |
|---|---|---|
| `index.html` | （無） | 首頁——logo 本身已代表當前位置 |
| `ctos-lite.html` | `a[data-nav="ctos-lite"]` | 「擎添助理」變 cyan |
| `ching-tech-os.html` | `a[data-nav="ching-tech-os"]` | 「ChingTech OS」變 cyan |
| `pricing.html` | `a[data-nav="pricing"]` | 「方案價格」變 cyan |
| `contact.html` | `a[data-nav="contact"]` | 「聯絡我們」變 cyan |
| `privacy.html` | （無） | Legal 頁不屬於主要 4 項 |
| `terms.html` | （無） | 同上 |
| `refund.html` | （無） | 同上 |

---

## 7. 移除清單（清理舊 CSS）

實作時每頁都要刪掉舊的 nav 相關 CSS，再放新的。舊 selector 清單（全部刪除後以統一版覆蓋）：

- `nav { ... }`
- `nav .container { ... }`
- `.nav-logo { ... }`
- `.nav-logo img { ... }`
- `.nav-links { ... }`
- `.nav-links a { ... }`
- `.nav-links a:hover { ... }`
- `.nav-cta { ... }` / `.nav-cta:hover { ... }`（ctos-lite 內）
- 各頁 `@media (max-width: ...)` 裡跟 nav 有關的 override

**注意**：各頁的 `<style>` 裡可能還有其他 `@media` 跟 nav **無關**的 override（hero、grid 等），**不要動到**，只清 nav 相關的。

---

## 8. 驗收標準

1. 8 個標準頁的 `<nav>...</nav>` 區塊，除了 legal 頁少一行 CTA、以及 active class 的位置，其餘**逐字相同**（可用 `diff` 驗證）。
2. 8 個標準頁 `<style>` 裡的 nav CSS 區塊**逐字相同**（可用 `diff` 驗證）。
3. 用瀏覽器打開每頁，nav 的視覺表現一致：
   - Logo 為 cyan 漸層（非藍紫）
   - Logo 圖有 cyan glow
   - 連結文字 `#a0a0a0`、hover 變白
   - 當前頁的那條連結是 cyan
   - Product 頁右邊有綠色「免費試用」按鈕；legal 頁沒有
4. 在 720px 以下視窗，所有頁 nav 的 mobile 行為一致（logo 縮小、gap 變小、CTA 變小）。
5. `promo.html` / `rotary.html` / `jianlifeng.html` 完全沒動（git diff 為空）。
6. 非 nav 的現有樣式（hero、cards、layout 等）完全沒動。

---

## 9. 不做的事（YAGNI）

- **不**抽 nav 成 JS include / server-side include — 維持純靜態 HTML 每頁自帶；只靠「canonical 註解 + diff 驗證」保持同步。這個 repo 只有 8 頁，沒必要引入 build step。
- **不**做 hamburger menu — 現在 4-5 個項目在 mobile 還塞得下，spec 的 `@media` 已讓它縮。未來項目超過 6 個再做。
- **不**改其他頁面元素（footer、hero、cards 等）。本次只動 nav。
- **不**改動 `promo.html` / `rotary.html` / `jianlifeng.html` 即使它們的「擎添工業 × CTOS」品牌章用法不同 — 那是另一份 spec 的題目。
