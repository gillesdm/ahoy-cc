# MarketingTypography

## Metadata
- **Name:** MarketingTypography (MarketingHeading1, MarketingHeading2)
- **Category:** Typography
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/marketingTypography`

## Overview
**When to use:** Use `MarketingHeading1` and `MarketingHeading2` for large, bold headings in marketing or landing-page contexts where the type weight needs to exceed standard UI headings. These render as `<h1>` and `<h2>` elements respectively.

**When not to use:** Do not use for in-app UI headings — use the standard `Heading1`/`Heading2` components from the `typography` package instead. Avoid using these inside data-dense interfaces.

## Anatomy

```
┌─────────────────────────────────────┐
│  MarketingHeading1 / MarketingHeading2
│  ┌─────────────────────────────────┐ │
│  │  <h1> / <h2>  children text    │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

Parts:
- **Root element** — `<h1>` (MarketingHeading1) or `<h2>` (MarketingHeading2), rendered via `Box`
- **Text content** — `children` slotted directly into the heading element

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-text` (`--color-teal-darkest`) | Heading text colour |
| `--font-family-base` (`--font-family-inter`) | Font family |
| `--font-weight-bold` (800 via inline) | Font weight (extra-bold, 800) |
| `--font-size-xl` (24px for h1) | Font size — MarketingHeading1 |
| 21px (custom, between `--font-size-lg` and `--font-size-xl`) | Font size — MarketingHeading2 |
| `--line-height-heading` (30px) | Line height — MarketingHeading1 |
| `--line-height-loose` (24px) | Line height — MarketingHeading2 |

> Note: The component's `theme.css` uses raw Ahoy Layer 1 tokens (`--color-teal-darkest`, `--font-family-inter`). Map these to Layer 2 aliases above when referencing from project code.

## Props / API

### MarketingHeading1

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Heading text or inline elements |
| `className` | `string` | — | Additional CSS class names |
| `ref` | `Ref<HTMLHeadingElement>` | — | Forwarded ref to the `<h1>` element |
| `...others` | `BoxProps` | — | All Box layout props (margin, padding, etc.) |

### MarketingHeading2

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Heading text or inline elements |
| `className` | `string` | — | Additional CSS class names |
| `ref` | `Ref<HTMLHeadingElement>` | — | Forwarded ref to the `<h2>` element |
| `...others` | `BoxProps` | — | All Box layout props (margin, padding, etc.) |

## States

| State | Visual description |
|-------|--------------------|
| Default | Dark teal (`--color-text`) text, Inter font, weight 800 |
| No distinct interactive states | These are purely presentational text components |

## Code Example

```tsx
import { MarketingHeading1, MarketingHeading2 } from '@teamleader/ahoy/dist/es/components/marketingTypography';

function HeroSection() {
  return (
    <>
      <MarketingHeading1>Grow your business with Teamleader</MarketingHeading1>
      <MarketingHeading2>Everything you need, in one place</MarketingHeading2>
    </>
  );
}
```

## Cross-references
- `typography` — standard UI headings (`Heading1`–`Heading5`, `TextBody`, `TextSmall`)
- `hero` — layout component that commonly hosts marketing headings
