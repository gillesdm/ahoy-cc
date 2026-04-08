# StatusBar

## Metadata
- **Name:** StatusBar
- **Category:** Data Display / Visualization
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/statusBar`

## Overview
A horizontal segmented progress bar rendered as an SVG. Each segment represents a proportion of a total amount and is coloured by a named colour family. An optional tooltip shows a legend with amounts and labels.

**When to use:**
- Visualising part-to-whole relationships (e.g. task status breakdown, budget allocation)
- Compact inline charts that need a colour legend on hover

**When not to use:**
- Single-value progress — use a simple progress bar
- When precise values must always be visible — embed labels directly instead

## Anatomy

```
Container (span or Fragment)
└── Tooltip? (wraps entire SVG when tooltip=true)
      └── svg.segmented-progress-bar  (height: 6 px)
            └── <rect> ×N             (one per item, coloured by item.color)

Tooltip content:
└── Box (column)
      └── Box (row) ×N
            ├── Bullet (colored dot)
            └── TextBodyCompact
                  ├── Monospaced (amount)
                  └── " {title}"
```

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-neutral-dark` | Fill for `color: 'neutral'` segments |
| `--color-violet-dark` | Fill for `color: 'violet'` segments |
| `--color-gold-dark` (`--color-warning`) | Fill for `color: 'gold'` segments |
| `--color-mint` (`--color-accent`) | Fill for `color: 'mint'` segments |
| `--color-aqua-dark` | Fill for `color: 'aqua'` segments |
| `--color-ruby-dark` (`--color-error`) | Fill for `color: 'ruby'` segments |
| `--border-radius-medium` (`--radius-md`) | SVG border-radius (4 px) |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `StatusBarItem[]` | `[]` | Array of segments to render |
| `width` | `number` | `120` | Fixed pixel width of the SVG (ignored when `fullWidth` is true) |
| `fullWidth` | `boolean` | — | Stretches the bar to 100 % of its container |
| `tooltip` | `boolean` | — | Wraps the bar in a `Tooltip` showing the item legend |
| `className` | `string` | — | Extra class names on the SVG element |

### StatusBarItem shape

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | Unique key for React reconciliation |
| `amount` | `number` | Numeric value for this segment (used to compute proportional width) |
| `color` | `'neutral' \| 'violet' \| 'gold' \| 'mint' \| 'aqua' \| 'ruby'` | Segment fill colour |
| `title` | `string` | Label shown in the tooltip legend |

## States

| State | Visual Description |
|-------|--------------------|
| Default | Coloured segments separated by 1 px gaps, 6 px height |
| With tooltip | Hovering shows a floating legend with bullets, amounts, and titles |
| Full width | Bar stretches to fill container width |

## Code Example

```tsx
import StatusBar from '@teamleader/ahoy/dist/es/components/statusBar';

const items = [
  { key: 'open',     amount: 12, color: 'mint',    title: 'Open' },
  { key: 'pending',  amount: 5,  color: 'gold',    title: 'Pending' },
  { key: 'closed',   amount: 8,  color: 'neutral', title: 'Closed' },
  { key: 'overdue',  amount: 3,  color: 'ruby',    title: 'Overdue' },
];

function TaskStatusBar() {
  return <StatusBar items={items} fullWidth tooltip />;
}
```

## Cross-references
- `Bullet` — coloured dot used in the tooltip legend
- `Tooltip` — wraps the bar when `tooltip` is true
- `Monospaced` — formats numeric amounts in the tooltip
