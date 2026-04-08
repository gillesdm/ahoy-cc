# ShadowedScrollContainer

## Metadata
- **Name:** ShadowedScrollContainer
- **Category:** Layout / Utility
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/shadowedScrollContainer`

## Overview
A scroll container that automatically reveals gradient shadow overlays at the top and/or bottom edge when overflow content exists. This provides a visual cue that more content is available by scrolling.

**When to use:**
- Any scrollable region where the user may not notice hidden content (modals, side panels, dropdowns)
- Stacked lists or long forms inside a constrained height container

**When not to use:**
- Containers that do not overflow — the shadow is only visible when content exceeds the viewport
- Full-page scroll — use native scroll instead

## Anatomy

```
Box.container  (overflow: hidden, position: relative)
├── div.scroll-container   (overflow-y: auto, height: 100%)
│     └── children
├── div.container-top-shadow?     (absolute, top 0, 10 px gradient — when scrolled down)
└── div.container-bottom-shadow?  (absolute, bottom 0, 10 px gradient — when content overflows)
```

The top shadow is only rendered when `showTopShadow` is `true` **and** the container is scrollable **and** the top has been scrolled past.
The bottom shadow is rendered when the container is scrollable and the bottom has not yet been reached.

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-border` (neutral-dark RGBA ~9 %) | Shadow gradient colour (raw RGBA used directly in CSS: `rgba(130,130,140,0.09)`) |
| `--z-modal` (100) / `--z-toast` (1000) | Shadow z-index is 1001 (above modal) — hardcoded in component CSS |

> Note: The shadow gradients use hardcoded `rgba(130, 130, 140, 0.09)` values matching the neutral palette.

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Scrollable content |
| `className` | `string` | — | Extra class names applied to the inner `.scroll-container` div |
| `showTopShadow` | `boolean` | — | When `true`, shows the top gradient shadow once the user has scrolled down |
| `onBottomScrollReached` | `() => void` | — | Called once when the user scrolls to the very bottom (useful for pagination / lazy loading) |

All Box layout props are forwarded to the outer `.container` element.
The component is `forwardRef`-enabled; the ref points to the inner scroll container div.

## States

| State | Visual Description |
|-------|--------------------|
| Content fits (no overflow) | No shadows rendered |
| Content overflows, at top | Bottom shadow visible; top shadow hidden |
| Content overflows, scrolled mid | Both shadows visible (if `showTopShadow` enabled) |
| Content overflows, at bottom | Top shadow visible (if `showTopShadow` enabled); bottom shadow hidden |

## Code Example

```tsx
import ShadowedScrollContainer from '@teamleader/ahoy/dist/es/components/shadowedScrollContainer';

function ScrollableList({ items }) {
  return (
    <ShadowedScrollContainer
      showTopShadow
      style={{ maxHeight: 320 }}
      onBottomScrollReached={() => loadMoreItems()}
    >
      {items.map((item) => (
        <div key={item.id}>{item.label}</div>
      ))}
    </ShadowedScrollContainer>
  );
}
```

## Cross-references
- `SidePanel` — uses this pattern internally for body scroll
- `Dialog` — another context where scroll shadows are commonly needed
