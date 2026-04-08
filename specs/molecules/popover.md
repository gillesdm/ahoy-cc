# Popover

## Metadata
- **Name:** Popover
- **Category:** Overlay / Layout
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/popover`

## Overview
**When to use:** Use `Popover` as the foundational floating panel for tooltips, dropdowns, date pickers, passports, and any content that must float relative to an anchor element. It uses Radix UI Popover for positioning and collision avoidance, and optionally wraps content in an `Overlay` backdrop.

**When not to use:** Do not use for full-screen modals — use `Dialog`. Do not use for temporary one-line messages — use `Tooltip`. Avoid using `Popover` directly when a higher-level component (`Menu`, `DatePicker`, `Passport`, `Select`) already composes it.

## Anatomy

```
┌─ Portal (document.body) ──────────────────────────────────────┐
│                                                               │
│  ┌─ [withOverlay=true] Overlay wrapper ──────────────────┐   │
│  │  [optional backdrop]                                   │   │
│  │  ┌─ RadixPopover.Content ──────────────────────────┐  │   │
│  │  │  ┌─ Box.popover (min/maxWidth, maxHeight) ────┐  │  │   │
│  │  │  │  ┌─ Box.inner (overflow-y: auto) ────────┐ │  │  │   │
│  │  │  │  │  children                             │ │  │  │   │
│  │  │  │  └───────────────────────────────────────┘ │  │  │   │
│  │  │  └──────────────────────────────────────────── ┘  │  │   │
│  │  └────────────────────────────────────────────────┘  │   │
│  └───────────────────────────────────────────────────────┘   │
│                                                               │
│  [withOverlay=false] RadixPopover.Content directly in portal  │
└───────────────────────────────────────────────────────────────┘
```

Parts:
- **Portal** — rendered into `document.body` via `createPortal`
- **Overlay** — optional full-viewport `Overlay` with scroll-lock and backdrop (when `withOverlay=true`)
- **FocusRing** — focus trap wrapper (when `withFocusTrap=true`)
- **RadixPopover.Content** — Radix primitive handling position, collision avoidance, and open/close animations
- **Box.popover** — applies `border-radius`, `box-shadow-200`, width constraints
- **Box.inner** — scrollable inner container; coloured via `color` + `tint` theme classes

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-surface` (`--color-white`) | Inner background (default neutral/lightest) |
| `--color-border` (`--color-neutral-dark`) | Inner border ring (`box-shadow: 0 0 0 1px`) |
| `--elevation-2` (`--box-shadow-200`) | Drop shadow on `.popover` container |
| `--radius-md` (`--border-radius-medium`) | Corner radius (4px) |
| `--z-overlay` (10) / `zIndex` prop | Stacking context; default `zIndex=300` |
| `--duration-base` (0.3s) | Wrapper opacity transition |
| `--easing-enter` | Slide-and-fade open animation (Radix-driven, 400ms) |

> Background and border colour vary with `color` + `tint` prop combination. Full matrix is defined in `theme.css` (neutral, teal, mint, ruby, aqua, violet, gold × lightest/light/normal/dark/darkest).

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | `true` | Controls visibility; returns `null` when `false` |
| `anchorEl` | `HTMLElement \| null` | — | DOM element to anchor/position the popover against |
| `direction` | `'north' \| 'south' \| 'east' \| 'west'` | `'south'` | Which side of the anchor to open on |
| `position` | `'start' \| 'center' \| 'end'` | `'center'` | Alignment along the cross axis |
| `offsetCorrection` | `number` | `0` | Fine-tune alignment offset in px |
| `backdrop` | `boolean` | `true` | Show the semi-transparent overlay backdrop |
| `lockScroll` | `boolean` | `true` | Lock body scroll while open |
| `withOverlay` | `boolean` | `true` | Wrap content in the `Overlay` component |
| `withFocusTrap` | `boolean` | `true` | Trap keyboard focus inside the popover |
| `returnFocusToSource` | `boolean` | `true` | Return focus to the trigger element on close |
| `color` | `string` | `'neutral'` | Background colour family (see Ahoy colour palette) |
| `tint` | `string` | `'lightest'` | Colour tint level |
| `minWidth` | `string` | `'180px'` | CSS min-width of the popover panel |
| `maxWidth` | `string` | `'700px'` | CSS max-width (ignored when `fullWidth=true`) |
| `maxHeight` | `string` | — | CSS max-height override |
| `fullWidth` | `boolean` | `false` | Overrides `maxWidth` to `100%` |
| `fullHeight` | `boolean` | `true` | When false, restricts max-height to Radix available height |
| `zIndex` | `number` | `300` | CSS z-index of the wrapper |
| `onOverlayClick` | `(e: MouseEvent) => void` | — | Called when clicking outside the popover |
| `onEscKeyDown` | `(e: KeyboardEvent) => void` | — | Called when Escape key is pressed |
| `dragHandleRef` | `Ref` | — | Ref to a drag handle element (enables dragging) |
| `children` | `ReactNode` | — | Content to render inside the popover |
| `className` | `string` | — | Additional classes on the outer `.popover` Box |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref to the inner container |

## States

| State | Visual description |
|-------|--------------------|
| `active=true` | Panel slides in from the anchor direction with fade (400ms cubic-bezier) |
| `active=false` | Returns `null`; nothing rendered |
| `backdrop=true` | Full-screen dark tint overlay behind the panel |
| `backdrop=false` | No visual backdrop; clicks outside still trigger `onOverlayClick` |
| `withOverlay=false` | No Overlay layer; Radix handles outside-click and Esc natively |
| Directional animations | `south`→slide-up-and-fade, `north`→slide-down-and-fade, `east`→slide-left-and-fade, `west`→slide-right-and-fade |
| Color variants | Background and border ring change based on `color`+`tint` |

## Code Example

```tsx
import Popover from '@teamleader/ahoy/dist/es/components/popover';
import { useRef, useState } from 'react';

function Example() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <button ref={anchorRef} onClick={() => setOpen(true)}>
        Open popover
      </button>

      <Popover
        active={open}
        anchorEl={anchorRef.current}
        direction="south"
        position="start"
        onEscKeyDown={() => setOpen(false)}
        onOverlayClick={() => setOpen(false)}
        minWidth="240px"
        maxWidth="400px"
      >
        <div style={{ padding: 16 }}>Popover content</div>
      </Popover>
    </>
  );
}
```

## Cross-references
- `overlay` — the backdrop layer used internally
- `menu` / `iconMenu` / `menuButton` — composed on top of `Popover`
- `passport` — entity preview card built on `Popover`
- `datePicker` — date picker uses `Popover` for its calendar panel
- `select` — uses `Popover` for the option dropdown
- `dialog` — full-modal alternative for blocking overlays
