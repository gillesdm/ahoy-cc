# Toast

## Metadata
- **Name:** Toast + ToastContainer
- **Category:** Feedback / Notification
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/toast`

## Overview
A non-blocking notification that appears at the bottom-right of the viewport. Used for transient feedback after user actions (save, delete, error). `ToastContainer` manages a stack of toasts with enter/exit animations powered by Framer Motion.

**When to use:**
- Confirming that a background action completed (saved, sent, deleted)
- Non-critical errors that do not require immediate resolution
- Brief informational messages

**When not to use:**
- Errors that block the user — use a `Dialog` or inline `ValidationText`
- Persistent status that must always be visible — use `Banner` or `Alert`
- Actions that require confirmation — use `Dialog`

## Anatomy

```
ToastContainer[data-teamleader-ui="toast-container"]  (fixed, bottom-right, z: 600)
└── AnimatePresence
      └── motion.li ×N
            └── Toast[data-teamleader-ui="toast"]
                  ├── LoadingSpinner?  (when processing=true)
                  ├── TextBody.label  (label + children)
                  └── Link.action-link?    (when action/actionLabel provided)
                      OR TextBody > Link?  (when link element provided)
                      OR IconButton.action-button? (when onClose provided)
```

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-teal-dark` | Toast background (`--toast-background-color`) |
| `--color-neutral-lightest` | Label text colour |
| `--color-teal-light` | Action link colour |
| `--color-teal` | Close button colour |
| `--box-shadow-400` (`--elevation-4`) | Toast box-shadow (floating) |
| `--unit` | Border-radius (0.4×), min-width (18×), max-width (37.2×), min-height (6×), spacing (1.8×) |
| `--animation-duration` | Transition on toast (all properties) |
| `--animation-curve-default` | Transition easing |
| `--animation-curve-fast-out-linear-in` | Toast animation curve |
| `--z-toast` (1000) | Container stacking context (hardcoded 600 in CSS, above z-overlay) |
| `--spacer-* ` | Internal spacing via `--toast-spacing` (1.8 × unit = 18 px) |

## Props / API

### Toast

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Primary message text |
| `children` | `ReactNode` | — | Additional content appended after `label` |
| `processing` | `boolean` | — | Shows a `LoadingSpinner` to the left of the label |
| `timeout` | `number` | — | Auto-dismiss after N milliseconds; pauses on hover |
| `onTimeout` | `() => void` | — | Called when the timeout expires |
| `action` | `() => void` | — | Click handler for an action link |
| `actionLabel` | `string` | — | Label text for the action link |
| `link` | `ReactElement` | — | Custom link element (alternative to `action` + `actionLabel`) |
| `onClose` | `() => void` | — | When provided, shows a circular close `IconButton` |
| `className` | `string` | — | Extra class names |

### ToastContainer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | `Toast` elements to display |
| `className` | `string` | — | Extra class names on the `<ul>` |
| `style` | `CSSProperties` | — | Inline styles on the container |

## States

| State | Visual Description |
|-------|--------------------|
| Entering | Slides up from bottom (`translateY(100%)`) and fades in |
| Visible | Dark teal pill, white text, optional action link or close button |
| Processing | Loading spinner visible to the left of the text |
| With timeout | Auto-dismisses after N ms; timer pauses on mouse enter |
| Exiting | Slides right (`translate3d(100%,0,0)`) and fades out |

## Code Example

```tsx
import { Toast, ToastContainer } from '@teamleader/ahoy/dist/es/components/toast';

function Notifications({ toasts, onDismiss }) {
  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          label={toast.message}
          timeout={4000}
          onTimeout={() => onDismiss(toast.id)}
          onClose={() => onDismiss(toast.id)}
        />
      ))}
    </ToastContainer>
  );
}
```

## Cross-references
- `Alert` — persistent in-page feedback banner
- `Banner` — page-level notification
- `Dialog` — blocking feedback requiring user action
- `LoadingSpinner` — shown when `processing` is true
