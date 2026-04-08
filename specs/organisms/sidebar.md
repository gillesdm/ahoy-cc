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
│   │ Logo Mark │   │  ← 54×54 teal rounded square, 18px from top
│   └───────────┘   │
│                   │
│   ┌───────────┐   │
│   │  [Icon]   │   │
│   │ Get start │   │  ← SidebarMenuItem
│   └───────────┘   │
│   ┌───────────┐   │
│   │  [Icon]   │   │
│   │ Calendar  │   │  ← SidebarMenuItem (active state shown via `page` prop)
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
2. **Logo Mark** — 54×54 teal rounded square (`--radius-md`), centered horizontally, `18px` from the top. Contains the Teamleader brand icon.
3. **Menu List** — Vertical stack of [`SidebarMenuItem`](../molecules/sidebar-menu-item.md) instances starting at `84px` from the top. No dividers between items.
4. **SidebarMenuItem** — Each item: 24×24 icon stacked above a short label. See [SidebarMenuItem](../molecules/sidebar-menu-item.md).

Navigation destinations (in order):
Get started · Calendar · Companies · Contacts · Deals · Quotations · Projects · Planning · Revenue · Expenses · Work Orders · Tickets · Products · Timesheets · Insights · Settings

## Tokens Used

| Role | Token |
|------|-------|
| Logo background | `var(--color-accent)` |
| Logo border radius | `var(--radius-md)` |
| Menu item text | `var(--color-surface)` |
| Menu item padding | `var(--space-4)` |
| Font size | `var(--font-size-xs)` |
| Font weight | `var(--font-weight-medium)` |
| Line height | `var(--line-height-tight)` |

Non-tokenised structural values:

| Property | Value | Reason |
|----------|-------|--------|
| Sidebar background | `#2a3b4d` | Ahoy Layer 1 primitive `--color-teal-dark`; no Layer 2 semantic nav/surface token exists for inverted dark backgrounds |
| Sidebar width | `144px` | Fixed application shell dimension; not a reusable spacing decision |
| Logo size | `54×54px` | Brand-specific logo mark dimensions |
| Logo top offset | `18px` | Brand-specific positioning within the sidebar shell |
| Menu list top offset | `84px` | Distance from top of sidebar to first menu item; derived from logo height + offset |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `page` | `"Dashboard" \| "Calendar" \| "Get started"` | `"Dashboard"` | Controls which menu item renders in the active state |
| `className` | `string` | `undefined` | Optional override for the root element's class |

## States

| State | Visual |
|-------|--------|
| Default | All items rendered at equal visual weight on the dark navy background |
| Active item | The item matching the current `page` value receives a highlighted background treatment |
| Hover (item) | Individual `SidebarMenuItem` background lightens on pointer hover |

## Code Example

```tsx
// Sidebar is a custom organism — not an Ahoy import.
// Compose it from SidebarMenuItem instances:

type SidebarProps = {
  page?: "Dashboard" | "Calendar" | "Get started";
};

function Sidebar({ page = "Dashboard" }: SidebarProps) {
  return (
    <nav className="sidebar">
      <div className="sidebar__logo">
        <img src={teamleaderLogoUrl} alt="Teamleader" />
      </div>
      <ul className="sidebar__menu">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <a
              className={`sidebar-menu-item${page === item.page ? " sidebar-menu-item--active" : ""}`}
              href={item.href}
              aria-current={page === item.page ? "page" : undefined}
            >
              <img src={item.icon} alt="" width={24} height={24} />
              <span className="sidebar-menu-item__label">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
```

## Uses

- [Color](../foundations/color.md) — `--color-accent` for the logo mark; `--color-surface` for inverted text
- [Spacing](../foundations/spacing.md) — `--space-4` (12px) for menu item padding
- [Typography](../foundations/typography.md) — `--font-size-xs`, `--font-weight-medium`, `--line-height-tight`
- [Radius](../foundations/radius.md) — `--radius-md` for the logo mark corners
- [Icon](../components/icon.md) — 24×24 SVG icons within each menu item
- [SidebarMenuItem](../molecules/sidebar-menu-item.md) — each navigation destination in the menu list

## Used by

_No known usages yet. This organism is the top-level navigation shell._
