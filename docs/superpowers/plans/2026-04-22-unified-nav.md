# 統一版 Nav Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 8 個標準頁的 `<nav>` HTML 與對應 CSS 統一成一份 canonical 版本,並修正 brand 色 drift (logo 漸層藍紫 → brand cyan)。

**Architecture:** 純靜態 HTML,每頁 `<style>` 內嵌 CSS。採「canonical 複製 + 註解標記 + diff 驗證」策略,不引入 build step 或 JS include。8 頁共用同一個 canonical HTML + CSS 片段,legal 3 頁僅少一行 CTA,active class 依所在頁不同。

**Tech Stack:** 純 HTML5 + CSS3,無 build tool。驗證用 `diff` / `grep`。最終用瀏覽器手動驗證視覺。

**Spec:** `docs/superpowers/specs/2026-04-22-unified-nav-design.md`

---

## File Structure

### 會動到的檔案（8 個標準頁,每檔 2 個位置:nav HTML + nav CSS）

| 檔 | 類型 | CTA | Active |
|---|---|---|---|
| `index.html` | Product | ✓ | 無 |
| `ctos-lite.html` | Product | ✓ | `ctos-lite` |
| `ching-tech-os.html` | Product | ✓ | `ching-tech-os` |
| `pricing.html` | Product | ✓ | `pricing` |
| `contact.html` | Product | ✓ | `contact` |
| `privacy.html` | Legal | — | 無 |
| `terms.html` | Legal | — | 無 |
| `refund.html` | Legal | — | 無 |

### 完全不動的檔案
`promo.html`, `rotary.html`, `jianlifeng.html` — 非標準頁,本次 plan **嚴禁修改**。

---

## Canonical Snippets（所有 Task 共用的真相源）

### C1 · Canonical Nav HTML (with CTA, no active)

```html
<!-- === Canonical Nav · 以此為準,修改請同步所有標準頁 === -->
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
      <a href="https://line.me/R/ti/p/@285fjkky" target="_blank" rel="noreferrer" class="nav-cta">免費試用</a>
    </div>
  </div>
</nav>
```

### C2 · Canonical Nav HTML (no CTA, for legal pages)

```html
<!-- === Canonical Nav · 以此為準,修改請同步所有標準頁 === -->
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
    </div>
  </div>
</nav>
```

### C3 · Canonical Nav CSS (identical for all 8 pages)

用 4 空白縮排匹配既有檔案風格。整塊放進 `<style>` 內。

```css
    /* ============================================================
       Canonical Nav · 以此為準,修改請同步所有標準頁
       Source: docs/superpowers/specs/2026-04-22-unified-nav-design.md
       Brand: /home/ct/SDD/brand/docs/02-visual-system.md
       ============================================================ */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(10, 10, 15, 0.8);
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
      background: linear-gradient(135deg, #0891b2, #22d3ee);
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent; color: transparent;
    }
    .nav-logo img {
      width: 32px; height: 32px;
      filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.5));
    }
    .nav-links { display: flex; gap: 24px; align-items: center; }
    .nav-links a {
      font-size: 0.9rem;
      color: #a0a0a0;
      text-decoration: none;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: #f5f5f5; }
    .nav-links a.active { color: #22d3ee; }
    .nav-cta {
      padding: 8px 16px;
      background: #06c755;
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
    /* === End Canonical Nav === */
```

---

## Task 0: Pre-flight Check

**Files:** 無修改,純檢查。

- [ ] **Step 1: 確認工作目錄乾淨**

```bash
cd /home/ct/SDD/ching-tech.github.io
git status --short
```

Expected: 無輸出(clean working tree)。若有未提交變更,先處理或 stash。

- [ ] **Step 2: 確認 spec 存在**

```bash
test -f docs/superpowers/specs/2026-04-22-unified-nav-design.md && echo OK
```

Expected: `OK`

- [ ] **Step 3: 確認 8 個標準檔都存在**

```bash
for f in index.html ctos-lite.html ching-tech-os.html pricing.html contact.html privacy.html terms.html refund.html; do
  test -f "$f" && echo "$f OK" || echo "$f MISSING"
done
```

Expected: 8 行 `... OK`

- [ ] **Step 4: 確認非標準檔存在(之後驗證不動它們)**

```bash
for f in promo.html rotary.html jianlifeng.html; do
  md5sum "$f"
done > /tmp/nochange_checksums.txt
cat /tmp/nochange_checksums.txt
```

Expected: 3 行 checksum,保存到 `/tmp/nochange_checksums.txt` 供最後驗證用。

---

## Task 1: index.html (Product, CTA, no active)

**Files:**
- Modify: `index.html` (nav HTML ~L318-328; nav CSS ~L37-58; @media L263-264)

**Context:** index.html 的 nav 最特殊:logo 是 `<div>` 不是 `<a>`、logo 字級 1.15rem (非 1.05)、gap 28px (非 24)、`.nav-links a { ... }` 屬性分三行排版、`@media (max-width:640px)` 含 2 行 nav-links 規則要刪掉。

- [ ] **Step 1: 讀取當前 nav HTML**

```bash
awk '/<nav>/,/<\/nav>/' index.html
```

預期看到舊版有 `<div class="nav-logo">`(非 `<a>`)、4 項連結,無 CTA。

- [ ] **Step 2: 替換 nav HTML**

用 Edit tool:

old_string:
```
<nav>
  <div class="container">
    <div class="nav-logo"><img src="images/CTLogo.svg" alt="擎添工業 Logo">擎添工業 ChingTech</div>
    <div class="nav-links">
      <a href="ctos-lite.html">擎添助理</a>
      <a href="ching-tech-os.html">ChingTech OS</a>
      <a href="pricing.html">方案價格</a>
      <a href="contact.html">聯絡我們</a>
    </div>
  </div>
</nav>
```

new_string: 套用 **C1 Canonical Nav HTML (with CTA, no active)**(見上方 Canonical Snippets)。index 首頁不加 active class。

- [ ] **Step 3: 替換 nav CSS 主體**

用 Edit tool:

old_string:
```
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
      font-size: 1.15rem; font-weight: 700; letter-spacing: -0.02em;
      background: linear-gradient(135deg, #3882f6, #8b5cf6);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }
    .nav-logo img { width: 32px; height: 32px; }
    .nav-links { display: flex; gap: 28px; }
    .nav-links a {
      font-size: 0.9rem; color: #888; transition: color 0.2s;
    }
    .nav-links a:hover { color: #e0e0e8; }
```

new_string: 套用 **C3 Canonical Nav CSS**(完整塊,含 @media)。

- [ ] **Step 4: 刪除舊 @media 內的 nav 規則**

Edit:

old_string:
```
    @media (max-width: 640px) {
      .nav-links { gap: 16px; }
      .nav-links a { font-size: 0.82rem; }
      section { padding: 64px 0; }
```

new_string:
```
    @media (max-width: 640px) {
      section { padding: 64px 0; }
```

- [ ] **Step 5: 驗證 canonical 標記存在**

```bash
grep -c "Canonical Nav · 以此為準" index.html
```

Expected: `2`(一個在 HTML、一個在 CSS)

- [ ] **Step 6: 驗證舊違規色已消失**

```bash
grep -E "#3882f6|#8b5cf6|gap: 28px|font-size: 1\.15rem" index.html
```

Expected: 無輸出(舊 logo 漸層色、舊大 gap、舊大 logo 字級全部清掉)。

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "$(cat <<'EOF'
feat(nav): index.html 改用 canonical nav,修正 brand 色 drift

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: ctos-lite.html (Product, CTA, active=ctos-lite)

**Files:**
- Modify: `ctos-lite.html` (nav HTML ~L387-399; nav CSS ~L34-60; @media L336-337)

**Context:** ctos-lite 有最多 drift:logo 用絕對 URL、用「企業版」「聯絡」命名、少了自連結、已有舊版 `.nav-cta`(綠色 LINE 按鈕),本次 canonical CSS 會取代掉舊的。`@media (max-width:768px)` 內含 2 行 nav-links 規則要刪。這頁「擎添助理」要加 `class="active"`。

- [ ] **Step 1: 讀取當前 nav**

```bash
awk '/<nav>/,/<\/nav>/' ctos-lite.html
```

- [ ] **Step 2: 替換 nav HTML**

Edit old_string:
```
<nav>
  <div class="container">
    <a href="https://ching-tech.github.io" class="nav-logo">
      <img src="images/CTLogo.svg" alt="擎添工業">擎添工業 ChingTech
    </a>
    <div class="nav-links">
      <a href="ching-tech-os.html">企業版</a>
      <a href="pricing.html">方案價格</a>
      <a href="contact.html">聯絡</a>
      <a href="https://line.me/R/ti/p/@285fjkky" target="_blank" class="nav-cta">免費試用</a>
    </div>
  </div>
</nav>
```

new_string: 套用 C1(with CTA),**但把擎添助理那行改成**:
```
      <a href="ctos-lite.html" data-nav="ctos-lite" class="active">擎添助理</a>
```

完整 new_string:
```
<!-- === Canonical Nav · 以此為準,修改請同步所有標準頁 === -->
<!-- === Source: docs/superpowers/specs/2026-04-22-unified-nav-design.md === -->
<nav>
  <div class="container">
    <a href="index.html" class="nav-logo" aria-label="擎添工業 ChingTech 首頁">
      <img src="images/CTLogo.svg" alt="擎添工業 Logo">擎添工業 ChingTech
    </a>
    <div class="nav-links">
      <a href="ctos-lite.html" data-nav="ctos-lite" class="active">擎添助理</a>
      <a href="ching-tech-os.html" data-nav="ching-tech-os">ChingTech OS</a>
      <a href="pricing.html" data-nav="pricing">方案價格</a>
      <a href="contact.html" data-nav="contact">聯絡我們</a>
      <a href="https://line.me/R/ti/p/@285fjkky" target="_blank" rel="noreferrer" class="nav-cta">免費試用</a>
    </div>
  </div>
</nav>
```

- [ ] **Step 3: 替換 nav CSS 主體**

Edit old_string:
```
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
    .nav-cta {
```

**注意**:old_string 只覆蓋到 `.nav-cta {` 這行**之前**,因為 `.nav-cta` 區段也要一起清掉,但為了讓 Edit 能匹配一段連續字串,我們先讀檔案看 `.nav-cta` 完整內容(下一步)。

- [ ] **Step 3b: 取得 `.nav-cta` 舊 block 完整內容**

```bash
sed -n '/^\s*\.nav-cta\s*{/,/^\s*\.nav-cta:hover/p' ctos-lite.html
# 再多讀一行收尾
awk '/\.nav-cta:hover/{found=1} found{print} found && /^\s*}/{exit}' ctos-lite.html
```

把這整段(從 `.nav-cta {` 到 `.nav-cta:hover { ... }` 結尾 `}`)記下來。

- [ ] **Step 3c: 實際執行替換**

做兩個 Edit:

**Edit A** — 替換 nav 主體 + 舊 `.nav-cta`:

old_string: 合併 Step 3 的 old_string + Step 3b 抓到的 `.nav-cta {...}` + `.nav-cta:hover {...}` 兩段(共從 `nav {` 到 `.nav-cta:hover { ... }` 結尾 `}`)。

new_string: 完整 C3 Canonical Nav CSS 區塊。

**驗證:**
```bash
grep -c "Canonical Nav · 以此為準" ctos-lite.html
```
Expected: `2`

- [ ] **Step 4: 刪除舊 @media 內的 nav 規則**

Edit:

old_string:
```
    @media (max-width: 768px) {
      .nav-links { gap: 14px; }
      .nav-links a { font-size: 0.8rem; }
      section { padding: 64px 0; }
```

new_string:
```
    @media (max-width: 768px) {
      section { padding: 64px 0; }
```

- [ ] **Step 5: 驗證 drift 已清**

```bash
grep -E "#3882f6|#8b5cf6|https://ching-tech.github.io\"" ctos-lite.html
```

Expected: 無輸出。

- [ ] **Step 6: 驗證 active class 位置**

```bash
grep 'data-nav="ctos-lite" class="active"' ctos-lite.html
```

Expected: 1 行。

- [ ] **Step 7: Commit**

```bash
git add ctos-lite.html
git commit -m "$(cat <<'EOF'
feat(nav): ctos-lite.html 改用 canonical nav

統一命名 (企業版→ChingTech OS、聯絡→聯絡我們)、logo
改相對路徑、加 active state、修 brand 色 drift。

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: ching-tech-os.html (Product, CTA, active=ching-tech-os)

**Files:**
- Modify: `ching-tech-os.html` (nav HTML ~L221-231; nav CSS ~L27-45)

**Context:** 這頁是「6 個相似頁」之一,現況 HTML/CSS 基本就是 canonical 模板但差 brand 色跟格式。無 `@media` nav 規則要清。ChingTech OS 連結加 active。

- [ ] **Step 1: 讀取當前 nav**

```bash
awk '/<nav>/,/<\/nav>/' ching-tech-os.html
```

- [ ] **Step 2: 替換 nav HTML**

Edit old_string:
```
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

new_string: 套用 C1,**把 ching-tech-os 那行改成**:
```
      <a href="ching-tech-os.html" data-nav="ching-tech-os" class="active">ChingTech OS</a>
```

完整 new_string:
```
<!-- === Canonical Nav · 以此為準,修改請同步所有標準頁 === -->
<!-- === Source: docs/superpowers/specs/2026-04-22-unified-nav-design.md === -->
<nav>
  <div class="container">
    <a href="index.html" class="nav-logo" aria-label="擎添工業 ChingTech 首頁">
      <img src="images/CTLogo.svg" alt="擎添工業 Logo">擎添工業 ChingTech
    </a>
    <div class="nav-links">
      <a href="ctos-lite.html" data-nav="ctos-lite">擎添助理</a>
      <a href="ching-tech-os.html" data-nav="ching-tech-os" class="active">ChingTech OS</a>
      <a href="pricing.html" data-nav="pricing">方案價格</a>
      <a href="contact.html" data-nav="contact">聯絡我們</a>
      <a href="https://line.me/R/ti/p/@285fjkky" target="_blank" rel="noreferrer" class="nav-cta">免費試用</a>
    </div>
  </div>
</nav>
```

- [ ] **Step 3: 替換 nav CSS**

Edit old_string:
```
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      background: rgba(10, 10, 15, 0.8); backdrop-filter: blur(16px);
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
```

new_string: 完整 C3 Canonical Nav CSS 區塊。

- [ ] **Step 4: 驗證**

```bash
grep -c "Canonical Nav · 以此為準" ching-tech-os.html
grep -E "#3882f6|#8b5cf6" ching-tech-os.html
grep 'data-nav="ching-tech-os" class="active"' ching-tech-os.html
```

Expected: `2`、無輸出、1 行。

- [ ] **Step 5: Commit**

```bash
git add ching-tech-os.html
git commit -m "$(cat <<'EOF'
feat(nav): ching-tech-os.html 改用 canonical nav

加 active state + 修 brand 色 drift。

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: pricing.html (Product, CTA, active=pricing)

**Files:**
- Modify: `pricing.html` (nav HTML ~L221-231; nav CSS ~L26-44)

**Context:** 「6 個相似頁」之一。現況 HTML 跟 ching-tech-os 幾乎一樣(只差 active 位置)。CSS 也一樣。

- [ ] **Step 1: 讀取當前 nav**

```bash
awk '/<nav>/,/<\/nav>/' pricing.html
```

- [ ] **Step 2: 替換 nav HTML**

old_string: 同 Task 3 Step 2 的 old_string(pricing 跟 ching-tech-os 現況逐字相同)。

new_string:
```
<!-- === Canonical Nav · 以此為準,修改請同步所有標準頁 === -->
<!-- === Source: docs/superpowers/specs/2026-04-22-unified-nav-design.md === -->
<nav>
  <div class="container">
    <a href="index.html" class="nav-logo" aria-label="擎添工業 ChingTech 首頁">
      <img src="images/CTLogo.svg" alt="擎添工業 Logo">擎添工業 ChingTech
    </a>
    <div class="nav-links">
      <a href="ctos-lite.html" data-nav="ctos-lite">擎添助理</a>
      <a href="ching-tech-os.html" data-nav="ching-tech-os">ChingTech OS</a>
      <a href="pricing.html" data-nav="pricing" class="active">方案價格</a>
      <a href="contact.html" data-nav="contact">聯絡我們</a>
      <a href="https://line.me/R/ti/p/@285fjkky" target="_blank" rel="noreferrer" class="nav-cta">免費試用</a>
    </div>
  </div>
</nav>
```

- [ ] **Step 3: 替換 nav CSS**

old_string: 同 Task 3 Step 3 的 old_string(pricing/ching-tech-os/terms/refund 的 CSS 都是 compact `rgba(...) backdrop-filter:...` 單行版)。

new_string: 完整 C3 Canonical Nav CSS 區塊。

- [ ] **Step 4: 驗證**

```bash
grep -c "Canonical Nav · 以此為準" pricing.html
grep -E "#3882f6|#8b5cf6" pricing.html
grep 'data-nav="pricing" class="active"' pricing.html
```

Expected: `2`、無輸出、1 行。

- [ ] **Step 5: Commit**

```bash
git add pricing.html
git commit -m "$(cat <<'EOF'
feat(nav): pricing.html 改用 canonical nav

加 active state + 修 brand 色 drift。

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: contact.html (Product, CTA, active=contact)

**Files:**
- Modify: `contact.html` (nav HTML ~L157-167; nav CSS ~L29-48)

**Context:** 「6 個相似頁」之一。但 contact/privacy 的 CSS 稍不同 — `background: rgba(...)` 跟 `backdrop-filter: blur(16px);` 是**分兩行寫**(不同於 pricing 的單行)。

- [ ] **Step 1: 讀取當前 nav**

```bash
awk '/<nav>/,/<\/nav>/' contact.html
```

- [ ] **Step 2: 替換 nav HTML**

old_string: 同 Task 3 Step 2 (contact 跟 ching-tech-os 的 HTML 現況逐字相同)。

new_string:
```
<!-- === Canonical Nav · 以此為準,修改請同步所有標準頁 === -->
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
      <a href="contact.html" data-nav="contact" class="active">聯絡我們</a>
      <a href="https://line.me/R/ti/p/@285fjkky" target="_blank" rel="noreferrer" class="nav-cta">免費試用</a>
    </div>
  </div>
</nav>
```

- [ ] **Step 3: 替換 nav CSS**

Edit old_string(注意 `background:` 跟 `backdrop-filter:` 分兩行):
```
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
```

new_string: 完整 C3 Canonical Nav CSS 區塊。

- [ ] **Step 4: 驗證**

```bash
grep -c "Canonical Nav · 以此為準" contact.html
grep -E "#3882f6|#8b5cf6" contact.html
grep 'data-nav="contact" class="active"' contact.html
```

Expected: `2`、無輸出、1 行。

- [ ] **Step 5: Commit**

```bash
git add contact.html
git commit -m "$(cat <<'EOF'
feat(nav): contact.html 改用 canonical nav

加 active state + 修 brand 色 drift。

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: privacy.html (Legal, no CTA, no active)

**Files:**
- Modify: `privacy.html` (nav HTML ~L121-131; nav CSS ~L29-48)

**Context:** Legal 頁 — 用 **C2 Canonical Nav HTML (no CTA)**。CSS 跟 contact 一樣採分兩行寫法。

- [ ] **Step 1: 讀取當前 nav**

```bash
awk '/<nav>/,/<\/nav>/' privacy.html
```

- [ ] **Step 2: 替換 nav HTML**

old_string: 同 Task 3 Step 2(privacy HTML 現況跟 ching-tech-os 逐字相同)。

new_string: 套用 **C2 Canonical Nav HTML (no CTA)**:
```
<!-- === Canonical Nav · 以此為準,修改請同步所有標準頁 === -->
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
    </div>
  </div>
</nav>
```

- [ ] **Step 3: 替換 nav CSS**

old_string: 同 Task 5 Step 3 的 old_string(privacy 跟 contact 的 CSS 採分兩行寫法逐字相同)。

new_string: 完整 C3 Canonical Nav CSS 區塊(即使 legal 頁不顯示 CTA,`.nav-cta` CSS 仍放著——沒用到就不渲染,未來重排零成本)。

- [ ] **Step 4: 驗證**

```bash
grep -c "Canonical Nav · 以此為準" privacy.html
grep -E "#3882f6|#8b5cf6" privacy.html
grep "nav-cta" privacy.html
```

Expected: `2`、無 drift 色、`nav-cta` 只在 CSS 出現(HTML 不應該出現)。

- [ ] **Step 5: Commit**

```bash
git add privacy.html
git commit -m "$(cat <<'EOF'
feat(nav): privacy.html 改用 canonical nav (無 CTA)

Legal 頁統一結構但不顯示 CTA,讓法律閱讀體驗更單純。

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: terms.html (Legal, no CTA, no active)

**Files:**
- Modify: `terms.html` (nav HTML ~L114-124; nav CSS ~L26-44)

**Context:** Legal。HTML 跟 ching-tech-os 相同;CSS 是 compact 單行版(跟 pricing 相同)。

- [ ] **Step 1: 讀取當前 nav**

```bash
awk '/<nav>/,/<\/nav>/' terms.html
```

- [ ] **Step 2: 替換 nav HTML**

old_string: 同 Task 3 Step 2。

new_string: 同 Task 6 Step 2(**C2 Canonical Nav HTML (no CTA)**)。

- [ ] **Step 3: 替換 nav CSS**

old_string: 同 Task 3 Step 3(terms 的 CSS 是 compact 版,跟 pricing/ching-tech-os/refund 相同)。

new_string: 完整 C3 Canonical Nav CSS 區塊。

- [ ] **Step 4: 驗證**

```bash
grep -c "Canonical Nav · 以此為準" terms.html
grep -E "#3882f6|#8b5cf6" terms.html
grep "nav-cta" terms.html
```

Expected: `2`、無 drift、`nav-cta` 只在 CSS。

- [ ] **Step 5: Commit**

```bash
git add terms.html
git commit -m "$(cat <<'EOF'
feat(nav): terms.html 改用 canonical nav (無 CTA)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: refund.html (Legal, no CTA, no active)

**Files:**
- Modify: `refund.html` (nav HTML ~L127-137; nav CSS ~L26-44)

**Context:** Legal。HTML/CSS 格式跟 terms 相同(compact 版)。

- [ ] **Step 1: 讀取當前 nav**

```bash
awk '/<nav>/,/<\/nav>/' refund.html
```

- [ ] **Step 2: 替換 nav HTML**

old_string: 同 Task 3 Step 2。

new_string: 同 Task 6 Step 2(C2)。

- [ ] **Step 3: 替換 nav CSS**

old_string: 同 Task 3 Step 3。

new_string: 完整 C3 Canonical Nav CSS 區塊。

- [ ] **Step 4: 驗證**

```bash
grep -c "Canonical Nav · 以此為準" refund.html
grep -E "#3882f6|#8b5cf6" refund.html
grep "nav-cta" refund.html
```

Expected: `2`、無 drift、`nav-cta` 只在 CSS。

- [ ] **Step 5: Commit**

```bash
git add refund.html
git commit -m "$(cat <<'EOF'
feat(nav): refund.html 改用 canonical nav (無 CTA)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: 跨檔差異驗證(確認統一)

**Files:** 無修改,純驗證。

這是 spec 驗收標準 #1 + #2:所有 8 頁的 nav HTML(正規化後)、CSS 應逐字相同。

- [ ] **Step 1: 建立輸出目錄**

```bash
mkdir -p /tmp/nav-verify
```

- [ ] **Step 2: 抽出 + 正規化 8 個 nav HTML**

Normalize 規則:移除 `class="active"` 字串、移除含 `class="nav-cta"` 的那一行——讓 8 頁可比較(active 位置不同、legal 少 CTA 行都預期不同,比對的是剩下的結構)。

```bash
cd /home/ct/SDD/ching-tech.github.io
for f in index.html ctos-lite.html ching-tech-os.html pricing.html contact.html privacy.html terms.html refund.html; do
  name="${f%.html}"
  awk '/<nav>/,/<\/nav>/' "$f" \
    | sed 's/ class="active"//g' \
    | grep -v 'class="nav-cta"' \
    > "/tmp/nav-verify/html_${name}.txt"
done
ls -la /tmp/nav-verify/html_*.txt
```

Expected: 8 個檔,每個 > 0 bytes。

- [ ] **Step 3: 確認 8 個 HTML 正規化後全部相同**

```bash
cd /tmp/nav-verify
md5sum html_*.txt
```

Expected: 8 行 md5 **全部一樣**。若有不同,對該檔重跑對應 Task 修正。

- [ ] **Step 4: 抽出 8 個 nav CSS**

```bash
cd /home/ct/SDD/ching-tech.github.io
for f in index.html ctos-lite.html ching-tech-os.html pricing.html contact.html privacy.html terms.html refund.html; do
  name="${f%.html}"
  awk '/Canonical Nav · 以此為準,修改請同步所有標準頁/,/End Canonical Nav/' "$f" \
    > "/tmp/nav-verify/css_${name}.txt"
done
ls -la /tmp/nav-verify/css_*.txt
```

- [ ] **Step 5: 確認 8 個 CSS 全部相同**

```bash
cd /tmp/nav-verify
md5sum css_*.txt
```

Expected: 8 行 md5 **全部一樣**。

- [ ] **Step 6: 確認非標準檔未被動到**

```bash
cd /home/ct/SDD/ching-tech.github.io
md5sum -c /tmp/nochange_checksums.txt
```

Expected: 3 行 `... OK`(promo/rotary/jianlifeng 沒變)。

- [ ] **Step 7: 全面 brand 色 drift 掃描**

```bash
grep -l -E "#3882f6|#8b5cf6" index.html ctos-lite.html ching-tech-os.html pricing.html contact.html privacy.html terms.html refund.html
```

Expected: 無輸出(8 頁都不含藍紫產品色)。

---

## Task 10: 瀏覽器視覺 QA

**Files:** 無修改。

這是 spec 驗收標準 #3 + #4。前面的 diff 驗證了結構一致性,這一步人工確認視覺正確。

- [ ] **Step 1: 啟動本地伺服器**

```bash
cd /home/ct/SDD/ching-tech.github.io
python3 -m http.server 8080 >/tmp/httpd.log 2>&1 &
echo "Server PID: $!"
sleep 1
curl -s http://localhost:8080/index.html | head -3
```

Expected: 看到 `<!DOCTYPE html>` 或類似 HTML 開頭。

- [ ] **Step 2: 8 頁人工檢查清單(桌機視窗)**

瀏覽器打開每一頁,確認:

| 檢查項 | 預期 |
|---|---|
| Logo 字是 cyan 漸層(不是藍紫) | ✓ |
| Logo 圖有淡 cyan 光暈(glow) | ✓ |
| 連結文字 `#a0a0a0`(灰)、hover 變白 | ✓ |
| 當前頁的連結是 cyan(active,不適用 index/legal) | ✓ |
| Product 頁右邊有綠色「免費試用」按鈕 | index/ctos-lite/ching-tech-os/pricing/contact |
| Legal 頁**沒有**「免費試用」按鈕 | privacy/terms/refund |
| 整體 nav 高度、字級在 8 頁一致 | ✓ |

逐頁打開:
- http://localhost:8080/index.html
- http://localhost:8080/ctos-lite.html
- http://localhost:8080/ching-tech-os.html
- http://localhost:8080/pricing.html
- http://localhost:8080/contact.html
- http://localhost:8080/privacy.html
- http://localhost:8080/terms.html
- http://localhost:8080/refund.html

- [ ] **Step 3: Mobile 斷點檢查**

開瀏覽器 DevTools,切到 375px 寬視窗(iPhone SE 級),重新打開上述 8 頁。確認:

| 檢查項 | 預期 |
|---|---|
| nav 高度縮為 56px | ✓ |
| Logo 字縮為 0.95rem | ✓ |
| Logo 圖縮為 28×28 | ✓ |
| 連結 gap 14px,字 0.8rem | ✓ |
| CTA(有的頁面)變小 padding | ✓ |
| 8 頁 mobile 表現完全一致 | ✓ |

- [ ] **Step 4: 非標準頁回歸確認**

打開下列 3 頁,確認它們長相**沒變**(跟 task 執行前一模一樣):
- http://localhost:8080/promo.html
- http://localhost:8080/rotary.html
- http://localhost:8080/jianlifeng.html

- [ ] **Step 5: 關閉本地伺服器**

```bash
pkill -f "python3 -m http.server 8080" 2>/dev/null
echo "Server stopped"
```

- [ ] **Step 6: 最終 git 狀態檢查**

```bash
cd /home/ct/SDD/ching-tech.github.io
git status
git log --oneline -12
```

Expected:
- 工作區 clean
- 最上面 8 個 commit 分別對應 Task 1–8
- 再上面是「加入 spec」的 commit

---

## 自我檢核紀錄

### Spec coverage
- Spec §2 範圍(8 頁 + 排除 3 頁) → Task 1-8 + Task 0 Step 4 + Task 9 Step 6 ✓
- Spec §3 設計決策(命名/CTA/logo 色/圖示 glow/文字色/logo 連結/canonical 標記) → 全部由 C1/C2/C3 落實 ✓
- Spec §4 HTML → C1 (product) + C2 (legal) ✓
- Spec §5 CSS → C3 ✓
- Spec §6 Active State → Task 2/3/4/5 分別加 active,index/legal 不加 ✓
- Spec §7 清舊 CSS → 每個 task 的 Step 3(+ Task 1/2 的 @media 清理) ✓
- Spec §8 驗收 #1/#2(diff) → Task 9 ✓
- Spec §8 驗收 #3/#4(視覺) → Task 10 ✓
- Spec §8 驗收 #5(非標準頁不動) → Task 0 Step 4 + Task 9 Step 6 ✓
- Spec §8 驗收 #6(非 nav 樣式不動) → 每個 task 的 Edit old_string 都只鎖定 nav 區塊;Task 10 Step 4 回歸確認 ✓

### Placeholder scan
全部 Task 都有 exact old_string / new_string / 命令。無 "TBD" / "similar to" / 空殼。

### Type / 命名一致性
- canonical 註解文字 8 處皆為 `Canonical Nav · 以此為準`(Task 9 Step 2/Step 4 依此 grep)✓
- active class 名固定為 `active`(非 `active-link` 之類)✓
- data-nav 值跟 href 檔名對齊(`ctos-lite` / `ching-tech-os` / `pricing` / `contact`)✓

---

**總 commit 數:** 8(每頁 1 個)+ 0(Task 0/9/10 不產生 commit)= **8 commit**
**預計執行時間:** 純手動約 30-40 分鐘(不含視覺 QA 走過 8 頁)
