# SplitButton

## Metadata
- **Name:** SplitButton
- **Category:** Action / Button
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/splitButton`

## Overview
A segmented button combining a primary action with a dropdown menu of alternative actions. The first `MenuItem` in the children list becomes the main button label; remaining items appear in the popover menu.

**When to use:**
- One clear primary action exists alongside a small set of secondary variants
- Saving/submitting with options: "Save", "Save and close", "Save as draft"

**When not to use:**
- When all actions are equally important — use a ButtonGroup
- When there is only one action — use Button

## Anatomy

```
BaseSplitButton (state manager)
└── render prop output:
      ├── Button (main action) ─┐ segmented
      ├── Button (chevron)     ─┘ ButtonGroup[segmented]
      └── Popover
            └── Menu
                  └── MenuItem ×N  (all items except the first)
```

When `processing` is true, only a single `Button` with `processing` indicator is rendered (no chevron).

## Tokens Used

| CSS Token | Role |
|-----------|------|
| Button level tokens | Inherited from `Button` component (primary / secondary / destructive) |
| `--color-violet` | Chevron icon colour for `secondary-with-marketing` level |
| Popover / Menu tokens | Inherited from `Popover` and `Menu` components |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `MenuItem[]` | — | Menu items; the first item's `label` becomes the main button text |
| `level` | `'primary' \| 'secondary' \| 'destructive' \| 'secondary-with-marketing'` | `'primary'` | Visual style of both buttons |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of both buttons |
| `disabled` | `boolean` | — | Disables both the main button and the chevron |
| `processing` | `boolean` | — | Shows a loading spinner and collapses to a single button |
| `onButtonClick` | `(event) => void` | — | Called when the main (left) button is clicked |
| `onSecondaryButtonClick` | `(event) => void` | — | Called when the chevron (right) button is clicked |
| `popoverProps` | `PopoverProps` | — | Props forwarded to the `Popover` component |

## States

| State | Visual Description |
|-------|--------------------|
| Default | Two joined buttons sharing a single border |
| Hover | Individual button hover states (inherited from Button) |
| Disabled | Both buttons disabled; muted appearance |
| Processing | Single button with spinner; chevron hidden |
| Menu open | Chevron button appears active; Popover with Menu items visible below |

## Code Example

```tsx
import SplitButton from '@teamleader/ahoy/dist/es/components/splitButton';
import { MenuItem } from '@teamleader/ahoy/dist/es/components/menu';

function SaveActions({ onSave, onSaveAndClose, onSaveDraft }) {
  return (
    <SplitButton
      level="primary"
      size="medium"
      onButtonClick={onSave}
    >
      <MenuItem label="Save" />
      <MenuItem label="Save and close" onClick={onSaveAndClose} />
      <MenuItem label="Save as draft" onClick={onSaveDraft} />
    </SplitButton>
  );
}
```

## Cross-references
- `Button` — single action button
- `ButtonGroup` — multiple equally-weighted actions
- `Menu` / `MenuItem` — dropdown list rendered in the popover
- `Popover` — positions the dropdown
