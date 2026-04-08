# LoadingElement

## Metadata
- **Name**: LoadingElement
- **Category**: Feedback / Loading
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/loadingElement`

## Overview

**When to use**: Use LoadingElement to render skeleton/placeholder shapes while content is being fetched. It renders an animated SVG shimmer (via `react-content-loader`) as either a rectangle or circle. Compose multiple LoadingElements to approximate the layout of the content being loaded.

**When not to use**: Do not use for indeterminate progress indication at the page level — use `LoadingBar`. Do not use for button/icon loading states — use `LoadingSpinner`.

## Anatomy

```
<ContentLoader>          ← SVG wrapper with shimmer animation
  ├── <rect …>           ← shape="rectangle" (default)
  └── <circle …>         ← shape="circle"
  [or custom children]   ← pass arbitrary SVG shapes as children
```

The SVG `viewBox` and dimensions are derived from `containerWidth`/`containerHeight` (fallback to `width`/`height`). The shimmer animates at `animationSpeed` cycles per second.

## Tokens Used

| CSS Token | Role |
|---|---|
| — | No CSS custom properties used; colors are passed as props or use hardcoded defaults. |

Default colors (hardcoded, not token-based):
- Background shimmer color: `#E4E4E6` (close to `--color-neutral`)
- Foreground (highlight): ContentLoader library default (`#f5f5f5`)
- Animation speed: `0.5` (cycles/second)

To align with the design system, pass `backgroundColor` matching `--color-neutral` (`hsl(240, 3.85%, 89.8%)`).

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `width` | `number \| string` | — | Width of the shape in SVG units. |
| `height` | `number \| string` | — | Height of the shape in SVG units. |
| `shape` | `'rectangle' \| 'circle'` | `'rectangle'` | Rendered SVG shape. Circles auto-compute `cx`/`cy` from width/height; radius defaults to 20. |
| `x` | `number` | `0` | X offset of the shape within the SVG canvas. |
| `y` | `number` | `0` | Y offset of the shape within the SVG canvas. |
| `radius` | `number` | `6` | Corner radius for rectangles (`rx`/`ry`). Ignored for circles. |
| `backgroundColor` | `string` | `'#E4E4E6'` | Base shimmer color (the "empty" state). |
| `animationSpeed` | `number` | `0.5` | Animation speed in cycles per second. |
| `containerWidth` | `number \| string` | — | SVG canvas width (overrides `width` for viewBox). |
| `containerHeight` | `number \| string` | — | SVG canvas height (overrides `height` for viewBox). |
| `children` | `ReactNode` | — | Custom SVG shapes. When provided, the default rect/circle is not rendered. |
| `...rest` | `ContentLoaderProps` | — | Any additional props forwarded to `react-content-loader`. |

## States

| State | Visual description |
|---|---|
| Loading | Shimmer animation sweeps across the shape from left to right continuously. |
| Rectangle | Rounded rectangle (default `rx=6`) approximating text lines, images, or cards. |
| Circle | Circle approximating avatars or icon placeholders. |
| Custom | Arbitrary SVG shapes passed as children for complex skeleton layouts. |

## Code Example

```tsx
import LoadingElement from '@teamleader/ahoy/dist/es/components/loadingElement';

// Single text-line skeleton
<LoadingElement width={200} height={14} />

// Avatar skeleton (circle)
<LoadingElement width={40} height={40} shape="circle" />

// Card skeleton — custom shapes
<LoadingElement containerWidth={300} containerHeight={80}>
  <circle cx={24} cy={24} r={20} />
  <rect x={54} y={12} rx={4} ry={4} width={200} height={12} />
  <rect x={54} y={34} rx={4} ry={4} width={150} height={10} />
</LoadingElement>

// Token-aligned color
<LoadingElement
  width={120}
  height={12}
  backgroundColor="hsl(240, 3.85%, 89.8%)"
/>
```

## Cross-references
- `LoadingBar` — horizontal progress bar for page-level loading
- `LoadingSpinner` — circular spinner for inline/button states
- `Avatar` — often paired with circle LoadingElement as placeholder
