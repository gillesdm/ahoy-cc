# Dialog

## Metadata
- **Name:** Dialog
- **Category:** Overlay / Feedback
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/dialog`

## Overview
**When to use:** Use Dialog for focused interactions that require user attention or a decision before continuing — confirmations, form submissions, detail previews, or warnings. It renders in a portal at the end of `document.body`, traps focus, and supports keyboard dismissal (Esc) and Cmd/Ctrl+Enter submission.

**When not to use:** Do not use Dialog for non-blocking notifications — use `Toast`. Do not use for complex multi-step flows that would benefit from a full page. Do not use for quick contextual info — use `Tooltip` or `Popover`.

## Anatomy

```
┌──── Overlay (backdrop, z-index 403) ────────────────────────┐
│                                                             │
│   ┌── .dialog-base (.is-{size}) ─────────────────────────┐  │
│   │  ┌── .inner ───────────────────────────────────────┐ │  │
│   │  │  ┌── Header ──────────────────────────────────┐ │ │  │
│   │  │  │  [drag handle ⠿]  [Heading3 title]  [✕]   │ │ │  │
│   │  │  └────────────────────────────────────────────┘ │ │  │
│   │  │  ┌── Body (.dialog-body, scrollable) ─────────┐ │ │  │
│   │  │  │  [children]                                │ │ │  │
│   │  │  └────────────────────────────────────────────┘ │ │  │
│   │  │  ┌── Footer ──────────────────────────────────┐ │ │  │
│   │  │  │  [leftAction]  [tertiary] [secondary] [primary] │ │  │
│   │  │  └────────────────────────────────────────────┘ │ │  │
│   │  └─────────────────────────────────────────────────┘ │  │
│   └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**Drag:** The header drag-handle icon (⠿) allows the dialog to be repositioned by dragging.

**Scroll shadow:** When body content overflows and has not been scrolled to the end, the footer shows a soft upward box-shadow (`--elevation-1` variant) to signal more content.

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-white` (`--dialog-background-color`) | Dialog and inner panel background |
| `--radius-md` (`--dialog-border-radius: 0.4 * --unit = 4px`) | Outer and inner corner radius |
| `--color-teal-darkest` | Header title text color |
| `--animation-duration` (0.35s) | Slide-up entrance animation duration |
| `--animation-curve-default` | Entrance animation easing |
| `--animation-delay` (0.07s) | Entrance animation delay |
| `--elevation-3` (`box-shadow-300`) | Applied via `uiUtilities['box-shadow-300']` on dialog-base |
| `--space-5` (`--spacer-regular`, 18px) | Drag icon negative margin/padding |
| `z-index: 403` | Overlay stacking context |

## Props / API

### Dialog (high-level, wraps DialogBase)

| Prop | Type | Default | Description |
|---|---|---|---|
| `active` | `boolean` | `false` | Controls visibility — `false` renders nothing |
| `size` | `'small' \| 'medium' \| 'large' \| 'hero' \| 'fullscreen'` | `'medium'` | Dialog width (400 / 540 / 700 / 985 / 1300px) |
| `title` | `string` | — | Heading rendered in the header bar |
| `scrollable` | `boolean` | `true` | Whether the body section scrolls internally |
| `primaryAction` | `TooltippedButtonProps` | — | Primary CTA — always rendered at `level="primary"` |
| `secondaryAction` | `TooltippedButtonProps` | — | Secondary action button |
| `tertiaryAction` | `TooltippedButtonProps` | — | Tertiary action — rendered at `level="link"` |
| `leftAction` | `TooltippedButtonProps \| ReactElement` | — | Action pinned to the left side of the footer |
| `closeAction` | `TooltippedButtonProps` | — | Props for the close (✕) icon button in the header |
| `onCloseClick` | `() => void` | — | Called when the header close button is clicked |
| `onEscKeyDown` | `(event) => void` | — | Called on Escape key press |
| `onOverlayClick` | `() => void` | — | Called when the backdrop overlay is clicked |
| `backdrop` | `boolean` | `true` | Show/hide the dimming backdrop |
| `form` | `boolean` | — | Renders dialog root as `<form>` element |
| `onSubmit` | `FormEventHandler` | — | Form submit handler (requires `form: true`) |
| `children` | `ReactNode` | — | Body content |
| `className` | `string` | — | Additional class names on the dialog panel |

**Keyboard shortcuts:**
- `Escape` → calls `onEscKeyDown`
- `Ctrl/Cmd + Enter` → dispatches `submit` event when `form` is `true`

**Width by size:**
| Size | Width |
|---|---|
| `small` | 400px |
| `medium` | 540px |
| `large` | 700px |
| `hero` | 985px |
| `fullscreen` | 1300px (100vw on mobile ≤600px) |

## States

| State | Visual Description |
|---|---|
| Inactive | Not rendered (returns `null`) |
| Entering | Slides up from `-25% translateY` to `0` with fade-in over 0.35s |
| Active (no scroll) | Body fits without overflow; no footer scroll-shadow |
| Active (scrollable, not at end) | Footer shows upward box-shadow cue |
| Active (scrolled to end) | Scroll-shadow removed from footer |
| Dragged | Dialog repositioned via drag handle; uses `useDraggable` hook |

## Code Example

```tsx
import Dialog from '@teamleader/ahoy/dist/es/components/dialog';
import { useState } from 'react';

const [isOpen, setIsOpen] = useState(false);

<Dialog
  active={isOpen}
  size="medium"
  title="Confirm deletion"
  onCloseClick={() => setIsOpen(false)}
  onOverlayClick={() => setIsOpen(false)}
  onEscKeyDown={() => setIsOpen(false)}
  primaryAction={{
    label: 'Delete',
    onClick: handleDelete,
  }}
  secondaryAction={{
    label: 'Cancel',
    onClick: () => setIsOpen(false),
  }}
>
  <p>Are you sure you want to delete this record? This cannot be undone.</p>
</Dialog>

// Form dialog with Cmd+Enter submit
<Dialog
  active={isOpen}
  form
  onSubmit={handleSubmit}
  title="Add contact"
  primaryAction={{ label: 'Save', type: 'submit' }}
  onCloseClick={() => setIsOpen(false)}
>
  <Input label="Name" name="name" />
</Dialog>
```

## Cross-references
- `DialogBase` — lower-level base used internally; exposes `DialogBase.Header`, `DialogBase.Body`, `DialogBase.Footer`
- `Overlay` — provides the backdrop and portal
- `ButtonGroup` — used for footer action layout
- `Toast` — for non-blocking notifications
- `Popover` — for contextual overlays that do not require full focus trap
