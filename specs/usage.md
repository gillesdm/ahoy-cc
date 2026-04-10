# Prototyping with Claude Code

This guide explains how to use Claude Code to build prototypes in this project — no coding experience required. The specs you see in this folder are the instructions Claude reads before writing anything.

---

## How It Works

When you open this project in Claude Code, it automatically reads `CLAUDE.md` — a file that points Claude to every spec in `specs/`. Before writing a single line of CSS or React, Claude:

1. Reads the relevant spec file (e.g. `specs/atoms/button.md`)
2. Checks which tokens apply from `specs/tokens/token-reference.md`
3. Writes code that only uses `var(--token)` references — never raw colours or pixel values
4. Runs `node scripts/token-audit.js` to verify before finishing

**You describe what you want. The specs tell Claude how to build it correctly.**

---

## Getting Started

### Open the project in Claude Code

```bash
# From the project root
claude .
```

Or open Claude Code from the VS Code extension / desktop app and navigate to this folder.

The dev server runs separately — start it once and leave it running:

```bash
cd prototype && npm install && npm run dev
```

Then open `http://localhost:5173` in your browser. It updates live as Claude edits files.

---

## How to Ask Claude to Build Things

You don't need to know component names or CSS properties. Describe the UI you want in plain language — Claude will look up the right spec and implement it correctly.

### Example prompts that work well

**Starting from scratch:**
```
Build me a simple page with a heading, a short description, and a primary CTA button centred on screen.
```

**Adding a specific component:**
```
Add a text input field below the heading. It should show an error state if left empty.
```

**Layout:**
```
Split the page into two columns — docs on the left, deployment links on the right. They should stack vertically on mobile.
```

**Styling an element:**
```
Add a card that shows a number with a mint-green background. It should get a border on hover.
```

**Iterating on something that exists:**
```
The counter component looks too small. Can you increase the padding and make the font larger?
```

**Asking what's available:**
```
What button styles are available? Show me all the levels.
```

```
What spacing tokens exist for section-level padding?
```

---

## The Spec Files Are Claude's Source of Truth

Every component Claude uses in this project has a spec file. When you ask for a button, Claude reads `specs/atoms/button.md` first — which tells it:

- The correct import path for the Ahoy library
- Which `level` prop to use for the primary mint-green style
- Which tokens control background, border, and shadow
- What states exist (hover, focus, disabled, loading)

This is why the prototypes stay consistent: Claude isn't guessing — it's following written design decisions.

If you want to understand why Claude made a specific choice, ask:
```
Why did you use --space-6 here instead of --space-4?
```
```
What spec did you follow for this button?
```

---

## Pointing Claude to a Specific Spec

For more targeted results, you can point Claude directly to a spec:

```
Following specs/atoms/input.md, add a controlled text input with an error state.
```

```
Use specs/patterns/layout.md to build a two-column section with a spacer above it.
```

```
Build the next-steps organism from specs/organisms/next-steps.md.
```

This is especially useful when you want Claude to reproduce something exactly as specced, rather than interpreting your description.

---

## Iterating on a Prototype

Claude remembers the context of your conversation. You can iterate naturally:

```
> Build a page with a hero section and a CTA button.

[Claude builds it]

> Make the button destructive instead of primary.

[Claude updates it]

> Add a counter above the button showing the number 42.

[Claude adds the counter molecule]

> The counter needs more breathing room above it.

[Claude adjusts the spacing token]
```

Each change goes through the spec system — Claude won't introduce raw values or break the token rules mid-conversation.

---

## Validating the Prototype

After a session of changes, ask Claude to verify everything is clean:

```
Run the token audit and fix any violations.
```

Claude will run:
```bash
node scripts/token-audit.js
```

And fix any raw hex colours, pixel values, or durations it finds. A clean prototype outputs:
```
✅ Token audit passed — 0 violations found.
```

You can also ask for an audit at any point during prototyping — it's safe to run multiple times.

---

## Adding New Design Decisions

If you want to introduce a new visual element that isn't covered by an existing spec, tell Claude what you want and ask it to write the spec too:

```
I want a notification banner that uses the warning colour. Build it and write a spec for it in specs/molecules/.
```

Claude will:
1. Implement the component using existing tokens
2. Write a spec file following the same structure as the others
3. Add "Uses" and "Used by" cross-references
4. Run the audit

This keeps the spec system complete as the prototype grows.

---

## Handing Off to a Developer

When your prototype is ready, the handoff is straightforward because:

- **The code already follows the real production rules** — same tokens, same import paths, same component API
- **The audit confirms nothing is ad-hoc** — no one-off hex codes or magic numbers
- **The spec files explain every decision** — the developer reads the same source Claude used

Tell the developer:
```
The prototype is in prototype/src/. It follows the specs in specs/. Run the token audit to confirm it's clean.
```

---

## Quick Reference — Spec Locations

| I want to… | Read this spec |
|-----------|---------------|
| Use a button | [`specs/atoms/button.md`](atoms/button.md) |
| Use a text input | [`specs/atoms/input.md`](atoms/input.md) |
| Use an icon button | [`specs/atoms/icon-button.md`](atoms/icon-button.md) |
| Show a numeric counter | [`specs/molecules/counter.md`](molecules/counter.md) |
| Build a hero / logo section | [`specs/molecules/hero.md`](molecules/hero.md) |
| Build a navigation link section | [`specs/organisms/next-steps.md`](organisms/next-steps.md) |
| Lay out a page | [`specs/patterns/layout.md`](patterns/layout.md) |
| Build a sidebar nav | [`specs/organisms/sidebar.md`](organisms/sidebar.md) |
| Understand colour | [`specs/foundations/color.md`](foundations/color.md) |
| Understand spacing | [`specs/foundations/spacing.md`](foundations/spacing.md) |
| See every token in one place | [`specs/tokens/token-reference.md`](tokens/token-reference.md) |
| Browse atoms | [`specs/atoms/`](atoms/) |
| Browse molecules | [`specs/molecules/`](molecules/) |
| Browse organisms | [`specs/organisms/`](organisms/) |
| Browse layout patterns | [`specs/patterns/`](patterns/) |
