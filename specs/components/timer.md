# Timer

## Metadata
- **Name:** Timer
- **Category:** Action / Utility
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/timer`

## Overview
A compact clickable button that displays a time value (e.g. `"00:42:15"`) alongside a timer icon. Two visual states differentiate between a stopped timer and a running timer. Typically used in time-tracking workflows.

**When to use:**
- Inline time-tracking controls on task or deal records
- Starting/stopping a running time entry from a list view

**When not to use:**
- Displaying static elapsed time without interactivity — use `Monospaced` text directly
- Complex timer controls with pause/lap — build a custom solution

## Anatomy

```
Box[button][data-teamleader-ui="timer"] (height: 30 px, min-width: 85 px, rounded)
├── Icon (aqua/teal depending on running state)
│     └── IconTimerMediumOutline
└── LoadingSpinner (when loading=true)  OR
    UITextBody[element=Monospaced] (when loading=false)
```

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `hsl(--color-neutral-darkest-hsl / 12%)` | Background when not running |
| `hsl(--color-neutral-darkest-hsl / 12%)` | Border when not running |
| `hsl(--color-neutral-darkest-hsl / 24%)` | Border on focus-visible (not running) |
| `hsl(--color-neutral-darkest-hsl / 18%)` | Hover background (not running) |
| `hsl(--color-aqua-dark-hsl / 12%)` | Background when running |
| `hsl(--color-aqua-dark-hsl / 12%)` | Border when running |
| `hsl(--color-aqua-dark-hsl / 24%)` | Border on focus-visible (running) |
| `hsl(--color-aqua-dark-hsl / 18%)` | Hover background (running) |
| `--color-teal-darkest` | Icon and text colour (not running) |
| `--color-aqua-dark` | Icon and text colour (running) |
| `--animation-duration` | Background/border transition |
| `--animation-curve-fast-out-slow-in` | Transition easing |
| `--border-radius-round` (`--radius-round`) | Fully rounded pill button (`borderRadius: "rounded"`) |
| `--spacer-smaller` (6 px) | Horizontal padding (`paddingHorizontal: 2`) |

## Props / API

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `running` | `boolean` | `false` | When `true`, applies the running (aqua) visual state |
| `loading` | `boolean` | `false` | When `true`, replaces the time text with a `LoadingSpinner` |
| `children` | `ReactNode` | — | The time string to display (e.g. `"00:42:15"`) |
| `className` | `string` | — | Extra class names |

All Box props (except `element`) and standard button attributes are forwarded.

## States

| State | Visual Description |
|-------|--------------------|
| Stopped (default) | Neutral semi-transparent pill; teal timer icon; teal monospaced text |
| Running | Aqua semi-transparent pill; aqua timer icon; aqua monospaced text |
| Loading | Spinner replaces time text; colour matches running state |
| Hover (stopped) | Background slightly darkened |
| Hover (running) | Aqua background slightly darkened |
| Focus-visible | 1 px ring + stronger border colour |
| Active (pressed) | Inset shadow |

## Code Example

```tsx
import Timer from '@teamleader/ahoy/dist/es/components/timer';

function TimeTracker({ elapsed, isRunning, onToggle, isLoading }) {
  return (
    <Timer
      running={isRunning}
      loading={isLoading}
      onClick={onToggle}
    >
      {elapsed}
    </Timer>
  );
}

// Usage:
<TimeTracker elapsed="01:23:45" isRunning={true} onToggle={handleToggle} />
```

## Cross-references
- `Monospaced` — the typography component used for the time display
- `LoadingSpinner` — shown during async operations
- `Icon` — timer icon wrapper
