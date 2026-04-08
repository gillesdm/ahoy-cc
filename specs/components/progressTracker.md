# ProgressTracker

## Metadata
- **Name:** ProgressTracker (ProgressTracker, ProgressTracker.ProgressStep)
- **Category:** Navigation / Feedback
- **Status:** Stable
- **Import path:** `@teamleader/ahoy/dist/es/components/progressTracker`

## Overview
**When to use:** Use `ProgressTracker` to show a user's position within a multi-step process — onboarding flows, checkout steps, wizards, or any sequential task. It renders a horizontal row of steps connected by a progress bar that fills as steps are completed.

**When not to use:** Do not use for non-sequential states or filtering (use `Tabs` or `SegmentedControl`). Do not use when there are more than ~8 steps — the labels will become unreadable. Do not use for progress that is percentage-based rather than discrete-step-based (use a `ProgressBar` instead).

## Anatomy

```
┌─ ProgressTracker (flex row) ────────────────────────────────────────┐
│  padding: 20px 30px                                                  │
│                                                                      │
│  ┌─ Step 1 (first) ─┐  ─────────────  ┌─ Step 2 ─┐  ─────────────  ┌─ Step N (last) ─┐
│  │  [label]         │  [track line]   │  [label]  │  [track line]   │  [label]        │
│  │  [meta]          │                 │  [meta]   │                 │  [meta]         │
│  │  ●  (bullet)     │                 │  ●        │                 │  ●              │
│  └──────────────────┘                 └───────────┘                 └─────────────────┘
│
│  ● = status-bullet (12px circle)  surrounded by status-bullet-halo (24px, active only)
└──────────────────────────────────────────────────────────────────────┘
```

Parts:
- **ProgressTracker** — `display: flex; flex-direction: row` wrapper; generates `ProgressStep` children with computed `active`/`completed` props
- **Track line** — CSS `::before` (neutral grey, full width) and `::after` (coloured, animates width) pseudo-elements on each step
- **ProgressStep** — individual step with label, optional meta text, bullet, and halo
- **Status bullet** — 12px circle coloured per the tracker's `color` prop when active/completed; grey when neither
- **Status bullet halo** — 24px translucent halo that scales in on the active step
- **Step label** — `TextSmall` shown above (default) or below the bullet depending on `labelPosition`
- **Step meta** — optional secondary `TextSmall` beneath the label

## Tokens Used

| CSS Token | Role |
|-----------|------|
| `--color-border` (`--color-neutral-dark`) | Track line colour (incomplete segments) and inactive bullet |
| `--color-accent` (`--color-mint`) | Default completed/active track and bullet (`color="mint"`) |
| `--color-accent-border` (`--color-mint-dark`) | Active bullet (darker shade of track colour) |
| `--color-text` (`--color-teal-darkest`) | Step label text colour |
| `--color-text-subtle` (`--color-neutral-darkest`) | Step meta text colour |
| `--font-family-base` (`--font-family-inter`) | Active step label font |
| `--font-weight-semibold` (600) | Active step label weight |
| `--duration-fast` (`--animation-duration`, 0.35s) | Track fill width animation |
| `--easing-default` (`--animation-curve-default`) | Track and halo animation easing |
| `--space-1` (`--spacer-smallest`) | Step label horizontal padding |

> The `--step-color` CSS custom property is set via inline `style` when `activeStepColor` overrides the step colour.

### Track colour by `color` prop

| `color` value | Track / bullet colour |
|---------------|-----------------------|
| `mint` (default) | `--color-mint` / `--color-mint-dark` |
| `neutral` | `--color-neutral` / `--color-neutral-dark` |
| `aqua` | `--color-aqua` / `--color-aqua-dark` |
| `violet` | `--color-violet` / `--color-violet-dark` |
| `gold` | `--color-gold` / `--color-gold-dark` |
| `ruby` | `--color-ruby` / `--color-ruby-dark` |
| `teal` | `--color-teal` / `--color-teal-dark` |

## Props / API

### ProgressTracker

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | One or more `ProgressTracker.ProgressStep` elements |
| `currentStep` | `number` | `0` | Zero-indexed index of the active step |
| `done` | `boolean` | — | When true, all steps are marked completed and no step is active |
| `color` | `'mint' \| 'neutral' \| 'aqua' \| 'violet' \| 'gold' \| 'ruby' \| 'teal'` | `'mint'` | Colour of completed/active track and bullets |
| `labelPosition` | `'top' \| 'bottom' \| 'alternating'` | `'top'` | Where step labels appear relative to the track |
| `activeStepColor` | `string` | — | CSS colour string for the active step bullet/halo only (overrides `color`) |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref to the root Box |

### ProgressTracker.ProgressStep

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | Primary step label text |
| `meta` | `string` | — | Optional secondary text below the label |
| `active` | `boolean` | `false` | Marks this step as the current step (managed by parent) |
| `completed` | `boolean` | `false` | Marks this step as completed (managed by parent) |
| `color` | `string` | `''` | CSS colour override for this step's bullet/halo (via `--step-color`) |
| `onClick` | `() => void` | — | Makes the bullet clickable; shows pointer cursor and scale animation on hover |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

> `active` and `completed` are automatically injected by `ProgressTracker` based on `currentStep` and `done`. You generally do not set them manually on `ProgressStep`.

## States

| State | Visual description |
|-------|--------------------|
| Incomplete step | Grey 12px bullet; no track fill |
| Active step | Coloured bullet (dark tint); 24px translucent halo scales in; label is semibold |
| Completed step | Coloured bullet (base tint); track segment fills rightward with animation |
| `done=true` | All steps show completed bullet; no active halo |
| Clickable step | Bullet scales 1.5× on hover when `onClick` is provided |
| `labelPosition="bottom"` | Labels below the track line |
| `labelPosition="alternating"` | Even steps flip to bottom, creating a zigzag layout |
| Custom `activeStepColor` | Only the active step's bullet and halo use the override colour |

## Code Example

```tsx
import ProgressTracker from '@teamleader/ahoy/dist/es/components/progressTracker';

const { ProgressStep } = ProgressTracker;

// Basic 4-step tracker at step 2 (index 1)
<ProgressTracker currentStep={1} color="mint">
  <ProgressStep label="Details" />
  <ProgressStep label="Address" />
  <ProgressStep label="Payment" />
  <ProgressStep label="Confirm" />
</ProgressTracker>

// All done
<ProgressTracker currentStep={1} done color="mint">
  <ProgressStep label="Details" />
  <ProgressStep label="Address" />
</ProgressTracker>

// With meta labels and clickable steps
<ProgressTracker currentStep={2} color="aqua" labelPosition="bottom">
  <ProgressStep label="Step 1" meta="Mon 3 Apr" onClick={() => goToStep(0)} />
  <ProgressStep label="Step 2" meta="Tue 4 Apr" onClick={() => goToStep(1)} />
  <ProgressStep label="Step 3" meta="Wed 5 Apr" onClick={() => goToStep(2)} />
</ProgressTracker>
```

## Cross-references
- `progressBar` — percentage-based continuous progress indicator
- `stepper` — vertical alternative for step-by-step forms
- `tabs` — tab-based navigation for non-sequential views
