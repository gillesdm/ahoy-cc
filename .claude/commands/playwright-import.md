---
description: Navigate to a URL with Playwright, map the main content area to Ahoy components, and generate a full routed page in the ahoy-demo prototype
argument-hint: "\"<URL>\" [\"natural language action to perform first\"]"
allowed-tools: Bash Glob Grep Read Write Edit AskUserQuestion
---

`$ARGUMENTS` contains the source URL and an optional browser action. Format: `"URL"` or `"URL" "action description"`.

**Argument parsing rules:**
- If any quoted strings are present: first quoted string = URL, second quoted string = action (if any). Do not split on whitespace.
- If no quotes: first whitespace-delimited token = URL, remainder = action.
- If no URL can be parsed: ask the user to provide one and stop.

---

## Step 1 — Navigate and optionally act

### 1a. Navigate
Call `browser_navigate` with the parsed URL.

### 1b. Auth guard
Call `browser_snapshot` immediately after navigation. Scan the ARIA tree for:
- A textbox whose accessible name contains "password" or "wachtwoord"
- Text matching: "Sign in", "Log in", "Log into", "Authentication required"
- A form containing both an email/username field and a password field

Also call `browser_evaluate('location.href')` and check if the URL now ends in `/login`, `/signin`, `/auth`, `/session/new`, or contains `?redirect=`.

If any auth pattern is detected, print the following and **stop**:

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

1. Call `browser_snapshot` to get the full ARIA accessibility tree
2. Find the element whose accessible name and role best matches the natural language description. Look for:
   - Exact or near-exact label matches (`name` attribute in the snapshot)
   - Role matches (e.g. "button" for "click the X button")
   - Position cues ("first", "top", "blue") if multiple candidates match
3. Call `browser_click` with that element's `ref`
4. Call `browser_wait_for` — wait for any text you expect to appear after the action, or wait 2 seconds if uncertain
5. If no element matches: report the mismatch, list the top 3 closest candidates from the snapshot, and ask the user to clarify before continuing

### 1d. Verify page is ready
Call `browser_snapshot` to confirm the page shows meaningful content (not a loading spinner or empty state). If still loading, call `browser_wait_for` again, up to 3 retries. If the page never loads, report the issue and stop.

---

## Step 2 — Extract content and map to Ahoy components

### 2a. Find content region and extract HTML
Call `browser_evaluate` with this self-contained JavaScript (no selector interpolation — avoids injection issues):

```
(function(){ var c=['main','[role="main"]','#content','.content','#main','.main-content','.page-content','.app-content__body']; for(var i=0;i<c.length;i++){var el=document.querySelector(c[i]);if(el)return JSON.stringify({selector:c[i],html:el.outerHTML.substring(0,50000)});} return JSON.stringify({selector:'body',html:document.body.outerHTML.substring(0,50000)}); })()
```

Parse the returned JSON string: `{ selector, html }`.
- `selector` — the matched region (e.g. `"main"`, `"[role=\"main\"]"`)
- `html` — raw DOM of the content area, capped at 50,000 characters
- If `selector` is `"body"`, the full page was used — exclude obvious nav/header/footer sections during mapping

### 2b. Snapshot the content region
Call `browser_snapshot` to get the ARIA accessibility tree. This is the **primary** source for element mapping. Use `html` from step 2a to supplement when ARIA roles are ambiguous (e.g. to distinguish a `<table>` from a CSS grid).

### 2c. Take a screenshot
Call `browser_take_screenshot` (fullPage: false) for a visual reference during plan review.

### 2d. Derive page metadata
- **pageName** — last non-empty path segment of the URL, converted to PascalCase:
  - `/deals` → `Deals`; `/deals/overview` → `Overview`
  - If last segment is a numeric ID, use second-to-last + "Detail": `/contacts/123` → `ContactDetail`
  - Strip query strings and hash fragments before processing
- **routePath** — last path segment with leading slash: `/deals`, `/contact-detail`
- **replacesPlaceholder** — check if `routePath` matches one of the 15 existing placeholders:
  `/calendar /companies /contacts /deals /quotations /projects /planning /revenue /expenses /work-orders /tickets /products /timesheets /insights /settings`

### 2e. Map each element to an Ahoy component
Walk the ARIA snapshot. For each significant UI element, apply the mapping table below.

**Rules:**
- **Ahoy first** — always prefer an Ahoy component, even if it behaves slightly differently from the source
- **No DataGrid** — `@tanstack/react-table` is not installed; map all tables to plain `<table>` HTML with token-based CSS
- **New component candidates** — flag an element if either:
  - No Ahoy component fits → `reason: "no-ahoy"`
  - The same structural pattern (role + children shape) appears **2 or more times** → `reason: "repeated"`, `count: N`
- **Skip** — decorative `<hr>` dividers, background images, and any sidebar/topbar/navigation chrome that matches the prototype shell

**Ahoy component reference:**

| ARIA role / HTML element | Ahoy component | Import path |
|--------------------------|---------------|-------------|
| `button` | `Button` | `components/button` |
| `input[type=text/email/number/search]` | `Input` | `components/input` |
| `input[type=checkbox]` | `Checkbox` | `components/checkbox` |
| `input[type=radio]` | `Radio` | `components/radio` |
| `select` / `combobox` | `Select` | `components/select` |
| `switch` / toggle | `Toggle` | `components/toggle` |
| `tab` / `tabpanel` | `Tab` | `components/tab` |
| `dialog` / `alertdialog` | `Dialog` | `components/dialog` |
| `tooltip` | `Tooltip` | `components/tooltip` |
| status badge / `[role=status]` | `StatusLabel` | `components/statusLabel` |
| chip / tag | `Tag` | `components/tag` |
| user avatar | `Avatar` | `components/avatar` |
| secondary nav menu | `Menu` | `components/menu` |
| menu trigger button | `MenuButton` | `components/menuButton` |
| `[role=alert]` / flash | `Banner` | `components/banner` |
| inline note | `Message` | `components/message` |
| `[role=progressbar]` (indeterminate) | `LoadingBar` | `components/loadingBar` |
| `[role=progressbar]` (with value) | `LoadingElement` | `components/loadingElement` |
| `a[href]` standalone link | `Link` | `components/link` |
| breadcrumb nav | `Link` chain | `components/link` |
| badge with count | `Badge` | `components/badge` |
| `h1`–`h6` / `p` text | `Typography` | `components/typography` |
| pagination controls | `Pagination` | `components/pagination` |
| split / multi-action button | `SplitButton` | `components/splitButton` |
| button toolbar | `ButtonGroup` | `components/buttonGroup` |
| popover / flyout | `Popover` | `components/popover` |
| action popover | `ActionPopover` | `components/actionPopover` |
| currency / money amount | `MoneyDisplay` | `components/moneyDisplay` |
| form label | `Label` | `components/label` |
| validation error/warning | `ValidationText` | `components/validationText` |
| `table` / `grid` | **plain `<table>`** | *(DataGrid excluded — no @tanstack/react-table)* |
| card / summary widget | `Widget` | `components/widget` |
| hero / page-top banner | `Hero` | `components/hero` |
| progress steps / wizard | `ProgressTracker` | `components/progressTracker` |
| counter +/- control | `Counter` | `components/counter` |
| empty / zero state | `EmptyState` | `components/emptyState` |
| page-level loading | `LoadingSpinner` | `components/loadingSpinner` |
| label + value pair | `LabelValuePair` | `components/labelValuePair` |
| collapsible section | `AdvancedCollapsible` | `components/advancedCollapsible` |

All Ahoy imports use direct paths: `import { X } from '@teamleader/ahoy/dist/es/components/x'`
Icon imports: `import SvgX from '@teamleader/ahoy/dist/es/assets/icons/components/XFilled'`

---

## Step 3 — Present plan and await approval

Present the following as formatted Markdown in the chat (not written to any file):

```
## Playwright Import Plan

**Source URL:** {url}
**Page name:** {pageName}Page
**Route:** {routePath}  ← replaces existing placeholder   (only if replacesPlaceholder)

### Files
| File | Action |
|------|--------|
| ahoy-demo/src/pages/{pageName}.tsx | CREATE |
| ahoy-demo/src/pages/{pageName}.css | CREATE |
| ahoy-demo/src/App.tsx | EDIT — add Route + import |
| ahoy-demo/src/components/Sidebar.tsx | EDIT or no change needed |

### Component mapping
| Source element | Ahoy component | Import |
|----------------|---------------|--------|
| {element}      | {Component}   | @teamleader/ahoy/dist/es/components/{path} |

### ⚠️ New component candidates
| Pattern | Reason | Count | Plan |
|---------|--------|-------|------|
| {desc} | No Ahoy equivalent | 1 | Inline HTML + CSS |
| {desc} | Repeated {N}× | N | Named function in page file |

(Omit the table if there are no new candidates.)

### Tables
⚠️ DataGrid requires @tanstack/react-table (not installed). Tables rendered as plain <table> with token CSS.
(Omit if no tables found.)
```

Then use `AskUserQuestion`:
- **Question**: "Does this plan look right?"
- **Options**: `[Looks good — write the files]`, `[I have a correction]`

If the user provides a correction: apply it to the mapping, regenerate the plan summary, and re-present. Loop until they approve. Do not write any files before approval.

---

## Step 4 — Generate the prototype page

Only proceed after approval in Step 3.

### 4a. Read existing files first
Read `ahoy-demo/src/App.tsx` and `ahoy-demo/src/components/Sidebar.tsx` in full before editing either. The `Edit` tool requires exact string matches — you need the actual content including whitespace.

### 4b. Write `ahoy-demo/src/pages/{pageName}.tsx`

```tsx
import './{pageName}.css';
import { Button } from '@teamleader/ahoy/dist/es/components/button';
// ... other Ahoy imports from the mapping

// Named function components for any repeated-pattern candidates:
// function StatCard({ title, value }: { title: string; value: string }) { ... }

export default function {pageName}Page() {
  // Static mock data — realistic but minimal (3–5 rows for lists)
  return (
    <div className="{pagename-kebab}-page">
      {/* Mapped Ahoy components here */}
    </div>
  );
}
```

Rules:
- Direct Ahoy imports only — never the barrel export
- `level="primary"` must be explicit on mint/CTA buttons; secondary is the default
- Static mock data — no API calls, no data-fetching state
- No inline styles — all visual values go in the CSS file
- For DataGrid-worthy tables: use `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` with CSS class names

### 4c. Write `ahoy-demo/src/pages/{pageName}.css`

All values **must** be `var(--token)` references — no raw hex, px values, numeric font-weight, or raw durations.

```css
.{pagename-kebab}-page {
  padding: var(--space-6);
}
```

Token reference:
- Spacing: `var(--space-1)` … `var(--space-9)`, `var(--space-section)`
- Colors: `var(--color-text)`, `var(--color-text-subtle)`, `var(--color-bg)`, `var(--color-surface)`, `var(--color-border)`, `var(--color-accent)`
- Typography: `var(--font-size-xs/sm/base/lg/xl)`, `var(--font-weight-regular/medium/semibold/bold)`
- Radius: `var(--radius-sm/md/lg/round)`
- Elevation: `var(--elevation-1)` … `var(--elevation-4)`
- Transition: `var(--transition-border)`, `var(--transition-shadow)`

### 4d. Edit `ahoy-demo/src/App.tsx`

**Import** — add after existing page imports:
```tsx
import {pageName}Page from './pages/{pageName}';
```

**Route** — find the `<Routes>` block. The existing placeholder routes use alignment spaces; match whitespace exactly when using the Edit tool. For example:
```
            <Route path="/deals"       element={<PlaceholderPage label="Deals" />} />
```
becomes:
```
            <Route path="/deals"       element={<DealsPage />} />
```
If adding a new route (not a placeholder replacement): append a `<Route>` line with matching indentation.

**PATH_LABELS** — auto-derived from NAV_ITEMS; no change needed for routes already in Sidebar. Exception: if the route is new and has no sidebar entry, add it manually:
```tsx
const PATH_LABELS = {
  ...Object.fromEntries(NAV_ITEMS.filter(item => item.path !== '/').map(item => [item.path, item.label])),
  '{routePath}': '{Page label}',
};
```

### 4e. Edit `ahoy-demo/src/components/Sidebar.tsx`

- If `routePath` matches an existing `NAV_ITEMS` entry: **no change needed**
- If adding a new route: add to `NAV_ITEMS` and add the icon import at the top:
  ```tsx
  import Svg24X24XxxFilled from '@teamleader/ahoy/dist/es/assets/icons/components/24X24XxxFilled';
  // ...
  { label: '{Page label}', path: '{routePath}', icon: <Svg24X24XxxFilled /> },
  ```
  Choose the most semantically fitting icon from `@teamleader/ahoy/dist/es/assets/icons/components/`.

### 4f. Run token audit

```bash
node scripts/token-audit.js
```

If exit code is non-zero: read the errors, fix each violating CSS line by replacing the raw value with the suggested `var(--token)`, and re-run. Repeat until exit code is 0. Do not proceed until the audit passes.

### 4g. TypeScript check

```bash
cd ahoy-demo && npx tsc --noEmit
```

If errors appear: fix the TypeScript issues in the generated files (wrong prop types, missing imports, incorrect component APIs) and re-run. Do not claim completion until this exits 0.

---

## Completion checklist

Before reporting done, confirm every item:

- [ ] URL parsed correctly from arguments
- [ ] Auth guard checked — stopped with message if login redirect detected
- [ ] Action (if provided) performed via ARIA tree matching before snapshotting
- [ ] Content region found via semantic HTML heuristic
- [ ] Every significant element mapped to Ahoy component or flagged as new-component candidate
- [ ] DataGrid not used (no `@tanstack/react-table` in project)
- [ ] New-component candidates categorised: `no-ahoy` or `repeated`
- [ ] Plan review presented with mapping table and new-component candidates
- [ ] User explicitly approved before any files were written
- [ ] `ahoy-demo/src/pages/{pageName}.tsx` created
- [ ] `ahoy-demo/src/pages/{pageName}.css` created with `var(--token)` references only
- [ ] All Ahoy imports use direct paths, not the barrel export
- [ ] `App.tsx` updated with Route and import
- [ ] `Sidebar.tsx` updated or confirmed no change needed
- [ ] `node scripts/token-audit.js` exits 0
- [ ] `npx tsc --noEmit` exits 0
