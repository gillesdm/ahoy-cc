# MarketingBanner

## Metadata
- **Name**: MarketingBanner
- **Category**: Marketing / Promotions
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/marketingBanner`

## Overview

**When to use**: Use MarketingBanner to promote premium features, upsell opportunities, or important announcements within the product UI. It combines an illustration, a title, body content, and up to three actions in a visually distinct violet surface.

**When not to use**: Do not use MarketingBanner for system alerts or error messages — use `Alert` or `Banner` instead. Do not use it for transient notifications — use `Toast`.

## Anatomy

```
<div data-teamleader-ui="marketing-banner">   ← Box (violet/lightest bg, violet/normal border,
                                                      borderRadius="rounded", borderWidth=2, padding)
  └── <Flex gap=4 alignItems="center">
        ├── {illustration}                    ← Optional illustration slot (left)
        └── <Flex flex=1 gap=3 direction="column">
              ├── <Heading3>{title}</Heading3>          ← Optional title
              ├── {children}                            ← Body content
              └── <Flex gap=3>                          ← [if any action provided]
                    ├── <MarketingButton level="primary">   {primaryAction}
                    ├── <MarketingButton level="secondary"> {secondaryAction}
                    └── <MarketingButton level="link">      {tertiaryAction}
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-violet-lightest` | Banner background (`backgroundColor="violet" backgroundTint="lightest"`) |
| `--color-violet` | Banner border (`borderColor="violet" borderTint="normal"`) |
| `--color-violet-darkest` | Title text color (via Heading3 on violet surface) |
| `--spacer-small` (12px) | `size="small"` padding (Box padding=3) |
| `--spacer-medium` (24px) | `size="medium"` padding (Box padding=4) |
| `--spacer-regular` (18px) | `size="large"` padding (Box padding=5) |
| `--spacer-medium` (24px) | Gap between illustration and content (`gap=4`) |
| `--spacer-regular` (18px) | Gap between content items (`gap=3`) |
| `--border-radius-round` | `borderRadius="rounded"` |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Banner heading, rendered as `Heading3`. |
| `illustration` | `ReactNode` | — | Illustration element rendered to the left of the content. Use an SVG, image, or Lottie component. |
| `primaryAction` | `MarketingButtonProps` | — | Props for the primary CTA button (`level="primary"`). |
| `secondaryAction` | `MarketingButtonProps` | — | Props for the secondary action button (`level="secondary"`). |
| `tertiaryAction` | `MarketingButtonProps` | — | Props for the tertiary link-style action (`level="link"`). |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls banner padding (12px / 24px / 18px). |
| `children` | `ReactNode` | — | Body content — descriptive text, bullet lists, etc. |
| `className` | `string` | — | Additional CSS class names. |
| `...others` | `BoxProps` | — | Layout props forwarded to the outer Box. |

## States

| State | Visual description |
|---|---|
| Default | Violet-lightest background with 2px violet border and rounded corners. |
| With illustration | Illustration sits to the left, content stacks to the right. |
| With actions | Primary (filled violet), secondary (outlined), tertiary (link-style) buttons in a row. |
| Small | Tighter padding (12px). Suitable for sidebar contexts. |
| Large | More generous padding (18px). Suitable for dashboard empty states. |

## Code Example

```tsx
import MarketingBanner from '@teamleader/ahoy/dist/es/components/marketingBanner';

// Basic banner with title and action
<MarketingBanner
  title="Upgrade to Grow"
  primaryAction={{ children: 'Start free trial', onClick: handleUpgrade }}
>
  Get access to advanced reporting and more.
</MarketingBanner>

// With illustration and multiple actions
<MarketingBanner
  title="Discover Teamleader Focus"
  illustration={<img src="/illustrations/rocket.svg" alt="" width={80} />}
  primaryAction={{ children: 'Learn more', onClick: handleLearnMore }}
  tertiaryAction={{ children: 'Dismiss', onClick: handleDismiss }}
  size="large"
>
  Manage your projects and clients in one place.
</MarketingBanner>
```

## Cross-references
- `MarketingButton` — action buttons rendered inside the banner
- `Banner` — system-level informational banner (non-marketing, non-violet)
- `Alert` — inline alert for errors, warnings, and success messages
- `Island` — general-purpose surface container (non-marketing)
- `Lottie` — animation component for the illustration slot
