# ButtonGroup

## Metadata
- **Name**: ButtonGroup
- **Category**: Actions / Layout
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/buttonGroup`

## Overview

**When to use**: Use ButtonGroup to render two or more related Buttons in a horizontal row with consistent spacing. Use the `segmented` variant to create a connected toggle-style button bar where buttons share borders (no gap, flush corners). Supports a controlled selection model via `value` / `onChange` that automatically sets the `active` prop on the matching child Button.

**When not to use**: Do not use ButtonGroup for navigation tabs (use a Tab component). Do not use when buttons are unrelated actions — place them individually. Do not nest ButtonGroups.

## Anatomy

```
Normal mode:
[ Button A ]  [ Button B ]  [ Button C ]
     ↑  6px gap between each  ↑

Segmented mode:
[Button A][Button B][Button C]
 ╔═══╗ ← shared borders, no gap; rounded corners only on first/last
```

Parts:
- **Root** — `Box` with `data-teamleader-ui="button-group"`, flex row, align-items center
- **Children** — `Button` components; non-Button children are rendered as-is
- **Segmented borders** — adjacent buttons overlap by 1 px (`margin-left: -1px`) with square inner corners

## Tokens Used

| CSS Token | Role |
|---|---|
| `--space-2` (via `--button-group-button-margin: 0.6 * --unit` = 6px) | Gap between buttons in normal mode |
| `--radius-md` (via `--button-group-button-border-radius: 0.4 * --unit` = 4px) | Corner radius on segmented first/last children |
| `--color-border` (`--color-neutral-dark`) | Shared border between segmented buttons |
| `--transition-border` | Button border-color transition |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `segmented` | `boolean` | `false` | Enables flush connected layout with no gap and shared borders |
| `value` | `string` | — | Currently selected button value; sets `active` on the matching child |
| `onChange` | `(value: string, event: MouseEvent) => void` | — | Called when a child Button with a `value` prop is clicked |
| `children` | `ReactNode` | — | `Button` components (non-Button children rendered unchanged) |
| `className` | `string` | — | Additional class on the root element |
| `...boxProps` | `BoxProps` | — | Box layout props forwarded to the root |

Child `Button` props used by ButtonGroup when `value` is set:

| Prop | Type | Description |
|---|---|---|
| `value` | `string` | Identifies this button in the selection model |

## States

| State | Visual description |
|---|---|
| Normal | Buttons separated by 6 px gap, each with independent border-radius |
| Segmented | Buttons flush together; first child rounded-left, last child rounded-right, inner corners square |
| With selection (`value`) | Button matching `value` receives `active=true` (pressed appearance) |

## Code Example

```tsx
import ButtonGroup from '@teamleader/ahoy/dist/es/components/buttonGroup';
import Button from '@teamleader/ahoy/dist/es/components/button';

// Normal group
<ButtonGroup>
  <Button level="secondary">Cancel</Button>
  <Button level="primary">Save</Button>
</ButtonGroup>

// Segmented toggle
<ButtonGroup
  segmented
  value={selectedView}
  onChange={(val) => setSelectedView(val)}
>
  <Button value="list">List</Button>
  <Button value="grid">Grid</Button>
  <Button value="calendar">Calendar</Button>
</ButtonGroup>
```

## Cross-references
- `Button` — individual button component used as children
- `ActionPopover` — uses ButtonGroup internally for footer actions
- `Flex` — alternative for custom button row layouts without selection model
