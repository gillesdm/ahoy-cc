# MarketingDialog

## Metadata
- **Name:** MarketingDialog
- **Category:** Marketing / Overlays
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/marketingDialog`

## Overview
**When to use:** Use MarketingDialog to present upsell or feature-discovery flows as a full modal overlay. The dialog is wide (900px) and split into a large graphic panel and a text + action panel. Typical uses: "Upgrade to unlock this feature", trial activation prompts, plan comparison modals.

**When not to use:** Do not use for standard confirmation dialogs, destructive action confirmations, or form-heavy dialogs. Use the standard `Dialog` or `DialogBase` for those.

## Anatomy

```
┌──────────────────────────────────────────────────────────────────────┐
│  Header: [title (Heading3)]                              [✕ close]   │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌──────────────────────────────┐   ┌──────────────────────────┐   │
│  │                              │   │  subtitle (Heading1)      │   │
│  │   graphic (480×270)          │   │  body text (TextBody)     │   │
│  │   (optional border+radius)   │   │                          │   │
│  │                              │   │  [Primary Action btn]     │   │
│  └──────────────────────────────┘   │  [Secondary Action link]  │   │
│                                     └──────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────┘
```

- **Root:** `DialogBase` with class `marketing-dialog` (900px width)
- **Header:** `DialogBase.Header` with `Heading3` title and close button
- **Body:** flex row — graphic left (480px), text right (300px)
- **Graphic:** cloned React element, rendered at 480×graphicHeight (default 270px); optional border/radius via `graphicBorder`
- **Text area:** `Heading1` subtitle + `TextBody` body + stacked action buttons
- **Primary action:** `MarketingButton` level=primary, fullWidth
- **Secondary action:** `MarketingButton` level=link, fullWidth (optional)
- Both action buttons support an optional `tooltip` via `TooltippedMarketingButton`

## Tokens Used

> Marketing components use the `--color-violet-*` palette from Ahoy.

| CSS Token | Role |
|---|---|
| `--color-violet` | Primary action button fill |
| `--color-violet-dark` | Primary button hover |
| `--color-violet-light` | Primary button focus ring |
| `--color-neutral-lightest` | Primary button text; dialog background (via DialogBase) |
| `--box-shadow-400` / `--elevation-4` | Dialog floating shadow (via DialogBase) |
| `--border-radius-large` / `--radius-lg` | Graphic container rounded corners |
| `--z-modal` | Z-index layer (via DialogBase overlay) |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `active` | `boolean` | — | Controls dialog visibility. |
| `title` | `string` | — | Text rendered in the dialog header as `Heading3`. |
| `subtitle` | `string` | — | Text rendered in the content area as `Heading1` above the body. |
| `body` | `ReactNode` | — | Descriptive content rendered as `TextBody`. |
| `graphic` | `ReactElement` | — | React element (e.g. `<img>` or SVG) displayed in the left panel. Cloned with `width="480"` and optionally `height="270"`. |
| `graphicHeight` | `number \| null` | `270` | Height in px for the graphic. Pass `null` to let the graphic determine its own height. |
| `graphicBorder` | `boolean` | `true` | Whether to render a border and rounded corners around the graphic container. |
| `primaryAction` | `object` | — | Props spread onto the primary `MarketingButton` (level=primary). Typically includes `children`/`label`, `onClick`, and optionally `tooltip`. |
| `secondaryAction` | `object \| undefined` | `undefined` | Props spread onto the secondary `MarketingButton` (level=link). Omit to hide. |
| `onCloseClick` | `() => void` | `undefined` | Called when the close icon in the header is clicked. |
| `onEscKeyDown` | `() => void` | `undefined` | Called when Escape key is pressed. |
| `onOverlayClick` | `() => void` | `undefined` | Called when the backdrop overlay is clicked. |

### Action object shape

Both `primaryAction` and `secondaryAction` accept any props valid for `MarketingButton`, plus:

| Prop | Type | Description |
|---|---|---|
| `label` / `children` | `string` | Button text |
| `onClick` | `() => void` | Click handler |
| `tooltip` | `string` | If provided, button is disabled and wrapped in a Tooltip |
| `tooltipPosition` | `string` | Tooltip placement |
| `disabled` | `boolean` | Disabled state |
| `processing` | `boolean` | Loading state |

## States

| State | Visual Description |
|---|---|
| Inactive | Dialog not rendered / hidden (controlled by `active`) |
| Active | Centered modal overlay; backdrop dims page content |
| With tooltip on primary | Primary button rendered as disabled with a Tooltip wrapper |
| No secondary action | Only primary button shown in the action area |
| No graphic border | Graphic container has no border or border-radius |
| graphicHeight=null | Graphic stretches to its natural height |

## Code Example

```tsx
import MarketingDialog from '@teamleader/ahoy/dist/es/components/marketingDialog';
import { useState } from 'react';

function UpgradePrompt() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)}>Unlock feature</button>

      <MarketingDialog
        active={open}
        onCloseClick={() => setOpen(false)}
        onEscKeyDown={() => setOpen(false)}
        onOverlayClick={() => setOpen(false)}
        title="Unlock advanced reporting"
        graphic={<img src="/images/reporting-preview.png" alt="" />}
        graphicHeight={270}
        subtitle="Get deeper insights with Pro"
        body="Upgrade your plan to access advanced reports, custom dashboards, and data exports."
        primaryAction={{
          label: 'Upgrade now',
          onClick: () => console.log('upgrade'),
        }}
        secondaryAction={{
          label: 'Maybe later',
          onClick: () => setOpen(false),
        }}
      />
    </>
  );
}
```

## Cross-references
- `MarketingButton` — used for actions inside the dialog
- `DialogBase` — base dialog component this is built on
- `MarketingLockBadge` — often paired with lock-gated feature prompts
- `Tooltip` — wraps buttons when a `tooltip` prop is provided
