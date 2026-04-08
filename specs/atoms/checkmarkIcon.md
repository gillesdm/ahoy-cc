# CheckmarkIcon

## Metadata
- **Name:** CheckmarkIcon
- **Category:** Selection / Indicator
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/checkmarkIcon`

## Overview
**When to use:** Use CheckmarkIcon as a visual selection indicator inside list items, option rows, or selectable cards. It renders either a filled mint checkmark badge (selected state) or an empty circular outline (unselected state), making it a compact selection affordance that works alongside checkbox-like UX patterns without using a native checkbox.

**When not to use:** Do not use for standalone form checkboxes — use the Ahoy `Checkbox` component instead. Do not use where a simple boolean indicator suffices and no selection metaphor is needed.

## Anatomy

```
Unselected (default)
┌──────────────────────────────┐
│  ○   circular outline ring   │  ← .select-icon (20×20px, border-radius 100%)
└──────────────────────────────┘

Selected
┌──────────────────────────────┐
│  ✔   filled checkmark badge  │  ← <Icon color="mint"> wrapping IconCheckmarkBadgedMediumFilled
└──────────────────────────────┘

Disabled + selected
  ✔  same Icon but color="neutral"

Disabled + unselected
  ○  .select-icon--disabled (neutral background, no border contrast)
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-border` (`--color-neutral-dark`) | Unselected ring border color |
| `--color-accent` (`--color-mint`) | Selected icon fill color |
| `--color-surface` (`--color-white`) | Unselected ring background |
| `--color-neutral` (`--color-neutral`) | Disabled background and border |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `selected` | `boolean` | `false` | When `true`, renders the filled checkmark icon instead of the outline ring |
| `disabled` | `boolean` | `false` | When `true`, mutes the indicator color (neutral tint for icon, neutral fill for ring) |
| `className` | `string` | — | Additional CSS class names forwarded to the root element |

## States

| State | Visual Description |
|---|---|
| Default (unselected) | White circle with 1px `--color-neutral-dark` border, 20×20px, 2px margin |
| Selected | Mint-filled `IconCheckmarkBadgedMediumFilled` icon at icon component default size |
| Disabled + unselected | Circle filled with `--color-neutral`, same neutral border — no contrast |
| Disabled + selected | Checkmark icon rendered at `color="neutral"` — greyed out |

## Code Example

```tsx
import CheckmarkIcon from '@teamleader/ahoy/dist/es/components/checkmarkIcon';

// Unselected
<CheckmarkIcon selected={false} />

// Selected
<CheckmarkIcon selected />

// Disabled unselected
<CheckmarkIcon disabled />

// Disabled selected
<CheckmarkIcon selected disabled />
```

## Cross-references
- `Checkbox` — full form checkbox with label and validation
- `Icon` — base icon wrapper used internally for the selected state
- `datagrid` — uses CheckmarkIcon in `CheckboxLineCell` / `CheckboxHeaderCell`
