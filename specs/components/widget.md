# Widget

## Metadata
- **Name:** Widget
- **Category:** Layout / Container
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/widget`

## Overview
A structured card-like container with distinct Header, Body, and Footer sections. Built on `IslandGroup` with vertical direction, it provides consistent padding and sizing across all sections. Used for dashboard panels, summary cards, and settings groups.

**When to use:**
- Dashboard panels or data summary cards
- Settings groups with a title header and action footer
- Any content area that needs a clearly bounded, elevated surface

**When not to use:**
- Simple content grouping without a header — use `Island` directly
- Dialog content — use `Dialog`
- Sidebar content — use `SidePanel`

## Anatomy

```
IslandGroup[data-teamleader-ui="widget"] (direction: vertical)
├── Widget.Header
│     └── Island (alignItems: center, paddingVertical based on size)
│           └── children (title, actions, etc.)
├── Widget.Body
│     └── Island
│           └── children
└── Widget.Footer
      └── Island
            └── children (action buttons, etc.)
```

All sections share the same `size` prop, which is injected automatically by `Widget` via `cloneElement`.

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--elevation-1` / `--elevation-2` | Box shadow (inherited from `Island` / `IslandGroup`) |
| `--color-surface` / `--color-neutral-lightest` | Background (from Island) |
| `--color-border` (`--color-neutral-dark`) | Island border (from Island) |
| `--radius-md` / `--border-radius-medium` | Corner radius (from Island) |
| `--spacer-small` / `--spacer-regular` / `--spacer-medium` | Island padding (size-dependent) |

### Widget.Header minimum heights (from theme.css)

| Size | Min-height |
|------|------------|
| `small` | 36 px |
| `medium` | 48 px |
| `large` | 72 px |

### Widget.Header vertical padding (paddingVertical)

| Size | Value |
|------|-------|
| `small` | 1 (3 px) |
| `medium` | 2 (6 px) |
| `large` | 3 (9 px) |

## Props / API

### Widget

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Propagated to all Header/Body/Footer children |
| `children` | `ReactNode` | — | `Widget.Header`, `Widget.Body`, `Widget.Footer` in order |
| `className` | `string` | — | Extra class names |

All Box / IslandGroup props are forwarded.

### Widget.Header

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | (injected) | — | Auto-injected by Widget; controls min-height and padding |
| `children` | `ReactNode` | — | Title text, badge, action buttons, etc. |

### Widget.Body / Widget.Footer

Accept any children and all Island props. Size is injected by Widget.

## States

| State | Visual Description |
|-------|--------------------|
| Default | Elevated card with header / body / footer separated by Island borders |
| Small | Compact header (36 px); tighter padding |
| Large | Tall header (72 px); more spacious padding |

## Code Example

```tsx
import Widget from '@teamleader/ahoy/dist/es/components/widget';
import { Heading3, TextBody } from '@teamleader/ahoy/dist/es/components/typography';
import Button from '@teamleader/ahoy/dist/es/components/button';

function SummaryCard() {
  return (
    <Widget size="medium">
      <Widget.Header>
        <Heading3>Revenue this month</Heading3>
      </Widget.Header>
      <Widget.Body>
        <TextBody>€ 24,150.00</TextBody>
      </Widget.Body>
      <Widget.Footer>
        <Button label="View details" level="secondary" size="small" />
      </Widget.Footer>
    </Widget>
  );
}
```

## Cross-references
- `Island` / `IslandGroup` — the underlying layout primitives
- `Dialog` — blocking overlaid content container
- `SidePanel` — slide-in panel with Header/Body/Footer pattern
