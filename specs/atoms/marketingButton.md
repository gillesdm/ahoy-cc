# MarketingButton

## Metadata
- **Name:** MarketingButton
- **Category:** Marketing / Actions
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/marketingButton`

## Overview
**When to use:** Use MarketingButton for primary call-to-action surfaces inside marketing or upsell contexts — upgrade prompts, feature discovery banners, lock-gated dialogs, and pricing pages. It uses the violet brand palette rather than the mint palette of the standard Button.

**When not to use:** Do not use in regular product UI flows (forms, toolbars, data tables). Use the standard `Button` component there.

## Anatomy

```
┌────────────────────────────────────────┐
│  [icon-left]  [label text]  [icon-right] │  ← button-base wrapper (Box)
│               [spinner overlay]         │  ← visible only when processing=true
└────────────────────────────────────────┘
```

- **Root element:** `<button>` (or custom via `element` prop)
- **Label text:** rendered inside a `UITextSmall` / `UITextBody` / `UITextDisplay` depending on size
- **Icon:** optional, placed left or right of label
- **Spinner:** absolutely-centered `LoadingSpinner`, shown when `processing=true`

## Tokens Used

> All marketing components use the `--color-violet-*` palette from Ahoy.

| CSS Token | Role |
|---|---|
| `--color-violet` | Primary background fill; secondary/link text and border color |
| `--color-violet-dark` | Hover background and border (primary); hover text/border (secondary) |
| `--color-violet-light` | Focus ring shadow (primary); active inset shadow (secondary/link) |
| `--color-violet-lightest` | Secondary focus background; link hover background; disabled link color |
| `--color-neutral-lightest` | Primary text color; secondary background |
| `--color-neutral` | Disabled primary background and border |
| `--color-neutral-dark` | Disabled secondary border and text |
| `--border-radius-medium` | Button corner radius (4px) |
| `--animation-duration` | Transition duration for background/border/color/opacity |
| `--animation-curve-fast-out-slow-in` | Transition easing |
| `--unit` | Size scale base (10px); all heights/paddings derived from this |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `level` | `'primary' \| 'secondary' \| 'link'` | `'secondary'` | Visual hierarchy. `primary` = violet fill; `secondary` = violet outline; `link` = transparent with violet text. |
| `size` | `'tiny' \| 'small' \| 'medium' \| 'large'` | `'medium'` | Controls height, padding, and typography component. `tiny`=24px, `small`=30px, `medium`=36px, `large`=48px. |
| `disabled` | `boolean` | `undefined` | Disables interaction; applies muted color treatment. |
| `fullWidth` | `boolean` | `false` | Stretches button to 100% container width. |
| `processing` | `boolean` | `false` | Shows centered loading spinner; hides label color (text becomes transparent/same-as-bg). Pointer events disabled. |
| `icon` | `ReactNode` | `undefined` | Icon element rendered beside the label. |
| `iconPlacement` | `'left' \| 'right'` | `'left'` | Which side the icon appears on. |
| `label` | `string` | `undefined` | Text label. Can be used instead of or alongside `children`. |
| `element` | `string` | `'button'` | Override rendered HTML element (e.g. `'a'` for link-buttons). |
| `type` | `string` | `'button'` | HTML button type attribute; only applied when `element === 'button'`. |
| `className` | `string` | `''` | Additional CSS class names. |
| `ref` | `Ref` | — | Forwarded ref to the root element. |

## States

| State | Visual Description |
|---|---|
| Default (primary) | Violet fill (`--color-violet`), white text, 1px violet border |
| Default (secondary) | White fill, 2px violet border, violet text |
| Default (link) | Transparent background, violet text, no border |
| Hover (primary) | `--color-violet-dark` fill and border |
| Hover (secondary) | `--color-violet-dark` border and text |
| Hover (link) | `--color-violet-lightest` background |
| Focus-visible (primary) | `--color-violet-dark` bg, white border, 2px `--color-violet-light` ring |
| Focus-visible (secondary) | `--color-violet-lightest` bg, 2px `--color-violet-lightest` ring |
| Focus-visible (link) | 2px `--color-violet-light` ring |
| Active (primary) | `--color-violet-dark` bg, inset shadow `rgba(0,0,0,0.24)` |
| Active (secondary) | White bg, inset `--color-violet-light` shadow |
| Disabled | Neutral muted colors; `pointer-events: none` |
| Processing | Spinner visible; button text color matches background (invisible); `pointer-events: none` |
| Icon-only | Reduced horizontal padding |
| Full-width | `width: 100%` |

## Code Example

```tsx
import MarketingButton from '@teamleader/ahoy/dist/es/components/marketingButton';

// Primary CTA
<MarketingButton level="primary" size="large">
  Upgrade to Pro
</MarketingButton>

// Secondary with icon
import { IconLockSmallFilled } from '@teamleader/ahoy/dist/es/assets/icons/components';

<MarketingButton level="secondary" icon={<IconLockSmallFilled />} iconPlacement="left">
  Unlock feature
</MarketingButton>

// Processing state
<MarketingButton level="primary" processing>
  Upgrading...
</MarketingButton>

// As anchor link
<MarketingButton element="a" href="/pricing" level="link">
  View pricing
</MarketingButton>
```

## Cross-references
- `MarketingButtonGroup` — groups multiple MarketingButtonGroup.Button items as a segmented control
- `MarketingSplitButton` — split button using MarketingButton internally
- `MarketingDialog` — uses MarketingButton for primary/secondary actions
- `Button` — standard product button using the mint palette
