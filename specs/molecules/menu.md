# Menu

## Metadata
- **Name:** Menu (Menu, MenuItem, MenuDivider, MenuTitle, IconMenu)
- **Category:** Navigation / Overlay
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/menu`

## Overview
**When to use:** Use `Menu` to present a vertical list of actions or navigation links inside a popover or dropdown. Combine with `IconMenu` for a self-contained icon-triggered dropdown, or compose manually inside a `Popover`. Use `MenuItem` for each option, `MenuDivider` to separate groups, and `MenuTitle` to label sections.

**When not to use:** Do not use for primary navigation (use a sidebar/nav instead). Do not use for multi-select — use `Select` for that. Avoid nesting menus more than one level deep.

## Anatomy

```
┌─ Menu ──────────────────────────────┐
│  ┌─ MenuTitle ──────────────────┐   │
│  │  Section label (Heading4)    │   │
│  └──────────────────────────────┘   │
│  ┌─ MenuItem ───────────────────┐   │
│  │  [Icon]  Label text          │   │
│  │          Caption (optional)  │   │
│  └──────────────────────────────┘   │
│  ──── MenuDivider ────────────────  │
│  ┌─ MenuItem (selected) ────────┐   │
│  │  [Icon]  Label text          │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘

IconMenu = IconButton + Popover wrapping a Menu
```

Parts:
- **Menu** — white container `<ul>` with optional outline border
- **MenuTitle** — non-interactive section label using `Heading4`
- **MenuItem** — interactive `<li>` containing a button or anchor
- **MenuDivider** — `<hr>` visual separator
- **IconMenu** — self-contained trigger: `IconButton` + `Popover<Menu>`

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-surface` (`--color-white`) | Menu background |
| `--color-border` (`--color-neutral-dark`) | Outline border (when `outline=true`) |
| `--color-link-bg` (`--color-neutral-light`) | MenuItem hover background |
| `--color-accent-bg` (`--color-aqua-lightest`) | MenuItem selected background |
| `--radius-md` (`--border-radius-medium`) | Menu corner radius |
| `--space-1` (`--spacer-smallest`) | Vertical padding around menu list |
| `--elevation-2` (`--box-shadow-200`) | Shadow when inside Popover |

> Internal CSS variables: `--menu-item-hover-background`, `--menu-item-selected-background`, `--menu-item-height` (36px), `--menu-divider-height`.

## Props / API

### Menu

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | `MenuItem`, `MenuTitle`, `MenuDivider`, or fragments |
| `className` | `string` | — | Additional CSS classes |
| `onHide` | `() => void` | — | Called when the menu should close |
| `onSelect` | `(value: any) => void` | — | Called with `MenuItem.value` when an item is selected |
| `outline` | `boolean` | `false` | Adds a 1px neutral border around the menu |
| `selectable` | `boolean` | `true` | Whether items can be selected (highlights active item) |
| `selected` | `any` | — | Value of the currently selected item |
| `shouldCloseOnSelect` | `boolean` | `true` | Calls `onHide` automatically after selection |

### MenuItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Primary label content |
| `label` | `string` | — | Secondary label rendered below children |
| `caption` | `string` | — | Neutral caption text rendered below label |
| `icon` | `ReactNode` | — | Icon rendered to the left of the label |
| `value` | `any` | — | Value passed to `Menu.onSelect` when clicked |
| `selected` | `boolean` | `false` | Highlights the item with selected background |
| `disabled` | `boolean` | `false` | Prevents interaction; mutes text colour |
| `destructive` | `boolean` | `false` | Colors label/icon ruby-red to signal danger |
| `element` | `string` | `'button'` | Root element type (`'button'` or `'a'`) |
| `onClick` | `(e: MouseEvent) => void` | — | Click handler (also fires via Menu.onSelect) |
| `className` | `string` | `''` | Additional CSS classes |
| `ref` | `Ref` | — | Forwarded ref |

### MenuDivider

No props. Renders a horizontal `<hr>` separator.

### MenuTitle

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Section label text |
| `className` | `string` | — | Additional CSS classes |
| `...others` | `BoxProps` | — | Box layout props |

### IconMenu

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Menu items |
| `icon` | `ReactNode` | `IconMoreMediumOutline` | Icon for the trigger button |
| `title` | `string` | — | Accessible title for the trigger button |
| `size` | `string` | — | Size passed to `IconButton` |
| `position` | `'start' \| 'center' \| 'end'` | `'start'` | Popover alignment |
| `direction` | `'north' \| 'south' \| 'east' \| 'west'` | — | Popover opening direction |
| `selectable` | `boolean` | `false` | Enable item selection |
| `selected` | `any` | — | Currently selected value |
| `onSelect` | `(value: any) => void` | — | Selection callback |
| `onShow` | `() => void` | — | Called when menu opens |
| `onHide` | `() => void` | — | Called when menu closes |
| `onClick` | `(e: MouseEvent) => void` | — | Additional click handler on trigger |
| `shouldCloseOnSelect` | `boolean` | `true` | Close on item selection |

## States

| State | Visual description |
|-------|--------------------|
| Default | White background, items in teal body text |
| Item — hover | `--color-link-bg` background fill |
| Item — focus-visible | Same as hover |
| Item — selected | `--color-aqua-lightest` background fill |
| Item — disabled | `pointer-events: none`; text muted to neutral |
| Item — destructive | Text and icon coloured ruby-dark |
| Menu — outline | 1px `--color-border` border around container |

## Code Example

```tsx
import Menu, { MenuItem, MenuDivider, MenuTitle, IconMenu } from '@teamleader/ahoy/dist/es/components/menu';

// Standalone menu inside a Popover
<Menu onSelect={(val) => console.log(val)} selected="edit">
  <MenuTitle>Actions</MenuTitle>
  <MenuItem value="edit">Edit</MenuItem>
  <MenuItem value="duplicate">Duplicate</MenuItem>
  <MenuDivider />
  <MenuItem value="delete" destructive>Delete</MenuItem>
</Menu>

// Self-contained icon trigger
<IconMenu onSelect={(val) => console.log(val)}>
  <MenuItem value="edit">Edit</MenuItem>
  <MenuItem value="delete" destructive>Delete</MenuItem>
</IconMenu>
```

## Cross-references
- `menuButton` — text-button trigger variant of `IconMenu`
- `popover` — the overlay layer `IconMenu` uses internally
- `iconButton` — the trigger button inside `IconMenu`
