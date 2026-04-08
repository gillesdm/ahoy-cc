# Typography

## Metadata
- **Name:** Typography
- **Category:** Foundation / Typography
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/typography`

## Overview
A set of typed text components built on a shared `textFactory` HOC. Each component applies a specific CSS class from the Ahoy type scale, and supports colour, tint, overflow clamping, and element overrides.

**When to use:**
- Rendering any text in a UI — always prefer these over raw HTML elements
- Matching the design system's type scale rather than hardcoding font sizes

**When not to use:**
- Rich text editing — use `WysiwygEditor`

## Anatomy

All components share the same internal structure:

```
Box[data-teamleader-ui="{baseType}"]  (element = defaultElement or override)
  className: uiTypography[baseType] + uiTypography[type] + theme[tint] + theme[color]
  style: WebkitLineClamp / MozLineClamp (when maxLines > 1)
  └── children
```

## Type Scale Reference

| Component Export | Base class | Size | Weight | Notes |
|-----------------|-----------|------|--------|-------|
| `TextSmall` | `ui-text` | `text-small` | 12 px / 400 | |
| `TextBody` | `ui-text` | `text-body` | 14 px / 400 | |
| `TextBodyCompact` | `ui-text` | `text-body-compact` | 14 px / 400 | Compact line-height |
| `TextDisplay` | `ui-text` | `text-display` | 16 px / 400 | |
| `UITextSmall` | `ui-text` | `ui-text-small` | 12 px / 400 | UI variant |
| `UITextBody` | `ui-text` | `ui-text-body` | 14 px / 400 | UI variant |
| `UITextDisplay` | `ui-text` | `ui-text-display` | 16 px / 400 | UI variant |
| `Heading1` | `heading` | `heading-1` | 24 px / 700 | |
| `Heading2` | `heading` | `heading-2` | 18 px / 500 | |
| `Heading3` | `heading` | `heading-3` | 16 px / 500 | |
| `Heading4` | `heading` | `heading-4` | 12 px / 700 UPPERCASE | |
| `Heading5` | `heading` | `heading-5` | 14 px / 600 | |
| `Monospaced` | `ui-text` | `monospaced` | Monospace font | Used in Timer, numbers |
| `Marker` | `ui-text` | `marker` | Highlighted text | Mint-light 30 % background |

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-teal-darkest` | `.teal.darkest` — default text colour |
| `--color-teal-dark` | `.teal.dark` |
| `--color-neutral-dark` | `.neutral.dark` |
| `--color-neutral-darkest` | `.neutral.darkest` |
| `--color-ruby-dark` | `.ruby.dark` — error text |
| `--color-mint-dark` | `.mint.dark` — success text |
| `--color-gold-dark` | `.gold.dark` — warning text |
| `hsl(--color-mint-light-hsl / 30%)` | `.marker` background |
| `--unit` | Base unit for all size calculations (10 px) |
| `--font-family-inter` | Body/UI text font family |

## Props / API

All components created by `textFactory` share the same props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `color` | Ahoy colour name | — | Text colour from Ahoy colour families (`teal`, `mint`, `ruby`, `gold`, `aqua`, `violet`, `neutral`) |
| `tint` | `'lightest' \| 'light' \| 'normal' \| 'dark' \| 'darkest'` | `'darkest'` | Shade within the chosen colour |
| `element` | `string \| ComponentType` | Component default | Override the rendered HTML element |
| `maxLines` | `number` | — | Clamp text to N lines with ellipsis; `1` = single-line clamp |
| `className` | `string` | — | Extra class names |
| `style` | `CSSProperties` | — | Inline styles (merged with line-clamp styles) |
| `children` | `ReactNode` | — | Text content |

All Box layout props are also accepted and forwarded.

## States

| State | Visual Description |
|-------|--------------------|
| Default | `teal` / `darkest` — near-black body text |
| `color="ruby" tint="dark"` | Error red — used in ValidationText / ErrorText |
| `color="neutral" tint="dark"` | Muted secondary text |
| `maxLines={1}` | Single-line overflow: ellipsis |
| `maxLines={N}` (N > 1) | Multi-line webkit-box clamp |
| `Marker` | Mint-tinted highlight background on the text span |

## Code Example

```tsx
import {
  Heading1, Heading3,
  TextBody, TextSmall,
  UITextBody, Monospaced,
  Marker,
} from '@teamleader/ahoy/dist/es/components/typography';

function ArticleLayout() {
  return (
    <>
      <Heading1>Project Overview</Heading1>
      <Heading3 color="neutral" tint="dark">Last updated 2 days ago</Heading3>
      <TextBody maxLines={3}>
        This project covers the full redesign of the customer portal,
        including authentication, dashboard, and reporting modules.
      </TextBody>
      <TextSmall color="ruby" tint="dark">* Required field</TextSmall>
      <UITextBody>
        Invoice total: <Monospaced>€ 1,234.56</Monospaced>
      </UITextBody>
      <TextBody>
        Key term: <Marker>portal redesign</Marker>
      </TextBody>
    </>
  );
}
```

## Cross-references
- `ValidationText` — uses `TextSmall` with `ruby` / `gold` / `mint` colours
- `Monospaced` — used in `Timer`, `StatusBar`, and numeric displays
- `Marker` — inline text highlight
