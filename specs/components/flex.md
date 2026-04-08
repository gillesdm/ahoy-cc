# Flex

## Metadata
- **Name:** Flex
- **Category:** Layout
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/flex`

## Overview
**When to use:** Use Flex as a convenience wrapper around `Box` for any flexbox layout. It pre-sets `display: flex` and `box-sizing: border-box`, and exposes a numeric `gap` prop (1–8) that maps to Ahoy spacer tokens. Use it for toolbars, button groups, card rows, header/footer layouts, and any linear arrangement of items.

**When not to use:** Do not use Flex when you need a CSS grid layout — use the `Grid` component. For fine-grained flexbox control (wrap, shrink, specific `flex` shorthand), use `Box` directly with its flex props.

## Anatomy

```
direction="row" (default):
┌────────────────────────────────────────────────┐
│  [child A]  gap  [child B]  gap  [child C]  …  │
└────────────────────────────────────────────────┘

direction="column":
┌──────────────┐
│  [child A]   │
│    gap       │
│  [child B]   │
│    gap       │
│  [child C]   │
└──────────────┘
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--space-1` / `--spacer-smallest` (3px) | `gap={1}` |
| `--space-2` / `--spacer-smaller` (6px) | `gap={2}` |
| `--space-4` / `--spacer-small` (12px) | `gap={3}` |
| `--space-5` / `--spacer-regular` (18px) | `gap={4}` |
| `--space-6` / `--spacer-medium` (24px) | `gap={5}` |
| `--space-7` / `--spacer-big` (36px) | `gap={6}` |
| `--space-8` / `--spacer-bigger` (48px) | `gap={7}` |
| `--space-9` / `--spacer-biggest` (72px) | `gap={8}` |

> `gap={0}` (default) applies no gap class; the gap is `0`.

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `direction` | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'` | `'row'` | Maps to `flex-direction` |
| `gap` | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8` | `0` | Gap between children using the Ahoy spacer scale |
| `children` | `ReactNode` | — | Flex children |
| `className` | `string` | — | Additional CSS class names |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |
| `...rest` | `BoxProps` | — | All Box props forwarded: `alignItems`, `justifyContent`, `flexWrap`, `padding`, `margin`, `backgroundColor`, etc. |

> The underlying `Box` exposes additional flex-specific props: `alignItems`, `justifyContent`, `flexWrap`, `flexShrink`, `flexGrow`, `alignSelf`, `order`.

## States

Flex is a layout-only component with no interactive states.

## Code Example

```tsx
import Flex from '@teamleader/ahoy/dist/es/components/flex';
import Button from '@teamleader/ahoy/dist/es/components/button';

// Horizontal toolbar with gap
<Flex gap={2} alignItems="center">
  <Button label="Save" level="primary" />
  <Button label="Cancel" />
</Flex>

// Vertical stack with medium gap
<Flex direction="column" gap={4}>
  <InputField label="First name" />
  <InputField label="Last name" />
</Flex>

// Space-between header row
<Flex justifyContent="space-between" alignItems="center" padding={4}>
  <Heading2>Page Title</Heading2>
  <Button label="Add new" level="primary" />
</Flex>
```

## Cross-references
- `Box` — the underlying primitive Flex delegates to; use Box for non-flex layouts
- `Grid` — use instead of Flex when a two-dimensional CSS grid is needed
- `ButtonGroup` — a specialized Flex-like component for grouped button rows
- `DataGrid` — uses Flex internally for pagination row layout
