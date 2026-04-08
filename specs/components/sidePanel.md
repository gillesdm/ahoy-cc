# SidePanel

## Metadata
- **Name:** SidePanel
- **Category:** Overlay / Navigation
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/sidePanel`

## Overview
A fixed panel that slides in from the right edge of the viewport. Used for detail views, editing forms, and contextual actions that do not require interrupting the main flow with a full dialog.

**When to use:**
- Editing or viewing details while keeping the main content visible
- Secondary workflows (filters, configuration) that should feel attached to the page

**When not to use:**
- Critical blocking decisions — use `Dialog` instead
- Very simple confirmations — use a `Popover` or inline action

## Anatomy

```
SidePanel[data-teamleader-ui="side-panel"]
├── div.resizer?                  (drag handle on left edge, when onResize provided)
├── SidePanel.Header
│     ├── IconButton (close)
│     ├── BadgedLink (back link)?
│     ├── prefix?
│     ├── Heading2 (title)
│     └── suffix?
├── SidePanel.Body
│     └── children
└── SidePanel.Footer
      └── children (actions)
```

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-surface` / `white` | Panel background |
| `--color-neutral` | Left border of panel |
| `--color-neutral` (shadow) | Box-shadow during resize drag |
| `--z-modal` (`--z-modal`: 100) | Panel z-index |
| `--spacer-medium` (24 px) | Footer padding |
| `--spacer-regular` (18 px) / `--space-5` | Header padding |
| `--animation-duration` | Slide-in / slide-out animation duration |
| `--animation-curve-default` | Slide animation easing |

## Props / API

### SidePanel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — | Controls visibility and animation |
| `onClose` | `() => void` | — | Called on Escape key, outside click, or close button |
| `size` | `'small' \| 'medium'` | `'medium'` | Panel width: small = 400 px, medium = 480 px |
| `shouldCloseOnClickOutside` | `boolean` | `true` | Closes the panel when clicking outside |
| `shouldUnmountOnClose` | `boolean` | `true` | Removes panel from DOM after close animation completes |
| `shouldAnimate` | `boolean` | `true` | Enables slide-in/out animation; `false` shows/hides instantly |
| `isFocusTrapEnabled` | `boolean` | `true` | Traps keyboard focus inside the panel while open |
| `checkIsInside` | `(el: Element) => boolean` | — | Custom predicate for "click outside" detection |
| `width` | `number` | — | Override panel width in px (enables resize handle) |
| `onResize` | `(width: number) => void` | — | Called with final width after drag resize |
| `onResizeUpdate` | `(width: number) => void` | — | Called continuously during drag resize |
| `className` | `string` | — | Extra class names |

### SidePanel.Header

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string \| ReactNode` | — | Panel title (string renders as `Heading2`) |
| `backLink` | `{ href, title, ...BadgedLinkProps }` | — | Back navigation link |
| `prefix` | `ReactNode` | — | Content before the title (e.g. an icon) |
| `suffix` | `ReactNode` | — | Content after the title (e.g. a badge) |

### SidePanel.Body / SidePanel.Footer
Accept any children. Body fills available space; Footer is sticky at the bottom (height 72 px).

## States

| State | Visual Description |
|-------|--------------------|
| Closed (mounted) | Rendered off-screen; `display: none` when `shouldAnimate: false` |
| Opening | Slides in from `translateX(105%)` to `translateX(0)` |
| Open | Full width panel overlays the right side of the viewport |
| Closing | Slides out to `translateX(105%)` |
| Resizing | Left edge drag handle active; `box-shadow` applied to panel |

## Code Example

```tsx
import SidePanel from '@teamleader/ahoy/dist/es/components/sidePanel';

function ContactDetail({ contact, onClose }) {
  return (
    <SidePanel isOpen={!!contact} onClose={onClose} size="medium">
      <SidePanel.Header title={contact?.name} />
      <SidePanel.Body>
        <p>Contact details here…</p>
      </SidePanel.Body>
      <SidePanel.Footer>
        <Button label="Save" level="primary" onClick={onClose} />
      </SidePanel.Footer>
    </SidePanel>
  );
}
```

## Cross-references
- `Dialog` — blocking modal overlay
- `ShadowedScrollContainer` — for scrollable body content
- `Heading2` — used in the header title
- `BadgedLink` — back navigation in the header
