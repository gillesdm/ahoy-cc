---
description: Iteratively compare a generated prototype page against a reference URL using Playwright screenshots and Claude vision, applying targeted fixes until the designs converge
argument-hint: "\"<REFERENCE_URL>\" \"<LOCAL_URL>\" \"<PageName>\""
allowed-tools: Bash Glob Grep Read Write Edit mcp__playwright__browser_navigate mcp__playwright__browser_resize mcp__playwright__browser_evaluate mcp__playwright__browser_wait_for mcp__playwright__browser_take_screenshot mcp__playwright__browser_snapshot mcp__playwright__browser_navigate_back
---

`$ARGUMENTS` format: `"REFERENCE_URL" "LOCAL_URL" "PageName"`

- **REFERENCE_URL** — the original page to match (e.g. `"https://app.teamleader.eu/deals"`)
- **LOCAL_URL** — the local prototype route (e.g. `"http://localhost:5173/deals"`)
- **PageName** — PascalCase name used to derive file paths (e.g. `"Deals"` → `prototype/src/pages/Deals.tsx` + `Deals.css`)

Parse `$ARGUMENTS` using the same rules as playwright-import: quoted strings → first = REFERENCE_URL, second = LOCAL_URL, third = PageName.

---

## Constants

- **MAX_ITERATIONS**: 5
- **VIEWPORT**: 1920 × 1080 (Full HD — provides consistent, high-resolution screenshots that reveal spacing and alignment issues invisible at lower resolutions)
- **SUCCESS_THRESHOLD**: zero CRITICAL, zero MEDIUM, and all **structural elements present** (every visible element from the reference must render in local — this is a strict check, not subjective)
- **PLATEAU_THRESHOLD**: two consecutive iterations with no measurable improvement
- **CSS_FILE**: `prototype/src/pages/{PageName}.css`
- **TSX_FILE**: `prototype/src/pages/{PageName}.tsx`

### Structural-completeness gate (pixel-perfect prototypes)

Before scoring severity, **enumerate every distinct visual element** in the reference image (toolbar buttons, grid cells, row subtitles, status indicators, scroll bars, icons, pseudo-element underlines). If *any* element from the reference is **missing** in the local render, that is a CRITICAL automatically — regardless of how close the rest looks. The visual-match skill must NOT report SUCCESS while structural elements are missing.

### Structural element checklist per page type

For any data-grid / planning / calendar / dashboard page, verify:
- [ ] Column header row renders ALL column labels visibly
- [ ] Row heights match reference (typical: 48–60px per row)
- [ ] Multi-line rows are preserved (name + subtitle, title + description)
- [ ] Conditional cell states are rendered (overbooked, weekend, disabled, today-highlight) — each should be visually distinct
- [ ] Small icons on cells are rendered at correct size (usually 14×14 inline or 24×24 toolbar)
- [ ] Pseudo-element decorations (underlines, side-bars, status dots) are rendered
- [ ] Scrollbar appears if content exceeds viewport
- [ ] Sticky headers / sidebars stay pinned on scroll
- [ ] Row striping / alternating backgrounds applied where reference shows them

### Screenshot naming convention

All screenshots are saved with deterministic names so they can be reviewed after the session:

| File | When | Content |
|------|------|---------|
| `visual-match-reference.png` | Setup S1 | Reference page at 1920×1080, viewport-cropped |
| `visual-match-reference-full.png` | Setup S1 | Reference page full scrollable height |
| `visual-match-local-{N}.png` | Each iteration step A | Local page at 1920×1080, viewport-cropped |
| `visual-match-local-{N}-full.png` | Each iteration step A | Local page full scrollable height |

Use viewport-cropped (`fullPage: false`) as the **primary comparison image** — this reflects what users see first. Use full-page screenshots to catch below-the-fold issues.

### Playwright screenshot capabilities (reference)

The Playwright MCP exposes the following screenshot options via `browser_take_screenshot`:

| Option | Values | Notes |
|--------|--------|-------|
| `type` | `"png"` (default), `"jpeg"` | Use `png` for lossless comparison; `jpeg` for smaller files only |
| `fullPage` | `true` / `false` (default) | `true` captures the entire scrollable document height |
| `filename` | `string` | Relative path — saved in the working directory |
| `element` + `ref` | element label + ARIA ref | Crops to a specific element's bounding box |

Always use `png` for visual comparison — JPEG compression artifacts corrupt pixel-level differences.
Use `fullPage: true` as a secondary capture to catch below-the-fold layout issues.

---

## Setup — Run once before any iteration

### S1. Capture the reference screenshot

1. Call `browser_resize` → `{ width: 1920, height: 1080 }`
2. Call `browser_navigate` → REFERENCE_URL
3. Call `browser_wait_for` — wait for any stable heading or landmark text to appear (retry up to 3×)
4. Call `browser_evaluate` → `"window.scrollTo(0, 0)"` to pin scroll to top
5. Call `browser_take_screenshot` → `{ type: "png", fullPage: false, filename: "visual-match-reference.png" }` — label result **REFERENCE**. This image is fixed for the entire session — do not retake it.
6. Call `browser_take_screenshot` → `{ type: "png", fullPage: true, filename: "visual-match-reference-full.png" }` — label result **REFERENCE_FULL**.
7. Call `browser_snapshot` → label the result **REFERENCE_ARIA**. Use this to understand the semantic structure: headings, landmark regions, interactive elements.

Store REFERENCE, REFERENCE_FULL, and REFERENCE_ARIA mentally — compare every subsequent local screenshot against these.

### S2. Identify the page files

- TSX file: `prototype/src/pages/{PageName}.tsx`
- CSS file: `prototype/src/pages/{PageName}.css`

Read both files in full now. You need their current content before the first iteration.

### S3. Check dev server

Call `browser_navigate` → LOCAL_URL. If the page returns an error or blank, output:

```
⚠️  Dev server not running

Start the prototype dev server first:
  cd prototype && npm run dev

Then re-run this skill.
```

…and stop.

---

## Iteration Loop — Repeat up to MAX_ITERATIONS times

Track: `iteration` (starts at 1), `previous_score` (starts at `"none"`).

---

### Iteration start: check exit conditions

Before doing any work, evaluate:

1. **Cap reached**: if `iteration > MAX_ITERATIONS` → jump to [Final report](#final-report)
2. **Plateau**: if `previous_score` was `"none"` → continue. Otherwise if last two iterations both scored `LOW` or `NEGLIGIBLE` and no changes were applied → jump to [Final report](#final-report)

---

### Step A — Capture the current local screenshot

1. Call `browser_resize` → `{ width: 1920, height: 1080 }`
2. Call `browser_navigate` → LOCAL_URL
3. Call `browser_wait_for` — wait for the main page landmark or a stable heading text
4. Call `browser_evaluate` → `"window.scrollTo(0, 0)"`
5. Call `browser_take_screenshot` → `{ type: "png", fullPage: false, filename: "visual-match-local-{iteration}.png" }` — label **CURRENT_{iteration}**
6. Call `browser_take_screenshot` → `{ type: "png", fullPage: true, filename: "visual-match-local-{iteration}-full.png" }` — label **CURRENT_{iteration}_FULL**
7. Call `browser_snapshot` → label **CURRENT_ARIA_{iteration}**

---

### Step B — Visual critique

You now have REFERENCE and CURRENT_{iteration} screenshots visible. Perform a rigorous, structured comparison across these six categories. Be specific and harsh — small differences compound.

**Primary comparison**: Use the viewport-cropped screenshots (REFERENCE vs CURRENT_{iteration}) — this is what users see first.
**Secondary check**: Scan REFERENCE_FULL vs CURRENT_{iteration}_FULL for below-the-fold layout issues, cut-off content, and footer misalignment.

**B1. Layout structure**
Compare the overall grid/column arrangement. Ask:
- Are the same regions present (header bar, sidebar, content area, detail panel)?
- Does the content region fill the same proportion of the viewport?
- Are cards/lists/tables arranged in the same direction (horizontal vs. vertical)?
- Is the page-level padding/margin similar?
- Does the full-page height look proportional (check FULL screenshots)?

**B2. Spacing and density**
Compare gaps between elements. Ask:
- Does section padding match (tight vs. spacious)?
- Are row heights in lists/tables visually equivalent?
- Do card/widget borders have the same inner padding?
- Are action buttons positioned at the same distance from related content?

**B3. Typography**
Compare text rendering. Ask:
- Do headings use the same visual weight (bold vs. semibold vs. medium)?
- Are font sizes proportionally correct (H1 vs. body vs. label)?
- Is uppercase letter-spacing applied where the reference uses it (e.g. section labels)?
- Is text color correct — primary text, subtle text, disabled text?

**B4. Color and surface**
Compare fill colors. Ask:
- Does the page background match (white vs. neutral-50 vs. tinted)?
- Do card/widget backgrounds differ?
- Are border colors and widths matching?
- Are accent colors (mint/teal CTA) applied to the same elements?
- Are status badge colors (green/red/orange/grey) consistent?

**B5. Component choices**
Cross-reference with REFERENCE_ARIA and CURRENT_ARIA. Ask:
- Are the same interactive element types used (button vs. link vs. menu)?
- Are Ahoy component variants correct (e.g. `level="primary"` on CTA buttons)?
- Are icon sizes and families consistent?
- Are Avatar, Badge, StatusLabel, Tag used where the reference uses them?

**B6. Content and data shape**
Compare mock data fidelity. Ask:
- Does the number of list rows / table rows look proportional to the reference?
- Are column names and data types realistic (names, amounts, dates, statuses)?
- Are empty states or zero states handled when the reference shows them?

---

### Step C — Score and structured diff report

Output the following in the chat. Be specific — name CSS properties, token names, and line numbers.

```
## Visual Match — Iteration {iteration}/{MAX_ITERATIONS}

### Screenshots captured
- Viewport: visual-match-local-{iteration}.png (1920×1080)
- Full page: visual-match-local-{iteration}-full.png

### Differences found

| # | Category | Severity | Description | File | Fix |
|---|----------|----------|-------------|------|-----|
| 1 | Layout | CRITICAL | Content area has no right column — reference shows a 2-col layout with a detail panel | Deals.tsx | Add a flex row wrapper with a detail panel div |
| 2 | Spacing | MEDIUM | Section header padding too large. Reference ≈ 16px top, local ≈ 32px | Deals.css | Change .deals-page__header padding-top from var(--space-6) to var(--space-4) |
| 3 | Typography | MEDIUM | "New Deal" button text uppercase in reference — not in local | Deals.css | Add text-transform: uppercase (but use var(--letter-spacing-caps) for tracking) |
| 4 | Color | LOW | Table row hover background slightly darker in reference | Deals.css | Change --color-surface to --color-bg on tr:hover |
| 5 | Content | LOW | Reference shows 8 rows, local shows 3 | Deals.tsx | Extend mock data array to 7–8 entries |

### Convergence score
{CRITICAL_COUNT} critical · {MEDIUM_COUNT} medium · {LOW_COUNT} low · {NEGLIGIBLE_COUNT} negligible

Overall: {HIGH / MEDIUM / LOW / NEGLIGIBLE}
```

**Severity definitions:**
- **CRITICAL**: layout breaks, wrong component type, missing major section — visible at a glance
- **MEDIUM**: wrong spacing tier, wrong font weight, wrong color family — visible on inspection
- **LOW**: minor spacing delta (1 token off), subtle color shade, minor content shape
- **NEGLIGIBLE**: anti-aliasing, OS font rendering, sub-pixel rounding — unfixable

---

### Step D — Convergence check (strict)

**Before any convergence decision, verify the structural-completeness gate.** Walk the reference one more time and list every distinct element type. For each, confirm it appears in local. If **any** reference element is missing, promote that item to CRITICAL regardless of prior severity.

**Stop with success** only if ALL of the following hold:
1. Zero CRITICAL differences
2. Zero MEDIUM differences
3. Structural completeness: every element type from the reference is present in local
4. Pixel-diff ratio ≤ iteration's threshold (iter 1: 5%, iter 2: 3%, iter 3: 2%, iter 4: 1%, iter 5: 0.5%)

**Continue** if: any of (1)(2)(3)(4) fails AND iteration < MAX_ITERATIONS.
**Stop with plateau** if: score has not changed (same categories, same severities) AND no fixes were applied last iteration.

> **Do not declare SUCCESS on LOW-only when the local is missing elements from the reference.** A pixel-perfect prototype requires every element to be present — a cleaner "stub" is not acceptable as a success state.

---

### Step E — Apply fixes

Only run this step if Step D says "Continue".

**Fix scope rules by iteration:**

| Iterations | Scope |
|-----------|-------|
| 1–2 | CSS only — spacing, color, typography. Do not touch JSX. |
| 3 | CSS + Ahoy prop changes (e.g. `level`, `size`, `color` props). Minimal JSX edits. |
| 4–5 | CSS + JSX allowed — structural layout changes, component swaps, mock data updates. |

**Fix discipline:**
- Fix CRITICAL items first, then MEDIUM, then LOW.
- Apply only the minimum change that addresses the difference. Do not rewrite sections unrelated to the diff.
- Never use raw hex colors, raw px values, or raw font weights. Use only `var(--token)` references from `prototype/src/tokens.css`.
- Never remove CSS that isn't related to a reported difference.
- If a CRITICAL fix requires JSX changes and the iteration scope forbids it, note it and defer to the next iteration.

Apply each fix using the `Edit` tool with exact string matching. After all fixes:

1. Run `node scripts/token-audit.js` — if exit code ≠ 0, fix all reported violations before continuing.
2. Run `cd prototype && npx tsc --noEmit` — if errors, fix them.

Report what was changed:

```
### Changes applied (iteration {iteration})
- Deals.css: changed .deals-page padding-top from var(--space-6) → var(--space-4)
- Deals.css: added text-transform: uppercase to .deals-page__section-label
- Deals.tsx: extended mock data from 3 → 7 rows
- Token audit: ✓ passed
- TypeScript: ✓ passed
```

---

### Step F — Advance iteration

Increment `iteration`. Set `previous_score` to the score from Step C. Return to [Iteration start](#iteration-loop--repeat-up-to-max_iterations-times).

---

## Final report

Output this when the loop ends (success, cap, or plateau):

```
## Visual Match — Complete

**Outcome**: {SUCCESS ✓ / CAP REACHED / PLATEAU DETECTED}
**Iterations run**: {N} of {MAX_ITERATIONS}
**Resolution used**: 1920 × 1080

### Screenshots saved
- Reference: visual-match-reference.png, visual-match-reference-full.png
- Iterations: visual-match-local-1.png … visual-match-local-{N}.png (+ -full variants)

### Final state
{Repeat the diff table from the last Step C, or write "No significant differences remain."}

### Remaining differences (if any)
These require manual attention:
- {item}: {reason why it cannot be auto-fixed — e.g. "font rendering difference between OS and web", "requires dynamic data", "Ahoy component does not support this variant"}

### Files modified
- prototype/src/pages/{PageName}.tsx
- prototype/src/pages/{PageName}.css

### Token audit: ✓ / ✗
### TypeScript: ✓ / ✗
```

If outcome is SUCCESS: stop.
If outcome is CAP REACHED or PLATEAU: list remaining differences so the user can decide whether to continue manually.
