# Lottie

## Metadata
- **Name**: Lottie
- **Category**: Media / Animation
- **Status**: Stable
- **Import path**: `@teamleader/ahoy/dist/es/components/lottie`

## Overview

**When to use**: Use Lottie to embed After Effects–exported JSON animations (via the Lottie/Bodymovin format) in product surfaces. Typical uses include empty-state illustrations, onboarding animations, and success/error celebrations.

**When not to use**: Do not use Lottie for UI micro-interactions where CSS transitions suffice — use the design token transition/animation values instead. Do not use for static illustrations — use an SVG or `img` element.

## Anatomy

```
<div class="lottie lottie--paused?">   ← Container (.lottie)
  └── [lottie-web player]              ← Rendered by the lottie-web library (not shipped as JS in dist)
  └── ::after                          ← Pause overlay icon (▶) shown when paused
```

The Ahoy `lottie` component ships only a CSS theme file. The JS implementation (wrapping `lottie-web` or `@lottiefiles/react-lottie-player`) must be provided by the consuming application. The CSS classes style the container and its paused state.

## Tokens Used

| CSS Token | Role |
|---|---|
| `--color-mint` | Play button background color in paused overlay (`::after`) |
| `--color-neutral-light` | Play icon (▶) text color in paused overlay |

The container uses `position: relative` and `cursor: pointer`. The `::after` pseudo-element (visible when `.lottie--paused`) renders a centered `▶` glyph at `font-size: 25px` with a circular mint background.

## Props / API

Ahoy ships only the CSS for Lottie — there is no compiled JS component in `dist/es/components/lottie`. Apply the CSS classes directly to your Lottie player wrapper:

| CSS Class | Description |
|---|---|
| `.lottie` | Base class — sets `position: relative` and `cursor: pointer`. |
| `.lottie--paused` | Adds the `::after` pause/play overlay indicator. |

When integrating with `@lottiefiles/react-lottie-player` or `lottie-web`, apply these classes to the wrapper element and toggle `.lottie--paused` based on playback state.

## States

| State | Visual description |
|---|---|
| Playing | No overlay. Animation plays normally. |
| Paused | `::after` overlay shows a circular mint play button centered over the animation. |
| Hover (paused) | Overlay opacity drops to 0.5, indicating clickability. |

## Code Example

```tsx
import { Player } from '@lottiefiles/react-lottie-player';
import '@teamleader/ahoy/dist/es/components/lottie/theme.css';

// Apply Ahoy classes to a wrapper div
const [paused, setPaused] = React.useState(false);

<div
  className={`lottie${paused ? ' lottie--paused' : ''}`}
  onClick={() => setPaused(p => !p)}
>
  <Player
    src="/animations/success.json"
    autoplay={!paused}
    loop
    style={{ width: 200, height: 200 }}
  />
</div>
```

## Cross-references
- `LoadingElement` — shimmer skeleton for content placeholders
- `LoadingSpinner` — lightweight circular loading indicator
- `EmptyState` — typically uses Lottie animations for illustration slots
