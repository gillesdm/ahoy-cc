# MarketingMarker

## Metadata
- **Name:** MarketingMarker
- **Category:** Marketing / Typography
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/marketingMarker`

## Overview
**When to use:** Use MarketingMarker to highlight inline text with a semi-transparent violet background — like a highlighter pen effect. Intended for emphasising key words or phrases in marketing copy, upsell headings, or feature descriptions.

**When not to use:** Do not use for status indicators or badges. Do not use in data-dense product UI where highlighted text could be confused with selections or errors.

## Anatomy

```
Normal text [highlighted text] normal text
             ↑
             <mark> element
             semi-transparent violet-light background
             color: inherit (does not override text color)
```

- **Root element:** `<mark>` (via `Box element="mark"`)
- **Padding:** `paddingHorizontal={1}` (3px) and `marginHorizontal={-1}` (-3px) to preserve line flow
- **Color:** inherits from parent — does not override text color

## Tokens Used

> Marketing components use the `--color-violet-*` palette from Ahoy.

| CSS Token | Role |
|---|---|
| `--color-violet-light-hsl` | Background color base — used at 50% opacity: `hsl(var(--color-violet-light-hsl) / 50%)` |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Text content to be highlighted. |
| `className` | `string` | `undefined` | Additional CSS class names. |
| `ref` | `Ref` | — | Forwarded ref to the root element. |

MarketingMarker also accepts Box layout props (margin, display, etc.).

## States

The component has no interactive states. It is a purely visual inline decoration.

## Code Example

```tsx
import MarketingMarker from '@teamleader/ahoy/dist/es/components/marketingMarker';
import { Heading1 } from '@teamleader/ahoy/dist/es/components/typography';

<Heading1>
  Save <MarketingMarker>40%</MarketingMarker> with an annual plan
</Heading1>

// Inline within body copy
<p>
  Get access to{' '}
  <MarketingMarker>unlimited projects</MarketingMarker>
  {' '}and advanced analytics.
</p>
```

## Cross-references
- `MarketingStatusLabel` — pill-shaped marketing label for status display
- `MarketingLink` — for interactive inline marketing text
- `MarketingDialog` — often contains MarketingMarker in subtitle or body copy
