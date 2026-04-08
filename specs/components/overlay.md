# Overlay

## Metadata
- **Name:** Overlay
- **Category:** Layout / Utility
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/overlay`

## Overview
**When to use:** Use `Overlay` as the full-viewport backdrop and interaction-capture layer for modals, dialogs, drawers, and popovers. It handles scroll-lock, Escape key dismissal, and outside-click detection. It is a low-level primitive; most consumers should use `Dialog`, `Popover`, or `Drawer` which wrap it automatically.

**When not to use:** Do not use `Overlay` directly unless building a custom floating layer. Do not set `backdrop=false` and `lockScroll=false` simultaneously — this makes the overlay invisible and passive, which is only useful in specific popover configurations.

## Anatomy

```
┌─ Overlay (position: fixed, full viewport) ─────────────┐
│  [optional semi-transparent backdrop]                  │
│                                                         │
│  ┌─ Inner wrapper (ref for outside-click detection) ─┐ │
│  │  children (modal / popover / drawer content)      │ │
│  └───────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

Parts:
- **Overlay div** — `position: fixed`, covers the full viewport; receives keyboard and mouse events
- **Backdrop** — animated `background-color` fading to 50% teal-dark when `backdrop=true`
- **Inner wrapper** — `<div ref>` used to distinguish inside vs. outside clicks

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-text-subtle` (`--color-teal-dark`) | Backdrop colour base (50% opacity) |
| `--duration-fast` (`--animation-duration`, 0.35s) | Backdrop fade-in duration |
| `--easing-default` (`--animation-curve-default`) | Backdrop animation easing |
| `--z-overlay` (10) | Stacking context reference (applied by parent, not Overlay itself) |

> The `.backdrop` CSS class applies a `@keyframes background-color` animation: `to { background-color: hsl(var(--color-teal-dark-hsl) / 50%) }`.

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `active` | `boolean` | — | Whether the overlay is currently shown; also controls scroll-lock |
| `backdrop` | `boolean` | `true` | When true, renders the semi-transparent dark background |
| `children` | `ReactNode` | — | Content positioned on top of the overlay |
| `className` | `string` | — | Additional CSS classes on the overlay element |
| `lockScroll` | `boolean` | `true` | Sets `document.body.style.overflow = 'hidden'` while active |
| `onEscKeyDown` | `(e: KeyboardEvent) => void` | — | Called when the Escape key is pressed while active |
| `onOverlayClick` | `(e: MouseEvent) => void` | — | Called when a mousedown+mouseup originates outside `children` |
| `...other` | `HTMLDivProps` | — | Any additional HTML div attributes |

## States

| State | Visual description |
|-------|--------------------|
| `active=true`, `backdrop=true` | Full-screen dark tinted backdrop fades in over 0.35s |
| `active=true`, `backdrop=false` | Invisible but active — captures Esc and outside clicks |
| `active=false` | Nothing rendered; scroll-lock released |
| `lockScroll=false` | Page scrolls normally even while overlay is shown |

## Code Example

```tsx
import Overlay from '@teamleader/ahoy/dist/es/components/overlay';

<Overlay
  active={isOpen}
  backdrop
  lockScroll
  onEscKeyDown={() => setOpen(false)}
  onOverlayClick={() => setOpen(false)}
>
  <div className="my-modal">
    Modal content here
  </div>
</Overlay>
```

## Cross-references
- `dialog` — modal dialog built on top of `Overlay`
- `popover` — floating panel that uses `Overlay` for backdrop and event handling
- `drawer` — slide-in panel using `Overlay` as its backdrop layer
