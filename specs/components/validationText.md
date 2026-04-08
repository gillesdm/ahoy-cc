# ValidationText

## Metadata
- **Name:** ValidationText
- **Category:** Form / Feedback
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/validationText`

## Overview
A conditional helper/feedback text component displayed beneath form inputs. Renders one of four sub-components (error, warning, success, help) based on which prop is provided. Priority order: error > warning > success > help.

**When to use:**
- Providing inline validation feedback directly below a form field
- Showing contextual help text beneath an input before the user interacts

**When not to use:**
- Page-level alerts — use `Banner` or `Alert`
- Feedback inside a toast — use `Toast`

## Anatomy

```
ValidationText (renders one of the following, or null)
├── ErrorText[data-teamleader-ui="error-text"]
│     └── TextSmall (color="ruby", tint="dark"|"light" if inverse)
├── WarningText[data-teamleader-ui="warning-text"]
│     └── TextSmall (color="gold", tint="dark"|"light" if inverse)
├── SuccessText[data-teamleader-ui="success-text"]
│     └── TextSmall (color="mint", tint="dark"|"light" if inverse)
└── HelpText[data-teamleader-ui="help-text"]
      └── TextSmall (color="neutral", tint="darkest"|"lightest" if inverse)
```

Only one sub-component renders at a time; if multiple props are set, priority is: error → warning → success → help.

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-ruby-dark` (`--color-error`) | Error text colour |
| `--color-ruby-light` | Error text colour when `inverse=true` |
| `--color-gold-dark` (`--color-warning`) | Warning text colour |
| `--color-gold-light` | Warning text colour when `inverse=true` |
| `--color-mint-dark` (`--color-success`) | Success text colour |
| `--color-mint-light` | Success text colour when `inverse=true` |
| `--color-neutral-darkest` (`--color-text`) | Help text colour |
| `--color-neutral-lightest` | Help text colour when `inverse=true` |
| `--spacer-smallest` (3 px) | `marginTop: 1` above the text |

## Props / API

### ValidationText

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `error` | `string \| boolean` | — | Error message string; `true` activates error border only (no text) |
| `warning` | `string \| boolean` | — | Warning message string |
| `success` | `string \| boolean` | — | Success message string |
| `help` | `string` | — | Help/hint message |
| `inverse` | `boolean` | — | Lightens text colour for use on dark backgrounds |

### Sub-components (ErrorText, WarningText, SuccessText, HelpText)

Each accepts:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | The message text |
| `inverse` | `boolean` | `false` | Use light colour variant for dark backgrounds |

All TextSmall/Box props are also forwarded.

## States

| State | Visual Description |
|-------|--------------------|
| No feedback | Renders `null` — no space taken |
| Help | Small neutral-dark text below the field |
| Success | Small mint-dark text below the field |
| Warning | Small gold-dark text below the field |
| Error | Small ruby-dark text below the field |
| `inverse=true` | Light-coloured text for dark/filled backgrounds |

## Code Example

```tsx
import ValidationText from '@teamleader/ahoy/dist/es/components/validationText';

// Used directly (uncommon — typically composed inside Input, Select, etc.)
<ValidationText
  error="This field is required"
/>

<ValidationText
  help="Enter the contact's primary email address"
/>

// Sub-components can be imported independently
import { ErrorText, HelpText } from '@teamleader/ahoy/dist/es/components/validationText';

<ErrorText>Please enter a valid email address</ErrorText>
<HelpText>This will be used for login</HelpText>
```

## Cross-references
- `Input` — renders `ValidationText` below the input field
- `Select` — renders `ValidationText` below the dropdown
- `WysiwygEditor` — renders `ValidationText` below the editor
- `TextSmall` — the typography component used by all sub-variants
