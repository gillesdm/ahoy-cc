# SidebarMenuItem

## Metadata
- **Name:** SidebarMenuItem
- **Category:** Molecule
- **Status:** Stable
- **Source:** Custom — not a direct Ahoy component; used within `Sidebar`
- **Import:** N/A — composed in-place within the Sidebar organism

## Overview

**When to use:**
- As a single clickable navigation entry in the Teamleader vertical sidebar
- When combining a 24×24 icon with a short label stacked vertically

**When not to use:**
- Horizontal navigation — use [`Tab`](../components/tab.md) instead
- Action menus or dropdowns — use [`Menu`](../components/menu.md) or [`MenuButton`](../components/menuButton.md)
- Inline links — use [`Link`](../components/link.md)

## Anatomy

```
┌──────────────────────────────┐
│                              │
│          [  Icon  ]          │  ← 24×24 SVG, horizontally centered
│           Label              │  ← 12px medium, centered, 3px below icon
│                              │
└──────────────────────────────┘
         ← 144px wide →
```

1. **Root** — Full-width container (matches sidebar width), `flex` column, `align-items: center`, `justify-content: center`, `12px` padding on all sides
2. **Icon** — 24×24 SVG rendered via [`Icon`](../components/icon.md); sits at the top of the stack
3. **Label** — Short text string (1–2 words); 12px Inter Medium, white, centered; sits directly below the icon with a 3px gap

## Tokens Used

| Role | Token |
|------|-------|
| Text color | `var(--color-surface)` |
| Padding | `var(--space-4)` |
| Font size | `var(--font-size-xs)` |
| Font weight | `var(--font-weight-medium)` |
| Line height | `var(--line-height-tight)` |

Non-tokenised structural values:

| Property | Value | Reason |
|----------|-------|--------|
| Item width | `144px` | Fixed to sidebar column width; inherits from parent, not a reusable spacing decision |
| Icon size | `24×24px` | Standard Ahoy icon grid size; no Layer 2 dimension token defined |
| Icon-to-label gap | `3px` | Compact tight gap specific to this stacked layout; not a scale step |

## States

| State | Visual |
|-------|--------|
| Default | Icon + label on the sidebar's dark navy background; no highlight |
| Hover | Subtle white tint (`var(--color-nav-item-hover)`) applied by the Sidebar root |
| Active / Selected | Full teal fill (`var(--color-nav-item-active)` = `var(--color-accent)`, `#00b2b2`) — same hue as the logo mark; managed by `Sidebar` via `page` prop |
| Active + hover | Darkens to `var(--color-nav-item-active-hover)` = `var(--color-accent-border)` (`#008c8c`) |

## Code Example

```tsx
// SidebarMenuItem is not exported as a standalone Ahoy component.
// Compose it within the Sidebar organism:

<div className="sidebar-menu-item">
  <img src={calendarIconUrl} alt="" width={24} height={24} />
  <span className="sidebar-menu-item__label">Calendar</span>
</div>
```

## Uses

- [Color](../foundations/color.md) — `--color-surface` for white text on the inverted dark background
- [Spacing](../foundations/spacing.md) — `--space-4` (12px) for uniform item padding
- [Typography](../foundations/typography.md) — `--font-size-xs`, `--font-weight-medium`, `--line-height-tight`
- Icons — 24×24 `Filled` components from `@teamleader/ahoy/dist/es/assets/icons/components/`; render white via `fill: currentColor` inheriting `color: var(--color-surface)` from the parent button

## Used by

- [Sidebar](../organisms/sidebar.md) — repeated for each navigation destination in the vertical menu list
