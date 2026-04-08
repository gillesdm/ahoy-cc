# Box

## Metadata
- **Name**: Box
- **Category**: Layout / Primitives
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/box`

## Overview

**When to use**: Use Box as the foundational layout primitive for any element that needs controlled spacing (margin/padding), flex layout, background color, borders, or overflow handling — without writing custom CSS. Most Ahoy compound components are built on Box internally. Use Box for wrappers, containers, cards, and any structural layout element.

**When not to use**: Do not use Box for typographic content directly — wrap text in the appropriate typography component (`TextBody`, `Heading3`, etc.) and use Box as the container. Do not use Box to apply custom colors outside the Ahoy color palette.

## Anatomy

```
<Box element="div" (default)>
  children
</Box>
```

Box renders a single HTML element (configurable via `element`). All visual properties are applied via generated CSS module class names or inline `style` attributes (for border widths and dynamic values).

## Tokens Used

| CSS Token | Role |
|---|---|
| `--space-1` … `--space-8` (maps to `--spacer-smallest` … `--spacer-biggest`) | Margin and padding scale (1–8 steps) |
| Ahoy color tokens (`--color-{family}-{tint}`) | `backgroundColor` and border color values |
| `--radius-sm` / `--radius-md` / `--radius-lg` / `--radius-round` | Maps to `borderRadius='square'|'rounded'|'circle'` |

Spacing step → Ahoy spacer mapping:
| Step | Token | Value |
|---|---|---|
| 1 | `--spacer-smallest` | 3px |
| 2 | `--spacer-smaller` | 6px |
| 3 | `--spacer-small` | 12px |
| 4 | `--spacer-regular` | 18px |
| 5 | `--spacer-medium` | 24px |
| 6 | `--spacer-big` | 36px |
| 7 | `--spacer-bigger` | 48px |
| 8 | `--spacer-biggest` | 72px |

## Props / API

### Spacing props (all accept integers 0–8; 0 = no spacing)

| Prop | Type | Default | Description |
|---|---|---|---|
| `padding` | `0–8` | `0` | Sets all four sides; overridden by more specific props |
| `paddingHorizontal` | `0–8` | `padding` | Left + right |
| `paddingVertical` | `0–8` | `padding` | Top + bottom |
| `paddingTop` | `0–8` | `paddingVertical` | Top padding |
| `paddingBottom` | `0–8` | `paddingVertical` | Bottom padding |
| `paddingLeft` | `0–8` | `paddingHorizontal` | Left padding |
| `paddingRight` | `0–8` | `paddingHorizontal` | Right padding |
| `margin` | `0–8` | `0` | Sets all four sides |
| `marginHorizontal` | `0–8` | `margin` | Left + right; negative values supported |
| `marginVertical` | `0–8` | `margin` | Top + bottom |
| `marginTop` | `0–8` | `marginVertical` | Top margin |
| `marginBottom` | `0–8` | `marginVertical` | Bottom margin |
| `marginLeft` | `0–8` | `marginHorizontal` | Left margin |
| `marginRight` | `0–8` | `marginHorizontal` | Right margin |

### Layout props

| Prop | Type | Default | Description |
|---|---|---|---|
| `element` | `string \| ComponentType` | `'div'` | Root HTML element or component |
| `display` | `'inline' \| 'inline-block' \| 'block' \| 'flex' \| 'inline-flex'` | — | CSS display value |
| `flexDirection` | `'row' \| 'row-reverse' \| 'column' \| 'column-reverse'` | — | CSS flex-direction |
| `flexWrap` | `'nowrap' \| 'wrap' \| 'wrap-reverse'` | — | CSS flex-wrap |
| `flex` | `string` | — | CSS flex shorthand (inline style) |
| `flexBasis` | `string` | — | CSS flex-basis (inline style) |
| `flexGrow` | `number` | — | CSS flex-grow (inline style) |
| `flexShrink` | `number` | — | CSS flex-shrink (inline style) |
| `alignContent` | `'center' \| 'flex-start' \| 'flex-end' \| 'space-around' \| 'space-between' \| 'space-evenly'` | — | CSS align-content |
| `alignItems` | `'center' \| 'flex-start' \| 'flex-end' \| 'baseline' \| 'stretch'` | — | CSS align-items |
| `alignSelf` | `'center' \| 'flex-start' \| 'flex-end' \| 'stretch'` | — | CSS align-self |
| `justifyContent` | `'center' \| 'flex-start' \| 'flex-end' \| 'space-around' \| 'space-between' \| 'space-evenly'` | — | CSS justify-content |
| `order` | `number` | — | CSS order (inline style) |
| `textAlign` | `'left' \| 'center' \| 'right'` | — | CSS text-align |
| `overflow` | `string` | — | CSS overflow (inline style) |
| `overflowX` | `string` | — | CSS overflow-x (inline style) |
| `overflowY` | `string` | — | CSS overflow-y (inline style) |
| `boxSizing` | `string` | — | CSS box-sizing (inline style) |

### Color / border props

| Prop | Type | Default | Description |
|---|---|---|---|
| `backgroundColor` | `string` | — | Ahoy color family name (e.g. `'mint'`, `'teal'`, `'neutral'`) |
| `backgroundTint` | `string` | — | Tint suffix (e.g. `'lightest'`, `'dark'`); omit for base color |
| `borderColor` | `string` | `'neutral'` | Ahoy color family for border |
| `borderTint` | `string` | `'dark'` | Tint suffix for border color |
| `borderWidth` | `number` | — | Border width in px (all sides) |
| `borderTopWidth` | `number` | — | Top border width in px |
| `borderBottomWidth` | `number` | — | Bottom border width in px |
| `borderLeftWidth` | `number` | — | Left border width in px |
| `borderRightWidth` | `number` | — | Right border width in px |
| `borderRadius` | `'square' \| 'rounded' \| 'circle'` | `'square'` | Corner radius (null / 4px / 50%) |
| `borderTopLeftRadius` | `'square' \| 'rounded' \| 'circle'` | `borderRadius` | Individual corner override |
| `borderTopRightRadius` | `'square' \| 'rounded' \| 'circle'` | `borderRadius` | Individual corner override |
| `borderBottomLeftRadius` | `'square' \| 'rounded' \| 'circle'` | `borderRadius` | Individual corner override |
| `borderBottomRightRadius` | `'square' \| 'rounded' \| 'circle'` | `borderRadius` | Individual corner override |

### Other

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Additional CSS class |
| `style` | `CSSProperties` | — | Inline style merged after generated styles |
| `children` | `ReactNode` | — | Content |
| `ref` | `Ref` | — | Forwarded to the root element |

## States

Box itself has no interactive states. Visual appearance is determined entirely by props.

## Code Example

```tsx
import Box from '@teamleader/ahoy/dist/es/components/box';

// Card-like container
<Box
  display="flex"
  flexDirection="column"
  padding={4}
  backgroundColor="neutral"
  backgroundTint="lightest"
  borderRadius="rounded"
  borderWidth={1}
>
  <TextBody>Card content</TextBody>
</Box>

// Horizontal layout with gap via margin
<Box display="flex" alignItems="center">
  <Box marginRight={3}><Avatar size="small" /></Box>
  <TextBody>Username</TextBody>
</Box>

// Negative margin trick (e.g. pull element flush)
<Box marginHorizontal={-3}>...</Box>
```

## Cross-references
- `Flex` — convenience wrapper pre-set with `display="flex"` and `gap` support
- `Grid` — CSS grid layout primitive
- All compound components — most Ahoy components use `Box` internally via `pickBoxProps` / `omitBoxProps`
