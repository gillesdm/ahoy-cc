# ActionPopover

## Metadata
- **Name**: ActionPopover
- **Category**: Overlay / Popover
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/actionPopover`

## Overview

**When to use**: Use ActionPopover when you need a focused floating panel anchored to a trigger element that contains a title, scrollable body content, and a fixed action footer with primary / secondary / left buttons. Ideal for contextual confirmation flows, inline editing panels, or quick-action dialogs.

**When not to use**: Do not use for full-page dialogs (use Dialog), for simple tooltips (use Tooltip), or for navigation menus (use Menu/Popover). Avoid when content does not require action buttons.

## Anatomy

```
┌─────────────────────────────────────┐
│ [drag handle] Title          [x]    │  ← header (Flex, padding=3)
├─────────────────────────────────────┤  ← scroll-shadow-top when scrolled
│                                     │
│  children (scrollable body)         │  ← Flex column, overflowY auto
│                                     │
├─────────────────────────────────────┤  ← scroll-shadow-bottom when not at end
│ [leftAction btn]  [sec btn][pri btn]│  ← footer (Flex, padding=3)
└─────────────────────────────────────┘
```

Parts:
- **Popover wrapper** — positions and sizes the floating panel
- **Header** — contains optional drag icon, Heading3 title, optional close IconButton
- **Body** — scrollable Flex column; emits scroll-shadow-top / scroll-shadow-bottom when content overflows
- **Footer** — primary Button (level="primary"), optional secondaryAction Button, optional leftAction Button

## Tokens Used

| CSS Token | Role |
|---|---|
| `--elevation-2` (`--box-shadow-200`) | Popover panel shadow |
| `--color-text` (`--color-teal-darkest`) | Title and body text color |
| `--color-border` (`--color-neutral-dark`) | Popover border |
| `--color-bg` (`--color-neutral-lightest`) | Panel background |
| `--space-4` (`--spacer-regular`, 18px) | Header / footer padding (pad=3 → `--spacer-small` 12px) |
| `--radius-md` (`--border-radius-medium`, 4px) | Panel corner radius |
| `--z-overlay` | Popover z-index layer |
| `--transition-shadow` | Scroll-shadow transition |
| `--duration-base` | Animation for shadow appearance |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Heading text rendered in the header |
| `primaryAction` | `ButtonProps` | — | Spread onto the primary (mint) Button in the footer; required to show footer |
| `secondaryAction` | `ButtonProps` | — | Spread onto the secondary Button placed left of primary |
| `leftAction` | `ButtonProps` | — | Spread onto a Button pinned to the left of the footer row |
| `onCloseClick` | `() => void` | — | When provided, renders a close IconButton in the header |
| `draggable` | `boolean` | `false` | Shows a drag handle icon; passes `dragHandleRef` to Popover |
| `minWidth` | `string` | `'380px'` | CSS min-width of the popover panel |
| `maxWidth` | `string` | `'480px'` | CSS max-width of the popover panel |
| `maxHeight` | `string` | `'210px'` | CSS max-height of the scrollable body area |
| `children` | `ReactNode` | — | Body content rendered inside the scrollable area |
| `...rest` | `PopoverProps` | — | All other props forwarded to the underlying Popover |

## States

| State | Visual description |
|---|---|
| Default | Panel visible, no scroll shadows, close button visible if `onCloseClick` provided |
| Body scrolled (mid) | `.scroll-shadow-top` applied to header — subtle downward box-shadow separates header from body |
| Body not at end | `.scroll-shadow-bottom` applied to footer — subtle upward box-shadow separates footer from body |
| Draggable | Drag-handle icon (cursor: move) prepended to header title area |

## Code Example

```tsx
import ActionPopover from '@teamleader/ahoy/dist/es/components/actionPopover';

<ActionPopover
  title="Confirm action"
  primaryAction={{ label: 'Save', onClick: handleSave }}
  secondaryAction={{ label: 'Cancel', onClick: handleClose }}
  onCloseClick={handleClose}
  draggable
>
  <p>Are you sure you want to save these changes?</p>
</ActionPopover>
```

## Cross-references
- `Popover` — underlying positioning primitive
- `Button` / `ButtonGroup` — footer action buttons
- `IconButton` — close button in header
- `Dialog` — full-page modal alternative
