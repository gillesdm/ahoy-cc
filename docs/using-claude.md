# Using Claude Code

Claude reads the spec library and writes code that follows Ahoy conventions exactly. You describe what you want in plain English — no component names or technical terms required.

---

## Asking Claude to build things

### Starting from a blank page

```
Build a page with a heading, a short description, and a primary mint-green button centred on screen.
```

```
Create a simple login form with an email input, a password input, and a submit button.
```

### Adding a component

```
Add a text input below the heading. Show an error message if it's left empty.
```

```
Add a badge next to the heading showing "Beta".
```

### Layout

```
Split the page into two columns — text on the left, a demo widget on the right.
Stack them vertically on mobile.
```

```
Wrap the content in a centred container with comfortable horizontal padding.
```

### Asking what's available

```
What button styles exist? Show me all the options.
```

```
What spacing tokens should I use for section-level padding?
```

```
Show me all the badge variants.
```

### Changing something that already exists

```
The button is too small. Can you give it more padding and make the label larger?
```

```
Replace the primary button with a split button that has a dropdown.
```

```
Change the heading to use the subtle text colour.
```

---

## Pointing Claude to a specific spec

For precise results, reference the spec file directly. This is especially useful when you know which component you want, or when Claude's first attempt isn't quite right.

```
Following specs/atoms/button.md, add a disabled primary button below the form.
```

```
Use specs/organisms/sidebar.md to build the left navigation.
```

```
Build exactly what's described in specs/molecules/hero.md.
```

```
Check specs/foundations/spacing.md and fix the padding on the card — it feels off.
```

---

## Iterating on what Claude built

Claude remembers the full context of your session. Keep refining naturally — each message builds on the last.

<details>
<summary>See an example conversation</summary>

```
> Build a hero with a heading and a CTA button.
[Claude builds it]

> Make the button secondary instead of primary.
[Claude updates it]

> Add a counter above the button showing "42 active users".
[Claude adds the counter molecule]

> The counter needs more space above it — it feels cramped.
[Claude adjusts the spacing token]

> Can you show me what this looks like with a subtitle under the heading?
[Claude adds the subtitle with the correct text token]
```

</details>

> [!NOTE]
> Every change goes through the spec system. Claude won't introduce raw colours or break token rules mid-conversation.

---

## Tips for better results

**Be specific about visual intent, not implementation.**
Say "the button feels too close to the heading" rather than "add 16px margin-top". Claude will pick the right spacing token.

**Reference the state you want.**
"Show the input in its error state" produces better results than just "make the input red".

**Use the spec files when iterating on a complex component.**
If Claude's second or third attempt still isn't right, point it directly at the spec: "re-read specs/molecules/hero.md and check if the layout matches section 3".

**Ask Claude to explain what it did.**
```
What token did you use for that spacing? Why that one and not --space-4?
```
This helps you learn the system and catch mistakes.

**Start fresh for unrelated changes.**
If you're done with one component and moving to something else, starting a new Claude session keeps context clean and reduces the chance of earlier decisions bleeding through.

**Ask for options before committing.**
```
Before building it, show me two or three approaches for the navigation layout.
```

---

## Slash commands for common workflows

These commands shortcut the most common tasks. Type them directly into Claude Code.

| Command | What it does |
|---|---|
| `/spec-lookup <description>` | Before building, surfaces the specs, tokens, and Ahoy components that apply. Claude runs this automatically — you can also trigger it manually for a quick briefing. |
| `/figma-spec <url>` | Reads a Figma component and writes a spec file. Claude shows a plan and waits for your approval before writing anything. |
| `/create-spec <name>` | Walks you through a short Q&A and writes a spec from your answers. No Figma required. |
| `/create-component-from-spec <spec>` | Scaffolds the full React component from an existing spec — correct imports, token-based CSS, all states. Claude confirms the plan before writing. |

**Example flow — new component end to end:**

```
1. /figma-spec https://www.figma.com/design/...   ← write the spec from Figma
2. /create-component-from-spec specs/organisms/notification-banner.md  ← scaffold the component
3. Ask Claude to wire it into the page and iterate from there
```

---

## What Claude won't do

- Use raw hex colours (`#00b2b2`) — it uses `var(--color-accent)` instead
- Use pixel values directly — it uses spacing and size tokens
- Import Ahoy components from the barrel export — it uses direct import paths
- Commit changes — you control git

If you ever suspect Claude has broken a rule, run the token audit:

```bash
node scripts/token-audit.js
```

See [Tokens & Audit](./tokens.md) for details.
