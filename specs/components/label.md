# Label

## Metadata
- **Name**: Label
- **Category**: Forms / Typography
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/label`

## Overview

**When to use**: Use Label to associate a text description with a form control. It renders an HTML `<label>` element and supports required indicators and tooltip icons. Always pair with an Input, Select, Checkbox, or other form component.

**When not to use**: Do not use Label as generic heading text — use Typography components (`Heading`, `TextBody`) directly. Do not use it outside of a form context.

## Anatomy

```
<label data-teamleader-ui="label">   ← Box (element="label", marginBottom=3)
  └── <Box display="flex" alignItems="center">
        ├── <TextBodyCompact|TextDisplay>   ← label text (color=teal/neutral, tint=darkest/lightest)
        ├── <TextSmall color="ruby" tint="dark"> * </TextSmall>   ← [if required]
        └── <TooltippedIcon>                ← [if tooltip]
              └── <IconInfoBadgedSmallOutline />
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-teal-darkest` | Default label text color |
| `--color-neutral-lightest` | Inverse label text color |
| `--color-ruby-dark` | Required asterisk color |
| `--spacer-regular` (18px) | `marginBottom` (Box spacing 3) below the label |

Typography uses Ahoy's `TextBodyCompact` (small/medium sizes) or `TextDisplay` (large size) — approximately `14px`/`16px` body text.

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Label text content. Non-string React elements receive `inverse`, `marginTop`, and `size` props cloned in. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls typography component: `TextBodyCompact` for small/medium, `TextDisplay` for large. |
| `inverse` | `boolean` | `false` | Renders label text in `--color-neutral-lightest` for use on dark backgrounds. |
| `required` | `boolean` | `false` | Appends a ruby-colored asterisk (`*`) after the label text. |
| `tooltip` | `string` | — | Tooltip content shown on the info icon. |
| `tooltipProps` | `object` | — | Additional props forwarded to the Tooltip component wrapping the info icon. |
| `...others` | `BoxProps` | — | Layout props forwarded to the outer Box/label element. |

## States

| State | Visual description |
|---|---|
| Default | `--color-teal-darkest` label text, 18px bottom margin. |
| Required | Asterisk in `--color-ruby-dark` appended after text. |
| With tooltip | Info icon (`IconInfoBadgedSmallOutline`) appears after text with teal/neutral color. |
| Inverse | Label text in `--color-neutral-lightest`; tooltip icon in neutral/lightest. |

## Code Example

```tsx
import Label from '@teamleader/ahoy/dist/es/components/label';
import Input from '@teamleader/ahoy/dist/es/components/input';

// Basic label + input
<Label htmlFor="name">Full name</Label>
<Input id="name" />

// Required field
<Label required>Email address</Label>
<Input type="email" />

// With tooltip
<Label tooltip="We'll never share this with anyone.">
  Phone number
</Label>

// Large inverse
<Label size="large" inverse>
  Password
</Label>
```

## Cross-references
- `Input` — primary form control to pair with Label
- `Checkbox` — has its own label prop but can use Label externally
- `LabelValuePair` — structured label/value display (read-only context, different component)
