# Sidebar

## Metadata
- **Name:** Sidebar
- **Category:** Organism
- **Status:** Stable
- **Source:** Custom — not a direct Ahoy component; uses Ahoy primitives internally
- **Figma:** `LHH25GN90ljQaBEUNMsdJn` node `33452:39194` (Page=Dashboard)

## Overview

**When to use:**
- As the primary vertical navigation shell for the Teamleader application
- When the user needs persistent access to all top-level modules (Calendar, Contacts, Deals, etc.)

**When not to use:**
- For secondary or contextual navigation — use [`Tab`](../components/tab.md) or a drawer pattern instead
- For mobile viewports — the sidebar collapses into a different navigation pattern

## Anatomy

```
┌───────────────────┐
│   ┌───────────┐   │
│   │ Logo Mark │   │  ← 54×54 teal rounded square with Teamleader icon, 18px from top
│   └───────────┘   │
│                   │
│   ┌───────────┐   │
│   │  [Icon]   │   │
│   │ Get start │   │  ← SidebarMenuItem (default active)
│   └───────────┘   │
│   ┌───────────┐   │
│   │  [Icon]   │   │
│   │ Calendar  │   │  ← SidebarMenuItem
│   └───────────┘   │
│        …          │
│   ┌───────────┐   │
│   │  [Icon]   │   │
│   │ Settings  │   │  ← last SidebarMenuItem
│   └───────────┘   │
└───────────────────┘
      ← 144px →
```

1. **Root** — Fixed-width (`144px`), full-height column. Dark navy background. `overflow: hidden`.
2. **Logo Mark** — 54×54 teal rounded square (`--radius-md`), centered horizontally, `18px` from the top. Contains the Teamleader brand icon (white arrow mark, 39×27px).
3. **Menu List** — Vertical stack of [`SidebarMenuItem`](../molecules/sidebar-menu-item.md) instances starting at `84px` from the top. No dividers between items.
4. **SidebarMenuItem** — Each item: 24×24 icon stacked above a short label. See [SidebarMenuItem](../molecules/sidebar-menu-item.md).

Navigation destinations (in order):
Get started · Calendar · Companies · Contacts · Deals · Quotations · Projects · Planning · Revenue · Expenses · Work Orders · Tickets · Products · Timesheets · Insights · Settings

## Tokens Used

| Role | Token |
|------|-------|
| Sidebar background | `var(--color-nav-bg)` |
| Logo background | `var(--color-accent)` |
| Logo border radius | `var(--radius-md)` |
| Menu item text | `var(--color-surface)` |
| Menu item padding | `var(--space-4)` |
| Font size | `var(--font-size-xs)` |
| Font weight | `var(--font-weight-medium)` |
| Line height | `var(--line-height-tight)` |
| Item hover background | `var(--color-nav-item-hover)` |
| Item active background | `var(--color-nav-item-active)` = `var(--color-accent)` — full teal fill |
| Item active+hover background | `var(--color-nav-item-active-hover)` = `var(--color-accent-border)` — darker mint |

Non-tokenised structural values:

| Property | Value | Reason |
|----------|-------|--------|
| Sidebar width | `144px` | Fixed application shell dimension; not a reusable spacing decision |
| Logo size | `54×54px` | Brand-specific logo mark dimensions |
| Logo icon size | `39×27px` | Brand-specific Teamleader arrow mark |
| Logo top offset | `18px` (`--space-5`) | Brand-specific positioning within the sidebar shell |
| Menu list top offset | `84px` | Distance from top of sidebar to first menu item; derived from logo height + offset |
| Icon-to-label gap | `3px` (`--space-1`) | Compact tight gap specific to this stacked layout |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `Page` | `"Get started"` | Controls which menu item renders in the active state |
| `onNavigate` | `(page: Page) => void` | `undefined` | Callback fired when the user clicks a nav item |
| `className` | `string` | `undefined` | Optional override for the root element's class |

Where `Page` is:
```ts
type Page =
  | 'Get started'
  | 'Calendar'
  | 'Companies'
  | 'Contacts'
  | 'Deals'
  | 'Quotations'
  | 'Projects'
  | 'Planning'
  | 'Revenue'
  | 'Expenses'
  | 'Work Orders'
  | 'Tickets'
  | 'Products'
  | 'Timesheets'
  | 'Insights'
  | 'Settings';
```

## States

| State | Visual |
|-------|--------|
| Default | All items rendered at equal visual weight on the dark navy background |
| Active item | The item matching the current `page` value receives a full teal fill (`var(--color-nav-item-active)` = `var(--color-accent)`, `#00b2b2`) — the same hue as the logo mark |
| Hover (item) | Individual `SidebarMenuItem` background changes to `var(--color-nav-item-hover)` |
| Active + hover | Active item on hover darkens to `var(--color-nav-item-active-hover)` = `var(--color-accent-border)` (`#008c8c`) |

## Icons

**Rule:** All nav item icons **must** come from the `@teamleader/ahoy` npm package. Custom SVGs, external icon libraries, or image assets (e.g. Figma URL exports) are not permitted unless explicitly agreed with the design team.

**Import pattern** — direct import, not the barrel export:

```ts
import Svg24X24CalendarFilled from '@teamleader/ahoy/dist/es/assets/icons/components/24X24CalendarFilled';
```

**Variant:** Use the `Filled` variant for all sidebar nav items. The icon SVG uses `fill: currentColor`, so it inherits white from the parent button's `color: var(--color-surface)` — no extra color prop needed.

**Icon mapping:**

| Nav item | Ahoy icon component |
|----------|---------------------|
| Get started | `24X24RocketFilled` |
| Calendar | `24X24CalendarFilled` |
| Companies | `24X24BuildingFilled` |
| Contacts | `24X24ContactsFilled` |
| Deals | `24X24HandshakeFilled` |
| Quotations | `24X24InvoiceFilled` |
| Projects | `24X24ProjectsFilled` |
| Planning | `24X24ScheduleFilled` |
| Revenue | `24X24MoneyFilled` |
| Expenses | `24X24ExpensesFilled` |
| Work Orders | `24X24WorkorderFilled` |
| Tickets | `24X24TicketFilled` |
| Products | `24X24ProductsFilled` |
| Timesheets | `24X24TimerFilled` |
| Insights | `24X24StatsFilled` |
| Settings | `24X24SettingsFilled` |

---

## Code Example

```tsx
// Sidebar is a custom organism — not an Ahoy import.
// Icons come from @teamleader/ahoy icon components (fill: currentColor — inherits white from CSS).

import Sidebar, { type Page } from './components/Sidebar';

// Icons are imported directly inside Sidebar.tsx, e.g.:
// import Svg24X24CalendarFilled from '@teamleader/ahoy/dist/es/assets/icons/components/24X24CalendarFilled';
// Use the Filled variant for all nav items. Icons render white via CSS color: var(--color-surface).

function App() {
  const [page, setPage] = useState<Page>('Get started');

  return (
    <div className="app-shell">
      <Sidebar page={page} onNavigate={setPage} />
      <main className="app-main">
        {/* page content */}
      </main>
    </div>
  );
}
```

## Uses

- [Color](../foundations/color.md) — `--color-nav-bg` for sidebar background; `--color-accent` for logo mark; `--color-surface` for inverted text; `--color-nav-item-hover/active/active-hover` for interaction states
- [Spacing](../foundations/spacing.md) — `--space-4` (12px) for menu item padding; `--space-5` (18px) for logo top offset
- [Typography](../foundations/typography.md) — `--font-size-xs`, `--font-weight-medium`, `--line-height-tight`
- [Radius](../foundations/radius.md) — `--radius-md` for the logo mark corners
- [SidebarMenuItem](../molecules/sidebar-menu-item.md) — each navigation destination in the menu list

## Used by

- [Layout](../patterns/layout.md) — Sidebar is the left column of the app shell
