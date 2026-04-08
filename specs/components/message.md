# Message

## Metadata
- **Name:** Message
- **Category:** Feedback / Notification
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/message`

## Overview
**When to use:** Use `Message` to display contextual feedback — informational, success, warning, or error — inline within a page or form. It supports an optional title, body content, close button, and up to two CTA buttons.

**When not to use:** Do not use for temporary notifications that disappear on their own (use `Toast` instead). Do not use for blocking confirmations (use `Dialog`). Avoid stacking multiple messages of the same status in close proximity.

## Anatomy

```
┌─ Message ──────────────────────────────────────────────┐
│  ┌── Status bar ──┐  ┌── Content panel ──────────────┐ │
│  │  [color slab]  │  │  [Icon] (optional)             │ │
│  │  [status icon] │  │  Title (Heading3, optional)    │ │
│  │  (optional)    │  │  children (body text)          │ │
│  │                │  │  ┌─ ButtonGroup (optional) ──┐ │ │
│  └────────────────┘  │  │  [Secondary] [Primary]    │ │ │
│                       │  └───────────────────────────┘ │ │
│                       └────────────────────── [✕] ────┘ │
└────────────────────────────────────────────────────────┘
```

Parts:
- **Status bar** — left-side coloured slab; background and icon vary by `status`
- **Status icon** — visible only when `showIcon=true`; icon SVG from Ahoy icon set
- **Content panel** — white/neutral background with top/right/bottom border
- **Title** — optional `Heading3` rendered above body content
- **Body** — `children` slot (any ReactNode)
- **Action buttons** — optional `primaryAction` and `secondaryAction` rendered as `Button`
- **Close button** — optional `IconButton` with `IconCloseMediumOutline`; triggered by `onClose`

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-bg` (`--color-neutral-lightest`) | Content panel background |
| `--color-border` (`--color-neutral-dark`) | Content panel border |
| `--color-error` (`--color-ruby-dark`) | Error status bar background |
| `--color-success` (`--color-mint-dark`) | Success status bar background |
| `--color-warning` (`--color-gold-dark`) | Warning status bar background |
| `--color-text` (`--color-teal-darkest`) | Title and body text |
| `--space-2` (`--spacer-smaller`) | Icon padding (showIcon path) |
| `--space-4` (`--spacer-small`) | Vertical padding, content area |
| `--space-4` | Top margin between title and body |
| `--radius-md` (`--border-radius-medium`) | Rounded left/right corners |

> Status bar colours are set inline via Ahoy Box `backgroundColor`/`backgroundTint` props:
> - `error` → ruby/normal; `success` → mint/light; `warning` → gold/light; `info` → neutral/normal

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `status` | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'` | Controls the colour of the status bar and icon |
| `title` | `string` | — | Optional heading above the body content |
| `children` | `ReactNode` | — | Body content of the message |
| `showIcon` | `boolean` | — | When true, renders the status icon inside the status bar |
| `inline` | `boolean` | — | Renders with `inline-flex` instead of `flex` (for inline flow) |
| `onClose` | `() => void` | — | When provided, renders an ✕ close button |
| `primaryAction` | `ButtonProps` | — | Props for the primary action button (spread onto `Button`) |
| `secondaryAction` | `ButtonProps` | — | Props for the secondary link-level button |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref to the root element |
| `...others` | `BoxProps` | — | Box layout props on the root element |

### Status icon mapping

| Status | Icon |
|--------|------|
| `info` | `IconBellMediumOutline` |
| `success` | `IconCheckmarkBadgedMediumFilled` |
| `warning` | `IconWarningBadgedMediumFilled` |
| `error` | `IconWarningBadgedMediumFilled` |

## States

| State | Visual description |
|-------|--------------------|
| `info` | Neutral-normal grey status bar; bell icon |
| `success` | Mint-light green status bar; checkmark badge icon |
| `warning` | Gold-light amber status bar; warning icon (gold tint) |
| `error` | Ruby-normal red status bar; warning icon (light tint) |
| With icon | Icon displayed in status bar; bar is wider |
| Without icon | Status bar is narrow (1 unit padding) |
| With close button | ✕ IconButton appears at top-right of content panel |
| With actions | ButtonGroup at bottom-right; secondary is link-level, primary is default |

## Code Example

```tsx
import Message from '@teamleader/ahoy/dist/es/components/message';

// Basic info message
<Message status="info" title="Heads up">
  Your subscription renews in 7 days.
</Message>

// Error with close and actions
<Message
  status="error"
  title="Payment failed"
  showIcon
  onClose={() => setVisible(false)}
  primaryAction={{ label: 'Retry', onClick: handleRetry }}
  secondaryAction={{ label: 'Cancel', onClick: handleCancel }}
>
  We could not process your payment. Please check your card details.
</Message>
```

## Cross-references
- `toast` — ephemeral auto-dismissing notifications
- `dialog` — blocking modal for confirmations
- `banner` — full-width page-level alerts
- `button` — used for `primaryAction` / `secondaryAction`
