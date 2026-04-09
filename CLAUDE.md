# Design Specs — Ahoy Demo

## Project

Vite + React 18 + TypeScript demo app using the `@teamleader/ahoy` design system (v3.x).
The project serves as a reference implementation for how Ahoy integrates with a Vite app.

## Stack

- **Framework:** React 18, TypeScript
- **Build:** Vite 6
- **Routing:** React Router v7 (`react-router-dom`) — `<BrowserRouter>` in `main.tsx`, routes defined in `App.tsx`
- **Design System:** `@teamleader/ahoy` v3.4.0
- **Styling:** CSS custom properties (no CSS modules, no Tailwind)

## AI Coding Instructions

> Before writing or modifying any UI code, read the relevant spec file in `specs/`.
> Use only tokens from `ahoy-demo/src/tokens.css`. Run the token audit script before
> committing. **Zero errors required.**

### Workflow

1. Find the relevant spec: `specs/foundations/`, `specs/atoms/`, `specs/molecules/`, `specs/organisms/`, or `specs/patterns/`
2. Use only `var(--token)` references from `tokens.css` Layer 2
3. Never use raw hex colors, raw pixel values, or raw durations
4. Run the audit: `node scripts/token-audit.js` → must exit with code 0
5. Commit only when audit passes

### Token rules

| What you want | Use this |
|---------------|----------|
| Text color | `var(--color-text)` or `var(--color-text-subtle)` |
| Background | `var(--color-bg)` or `var(--color-surface)` |
| Border | `var(--color-border)` |
| Brand / CTA | `var(--color-accent)` |
| Spacing | `var(--space-1)` … `var(--space-9)` (or project-specific `--space-*`) |
| Font size | `var(--font-size-xs/sm/base/lg/xl)` |
| Font weight | `var(--font-weight-regular/medium/semibold/bold)` |
| Letter spacing (caps) | `var(--letter-spacing-caps)` or `var(--letter-spacing-caps-wide)` |
| Tabular numerals | `font-feature-settings: var(--font-feature-tabular)` |
| Border radius | `var(--radius-sm/md/lg/round)` |
| Shadow | `var(--elevation-1)` … `var(--elevation-4)` |
| Z-index | `var(--z-below/base/above/overlay/modal/toast)` |
| Transition | `var(--transition-border)` or `var(--transition-shadow)` |

### Ahoy Button level

`level` defaults to `'secondary'`. Always pass `level="primary"` explicitly for the mint CTA:

```tsx
<Button label="Click me" level="primary" />
```

### Ahoy imports

Import Ahoy components directly (avoid the barrel export — it includes DataGrid, Editor, etc.):

```tsx
// Good
import { Button } from '@teamleader/ahoy/dist/es/components/button';

// Avoid
import { Button } from '@teamleader/ahoy';
```

### CSS import order in main.tsx

```tsx
import './index.css'
import '@teamleader/ahoy/dist/es/index.css'
import './tokens.css'    // Must come after ahoy CSS
```

## Adding a new page

Follow these four steps to add a routed page to the app shell:

### 1. Add a nav item in `Sidebar.tsx`

Add an entry to `NAV_ITEMS`. Pick the right icon from `@teamleader/ahoy/dist/es/assets/icons/components/`:

```tsx
{ label: 'Reports', path: '/reports', icon: <Svg24X24StatsFilled /> },
```

The sidebar will render the link automatically. The TopBar heading is derived from `label` via `PATH_LABELS` in `App.tsx`.

### 2. Create the page component

Create `ahoy-demo/src/pages/Reports.tsx` (and a matching `Reports.css` if needed).
Read the relevant spec in `specs/` before writing any UI. All styling must use `var(--token)` references — no raw values.

```tsx
// ahoy-demo/src/pages/Reports.tsx
export default function ReportsPage() {
  return <div className="reports-page">…</div>;
}
```

### 3. Register the route in `App.tsx`

Import the component and add a `<Route>` inside `<Routes>`:

```tsx
import ReportsPage from './pages/Reports';
// …
<Route path="/reports" element={<ReportsPage />} />
```

### 4. Run the token audit

```bash
node scripts/token-audit.js   # must exit 0
```

## Claude Commands

All commands live in `.claude/commands/` and are available as slash commands in Claude Code.

### Setup

| Command | Description |
|---------|-------------|
| `/get-started` | Interactive wizard — install Figma MCP and/or Playwright MCP in one step |
| `/setup-figma-mcp` | Install Figma MCP into `~/.claude/settings.json` + auth instructions |
| `/setup-playwright-mcp` | Install Playwright MCP into `~/.claude/settings.json` |

### Specs

| Command | Argument | Description |
|---------|----------|-------------|
| `/create-spec [name]` | Component name | Create a new design spec through a guided interview |
| `/figma-spec [url]` | Figma URL | Generate a spec file from a Figma design |
| `/spec-lookup [description]` | Feature/component description | Look up relevant specs before building UI |

### Development

| Command | Argument | Description |
|---------|----------|-------------|
| `/create-component-from-spec [spec]` | Spec path or component name | Generate a React component from a spec, wiring Ahoy imports automatically |
| `/playwright-import "URL" ["action"]` | URL + optional action | Scrape a page with Playwright, map it to Ahoy components, generate a full prototype page |

## File Map

| Purpose | Path |
|---------|------|
| Token definitions (Layer 2) | `ahoy-demo/src/tokens.css` |
| Global reset | `ahoy-demo/src/index.css` |
| App styles | `ahoy-demo/src/App.css` |
| Router entry point | `ahoy-demo/src/main.tsx` |
| Route definitions | `ahoy-demo/src/App.tsx` |
| Nav items + sidebar | `ahoy-demo/src/components/Sidebar.tsx` |
| Color spec | `specs/foundations/color.md` |
| Spacing spec | `specs/foundations/spacing.md` |
| Typography spec | `specs/foundations/typography.md` |
| Border radius spec | `specs/foundations/radius.md` |
| Elevation spec | `specs/foundations/elevation.md` |
| Motion spec | `specs/foundations/motion.md` |
| Master token reference | `specs/tokens/token-reference.md` |
| Button atom spec | `specs/atoms/button.md` |
| Input atom spec | `specs/atoms/input.md` |
| IconButton atom spec | `specs/atoms/icon-button.md` |
| Counter molecule spec | `specs/molecules/counter.md` |
| Hero molecule spec | `specs/molecules/hero.md` |
| SidebarMenuItem molecule spec | `specs/molecules/sidebar-menu-item.md` |
| Next Steps organism spec | `specs/organisms/next-steps.md` |
| Sidebar organism spec | `specs/organisms/sidebar.md` |
| Layout patterns spec | `specs/patterns/layout.md` |
| All atom specs | `specs/atoms/` |
| All molecule specs | `specs/molecules/` |
| All organism specs | `specs/organisms/` |
| All pattern specs | `specs/patterns/` |
| Token audit script | `scripts/token-audit.js` |
