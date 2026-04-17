---
description: High-fidelity clone of a live webpage into an Ahoy-based prototype page. Captures DOM + ARIA + computed styles + tokens, builds an intermediate representation, matches every visual value to a design token, maps elements to spec-validated Ahoy components, and generates a routed page that feels accurate on the first pass.
argument-hint: "\"<URL>\" [\"natural language action to perform first\"]"
allowed-tools: Bash Glob Grep Read Write Edit AskUserQuestion Skill mcp__playwright__browser_navigate mcp__playwright__browser_navigate_back mcp__playwright__browser_snapshot mcp__playwright__browser_evaluate mcp__playwright__browser_take_screenshot mcp__playwright__browser_click mcp__playwright__browser_wait_for mcp__playwright__browser_resize mcp__playwright__browser_network_requests mcp__playwright__browser_console_messages mcp__playwright__browser_press_key
---

`$ARGUMENTS` contains the source URL and an optional browser action. Format: `"URL"` or `"URL" "action description"`.

**Argument parsing:**
- Quoted strings: first = URL, second = action.
- Unquoted: first whitespace-delimited token = URL, remainder = action.
- If no URL parseable: ask the user and stop.

> **How this command produces an accurate prototype.** HTML + ARIA alone loses every visual decision that lives in CSS classes (colors, spacing, typography, radius, shadow). This command also extracts **computed styles**, **CSS custom properties**, **pseudo-element content**, **inline SVGs**, and **bounding boxes**, then **token-matches every value** against the known Ahoy token table before generating code. The result is a prototype that matches the source's *visual language*, not just its *structure*.

---

## Step 1 — Navigate and prepare

### 1a. Resize and navigate
Call `browser_resize` → `{ width: 1440, height: 900 }` (canonical design viewport). Then `browser_navigate` → parsed URL.

### 1b. Multi-signal auth guard
Run these three checks in parallel after navigate:
1. `browser_snapshot` — scan for password textbox, "Sign in / Log in / Wachtwoord / Authentication required" text, or an email+password form pair.
2. `browser_evaluate` → `"location.href"` — check for `/login`, `/signin`, `/auth`, `/session/new`, `?redirect=`.
3. `browser_console_messages` with `level: "error"` — scan for 401/403 strings or "not authenticated" errors (signals a failed API call that left the page degraded).

If any signal fires, print the following and **stop**:

```
⚠️  Login required

The page redirected to a login screen. Please:
1. Find the Playwright browser window (check your Dock or taskbar)
2. Log in manually in that browser
3. Re-run this command once you're logged in

The Playwright MCP session is persistent — your login will be remembered.
```

### 1c. Perform action (if provided)
If an action was parsed:
1. Use the snapshot from 1b.
2. Find the element whose accessible name + role best matches the natural-language description.
3. `browser_click` with that element's `ref`.
4. `browser_wait_for` the text you expect to appear, or 2s if uncertain.
5. If no good match: list the top 3 candidates from the snapshot and ask before continuing.

### 1d. Settle and verify
Call `browser_evaluate` → `document.readyState` until it reports `"complete"`. Then `browser_wait_for` any landmark heading text. Give up after 3 retries and report degraded state.

---

## Step 2 — Find the content region

Before extracting anything, find the meaningful content root. This cuts chrome (nav, sidebar, cookie banners, intercom widgets) from all downstream extraction.

Call `browser_evaluate` with this script:

```js
(function(){
  var candidates = ['main','[role="main"]','#content','.content','#main','.main-content','.page-content','.app-content__body','#app > *:not(nav):not(header):not(footer)'];
  for (var i = 0; i < candidates.length; i++) {
    var el = document.querySelector(candidates[i]);
    if (el && el.getBoundingClientRect().height > 200) {
      var r = el.getBoundingClientRect();
      return JSON.stringify({ selector: candidates[i], width: Math.round(r.width), height: Math.round(r.height), tag: el.tagName.toLowerCase() });
    }
  }
  return JSON.stringify({ selector: 'body', width: window.innerWidth, height: document.body.scrollHeight, tag: 'body' });
})()
```

Record `{ selector, width, height, tag }` as `CONTENT_SELECTOR`. All subsequent extraction is scoped to this selector.

---

## Step 3 — Deep extraction (parallel where possible)

All six extractions below operate on `CONTENT_SELECTOR`. Run them in sequence but batch-issue them so the model decides the fastest ordering.

### 3a. Scoped ARIA snapshot
Call `browser_snapshot` with `{ selector: CONTENT_SELECTOR }`. The snapshot is returned in YAML. Label as `CONTENT_ARIA`.

Notable attributes in AI mode:
- `[ref=eN]` → interactable element (can be targeted later for hover/focus captures)
- `[cursor=pointer]` → **leaf node with pointer cursor** — custom interactive component candidate (often a clickable `<div>` playing the role of a button or card)
- `[checked]`, `[disabled]`, `[expanded]`, `[selected]`, `[active]`, `[level=N]`, `[pressed]`

### 3b. Computed-style tree extraction
This is the single most important step. Call `browser_evaluate` with this script (keep it as one expression — do not interpolate `CONTENT_SELECTOR` into it; read it from `window`):

```js
(function(){
  var STYLE_PROPS = ['display','position','flexDirection','flexWrap','justifyContent','alignItems','alignSelf','gap','rowGap','columnGap','gridTemplateColumns','gridTemplateRows','paddingTop','paddingRight','paddingBottom','paddingLeft','marginTop','marginRight','marginBottom','marginLeft','width','height','minWidth','maxWidth','minHeight','backgroundColor','backgroundImage','color','borderTopWidth','borderTopColor','borderStyle','borderRadius','borderTopLeftRadius','borderTopRightRadius','borderBottomLeftRadius','borderBottomRightRadius','boxShadow','opacity','fontFamily','fontSize','fontWeight','fontStyle','lineHeight','letterSpacing','textAlign','textTransform','textDecoration','whiteSpace','cursor','pointerEvents','zIndex','overflow'];
  var sel = arguments.length > 0 ? arguments[0] : 'body';
  var root = document.querySelector(sel) || document.body;
  var nodes = [];
  var MAX_NODES = 250;
  function num(v){ var n = parseFloat(v); return isNaN(n) ? 0 : Math.round(n); }
  function getBefore(el){
    var cs = window.getComputedStyle(el, '::before');
    var c = cs.content;
    if (!c || c === 'none' || c === 'normal' || c === '""') return null;
    return { content: c, bg: cs.backgroundColor, w: cs.width, h: cs.height, display: cs.display };
  }
  function fingerprint(el){
    var parts = [el.tagName];
    for (var i = 0; i < el.children.length && i < 6; i++) parts.push(el.children[i].tagName);
    return parts.join('>');
  }
  function visit(el, depth, parentIdx){
    if (nodes.length >= MAX_NODES) return;
    var cs = window.getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    var r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return;
    var styles = {};
    for (var k = 0; k < STYLE_PROPS.length; k++) styles[STYLE_PROPS[k]] = cs[STYLE_PROPS[k]];
    var textNode = (el.childNodes.length > 0 && Array.prototype.every.call(el.childNodes, function(n){ return n.nodeType === 3 || (n.nodeType === 1 && n.tagName === 'BR'); }));
    var myIdx = nodes.length;
    nodes.push({
      i: myIdx,
      parent: parentIdx,
      depth: depth,
      tag: el.tagName.toLowerCase(),
      id: el.id || null,
      role: el.getAttribute('role') || null,
      ariaLabel: el.getAttribute('aria-label') || null,
      href: el.getAttribute('href') || null,
      type: el.getAttribute('type') || null,
      placeholder: el.getAttribute('placeholder') || null,
      alt: el.getAttribute('alt') || null,
      text: textNode ? (el.textContent || '').trim().slice(0, 140) : null,
      rect: { x: num(r.x), y: num(r.y), w: num(r.width), h: num(r.height) },
      childCount: el.children.length,
      fp: fingerprint(el),
      pseudoBefore: getBefore(el),
      styles: styles,
    });
    for (var c = 0; c < el.children.length; c++) visit(el.children[c], depth + 1, myIdx);
  }
  visit(root, 0, -1);
  return JSON.stringify({ selector: sel, count: nodes.length, nodes: nodes });
}).call(null, /*CONTENT_SELECTOR*/ 'main')
```

> When calling this, replace the trailing `'main'` with the actual `CONTENT_SELECTOR` you recorded. The script is self-contained and safe to pass as a single string.

Parse the returned JSON as `DOM_IR`. Expect 80-250 nodes. If fewer than 20, the selector was too narrow — retry with `'body'`.

### 3c. CSS custom properties readback
Call `browser_evaluate`:

```js
(function(){
  var cs = getComputedStyle(document.documentElement);
  var out = {};
  for (var i = 0; i < cs.length; i++) {
    var name = cs[i];
    if (name.startsWith('--')) out[name] = cs.getPropertyValue(name).trim();
  }
  return JSON.stringify(out);
})()
```

If the source site uses design tokens (it often does), you get them here. Store as `SOURCE_TOKENS`. Rich sites expose 50-200 `--*` vars with resolved values — use these during token matching in Step 4.

### 3d. SVG / icon capture
Call `browser_evaluate` to inventory icons (inline SVGs and explicit `<img>` tags inside the content region):

```js
(function(){
  var sel = arguments[0] || 'body';
  var root = document.querySelector(sel) || document.body;
  var items = [];
  var svgs = root.querySelectorAll('svg');
  for (var i = 0; i < Math.min(svgs.length, 60); i++) {
    var s = svgs[i];
    var r = s.getBoundingClientRect();
    items.push({ type: 'svg', w: Math.round(r.width), h: Math.round(r.height), aria: s.getAttribute('aria-label'), title: (s.querySelector('title')||{}).textContent || null, innerHTML: s.innerHTML.slice(0, 600) });
  }
  return JSON.stringify({ count: svgs.length, items: items });
}).call(null, /*CONTENT_SELECTOR*/ 'main')
```

Store as `ICONS`. Use this in Step 5e to match source icons to Ahoy icon components by shape fingerprint (dominant path segments) and role context (button / nav / status).

### 3e. Network and data shape
Call `browser_network_requests` with `{ filter: "/api/|/graphql|\\.json", requestBody: false, static: false }`.

Extract field names and response shape from XHR responses. Use these for **realistic mock data** in generated code: real field names, real value types, real entity counts. Store as `API_SHAPE`.

### 3f. Screenshots
In parallel:
- `browser_take_screenshot { type: "png", fullPage: false, filename: "playwright-reference-viewport.png" }`
- `browser_take_screenshot { type: "png", fullPage: true, filename: "playwright-reference-full.png" }`

The viewport screenshot is the visual ground truth for Step 8 (visual-match).

---

## Step 4 — Token match every extracted value

The Ahoy token tables are fixed. For each raw value in `DOM_IR`, resolve to the closest token. This step is deterministic and should happen before component classification — it normalizes visual values into the token vocabulary that specs speak.

### 4a. Token tables (reference — do not modify)

**Spacing (px → token):**
```
3→--space-1  5→--space-xxs  6→--space-2  8→--space-3  10→--space-xs-alt  12→--space-4
16→--space-icon  18→--space-5  20→--space-mobile  22→--space-icon-lg  24→--space-6
25→--space-gap-lg  32→--space-section  36→--space-7  48→--space-8  72→--space-9  88→--space-spacer
```
Snap rule: round raw px to nearest integer. Match exactly. If no exact match, snap to nearest within ±2px. If still no match, emit raw px **and** flag for token audit failure.

**Radius:**
```
2→--radius-sm  4→--radius-md  5→--radius-counter  6→--radius-link  8→--radius-lg  50%→--radius-round
```

**Font size:**
```
12→--font-size-xs  14→--font-size-sm  16→--font-size-base  18→--font-size-lg  24→--font-size-xl
```
Font sizes are exact (±0.5px). Any unmatched value is a custom size — use the nearest and comment the raw.

**Font weight:**
```
400→--font-weight-regular  500→--font-weight-medium  600→--font-weight-semibold  700→--font-weight-bold
```
If weight is 300 or 800, snap to nearest (400 or 700 respectively).

**Line height, letter-spacing, transition:** exact match against tokens; otherwise raw with comment.

**Color semantic buckets:**

The project has no Lab-distance library available, so use **role-based + RGB-proximity** matching:

1. First identify semantic role from the element's role/usage:
   - Text color on typography elements → `--color-text` (dark) or `--color-text-subtle` (gray)
   - Background on page wrapper / body → `--color-bg`
   - Background on cards / panels → `--color-surface`
   - Border on table / card / input → `--color-border`
   - CTA / primary-button background → `--color-accent`
   - Link text or link underline → `--color-link`
   - Error text or error badge → `--color-error`
   - Success badge or success state → `--color-success`
   - Warning badge → `--color-warning`
   - Sidebar / dark nav background → `--color-nav-bg`

2. Then confirm with RGB proximity to the documented Ahoy resolved values (read from `prototype/src/tokens.css` if uncertain).

3. If neither role nor RGB match produces a confident token, use the raw color and flag for review.

### 4b. Normalize the DOM_IR

Walk `DOM_IR.nodes`. For each node, replace `.styles` with a `.tokens` object that maps each style property to either a token name or a raw value:

```
{
  i, parent, depth, tag, role, ariaLabel, text, rect, fp, childCount,
  tokens: {
    display: "flex",
    flexDirection: "column",
    gap: "--space-4",       // matched
    padding: "--space-5",    // matched (from 18px all sides)
    backgroundColor: "--color-surface",
    color: "--color-text",
    fontSize: "--font-size-base",
    fontWeight: "--font-weight-medium",
    borderRadius: "--radius-md",
    boxShadow: "--elevation-1",
    // custom values get raw value + __unmatched: true
    letterSpacing: { raw: "0.5px", __unmatched: true }
  }
}
```

This normalized IR (`TOKEN_IR`) is the input to classification and code generation.

### 4c. Density measurement
Using `TOKEN_IR`, measure the spacing density of the primary content container (the direct children of the content root with the largest combined area).

- Read the container's `gap` token — map to Flex `gap={N}` prop via the spec:
  - `--space-2` (6px) → `gap={2}` (compact)
  - `--space-4` (12px) → `gap={3}` (normal)
  - `--space-6` (24px) → `gap={5}` (spacious)
- Read first-level children's `padding` token — map similarly to Box/Island `padding={N}`.

Record:
```
Density: compact | normal | spacious (measured, not eyeballed)
Flex/Grid gap prop: gap={N}
Box/Island padding prop: padding={N}
CSS spacing token: var(--space-N)
```

> **Dual-numbering reminder:** Ahoy layout props use a spacer-number scale. `gap={3}` = 12px = `var(--space-4)` in CSS. Use the prop number on Ahoy components; use the CSS token in custom CSS classes.

---

## Step 5 — Component classification

Walk `TOKEN_IR` bottom-up. For each node, apply multi-signal scoring.

### 5a. Deterministic matches (definitive)

| Signal | Ahoy mapping |
|---|---|
| `tag === 'button'` or `role === 'button'` | `Button` |
| `tag === 'input'` + `type ∈ {text, email, number, search, tel, url}` | `Input` |
| `tag === 'input'` + `type === 'checkbox'` | `Checkbox` |
| `tag === 'input'` + `type === 'radio'` | `Radio` |
| `tag === 'select'` or `role === 'combobox'` | `Select` |
| `role === 'switch'` | `Toggle` |
| `role === 'tab'` | `Tab` |
| `role === 'dialog'` or `role === 'alertdialog'` | `Dialog` |
| `tag === 'table'` | plain `<table>` (DataGrid excluded — no @tanstack/react-table) |
| `role === 'alert'` or `role === 'status'` inline | `Banner` / `Message` |
| `role === 'progressbar'` with `aria-valuenow` | `LoadingElement` |
| `role === 'progressbar'` without value | `LoadingBar` |
| `tag === 'a'` with `href` and no child heading | `Link` |
| `role === 'heading'` + `level` | `Heading{N}` from Typography |
| `tag === 'nav'` containing a list | `Menu` |

### 5b. Signal-scored matches (for ambiguous nodes)

Score with weights. Highest score wins.

**StatusLabel** (small status pill):
- `tokens.borderRadius` is `--radius-lg` or `--radius-round` → +2
- `tokens.padding` uses `--space-xxs`, `--space-2`, or `--space-3` → +1
- `text.length < 20` and all-caps or title-case → +1
- `tokens.backgroundColor` matches `--color-success`, `--color-warning`, `--color-error`, or accent family → +2
- `tokens.fontSize` is `--font-size-xs` → +1

**Badge** (count / label pill):
- same shape signals as StatusLabel → +1
- text is a digit sequence or has <=2 words → +1
- sits visually adjacent to a nav item or icon (parent contains an icon) → +1
- No status-semantic color → StatusLabel is preferred if colors match status family

**Tag**:
- Like Badge/StatusLabel but with border → +1, `--radius-md` → +1, neutral color → +1

**Avatar**:
- `tokens.borderRadius` is `--radius-round` (50%) → +2
- `rect.w ≈ rect.h` and `w ≤ 48px` → +1
- Contains `<img>` child or single 1-2-char text → +1

**Icon**:
- `tag === 'svg'` and `rect.w ≤ 32` and `rect.h ≤ 32` → definitive match

**Card / Widget / Island**:
- `tokens.boxShadow` exists (non-"none") → +2
- `tokens.borderRadius` is `--radius-lg` → +1
- `tokens.padding` uses `--space-5` or `--space-6` → +1
- Multiple semantically distinct children (heading + body + optional footer) → +2
- Choose `Widget` if it has a clear header+body split; `Island` for simpler card; `Box` with CSS for custom.

**Button-like div** (custom button):
- `tokens.cursor === 'pointer'` → +2
- `tokens.borderRadius > 0` → +1
- Padding present on all sides → +1
- Snapshot has `[cursor=pointer]` on this node (from 3a) → +2
- No interactive role → keep as `Button` with `level` derived from background (accent → primary, transparent → outline, neutral → secondary).

**LabelValuePair**:
- Parent has two children: first is smaller/subtle text, second is larger/bolder → definitive match.

**Counter**:
- Parent contains exactly 3 children: icon-button "-", number span, icon-button "+" → definitive match.

**EmptyState**:
- A container with a single icon + heading + body text + optional CTA, centered, covers >40% of content width and >30% of content height → match.

**Pagination**:
- Nav containing numbered buttons + prev/next symbols → match.

**ButtonGroup**:
- 2+ adjacent buttons sharing a parent flex container with no gap → match.

### 5c. Repeated-pattern detection (list → `.map()`)

For each container node in `TOKEN_IR`:
- Build fingerprints for its children (`fp` field).
- If 3+ children share the same fingerprint, treat them as a **repeated pattern**.
- Generate one named sub-component function in the page file; render `items.map(...)`.
- Use field names from `API_SHAPE` (Step 3e) when available; otherwise fabricate realistic strings (names, amounts, dates).

Record:
```
Repeated pattern: {fingerprint}
Count: {N}
Ahoy mapping: {component} (from 5b)
Mock data: 5-8 items with fields: {...}
```

### 5d. Spec validation

For every component chosen in 5a/5b, validate against the spec:
1. Construct path: try `specs/atoms/{name}.md`, then `specs/molecules/`, then `specs/organisms/`.
2. Read the **"When to use"** section.
3. If context mismatches "When to use", read "When not to use" — it often names the correct alternative. Re-map.
4. If no spec exists, flag `no-spec`.
5. If no Ahoy component fits, flag `no-ahoy` and render as semantic HTML + token CSS.

### 5e. Icon mapping

For each SVG in `ICONS` (Step 3d):
- Parent is a nav-menu item → map to the matching `Svg24X24*Filled` from `@teamleader/ahoy/dist/es/assets/icons/components/`.
- Parent is a Button → choose the `SvgXxxFilled` icon whose name best matches the adjacent button text or `aria-label`.
- Bare decorative SVG in content → keep inline SVG (preserve `innerHTML` from `ICONS`) unless a clear Ahoy icon match exists.

---

## Step 6 — Layout template decision

Before code generation, lock the page-level layout.

**Step 6a — Standard template?**

| If the content root has… | Use | Spec |
|---|---|---|
| A list/table of entities + top header with title + actions | `OverviewPage` | `specs/organisms/overviewPage.md` |
| A single record detail + back link + sticky header | `DetailPage` | `specs/organisms/detailPage.md` |
| Neither | Custom (see 6b) | — |

If a template matches, read its spec now. The spec's Anatomy defines the root JSX — use it verbatim.

**Step 6b — Custom layout (only if no template matched)**

| Arrangement | Component | Spec |
|---|---|---|
| Multi-column with fixed sidebar | `Grid` | `specs/patterns/grid.md` |
| Stacked sections / flex column | `Flex` | `specs/patterns/flex.md` |
| Card/tile container | `Island` or `Widget` | `specs/patterns/island.md` |
| Page-level horizontal padding | `Container` | `specs/patterns/container.md` |
| Generic wrapper | `Box` | `specs/patterns/box.md` |

**Step 6c — Record the layout decision:**
```
Layout template: OverviewPage | DetailPage | custom ({pattern})
Root wrapper: <{Component} {props}>
Import: {import path}
Spec: {path}
```

### 6d. Page metadata

- **pageName** — last non-empty URL path segment, PascalCase.
  - `/deals` → `Deals`; numeric ID segments → `{Parent}Detail` (e.g. `/contacts/123` → `ContactDetail`)
- **routePath** — last segment with leading slash.
- **replacesPlaceholder** — matches one of: `/calendar /companies /contacts /deals /quotations /projects /planning /revenue /expenses /work-orders /tickets /products /timesheets /insights /settings` → replace; else new route.

---

## Step 7 — Plan review and approval

Present the following as Markdown in chat. Do **not** write files before approval.

```
## Playwright Import Plan

**Source URL:** {url}
**Content region:** {CONTENT_SELECTOR} ({width}×{height})
**Page name:** {pageName}Page
**Route:** {routePath}  ← replaces existing placeholder   (only if replacesPlaceholder)
**Layout:** {OverviewPage | DetailPage | custom}
**Root wrapper:** `<{Component} {props}>`
**Density (measured):** {compact | normal | spacious}  — gap={N}, padding={N}, CSS var(--space-N)

### Hierarchy outline (from TOKEN_IR)
```
Page root ({layout})
  ├── Header
  │     ├── Heading{level}: "{title}"
  │     └── ButtonGroup: [{action1}, {action2}]
  ├── Content
  │     ├── Widget ×{N}  (repeated pattern — renders as items.map)
  │     │     ├── Widget.Header: Heading4 + StatusLabel
  │     │     └── Widget.Body: LabelValuePair list
  │     └── <table> (5 columns, {rows} rows)
  └── Footer (if any)
```

### Component mapping (spec-validated)
| Source element | Ahoy component | Classification signal | Spec |
|---|---|---|---|
| {element} | {Component}  | {deterministic | scored N} | specs/atoms/{name}.md |
| {div.cta} | Button level="primary" | scored 5 (cursor=pointer + radius + padding + snapshot flag) | specs/atoms/button.md |
| {raw html} | (no-ahoy) | — | — |

### Token normalization
- Unmatched colors: {count}  — {list top 3 raw values with closest-token suggestion}
- Unmatched spacing: {count} — will use raw px with audit warnings
- Icons captured: {N}  — mapped to Ahoy icons: {list}

### Repeated patterns
| Fingerprint | Count | Rendered as | Mock data source |
|---|---|---|---|
| DIV>DIV>SPAN | 7 | `DealCard` sub-component inside page file | API_SHAPE /api/deals {amount, title, owner, stage} |

### New component candidates
| Pattern | Reason | Count | Plan |
|---|---|---|---|
| {desc} | no-ahoy | 1 | Inline HTML + token CSS |
| {desc} | repeated {N}× | {N} | Named function in page file |

### Files to write
| File | Action |
|---|---|
| prototype/src/pages/{pageName}.tsx | CREATE |
| prototype/src/pages/{pageName}.css | CREATE |
| prototype/src/App.tsx | EDIT — add Route + import |
| prototype/src/components/Sidebar.tsx | EDIT or no change needed |

### Screenshots saved
- playwright-reference-viewport.png
- playwright-reference-full.png
```

Then use `AskUserQuestion`:
- **Question**: "Does this plan look right?"
- **Options**: `[Looks good — write the files]`, `[I have a correction]`

If the user corrects: apply the correction to the IR, regenerate the summary, re-present. Loop until approval. Do not write files before approval.

---

## Step 8 — Generate the prototype page

Only proceed after Step 7 approval.

### 8a. Read existing files
In parallel: `prototype/src/App.tsx` and `prototype/src/components/Sidebar.tsx`. The `Edit` tool requires exact whitespace matches.

### 8b. Write `prototype/src/pages/{pageName}.tsx`

Spec-driven generation — for every Ahoy component in the mapping:
1. **Read the spec** listed in the Spec column (skip if `no-spec`).
2. **Use the Anatomy section** for JSX structure — follow child order and slot names. Do not flatten.
3. **Use the Props/API section** for prop names. Apply density props from Step 4c to layout components. Apply disabled/badge/active states from the snapshot.
4. **Use the Tokens Used section** for custom CSS class styling.
5. **Use repeated-pattern data** from Step 5c — write a named sub-component above the default export and render via `.map()`.

```tsx
import './{pageName}.css';
// Root layout import (from Step 6 — OverviewPage / DetailPage / Flex / Grid / etc.)
import { OverviewPage } from '@teamleader/ahoy/dist/es/components/overviewPage';
// Ahoy direct imports from mapping table (alphabetized)
import { Button } from '@teamleader/ahoy/dist/es/components/button';
// Icon imports (for matched icons from Step 5e)
import SvgRocketFilled from '@teamleader/ahoy/dist/es/assets/icons/components/RocketFilled';

// Named function components for repeated patterns (from Step 5c, 3+ occurrences)
// function DealCard({ title, amount, owner }: { title: string; amount: string; owner: string }) { ... }

const MOCK_ITEMS = [ /* 5-8 realistic entries from API_SHAPE or fabricated */ ];

export default function {pageName}Page() {
  return (
    <div className="{pagename-kebab}-page">
      {/* Layout from Step 6, density props from Step 4c */}
      {/* Each child uses spec Anatomy for structure */}
    </div>
  );
}
```

**Rules:**
- Direct Ahoy imports only — never the barrel export.
- `level="primary"` must be explicit on mint / CTA buttons; secondary is default.
- Static mock data only — no fetch / no useEffect data loading.
- No inline styles — everything in the CSS file.
- Tables: plain `<table>/<thead>/<tbody>/<tr>/<th>/<td>` with CSS classes (DataGrid excluded).
- JSX nesting mirrors the Step 5 hierarchy.
- Every Ahoy component uses prop names and slot order from its spec's Anatomy.

### 8c. Write `prototype/src/pages/{pageName}.css`

All values **must** be `var(--token)` references. Raw values are rejected by the token audit.

Use the normalized `TOKEN_IR` from Step 4b — every `tokens.*` value is already token-matched and can be written directly.

**Dual-numbering rule:** When Ahoy layout props already handle spacing (e.g. `<Flex gap={3}>`), do **not** also set `gap` in CSS on the same element.

Write CSS only for:
- Page-level padding on the root `.{pagename-kebab}-page` wrapper.
- Spacing outside Ahoy layout components.
- Tables and repeated-pattern sub-components.
- Custom "no-ahoy" elements with token-based styling.

Example for *normal* density (padding={4} = 18px = `--space-5`):
```css
.{pagename-kebab}-page {
  padding: var(--space-5);
}
.{pagename-kebab}-table {
  border-collapse: collapse;
  width: 100%;
  font-size: var(--font-size-sm);
}
.{pagename-kebab}-table th {
  text-align: left;
  padding: var(--space-3) var(--space-4);
  color: var(--color-text-subtle);
  font-weight: var(--font-weight-medium);
  border-bottom: 1px solid var(--color-border);
}
```

Token reference (complete set — matches `prototype/src/tokens.css` Layer 2):
- Spacing: `--space-1..9`, `--space-xxs`, `--space-xs-alt`, `--space-icon`, `--space-mobile`, `--space-icon-lg`, `--space-gap-lg`, `--space-section`, `--space-spacer`
- Color: `--color-text`, `--color-text-subtle`, `--color-bg`, `--color-surface`, `--color-border`, `--color-accent`, `--color-accent-bg`, `--color-accent-border`, `--color-focus`, `--color-link`, `--color-link-bg`, `--color-error`, `--color-success`, `--color-warning`, `--color-nav-bg`, `--color-nav-item-hover`, `--color-nav-item-active`, `--color-nav-item-active-hover`
- Typography: `--font-size-xs|sm|base|lg|xl`, `--font-weight-regular|medium|semibold|bold`, `--line-height-tight|base|loose|heading`, `--letter-spacing-caps`, `--letter-spacing-caps-wide`, `--font-feature-tabular`, `--font-family-base`
- Radius: `--radius-sm|md|lg|round`, `--radius-counter`, `--radius-link`
- Elevation: `--elevation-1..4`
- Z-index: `--z-below|base|above|overlay|modal|toast`
- Motion: `--duration-fast|base`, `--easing-default|enter|exit`, `--transition-border|shadow`

### 8d. Edit `prototype/src/App.tsx`

Add import after existing page imports:
```tsx
import {pageName}Page from './pages/{pageName}';
```

Route — preserve the alignment whitespace used by existing placeholder routes:
```
            <Route path="/deals"       element={<PlaceholderPage label="Deals" />} />
```
becomes:
```
            <Route path="/deals"       element={<DealsPage />} />
```

If adding a new route (not a placeholder replacement): append a `<Route>` with matching indentation and, if there's no sidebar entry, add a `PATH_LABELS` override.

### 8e. Edit `prototype/src/components/Sidebar.tsx`

If the route already exists in `NAV_ITEMS`: no change.
If new: add an import for the matching `Svg24X24XxxFilled` icon and append an entry to `NAV_ITEMS` with matching whitespace.

### 8f. Token audit

```bash
node scripts/token-audit.js
```

If exit code ≠ 0: read each error, replace the raw value with its matched token from Step 4, re-run. Repeat until exit 0.

### 8g. TypeScript check

```bash
cd prototype && npx tsc --noEmit
```

If errors: fix in the generated files (wrong prop names, missing imports, wrong component APIs). Re-run until exit 0.

---

## Step 9 — Visual match loop

Only after 8f and 8g both pass, invoke the `visual-match` skill via the `Skill` tool:

- **skill**: `visual-match`
- **args**: `"{sourceUrl}" "http://localhost:5173{routePath}" "{pageName}"`

The skill runs up to 5 comparison iterations, applying CSS and (in later iterations) TSX fixes until convergence. Because this command produced a much higher-fidelity first pass, visual-match typically needs 1-2 iterations instead of 4-5.

Wait for the skill's final outcome before marking the command done.

---

## Completion checklist

Before reporting done, confirm every item:

- [ ] URL parsed correctly
- [ ] Auth guard triple-checked (snapshot + URL + console errors) — stopped if login detected
- [ ] Action (if any) performed via ARIA tree matching
- [ ] Content region found (`CONTENT_SELECTOR`) with height > 200px
- [ ] Scoped ARIA snapshot captured (`CONTENT_ARIA`)
- [ ] Computed-style tree extracted (`DOM_IR`) — ≥20 nodes
- [ ] CSS custom properties dumped (`SOURCE_TOKENS`)
- [ ] SVG/icon inventory captured (`ICONS`)
- [ ] API data shape captured (`API_SHAPE`)
- [ ] Reference screenshots saved
- [ ] Every value token-matched; unmatched values flagged in plan
- [ ] Density measured (not eyeballed) from actual gap / padding values
- [ ] Layout template selected — OverviewPage / DetailPage / custom pattern
- [ ] Every significant element classified — deterministic match or scored
- [ ] Repeated patterns detected and deduplicated into sub-components
- [ ] Each Ahoy component validated against its spec's "When to use"
- [ ] Icons mapped to Ahoy icon components where possible
- [ ] Plan presented with full mapping, normalization report, and file list
- [ ] User explicitly approved before any files were written
- [ ] `prototype/src/pages/{pageName}.tsx` created with direct Ahoy imports
- [ ] `prototype/src/pages/{pageName}.css` created with only `var(--token)` references
- [ ] Repeated patterns rendered via `.map()` on a named sub-component
- [ ] JSX nesting mirrors spec Anatomy for each component used
- [ ] `App.tsx` updated with Route + import
- [ ] `Sidebar.tsx` updated or confirmed no change
- [ ] `node scripts/token-audit.js` exits 0
- [ ] `cd prototype && npx tsc --noEmit` exits 0
- [ ] `visual-match` skill invoked with reference URL, local URL, page name
- [ ] Visual match loop completed — outcome reported (SUCCESS / CAP / PLATEAU)
