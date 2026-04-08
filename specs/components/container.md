# Container

## Metadata
- **Name:** Container
- **Category:** Layout
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/container`

## Overview
**When to use:** Use Container to wrap page-level content with consistent horizontal padding. It provides the standard `--spacer-big` (36px) horizontal gutter on both sides. When `fixed` is set, it additionally centers itself and caps its width at 1056px — suitable for wide-screen page bodies, detail page headers, and full-width sections that should not stretch beyond a readable line length.

**When not to use:** Do not use Container for component-internal spacing. Use `Box` padding props or `Flex`/`Grid` gap props inside component compositions. Container is a page-layout primitive, not a card or panel.

## Anatomy

```
┌─────────────────────────────────────────────────────────┐
│  36px padding-left                           36px right │
│                                                         │
│   [children]                                            │
│                                                         │
└─────────────────────────────────────────────────────────┘

fixed variant (max-width: 1056px, margin: 0 auto):
        ←──────────── max 1056px ──────────────→
   ┌────┬────────────────────────────────────┬────┐
   │    │  36px pad  [children]  36px pad   │    │
   └────┴────────────────────────────────────┴────┘
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--space-7` / `--spacer-big` (36px) | Horizontal padding left and right |
| `max-width: 1056px` | Fixed-width cap (not a token — hardcoded in theme) |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `fixed` | `boolean` | `false` | When `true`, adds `margin: 0 auto` and `max-width: 1056px` to center-constrain the container |
| `children` | `ReactNode` | — | Content to render inside the container |
| `className` | `string` | — | Additional CSS class names |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |
| `...others` | `BoxProps` | — | All `Box` props are forwarded (padding, margin, background, etc.) |

> Container delegates to `Box` with `boxSizing="content-box"`, so explicit `padding` Box props will add to the theme padding.

## States

| State | Visual Description |
|---|---|
| Default | Full-width, horizontal gutter only |
| Fixed | Centered, capped at 1056px content width |

## Code Example

```tsx
import Container from '@teamleader/ahoy/dist/es/components/container';

// Full-width with gutter
<Container>
  <p>Full-width page section</p>
</Container>

// Centered fixed-width layout
<Container fixed>
  <p>Content capped at 1056px, centered on the page</p>
</Container>
```

## Cross-references
- `Box` — the underlying layout primitive Container delegates to
- `detailPage` — `DetailPage.Header` and `DetailPage.Body` both use Container internally
- `flex` — peer layout primitive for flex-based compositions
- `grid` — peer layout primitive for CSS-grid compositions
