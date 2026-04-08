# DatePicker

## Metadata
- **Name:** DatePicker
- **Category:** Form / Date Input
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/datepicker`

## Overview
**When to use:** Use DatePicker to let users select a single date from an inline calendar. It wraps `react-day-picker` v9 with Ahoy styling. Supports size variants, optional week numbers, optional month/year dropdown navigation, disabled day ranges, and custom day modifiers.

**When not to use:** Do not use for date range selection — DatePicker supports single-date mode only. Do not use DatePicker inline inside a tight form row; use `DatePickerInput` (same directory) which wraps this in a popover-triggered input. Do not use when date is always the current date and free selection is inappropriate.

## Anatomy

```
┌──────────────────────────────────────┐
│  [Nav ◀]   [Month Year]   [Nav ▶]   │  ← .caption (.navBar absolute positioned)
├──────────────────────────────────────┤
│  M   T   W   T   F   S   S          │  ← .weekdays row (uppercase weekday abbreviations)
├──────────────────────────────────────┤
│  29  30  31  1   2   3   4          │  ← .week rows inside .body
│  5   6   7   8   9   10  11         │
│  ...                                │
│  [wk#] columns if showWeekNumbers   │
└──────────────────────────────────────┘

With border (default): outer .wrapper has 1px border + border-radius
Month picker dropdown replaces nav arrows when withMonthPicker=true
```

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-neutral-light` | Caption (header) and weekdays row background |
| `--color-neutral` | Cell grid borders (inset box-shadows), wrapper border |
| `--color-neutral-dark` | Week number text |
| `--color-neutral-darkest` | Caption text, outside-month day color |
| `--color-teal-darkest` | Default day text color |
| `--color-aqua-darkest` | Selected day background |
| `--color-aqua-lightest` | Selected day text; day hover background |
| `--color-aqua` | Today button text color |
| `--color-neutral` (bg) | Today day background (bold) |
| `--color-neutral-light` | Disabled day background |
| `--color-neutral-dark` | Disabled day text |
| `--radius-md` (`--border-radius-medium` via `--border-radius: calc(0.4 * var(--unit))`) | Calendar outer corners |
| `--spacer-smallest` | Small size caption vertical padding |
| `--spacer-smaller` | Small navBar padding |
| `--spacer-small` | Medium navBar padding |
| `--spacer-regular` | Large caption top padding |
| `--font-family-inter` | All calendar text |

## Props / API

| Prop | Type | Default | Description |
|---|---|---|---|
| `selectedDate` | `Date \| undefined` | — | Controlled selected date |
| `onChange` | `(date: Date \| undefined) => void` | — | Called when a day is selected |
| `onDayClick` | `(date, modifiers, event) => void` | — | Additional day-click callback |
| `initialMonth` | `Date` | — | Month to display initially (uncontrolled) |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Controls day button padding, font sizes, and weekday initial count (large shows 2 chars) |
| `bordered` | `boolean` | `true` | Adds 1px border around the calendar wrapper |
| `locale` | `string` | `'en-GB'` | BCP 47 locale tag. `'en-US'` sets week start to Sunday; all others start Monday |
| `showWeekNumbers` | `boolean` | — | Displays ISO week number column on the left |
| `withMonthPicker` | `boolean` | — | Replaces prev/next arrows with a month+year dropdown selector |
| `modifiers` | `Record<string, Date[] \| DateRange \| Matcher>` | — | Custom day modifiers mapped to CSS class names in theme |
| `disabledDays` | `Matcher \| Matcher[]` | — | Days to disable (react-day-picker `disabled` prop) |
| `className` | `string` | — | Additional CSS class names on the root Box |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |
| `...props` | `BoxProps` | — | Box layout props forwarded to the outer container |

## States

| State | Visual Description |
|---|---|
| Default day | `--color-teal-darkest` text on white cell |
| Hovered day | `--color-aqua-lightest` background, `--color-aqua-darkest` text |
| Selected day | `--color-aqua-darkest` background, `--color-aqua-lightest` text |
| Today | `--color-neutral` background, bold 700 weight |
| Disabled | `--color-neutral-light` background, `--color-neutral-dark` text, default cursor |
| Outside month | `--color-neutral-darkest` text, default cursor |
| Week number | Muted `--color-neutral-dark` text, right-aligned with right border |

## Code Example

```tsx
import DatePicker from '@teamleader/ahoy/dist/es/components/datepicker';

// Basic controlled usage
const [date, setDate] = useState<Date | undefined>(new Date());

<DatePicker
  selectedDate={date}
  onChange={setDate}
  size="medium"
  bordered
/>

// With week numbers and month picker
<DatePicker
  selectedDate={date}
  onChange={setDate}
  showWeekNumbers
  withMonthPicker
  size="large"
  locale="en-GB"
/>

// With disabled past days
<DatePicker
  selectedDate={date}
  onChange={setDate}
  disabledDays={{ before: new Date() }}
/>
```

## Cross-references
- `DatePickerInput` — wraps DatePicker in a popover-triggered text input (same directory)
- `Select` / `Input` — for other form field patterns
- `Box` — outer layout wrapper
