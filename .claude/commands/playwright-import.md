---
description: Pixel-perfect clone of a live webpage into an Ahoy-based prototype page. Landmark-scoped per-region extraction, stylesheet analysis (hover + media + authored grid specs), cell-state signatures, pseudo-element capture, sticky/scroll detection, and a structured custom-component report. Every visual value is token-matched; every novel pattern is catalogued for spec creation.
argument-hint: "\"<URL>\" [\"natural language action to perform first\"]"
allowed-tools: Bash Glob Grep Read Write Edit AskUserQuestion Skill mcp__playwright__browser_navigate mcp__playwright__browser_navigate_back mcp__playwright__browser_snapshot mcp__playwright__browser_evaluate mcp__playwright__browser_take_screenshot mcp__playwright__browser_click mcp__playwright__browser_hover mcp__playwright__browser_wait_for mcp__playwright__browser_resize mcp__playwright__browser_network_requests mcp__playwright__browser_console_messages mcp__playwright__browser_press_key
---

`$ARGUMENTS` contains the source URL and an optional browser action. Format: `"URL"` or `"URL" "action description"`.

**Argument parsing:**
- Quoted strings: first = URL, second = action.
- Unquoted: first whitespace-delimited token = URL, remainder = action.
- If no URL parseable: ask the user and stop.

> **Pixel-perfect promise.** Customer-facing prototypes demand that every visible detail is reproduced. This command extracts by **landmark-scoped regions** (not one global 250-node cap), reads `document.styleSheets` directly (capturing `:hover` rules, media queries, and authored `grid-template-columns`), detects **cell-state signatures** in tables (overbooked underlines, weekend stripes, disabled cells), captures full `::before`/`::after` pseudo-elements, logs sticky/scrollable regions, and emits a **structured custom-component report** for every pattern that doesn't map to an existing Ahoy spec — so new specs can be written in the same session. Nothing is silently dropped.

---

## Step 1 — Navigate and prepare

### 1a. Resize and navigate
Call `browser_resize` → `{ width: 1440, height: 900 }` (canonical design viewport). Then `browser_navigate` → parsed URL.

### 1b. Multi-signal auth guard
Parallel checks after navigate:
1. `browser_snapshot` — scan for password textbox, "Sign in / Log in / Wachtwoord / Authentication required" text, or email+password form pair.
2. `browser_evaluate` → `"location.href"` — check for `/login`, `/signin`, `/auth`, `/session/new`, `?redirect=`, `?intended=`.
3. `browser_console_messages { level: "error" }` — scan for 401/403 strings.

If any fires, print the auth-required message and **stop**:

```
⚠️  Login required

The page redirected to a login screen. Please:
1. Find the Playwright browser window (check your Dock or taskbar)
2. Log in manually in that browser
3. Re-run this command once you're logged in

The Playwright MCP session is persistent — your login will be remembered.
```

### 1c. Perform action (if provided)
1. Use the snapshot from 1b.
2. Match the element whose accessible name + role best matches the description.
3. `browser_click` with that `ref`.
4. `browser_wait_for` expected post-action text, or 2s.
5. No match → list top 3 candidates and ask.

### 1d. Settle and verify
`browser_evaluate` → `document.readyState === "complete"`. Then `browser_wait_for` any landmark heading text. 3 retries; report degraded state if still loading.

---

## Step 2 — Landmark detection (region map)

Before any extraction, identify the **page's region tree**. This replaces the single global content-region lookup with a **multi-region map**, so each region gets its own extraction call with its own node budget.

Call `browser_evaluate`:

```js
(function(){
  var LANDMARK_SELECTORS = [
    { key: 'topbar',    sel: 'header, [role="banner"], .app-topbar, .topbar, nav[aria-label*="top"]' },
    { key: 'sidenav',   sel: 'aside, [role="navigation"], .sidebar, .sidenav, nav[aria-label*="main"]' },
    { key: 'main',      sel: 'main, [role="main"], #content, .main-content, .page-content' },
    { key: 'toolbar',   sel: '[role="toolbar"], .toolbar, .filters, .page-header__actions, [class*="header__"]' },
    { key: 'grid',      sel: 'main table, main [role="grid"], main [role="table"], .data-grid, .calendar-grid' },
    { key: 'list',      sel: 'main ul[role="list"], main ol[role="list"], main .list' },
    { key: 'footer',    sel: 'footer, [role="contentinfo"]' },
    { key: 'pagination',sel: '[role="navigation"][aria-label*="pag"], .pagination' },
  ];
  var landmarks = {};
  LANDMARK_SELECTORS.forEach(function(item){
    try {
      var el = document.querySelector(item.sel);
      if (!el) return;
      var r = el.getBoundingClientRect();
      if (r.width < 10 || r.height < 10) return;
      var cs = window.getComputedStyle(el);
      landmarks[item.key] = {
        selector: item.sel.split(',')[0].trim(),
        tag: el.tagName.toLowerCase(),
        rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) },
        display: cs.display,
        position: cs.position,
        overflow: cs.overflow,
        overflowY: cs.overflowY
      };
    } catch(e){}
  });
  return JSON.stringify({
    viewport: { w: window.innerWidth, h: window.innerHeight, scroll: document.body.scrollHeight },
    landmarks: landmarks
  });
})()
```

Record as `LANDMARKS`. For the source page we care about, it typically contains at least `{ main, toolbar, grid }` — these are the extraction targets for Step 3c.

---

## Step 3 — Deep extraction (per-region, parallel)

All extractions below are scoped to a specific landmark. Per-region node budgets are **independent** so dense grids don't cannibalize the budget for toolbars.

| Region | Node budget | Sampling strategy |
|---|---|---|
| `topbar` | 30 | full |
| `toolbar` / header controls | 50 | full |
| `sidenav` | 60 | full (once per session — skip if matches local sidebar) |
| `main` (non-grid body) | 150 | full within `main` excluding `grid` subtree |
| `grid` | 200 | **sampled** — headers + first 3 rows + 1 row per distinct state class + last row |
| `list` / cards | 150 | full if <150 items; otherwise fingerprint + sample 5 per unique fingerprint |
| `pagination` / footer | 30 | full |

Total typical budget: **600–750 nodes** across multiple scoped calls. This is what replaces the old global `MAX_NODES=250`.

### 3a. Scoped ARIA snapshot
`browser_snapshot` on the main content region. Record as `CONTENT_ARIA`. In AI mode this surfaces:
- `[ref=eN]` interactable elements
- `[cursor=pointer]` custom click targets
- `[checked]`, `[disabled]`, `[expanded]`, `[selected]`, `[active]`, `[level=N]`, `[pressed]`

### 3b. Stylesheet analysis (authored rules — NEW)

`computedStyle` can't see `:hover` rules, media queries, or authored `grid-template-columns` (all `fr` → resolved px). Direct parsing of `document.styleSheets` fills these gaps. CORS blocks cross-origin sheets — catch and skip silently.

```js
(function(){
  var hoverRules = [];
  var mediaRules = [];
  var gridRules = {};
  var animationRules = [];
  try {
    for (var i = 0; i < document.styleSheets.length; i++) {
      var sheet = document.styleSheets[i]; var rules;
      try { rules = sheet.cssRules || sheet.rules; } catch(e) { continue; }
      for (var j = 0; j < rules.length; j++) {
        var rule = rules[j];
        if (rule instanceof CSSMediaRule) {
          mediaRules.push({ media: rule.media.mediaText, ruleCount: rule.cssRules.length });
        } else if (rule instanceof CSSKeyframesRule) {
          animationRules.push({ name: rule.name });
        } else if (rule instanceof CSSStyleRule && rule.selectorText) {
          if (rule.selectorText.indexOf(':hover') !== -1 && hoverRules.length < 80) {
            hoverRules.push({
              selector: rule.selectorText,
              bg: rule.style.backgroundColor || null,
              color: rule.style.color || null,
              border: rule.style.border || rule.style.borderColor || null,
              boxShadow: rule.style.boxShadow || null,
              transform: rule.style.transform || null,
              opacity: rule.style.opacity || null
            });
          }
          if (rule.style.gridTemplateColumns || rule.style.gridTemplateRows) {
            gridRules[rule.selectorText] = {
              cols: rule.style.gridTemplateColumns,
              rows: rule.style.gridTemplateRows,
              autoRows: rule.style.gridAutoRows,
              gap: rule.style.gap || rule.style.gridGap
            };
          }
        }
      }
    }
  } catch(e){}
  return JSON.stringify({ hoverRules, mediaRules, gridRules, animationRules });
})()
```

Record as `STYLESHEET_ANALYSIS`.

### 3c. Per-region computed-style trees

Call `browser_evaluate` **once per region** with this script, passing the region's selector. Each call has its own budget.

```js
(function(sel, maxNodes){
  var STYLE_PROPS = [
    'display','position','top','right','bottom','left','float','clear',
    'flexDirection','flexWrap','flex','flexGrow','flexShrink','flexBasis',
    'justifyContent','alignItems','alignSelf','alignContent',
    'gap','rowGap','columnGap',
    'gridTemplateColumns','gridTemplateRows','gridAutoRows','gridAutoColumns','gridColumn','gridRow','gridArea',
    'paddingTop','paddingRight','paddingBottom','paddingLeft',
    'marginTop','marginRight','marginBottom','marginLeft',
    'width','height','minWidth','maxWidth','minHeight','maxHeight',
    'backgroundColor','backgroundImage','backgroundPosition','backgroundSize','backgroundRepeat','backgroundClip',
    'color',
    'borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth',
    'borderTopColor','borderRightColor','borderBottomColor','borderLeftColor',
    'borderTopStyle','borderRightStyle','borderBottomStyle','borderLeftStyle',
    'borderRadius','borderTopLeftRadius','borderTopRightRadius','borderBottomLeftRadius','borderBottomRightRadius',
    'boxShadow','opacity','filter','backdropFilter','transform','transformOrigin',
    'fontFamily','fontSize','fontWeight','fontStyle','fontVariant',
    'lineHeight','letterSpacing','wordSpacing',
    'textAlign','textTransform','textDecoration','textDecorationColor','textDecorationStyle','textDecorationLine','textDecorationThickness','textUnderlineOffset',
    'textIndent','textOverflow','whiteSpace','wordBreak','overflowWrap','verticalAlign',
    'cursor','pointerEvents',
    'zIndex','overflow','overflowX','overflowY',
    'outlineWidth','outlineColor','outlineStyle','outlineOffset',
    'transition','animation',
    'visibility','boxSizing'
  ];
  var root = document.querySelector(sel) || document.body;
  var nodes = [];
  function num(v){ var n=parseFloat(v); return isNaN(n)?0:Math.round(n); }
  function pseudo(el, which){
    var cs = window.getComputedStyle(el, which);
    var c = cs.content;
    if (!c || c === 'none' || c === 'normal' || c === '""' || c === "''") return null;
    return {
      content: c, display: cs.display, position: cs.position,
      width: cs.width, height: cs.height, top: cs.top, left: cs.left, right: cs.right, bottom: cs.bottom,
      bg: cs.backgroundColor, color: cs.color, backgroundImage: cs.backgroundImage,
      borderBottom: cs.borderBottomWidth !== '0px' ? cs.borderBottomWidth + ' ' + cs.borderBottomStyle + ' ' + cs.borderBottomColor : null,
      borderRadius: cs.borderRadius, fontSize: cs.fontSize, transform: cs.transform, opacity: cs.opacity
    };
  }
  function fp(el){
    var parts = [el.tagName];
    for (var i = 0; i < el.children.length && i < 6; i++) parts.push(el.children[i].tagName);
    return parts.join('>');
  }
  function visit(el, depth, parentIdx){
    if (nodes.length >= maxNodes) return;
    var cs = window.getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    var r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    var styles = {};
    for (var k = 0; k < STYLE_PROPS.length; k++) styles[STYLE_PROPS[k]] = cs[STYLE_PROPS[k]];
    var hasSvgChild = el.querySelector ? !!el.querySelector(':scope > svg') : false;
    var textNode = el.childNodes.length > 0 && Array.prototype.every.call(el.childNodes, function(n){ return n.nodeType === 3 || (n.nodeType === 1 && n.tagName === 'BR'); });
    var myIdx = nodes.length;
    nodes.push({
      i: myIdx, parent: parentIdx, depth: depth,
      tag: el.tagName.toLowerCase(), id: el.id || null,
      classes: Array.prototype.slice.call(el.classList).slice(0, 10),
      role: el.getAttribute('role') || null,
      ariaLabel: el.getAttribute('aria-label') || null,
      ariaExpanded: el.getAttribute('aria-expanded') || null,
      ariaChecked: el.getAttribute('aria-checked') || null,
      ariaSelected: el.getAttribute('aria-selected') || null,
      href: el.getAttribute('href') || null, type: el.getAttribute('type') || null,
      placeholder: el.getAttribute('placeholder') || null, alt: el.getAttribute('alt') || null,
      text: textNode ? (el.textContent || '').trim().slice(0, 160) : null,
      rect: { x: num(r.x), y: num(r.y), w: num(r.width), h: num(r.height), fw: r.width, fh: r.height },
      childCount: el.children.length, fp: fp(el),
      before: pseudo(el, '::before'), after: pseudo(el, '::after'),
      hasSvgChild: hasSvgChild,
      styles: styles
    });
    for (var c = 0; c < el.children.length; c++) visit(el.children[c], depth + 1, myIdx);
  }
  visit(root, 0, -1);
  return JSON.stringify({ selector: sel, count: nodes.length, nodes: nodes });
}).call(null, /*SELECTOR*/ 'main', /*MAX_NODES*/ 150)
```

> Pass `selector` + `maxNodes` for each region. Budgets per Section 3: topbar=30, toolbar=50, main=150, grid=200, list=150, footer=30.

Parse each call result and merge into `DOM_IR` with a `region` tag on each node. Total nodes: 600–750.

### 3d. CSS custom properties
(Unchanged — same as before.) Capture all `--*` vars from `:root` via `getComputedStyle(document.documentElement)`. Store as `SOURCE_TOKENS`.

### 3e. Cell-state signature detection (for tables — NEW)

If `LANDMARKS.grid` was found, extract the **cell-state vocabulary**: every distinct cell visual configuration (overbooked, weekend, disabled, today, normal). Each unique signature becomes a conditional CSS class in generated code.

```js
(function(gridSel){
  var grid = document.querySelector(gridSel);
  if (!grid) return null;
  var cells = grid.querySelectorAll('td, th, [role="gridcell"], [role="columnheader"]');
  var stateMap = {};
  for (var i = 0; i < Math.min(cells.length, 500); i++) {
    var cell = cells[i];
    var cs = window.getComputedStyle(cell);
    var before = window.getComputedStyle(cell, '::before');
    var after = window.getComputedStyle(cell, '::after');
    var svgCount = cell.querySelectorAll('svg').length;
    var key = [
      cs.backgroundColor,
      cs.backgroundImage !== 'none' ? 'bgImg' : '',
      cs.opacity,
      before.content !== 'none' ? 'before:' + before.content + ':' + before.backgroundColor : '',
      after.content !== 'none' ? 'after:' + after.content + ':' + after.backgroundColor : '',
      cs.borderBottomColor + ':' + cs.borderBottomWidth,
      svgCount > 0 ? 'svg:' + svgCount : ''
    ].filter(Boolean).join('|');
    if (!stateMap[key]) {
      var r = cell.getBoundingClientRect();
      stateMap[key] = {
        count: 0,
        classes: Array.prototype.slice.call(cell.classList),
        backgroundColor: cs.backgroundColor,
        backgroundImage: cs.backgroundImage,
        opacity: cs.opacity,
        border: { bottom: cs.borderBottom, top: cs.borderTop, color: cs.borderBottomColor },
        before: before.content !== 'none' ? { content: before.content, bg: before.backgroundColor, h: before.height } : null,
        after: after.content !== 'none' ? { content: after.content, bg: after.backgroundColor, h: after.height } : null,
        svgCount: svgCount,
        sampleRect: { w: Math.round(r.width), h: Math.round(r.height) },
        sampleText: (cell.textContent || '').trim().slice(0, 40)
      };
    }
    stateMap[key].count++;
  }
  return JSON.stringify(stateMap);
})(/*GRID_SELECTOR*/ 'main table')
```

Record as `CELL_STATES`. Each entry becomes a `<td className="{state-class}">` variant in generated JSX.

### 3f. Sticky, scroll, and virtual-list detection (NEW)

Critical for preserving layout intent.

```js
(function(mainSel){
  var root = document.querySelector(mainSel) || document.body;
  var sticky = [], scrollable = [], virtualLists = [];
  var all = root.querySelectorAll('*');
  for (var i = 0; i < Math.min(all.length, 400); i++) {
    var el = all[i];
    var cs = window.getComputedStyle(el);
    if (cs.position === 'sticky' || cs.position === '-webkit-sticky') {
      var r = el.getBoundingClientRect();
      sticky.push({ tag: el.tagName.toLowerCase(), classes: Array.prototype.slice.call(el.classList).slice(0,3), top: cs.top, rect: { w: Math.round(r.width), h: Math.round(r.height) }});
    }
    var ox = cs.overflowX, oy = cs.overflowY;
    if ((ox === 'auto' || ox === 'scroll' || oy === 'auto' || oy === 'scroll') && (el.scrollHeight > el.clientHeight + 2 || el.scrollWidth > el.clientWidth + 2)) {
      scrollable.push({ tag: el.tagName.toLowerCase(), classes: Array.prototype.slice.call(el.classList).slice(0,3), overflowX: ox, overflowY: oy, clientH: el.clientHeight, scrollH: el.scrollHeight, clientW: el.clientWidth, scrollW: el.scrollWidth });
    }
  }
  return JSON.stringify({ sticky, scrollable, virtualLists });
})(/*MAIN_SELECTOR*/ 'main')
```

Record as `STRUCTURE`. Generated JSX will use `position: sticky; top: {value}` and `overflow-y: auto` accordingly.

### 3g. SVG / icon inventory + path fingerprint

Capture every inline SVG in the content with enough detail to match against Ahoy icons (see Step 5 dictionary).

```js
(function(mainSel){
  var root = document.querySelector(mainSel) || document.body;
  var svgs = root.querySelectorAll('svg');
  var items = [];
  for (var i = 0; i < Math.min(svgs.length, 80); i++) {
    var s = svgs[i];
    var r = s.getBoundingClientRect();
    var p = s.parentElement;
    var paths = s.querySelectorAll('path');
    var pathData = Array.prototype.map.call(paths, function(pa){ return (pa.getAttribute('d') || '').slice(0,100); }).join('|');
    items.push({
      w: Math.round(r.width), h: Math.round(r.height),
      aria: s.getAttribute('aria-label'),
      title: (s.querySelector('title')||{}).textContent || null,
      role: s.getAttribute('role'),
      parentTag: p && p.tagName,
      parentText: p ? (p.textContent||'').trim().slice(0,40) : '',
      pathFingerprint: pathData.slice(0, 200),
      innerHTML: s.innerHTML.slice(0, 500)
    });
  }
  return JSON.stringify({ count: svgs.length, items });
})(/*MAIN_SELECTOR*/ 'main')
```

Record as `ICONS`.

### 3h. Network and data shape
`browser_network_requests { filter: "/api|/graphql|\\.json", static: false, requestBody: false, requestHeaders: false }`. Extract request URLs → infer data shape for realistic mock data. Store as `API_SHAPE`.

### 3i. Screenshots — multi-region
1. Full viewport: `playwright-reference-viewport.png`
2. Full page: `playwright-reference-full.png`
3. **Per-region crops** (Optional but recommended for complex pages) — use `browser_take_screenshot` with the element `ref` from the ARIA snapshot for each major landmark (toolbar, grid, etc.). This makes iteration feedback sharper.

---

## Step 4 — Token match every extracted value

Identical to prior version. Token tables are fixed and baked in here for reference:

**Spacing (px → token):**
```
3→--space-1  5→--space-xxs  6→--space-2  8→--space-3  10→--space-xs-alt  12→--space-4
16→--space-icon  18→--space-5  20→--space-mobile  22→--space-icon-lg  24→--space-6
25→--space-gap-lg  32→--space-section  36→--space-7  48→--space-8  72→--space-9  88→--space-spacer
```
Snap ±2px. Unmatched = raw px + `__unmatched: true` flag.

**Radius:** `2→--radius-sm, 4→--radius-md, 5→--radius-counter, 6→--radius-link, 8→--radius-lg, 50%→--radius-round`.
**Font size:** `12→xs, 14→sm, 16→base, 18→lg, 24→xl` (exact ±0.5px).
**Font weight:** `400/500/600/700 → regular/medium/semibold/bold`.

**Color buckets:**
- Text: `--color-text` (dark) or `--color-text-subtle` (gray)
- Surface: `--color-surface` (white), `--color-bg` (neutral page), `--color-link-bg` (neutral hover tint)
- Border: `--color-border`
- Accent/CTA: `--color-accent` (mint/teal)
- Link: `--color-link`
- Status: `--color-error`, `--color-success`, `--color-warning`
- Nav: `--color-nav-bg`, `--color-nav-item-hover`, `--color-nav-item-active`, `--color-nav-item-active-hover`

Walk `DOM_IR.nodes`. Replace `.styles` with `.tokens` (matched token name or raw value + `__unmatched: true`). Build `TOKEN_IR`.

### 4c. Density measurement (measured, not eyeballed)
Measure `gap`/`padding` on the primary content container + its direct children. Map:
- `--space-2` (6px) → `gap={2}` compact
- `--space-4` (12px) → `gap={3}` normal
- `--space-6` (24px) → `gap={5}` spacious

Record density tier + Ahoy-prop + CSS-var.

---

## Step 5 — Component classification + Ahoy icon dictionary

### 5a. Deterministic matches (unchanged)

| Signal | Ahoy |
|---|---|
| `tag==='button'` / `role==='button'` | `Button` |
| `tag==='input'` + type text/email/number/search/tel/url | `Input` |
| `tag==='input'` + type=checkbox | `Checkbox` |
| `tag==='input'` + type=radio | `Radio` |
| `tag==='select'` / `role==='combobox'` | `Select` |
| `role==='switch'` | `Toggle` |
| `role==='tab'` | `Tab` |
| `role==='dialog'`/`alertdialog` | `Dialog` |
| `tag==='table'` | plain `<table>` (DataGrid excluded) |
| `role==='alert'`/`status` inline | `Banner` / `Message` |
| `role==='progressbar'` with value | `LoadingElement` |
| `role==='progressbar'` without value | `LoadingBar` |
| `tag==='a'` with href, no child heading | `Link` |
| `role==='heading'` + level | `Heading{N}` |
| `tag==='nav'` with list | `Menu` |

### 5b. Signal-scored matches (unchanged)
StatusLabel / Badge / Tag / Avatar / Icon / Card-Widget-Island / custom-Button / LabelValuePair / Counter / EmptyState / Pagination / ButtonGroup — same weighted scoring as prior version.

### 5c. Repeated-pattern detection
Containers with 3+ children sharing a fingerprint → extract to named sub-component + `.map()`.

### 5d. Spec validation
Try `specs/atoms/{name}.md` → `specs/molecules/` → `specs/organisms/`. If no match, flag `no-spec`. If no Ahoy fit, flag `no-ahoy` → emit to Custom Component Report (Step 7).

### 5e. Ahoy icon dictionary (preset knowledge — NEW)

When source SVGs need mapping, use this dictionary. Size = element `w`/`h`. Name = match by semantic context (parent element text, role, adjacent elements).

**Navigation & expansion**
- Chevron down/up/left/right → `14X14ChevronDownOutline` / `UpOutline` / `LeftOutline` / `RightOutline`
- Double chevron → `14X14ChevronDoubleDownOutline` / `DoubleRightOutline`
- Arrow → `14X14ArrowDownOutline` / `UpOutline` / `LeftOutline` / `RightOutline`

**Status / disabled / blocked (CRITICAL for grids)**
- "Blocked / no availability / prohibited" circle-slash → **`24X24BlockOutline`** (or 14X14 variant if available)
- Disabled checkmark → `VerifiedDisabledOutline`
- Hidden / invisible → `VisibleOffOutline`

**Grid / table / stepper controls**
- `+` stepper → `14X14AddOutline`
- `−` stepper → `14X14MinusOutline`
- Sort → `14X14SortOutline`
- Filter → `14X14FilterOutline`
- Drag handle → `14X14GrabOutline`
- Resize → `14X14ResizeHandle`

**Time & scheduling**
- Clock → `ClockOutline` / `ClockFilled` (size context: 14X14 inline, 24X24 toolbar)
- Calendar → `CalendarFilled` / `CalendarOutline` / `CalendarTodayOutline`
- Timer → `TimerFilled` / `TimerOutline`

**User / team**
- User silhouette → `UserOutline` / `UserFilled`
- Team → `TeamOutline` / `TeamFilled`
- Add user → `UserAddOutline`

**Statistics**
- Bar graph → `GraphBarOutline`
- Line graph → `GraphLineOutline`
- Pie → `GraphPieOutline`
- Stats → `StatsFilled` / `StatsOutline`

**Actions**
- Settings → `SettingsFilled` / `24X24SettingsFilled`
- Add → `AddOutline` at relevant size
- Close → `CloseCrossOutline`
- Search → `SearchOutline`
- Notification → `BellFilled` / `BellOutline`

Full icon list: `/Users/gilles/Coding/Teamleader/design-specs/prototype/node_modules/@teamleader/ahoy/dist/es/assets/icons/components/`. Check **14X14** and **24X24** prefixes. Do not invent names — verify by listing the directory first.

---

## Step 6 — Layout template decision
(Unchanged — OverviewPage / DetailPage / custom.)

### 6d. Page metadata
- pageName: last non-empty PascalCase segment
- routePath: last segment with leading slash
- replacesPlaceholder: check against sidebar placeholder routes

---

## Step 7 — Custom component report (NEW)

For every pattern flagged `no-ahoy` or structurally novel, emit a structured entry. The full report is written to `.playwright-import/custom-components.json` so the user can review and generate new specs after the import.

Build an array like:

```json
{
  "generatedAt": "{iso8601}",
  "sourceUrl": "{url}",
  "pageName": "{pageName}",
  "summary": { "total": 0, "needsSpecSheet": 0, "canUseAhoyWithCSS": 0 },
  "components": [
    {
      "id": "cc-001",
      "suggestedName": "CapacityCell",
      "confidence": "high",
      "occurrences": 140,
      "sourceSelector": "td.capacity",
      "boundingBox": { "x": 144, "y": 200, "w": 80, "h": 40 },
      "childrenSummary": "Two text spans (booked/available), optional disabled SVG, optional ::after underline",
      "tokenMap": {
        "backgroundColor": "--color-surface",
        "fontSize": "--font-size-sm",
        "borderBottomColor (overbooked)": "--color-error",
        "borderBottomWidth (overbooked)": "2px (raw — custom underline)"
      },
      "dominantPattern": "Fixed-width cell showing Xh/Yh with conditional overbooked underline + weekend diagonal stripes + disabled icon",
      "states": ["default", "overbooked", "weekend", "disabled", "today-column"],
      "screenshotRef": "custom-cc-001-CapacityCell.png",
      "ahoyAlternative": null,
      "specAction": "CREATE_SPEC",
      "suggestedSpecPath": "specs/molecules/capacity-cell.md",
      "implementationNote": "Render as <td> with class modifiers. Use ::after pseudo for overbook underline. Use 24X24BlockOutline icon for disabled state."
    }
  ]
}
```

Each entry comes from Step 5d (`no-ahoy` flag) AND from cell-state signatures (3e) where `count >= 3`.

Print a concise summary in the plan (Step 8); write the full JSON to `.playwright-import/custom-components-{pageName}.json`.

---

## Step 8 — Plan review and approval

Present as Markdown. Include:

```
## Playwright Import Plan

**Source URL:** {url}
**Landmarks found:** {list of keys from Step 2, with rects}
**Page name:** {pageName}Page
**Route:** {routePath} (replaces placeholder: yes/no)
**Layout:** OverviewPage | DetailPage | custom({pattern})
**Density (measured):** compact | normal | spacious — gap={N}, padding={N}

### Extraction summary
| Region | Nodes extracted | Budget | Truncated? |
|---|---|---|---|
| topbar | X | 30 | no |
| toolbar | X | 50 | no |
| main | X | 150 | no |
| grid | X | 200 | yes (sampled) |

### Stylesheet analysis
- Hover rules captured: N
- Media queries captured: M
- Authored grid specs: K

### Cell-state vocabulary (if grid page)
| State signature | Count | Classes | Proposed CSS class |
|---|---|---|---|
| default | 100 | (none) | .cell |
| overbooked | 14 | "overbooked" | .cell--overbooked |
| weekend | 40 | "weekend" | .cell--weekend |
| disabled | 80 | "disabled" | .cell--disabled |

### Structural findings
- Sticky: {N elements — e.g. grid header, toolbar}
- Scrollable: {N regions}
- Virtual list: {yes/no}

### Hierarchy outline (from TOKEN_IR)
```
{tree output}
```

### Component mapping (spec-validated)
{table with Source → Ahoy → Signal → Spec columns, plus icon mappings}

### Custom components identified
**{N} new patterns flagged — will be written to `.playwright-import/custom-components-{pageName}.json`.**
| ID | Name | Occurrences | Action | Proposed spec path |
|---|---|---|---|---|
| cc-001 | CapacityCell | 140 | CREATE_SPEC | specs/molecules/capacity-cell.md |
| cc-002 | UserCapacityRow | 20 | CREATE_SPEC | specs/molecules/user-capacity-row.md |

### Token normalization
- Unmatched colors: N
- Unmatched spacing: N
- Icons mapped: N (see list below — verify against Ahoy icon directory)

### Files to write
- prototype/src/pages/{pageName}.tsx
- prototype/src/pages/{pageName}.css
- prototype/src/App.tsx (edit)
- .playwright-import/custom-components-{pageName}.json (custom component report)
```

Use `AskUserQuestion`:
- `Looks good — write the files`
- `I have a correction`

If corrected, re-plan and re-present. Do not write files until explicit approval.

---

## Step 9 — Generate the prototype page

### 9a. Read existing files in parallel
`prototype/src/App.tsx`, `prototype/src/components/Sidebar.tsx`.

### 9b. Write `{pageName}.tsx`
Follow spec Anatomy for every matched component. **Apply cell-state signatures** from Step 3e as className modifiers. **Use the icon dictionary** from Step 5e — verify icon names exist on disk before importing. Render repeated patterns via `.map()` sub-components.

Rules:
- Direct Ahoy imports only (no barrel).
- `level="primary"` explicit on mint CTAs.
- Static mock data.
- Tables: plain `<table>/<thead>/<tbody>/<tr>/<th>/<td>`.
- Preserve authored `grid-template-columns` from `STYLESHEET_ANALYSIS.gridRules` in generated CSS (not resolved px).
- **All states from cell-state vocabulary must be rendered** — don't drop overbooked/weekend/disabled variants.
- Sticky + scrollable regions from Step 3f must be preserved.

### 9c. Write `{pageName}.css`
Only `var(--token)` references. Apply the authored grid spec. Include every cell-state class discovered. For the "overbooked" / "disabled" / "weekend" states, follow the cell signature properties exactly (e.g. `::after` underline height from the extracted `after.h` field).

### 9d. Write `.playwright-import/custom-components-{pageName}.json`
Full custom component report from Step 7.

### 9e. Edit `App.tsx`
Add import + replace placeholder (or append new route).

### 9f. Edit `Sidebar.tsx`
Only if new route; otherwise skip.

### 9g. Validation
- `node scripts/token-audit.js` → exit 0 (fix violations first)
- `cd prototype && npx tsc --noEmit` → exit 0 (fix type errors)
- **Dev-server smoke test**: `browser_navigate` to local URL, `browser_console_messages { level: "error" }` → zero errors. If errors, fix them before invoking visual-match. (Common fails: wrong icon name — compare against the Ahoy icon directory listing.)

---

## Step 10 — Visual match loop (stricter)

Invoke the `visual-match` skill with tiered pixel-diff thresholds:

- Iter 1: `maxDiffPixelRatio ≤ 0.05` (5%)
- Iter 2: `maxDiffPixelRatio ≤ 0.03` (3%)
- Iter 3: `maxDiffPixelRatio ≤ 0.02` (2%)
- Iter 4: `maxDiffPixelRatio ≤ 0.01` (1%)
- Iter 5: **Pixel-perfect gate** — target `maxDiffPixelRatio ≤ 0.005` (0.5%)

Success = **all** of:
1. No CRITICAL differences (structural / missing elements)
2. No MEDIUM differences (wrong spacing tier, wrong weight, wrong color family)
3. Pixel diff ratio under iteration's threshold

Do **not** mark visual-match successful on LOW-only when counts of structural elements differ. The convergence gate must confirm every element from the reference is present in the local render.

Invocation:
- **skill**: `visual-match`
- **args**: `"{sourceUrl}" "http://localhost:5173{routePath}" "{pageName}"`

---

## Step 11 — Final report

At the end of the run, output:

```
## Playwright Import — Complete

**Source:** {url}
**Outcome:** SUCCESS / PARTIAL / FAILED
**Pixel diff (final):** {ratio}% — {PASS / FAIL at target threshold}

### Files created
- prototype/src/pages/{pageName}.tsx
- prototype/src/pages/{pageName}.css
- .playwright-import/custom-components-{pageName}.json

### Custom components to document
| ID | Name | Occurrences | Action | Spec path |
|---|---|---|---|---|
| cc-001 | CapacityCell | 140 | CREATE_SPEC | specs/molecules/capacity-cell.md |
| cc-002 | UserCapacityRow | 20 | CREATE_SPEC | specs/molecules/user-capacity-row.md |
| cc-003 | OverbookedUnderline | 14 | CSS_ONLY | (styled via ::after) |

**To create specs for the flagged components, run:**
```
/create-spec {componentName}
```
for each entry with `specAction = CREATE_SPEC`.

### Validation
- Token audit: ✓ / ✗
- TypeScript: ✓ / ✗
- Dev-server errors: ✓ / ✗
- Visual match iterations: N/5
- Visual match outcome: SUCCESS / CAP / PLATEAU
```

---

## Completion checklist

- [ ] URL parsed, auth guard cleared
- [ ] Landmarks detected → region map built
- [ ] Per-region extraction: each budget met or sampled explicitly
- [ ] Stylesheet analysis captured hover + media + grid rules
- [ ] Cell-state signatures enumerated (if grid page)
- [ ] Sticky / scrollable regions detected
- [ ] SVG inventory with path fingerprints captured
- [ ] API shape captured for realistic mock data
- [ ] All values token-matched; unmatched flagged in plan
- [ ] Density measured
- [ ] Layout template selected
- [ ] Every element classified (deterministic or scored)
- [ ] Icon dictionary consulted — all imported icon names verified against Ahoy directory
- [ ] Repeated patterns → sub-components + `.map()`
- [ ] Custom component report generated (JSON file written)
- [ ] Plan presented + user approved before any files were written
- [ ] TSX and CSS files follow spec Anatomy, use only tokens, preserve authored grid spec
- [ ] Sticky + scrollable behaviour preserved in generated CSS
- [ ] All cell-state variants rendered (none dropped silently)
- [ ] App.tsx updated, Sidebar.tsx confirmed
- [ ] `node scripts/token-audit.js` exits 0
- [ ] `npx tsc --noEmit` exits 0
- [ ] Dev-server navigation produces zero console errors
- [ ] visual-match invoked with tiered thresholds
- [ ] Visual match outcome reported (SUCCESS / CAP / PLATEAU)
- [ ] Final report lists custom components with spec paths
