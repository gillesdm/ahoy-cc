# MoneyDisplay

## Metadata
- **Name:** MoneyDisplay
- **Category:** Data Display / Typography
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/moneyDisplay`

## Overview
**When to use:** Use `MoneyDisplay` whenever a monetary value must be formatted and displayed with a currency symbol, thousands separator, and decimal precision derived from the Ahoy config context. Use `colored=true` to visually communicate positive, negative, or zero balance. Use `monospaced=true` (default) to align numbers in tabular layouts.

**When not to use:** Do not use for plain numbers that are not monetary. Do not use for editable currency inputs — use a `NumericInput` or `CurrencyInput` component. Requires `AhoyConfigProvider` in the tree to supply currency data.

## Anatomy

```
┌─ MoneyDisplay ────────────────────────────┐
│  <Element> (TextBody by default)          │
│    <strong> (when bold=true)              │
│      <Monospaced> (when monospaced=true)  │
│        [numberSymbol][currencySymbol] 1,234.56 [currencySymbol]
│      </Monospaced>                        │
│    </strong>                              │
│  </Element>                               │
└───────────────────────────────────────────┘
```

Parts:
- **Element** — the outer typography wrapper; defaults to `TextBody` but can be any typography component
- **Bold wrapper** — `<strong>` when `bold=true`, otherwise `<span>`
- **Monospaced wrapper** — Ahoy `Monospaced` component when `monospaced=true`
- **Formatted value** — produced by `react-number-format`; includes prefix/suffix for symbol and sign

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-accent` (`--color-mint`) | Positive value text colour (`colored=true`) |
| `--color-warning` (`--color-gold-dark`) | Zero value text colour (`colored=true`) |
| `--color-error` (`--color-ruby-dark`) | Negative value text colour (`colored=true`) |
| `--color-text` (`--color-teal-darkest`) | Default (uncolored) text colour via `TextBody` |
| `--font-family-base` | Base font via `TextBody` |

> Colour is applied via the `color`/`tint` props of the chosen `Element` component. No dedicated CSS class.

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | The numeric monetary value to display |
| `currency` | `string` | — | ISO 4217 currency code (e.g. `'EUR'`, `'USD'`); looked up in Ahoy config |
| `element` | `ComponentType` | `TextBody` | Typography wrapper component (`TextBody`, `TextSmall`, `Heading1`, etc.) |
| `monospaced` | `boolean` | `true` | Wraps the number in `Monospaced` for tabular alignment |
| `bold` | `boolean` | `false` | Wraps value in `<strong>` |
| `inline` | `boolean` | `false` | Renders without the `Element` wrapper (plain `<span>/<strong>`) |
| `colored` | `boolean` | `false` | Colours text based on value polarity (positive/negative/zero) |
| `colors` | `PolarityColors` | see below | Custom colour map for positive/negative/zero states |
| `explicitNumberSymbol` | `boolean` | `false` | Prepends `+ ` for positive values |
| `hideSymbol` | `boolean` | `false` | Omits the currency symbol |
| `singleLine` | `boolean` | `false` | Clamps to 1 line with `maxLines=1` on the element |
| `title` | `string` | — | HTML `title` attribute for the value element |
| `decimalScale` | `number` | — | Override decimal precision (otherwise from currency config) |
| `fixedDecimalScale` | `boolean` | `true` | Always show the specified number of decimal places |
| `...rest` | `TypographyProps` | — | Passed through to the `Element` component |

### Default `colors` object

```ts
{
  zero:     { color: 'gold',  tint: 'dark' },
  positive: { color: 'mint',  tint: 'dark' },
  negative: { color: 'ruby',  tint: 'dark' },
}
```

## States

| State | Visual description |
|-------|--------------------|
| Default | Teal body text, monospaced font, currency symbol from config |
| `colored` + positive | Mint-dark green text |
| `colored` + zero | Gold-dark amber text |
| `colored` + negative | Ruby-dark red text |
| `bold=true` | Value wrapped in `<strong>` |
| `inline=true` | Renders as bare bold/span without Block element |
| `hideSymbol=true` | Currency symbol omitted |
| `explicitNumberSymbol=true` | `+ ` prefix on positive values |

## Code Example

```tsx
import MoneyDisplay from '@teamleader/ahoy/dist/es/components/moneyDisplay';

// Basic display
<MoneyDisplay value={1234.5} currency="EUR" />

// Colored polarity, bold, explicit sign
<MoneyDisplay
  value={-42.0}
  currency="USD"
  colored
  bold
  explicitNumberSymbol
/>

// Inline inside a sentence
<p>
  Balance: <MoneyDisplay value={0} currency="GBP" colored inline />
</p>

// Custom element (larger heading)
import { Heading2 } from '@teamleader/ahoy/dist/es/components/typography';
<MoneyDisplay value={9999.99} currency="EUR" element={Heading2} bold />
```

## Cross-references
- `typography` — `TextBody`, `TextSmall`, `Heading1`–`Heading5` usable as `element`
- `context` — `AhoyConfigProvider` must supply currency definitions
- `numericInput` — for editable monetary input fields
