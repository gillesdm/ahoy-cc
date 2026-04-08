# Alert

## Metadata
- **Name**: Alert
- **Category**: Overlay / Feedback
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/alert`

## Overview

**When to use**: Use Alert for brief, centered, modal confirmations or destructive-action warnings that require the user to make a binary decision before proceeding. Common scenarios: confirm deletion, confirm a non-reversible action, surface an error state requiring acknowledgement.

**When not to use**: Do not use for inline validation feedback (use `ValidationText` / field-level errors). Do not use for informational banners that do not require a decision (use `Banner`). Do not use when the content requires scrolling or rich layout (use `Dialog`).

## Anatomy

```
┌──────────────────────────────────┐
│                                  │
│        [Illustration]            │  ← 60×60 info or error SVG
│                                  │
│          Title heading           │  ← Heading3, centered
│                                  │
│       Body text (optional)       │  ← TextBody, centered, pre-line
│                                  │
│    [      Primary Action      ]  │  ← full-width Button (primary/destructive)
│    [     Secondary Action     ]  │  ← full-width Button (optional)
│                                  │
└──────────────────────────────────┘
```

Parts:
- **Illustration** — `Illustration60X60Info` (confirm) or `Illustration60X60Error` (destructive)
- **Title** — `Heading3`, color="teal", `word-break: break-word`
- **Body** — `TextBody`, color="teal", optional, `white-space: pre-line` for string values
- **Primary action** — full-width Button, `level="primary"` for confirm, `level="destructive"` for destructive
- **Secondary action** — full-width Button, optional

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-text` (`--color-teal-darkest`) | Title and body text |
| `--color-accent` (`--color-mint`) | Primary action button background (confirm type) |
| `--color-error` (`--color-ruby-dark`) | Primary action button background (destructive type) |
| `--color-bg` (`--color-neutral-lightest`) | Dialog panel background |
| `--elevation-4` (`--box-shadow-400`) | Dialog floating shadow |
| `--space-5` (`--spacer-medium`, 24px) | Primary action top margin (`marginTop=5`) |
| `--space-6` (`--spacer-big`) | Panel padding (`padding=4` → `--spacer-regular`) |
| `--radius-md` (`--border-radius-medium`, 4px) | Dialog panel radius |
| `--z-modal` | Dialog z-index layer |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `type` | `'confirm' \| 'destructive'` | `'confirm'` | Controls illustration and primary button level |
| `title` | `string` | — | Heading text displayed below the illustration |
| `body` | `ReactNode \| string` | — | Optional explanatory text; strings render with `white-space: pre-line` |
| `primaryAction` | `ButtonProps` | — | Props spread onto the primary (full-width) Button |
| `secondaryAction` | `ButtonProps` | — | Props spread onto the secondary (full-width) Button below primary |
| `...otherProps` | `DialogBaseProps` | — | Forwarded to the underlying `DialogBase` (e.g. `active`, `onOverlayClick`) |

## States

| State | Visual description |
|---|---|
| Confirm | Info illustration (teal/mint tones), primary button is mint green |
| Destructive | Error illustration (ruby/red tones), primary button is destructive red |
| No secondary action | Only primary button rendered; extra vertical space below |

## Code Example

```tsx
import Alert from '@teamleader/ahoy/dist/es/components/alert';

// Confirm variant
<Alert
  active
  type="confirm"
  title="Are you sure?"
  body="This action cannot be undone."
  primaryAction={{ label: 'Confirm', onClick: handleConfirm }}
  secondaryAction={{ label: 'Cancel', onClick: handleCancel }}
  onOverlayClick={handleCancel}
/>

// Destructive variant
<Alert
  active
  type="destructive"
  title="Delete invoice?"
  body="Invoice #1234 will be permanently deleted."
  primaryAction={{ label: 'Delete', onClick: handleDelete }}
  secondaryAction={{ label: 'Keep it', onClick: handleCancel }}
/>
```

## Cross-references
- `Dialog` — full-featured modal for complex content
- `Banner` — inline, non-modal informational feedback
- `Button` — action buttons within the Alert
- `DialogBase` — underlying dialog primitive
