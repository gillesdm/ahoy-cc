# MenuButton

## Metadata
- **Name:** MenuButton
- **Category:** Navigation / Overlay
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/menuButton`

## Overview
**When to use:** Use `MenuButton` when you need a labelled text button that opens a dropdown `Menu`. It is the text-label counterpart to `IconMenu` — ideal for toolbar actions or split-button-style controls where the trigger needs a visible label.

**When not to use:** Do not use when only an icon trigger is needed (use `IconMenu` instead). Do not use for navigation menus; use a nav component. Avoid if the menu has only one item — use a plain `Button` instead.

## Anatomy

```
┌─ MenuButton ────────────────────────────┐
│  ┌─ Button ──────────────────────────┐  │
│  │  Label text   [ChevronDown icon]  │  │
│  └───────────────────────────────────┘  │
│  ┌─ Popover (when active) ───────────┐  │
│  │  ┌─ Menu ──────────────────────┐  │  │
│  │  │  MenuItem ...               │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

Parts:
- **Button** — standard Ahoy `Button` with a right-aligned `IconChevronDownSmallOutline`; acts as the trigger
- **Popover** — `Popover` anchored to the button, no backdrop by default
- **Menu** — `Menu` component rendered inside the popover with the supplied `children`

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-surface` (`--color-white`) | Menu panel background |
| `--color-link-bg` (`--color-neutral-light`) | Menu item hover background |
| `--color-accent-bg` (`--color-aqua-lightest`) | Menu item selected background |
| `--radius-md` (`--border-radius-medium`) | Menu corner radius |
| `--elevation-2` (`--box-shadow-200`) | Popover elevation shadow |
| `--transition-border` | Button border transition on focus |

> The button itself inherits all Button tokens (see `button.md`).

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Text label displayed on the trigger button |
| `children` | `ReactNode` | — | `MenuItem`, `MenuDivider`, `MenuTitle` items |
| `className` | `string` | `''` | Additional CSS classes on the wrapper |
| `size` | `'small' \| 'medium' \| 'large'` | — | Size passed through to the trigger `Button` |
| `disabled` | `boolean` | — | Disables the trigger button |
| `position` | `'start' \| 'center' \| 'end'` | `'end'` | Horizontal alignment of the popover |
| `direction` | `'north' \| 'south' \| 'east' \| 'west'` | — | Opening direction of the popover |
| `selectable` | `boolean` | `false` | Enable item selection in the inner `Menu` |
| `selected` | `any` | — | Currently selected value |
| `onSelect` | `(value: any) => void` | — | Called with the selected item's value |
| `onShow` | `() => void` | — | Called when the menu opens |
| `onHide` | `() => void` | — | Called when the menu closes |
| `onClick` | `(e: MouseEvent) => void` | — | Additional click handler on the trigger |
| `title` | `string` | — | Accessible title for the button |
| `shouldCloseOnSelect` | `boolean` | `true` | Closes the menu after item selection |
| `...others` | `BoxProps` | — | Box layout props on the wrapper element |

## States

| State | Visual description |
|-------|--------------------|
| Default closed | Button renders with chevron; no popover visible |
| Active / open | Popover with `Menu` appears below (south) aligned to end |
| Button — disabled | Button is visually disabled; trigger cannot open menu |
| Item — hover | Item row fills with `--color-link-bg` |
| Item — selected | Item row fills with `--color-accent-bg` |
| Item — destructive | Item text coloured ruby |

## Code Example

```tsx
import MenuButton from '@teamleader/ahoy/dist/es/components/menuButton';
import { MenuItem, MenuDivider } from '@teamleader/ahoy/dist/es/components/menu';

<MenuButton label="Actions" onSelect={(val) => console.log(val)}>
  <MenuItem value="edit">Edit</MenuItem>
  <MenuItem value="duplicate">Duplicate</MenuItem>
  <MenuDivider />
  <MenuItem value="delete" destructive>Delete</MenuItem>
</MenuButton>
```

## Cross-references
- `menu` — `Menu`, `MenuItem`, `MenuDivider`, `MenuTitle` — children of `MenuButton`
- `menu` → `IconMenu` — icon-only trigger variant
- `button` — the underlying trigger component
- `popover` — the overlay used internally
