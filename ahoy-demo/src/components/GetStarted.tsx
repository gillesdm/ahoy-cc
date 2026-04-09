import { useState } from 'react';
import { Button } from '@teamleader/ahoy/dist/es/components/button';
import './GetStarted.css';

// ── Static data ────────────────────────────────────────────────────────────

const COLOR_TOKENS = [
  { name: '--color-text',        hex: '#1c1e22', label: 'Body text'          },
  { name: '--color-text-subtle', hex: '#293b4d', label: 'Subtle text'        },
  { name: '--color-bg',          hex: '#ffffff', label: 'Page background'    },
  { name: '--color-border',      hex: '#bebfc7', label: 'Default border'     },
  { name: '--color-accent',      hex: '#00b2b2', label: 'Brand / CTA'        },
  { name: '--color-accent-bg',   hex: '#f0fafa', label: 'Accent background'  },
  { name: '--color-error',       hex: '#e05c1a', label: 'Error state'        },
  { name: '--color-success',     hex: '#008c8c', label: 'Success state'      },
  { name: '--color-warning',     hex: '#ed9b00', label: 'Warning state'      },
];

const SPACING_TOKENS = [
  { token: '--space-1', px:  3 },
  { token: '--space-2', px:  6 },
  { token: '--space-3', px:  8 },
  { token: '--space-4', px: 12 },
  { token: '--space-5', px: 18 },
  { token: '--space-6', px: 24 },
  { token: '--space-7', px: 36 },
  { token: '--space-8', px: 48 },
  { token: '--space-9', px: 72 },
];

const FONT_SIZES: { token: string; cls: string; label: string }[] = [
  { token: '--font-size-xs',   cls: 'gs-fsize-xs',   label: '12px' },
  { token: '--font-size-sm',   cls: 'gs-fsize-sm',   label: '14px' },
  { token: '--font-size-base', cls: 'gs-fsize-base',  label: '16px' },
  { token: '--font-size-lg',   cls: 'gs-fsize-lg',   label: '18px' },
  { token: '--font-size-xl',   cls: 'gs-fsize-xl',   label: '24px' },
];

const SPEC_TIERS = [
  { name: 'Foundations', count: '6',  desc: 'Color · Spacing · Typography · Radius · Elevation · Motion', path: 'specs/foundations/' },
  { name: 'Atoms',       count: '35', desc: 'Button · Input · Badge · Icon · Checkbox · Avatar…',          path: 'specs/atoms/'        },
  { name: 'Molecules',   count: '22', desc: 'Counter · Banner · Menu · Tooltip · Toast · Tabs…',           path: 'specs/molecules/'    },
  { name: 'Organisms',   count: '18', desc: 'Sidebar · TopBar · Dialog · DatePicker · DataGrid…',          path: 'specs/organisms/'    },
  { name: 'Patterns',    count: '4',  desc: 'Layout · Container · Flex · Grid',                             path: 'specs/patterns/'     },
];

const COMMANDS = [
  { cmd: '/figma-spec <url>',                  desc: 'Create a spec from a Figma component URL'             },
  { cmd: '/create-spec <name>',                desc: 'Create a spec via guided Q&A interview'               },
  { cmd: '/create-component-from-spec <spec>', desc: 'Scaffold a React component from an existing spec'     },
  { cmd: '/spec-lookup <description>',         desc: 'Find relevant specs before you start building'        },
  { cmd: 'node scripts/token-audit.js',        desc: 'Validate token usage — must exit 0 before committing' },
];

const STEPS = [
  {
    title: 'Start the prototype',
    desc:  'Run the dev server in one terminal, Claude Code in another.',
    code:  'cd ahoy-demo && npm run dev\n# New terminal:\nclaude',
  },
  {
    title: 'Find or create a spec',
    desc:  'Use /spec-lookup to find existing specs, or /figma-spec to generate one from a Figma URL.',
    code:  '/spec-lookup notification banner',
  },
  {
    title: 'Describe what you want',
    desc:  'Tell Claude what to build. It reads the spec, picks the right tokens, and edits the prototype.',
    code:  'Add a notification banner from specs/molecules/banner.md below the TopBar.',
  },
  {
    title: 'Run the token audit',
    desc:  'Zero errors required before committing. Claude fixes violations automatically if you ask.',
    code:  'node scripts/token-audit.js',
  },
];

const TOKEN_RULES = [
  { want: 'Text color',    use: 'var(--color-text) · var(--color-text-subtle)'           },
  { want: 'Background',    use: 'var(--color-bg) · var(--color-surface)'                 },
  { want: 'Border',        use: 'var(--color-border)'                                    },
  { want: 'Brand / CTA',   use: 'var(--color-accent)'                                    },
  { want: 'Spacing',       use: 'var(--space-1) … var(--space-9)'                        },
  { want: 'Font size',     use: 'var(--font-size-xs/sm/base/lg/xl)'                      },
  { want: 'Font weight',   use: 'var(--font-weight-regular/medium/semibold/bold)'        },
  { want: 'Border radius', use: 'var(--radius-sm/md/lg/round)'                           },
  { want: 'Shadow',        use: 'var(--elevation-1) … var(--elevation-4)'                },
  { want: 'Transition',    use: 'var(--transition-border) · var(--transition-shadow)'    },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function CodeSnippet({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="gs-code">
      <pre className="gs-code__pre"><code>{code}</code></pre>
      <button
        className="gs-code__copy"
        onClick={() => {
          navigator.clipboard.writeText(code);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}

function Swatch({ name, hex, label }: { name: string; hex: string; label: string }) {
  const isWhite = hex === '#ffffff';
  return (
    <div className="gs-swatch">
      <div
        className={`gs-swatch__color${isWhite ? ' gs-swatch__color--light' : ''}`}
        style={{ background: hex }}
      />
      <span className="gs-swatch__token">{name}</span>
      <span className="gs-swatch__label">{label}</span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

type ButtonLevel = 'primary' | 'secondary';

export function GetStarted() {
  const [btnLevel, setBtnLevel] = useState<ButtonLevel>('primary');
  const [btnDisabled, setBtnDisabled] = useState(false);

  return (
    <div className="gs-page">

      {/* ── 1. Hero ── */}
      <section className="gs-section gs-hero">
        <div className="gs-eyebrow">Design Specs · Ahoy 3.4.0 · React 18 · Vite 6</div>
        <h1 className="gs-h1">Build with the design system</h1>
        <p className="gs-lead">
          Specs drive the prototype. Claude reads the spec, picks the right tokens,
          and produces correct components — without you needing to write any code.
        </p>
        <CodeSnippet code={'cd ahoy-demo && npm install\nnpm run dev\n# Then in a new terminal:\nclaude'} />
      </section>

      {/* ── 2. Two systems ── */}
      <section className="gs-section">
        <h2 className="gs-h2">Two systems, one workflow</h2>
        <div className="gs-grid-2">
          <div className="gs-card gs-card--accent">
            <div className="gs-card__path">specs/</div>
            <h3 className="gs-card__title">Spec library</h3>
            <p className="gs-card__body">
              Written design decisions for every component — tokens, anatomy, states, usage rules.
              104 specs across 5 tiers.
            </p>
          </div>
          <div className="gs-card">
            <div className="gs-card__path">ahoy-demo/</div>
            <h3 className="gs-card__title">Live prototype</h3>
            <p className="gs-card__body">
              A Vite + React 18 app. Describe what you want to Claude and it edits the app in real
              time using the specs as a guide.
            </p>
          </div>
        </div>
      </section>

      {/* ── 3. Token system ── */}
      <section className="gs-section">
        <h2 className="gs-h2">Token system</h2>
        <p className="gs-body">
          Tokens flow through three layers. Components must only reference Layer 2 aliases — never
          Ahoy's upstream tokens or raw values directly.
        </p>

        <div className="gs-layers">
          {[
            { num: '1', title: 'Ahoy upstream',   desc: '--color-mint, --spacer-small… (injected by ahoy CSS)', accent: false },
            { num: '2', title: 'Project aliases',  desc: '--color-accent, --space-4, --font-size-sm… (tokens.css)', accent: true },
            { num: '3', title: 'Component CSS',    desc: 'App.css, Sidebar.css… uses only var(--layer-2-token)', accent: false },
          ].map(({ num, title, desc, accent }) => (
            <div key={num} className={`gs-layer${accent ? ' gs-layer--accent' : ''}`}>
              <span className="gs-layer__num">{num}</span>
              <div className="gs-layer__content">
                <strong className="gs-layer__title">{title}</strong>
                <span className="gs-layer__desc">{desc}</span>
              </div>
            </div>
          ))}
        </div>

        <h3 className="gs-h3">Color tokens</h3>
        <div className="gs-swatches">
          {COLOR_TOKENS.map(t => <Swatch key={t.name} {...t} />)}
        </div>

        <h3 className="gs-h3">Spacing scale</h3>
        <div className="gs-spacing">
          {SPACING_TOKENS.map(({ token, px }) => (
            <div key={token} className="gs-spacing-row">
              <span className="gs-spacing-token">{token}</span>
              <div className="gs-spacing-bar" style={{ width: px * 2 }} />
              <span className="gs-spacing-px">{px}px</span>
            </div>
          ))}
        </div>

        <h3 className="gs-h3">Typography scale</h3>
        <div className="gs-typescale">
          {FONT_SIZES.map(({ token, cls, label }) => (
            <div key={token} className={`gs-type-row ${cls}`}>
              <span className="gs-type-token">{token}</span>
              <span className="gs-type-sample">The quick brown fox jumps</span>
              <span className="gs-type-px">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. Spec tiers ── */}
      <section className="gs-section">
        <h2 className="gs-h2">Spec tiers</h2>
        <p className="gs-body">
          Every component has a spec file that Claude reads before building. Specs live in 5 tiers —
          open any file in <code className="gs-inline-code">specs/</code> to see the anatomy.
        </p>
        <div className="gs-tiers">
          {SPEC_TIERS.map(({ name, count, desc, path }) => (
            <div key={name} className="gs-tier">
              <div className="gs-tier__header">
                <span className="gs-tier__name">{name}</span>
                <span className="gs-tier__count">{count} specs</span>
              </div>
              <p className="gs-tier__desc">{desc}</p>
              <code className="gs-tier__path">{path}</code>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. Live component demo ── */}
      <section className="gs-section">
        <h2 className="gs-h2">Live component demo</h2>
        <p className="gs-body">
          All UI comes from <code className="gs-inline-code">@teamleader/ahoy</code> — imported
          directly, not via the barrel export (which pulls in DataGrid, Editor, etc.).
          Toggle the props below to see the generated import code update in real time.
        </p>
        <div className="gs-demo">
          <div className="gs-demo__controls">
            <div className="gs-control">
              <span className="gs-control__label">level</span>
              <div className="gs-chips">
                {(['primary', 'secondary'] as ButtonLevel[]).map(l => (
                  <button
                    key={l}
                    className={`gs-chip${btnLevel === l ? ' gs-chip--on' : ''}`}
                    onClick={() => setBtnLevel(l)}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div className="gs-control">
              <span className="gs-control__label">disabled</span>
              <div className="gs-chips">
                {([false, true] as boolean[]).map(v => (
                  <button
                    key={String(v)}
                    className={`gs-chip${btnDisabled === v ? ' gs-chip--on' : ''}`}
                    onClick={() => setBtnDisabled(v)}
                  >
                    {String(v)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="gs-demo__preview">
            <Button label="Click me" level={btnLevel} disabled={btnDisabled} />
          </div>
          <CodeSnippet code={[
            `// Good — direct import, not the barrel`,
            `import { Button } from '@teamleader/ahoy/dist/es/components/button';`,
            ``,
            `<Button`,
            `  label="Click me"`,
            `  level="${btnLevel}"`,
            ...(btnDisabled ? [`  disabled`] : []),
            `/>`
          ].join('\n')} />
        </div>
      </section>

      {/* ── 6. Claude Code commands ── */}
      <section className="gs-section">
        <h2 className="gs-h2">Claude Code commands</h2>
        <p className="gs-body">
          Run these in your Claude Code terminal — not in the shell. They trigger specialized skills
          that read specs, talk to Figma, and scaffold components correctly.
        </p>
        <div className="gs-commands">
          {COMMANDS.map(({ cmd, desc }) => (
            <div key={cmd} className="gs-command">
              <code className="gs-command__cmd">{cmd}</code>
              <span className="gs-command__desc">{desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. Workflow ── */}
      <section className="gs-section">
        <h2 className="gs-h2">The workflow</h2>
        <p className="gs-body">
          Every feature follows the same four steps — from blank page to committed component.
        </p>
        <div className="gs-steps">
          {STEPS.map(({ title, desc, code }, i) => (
            <div key={i} className="gs-step">
              <div className="gs-step__num">{i + 1}</div>
              <div className="gs-step__content">
                <strong className="gs-step__title">{title}</strong>
                <p className="gs-step__desc">{desc}</p>
                <CodeSnippet code={code} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 8. Token quick reference ── */}
      <section className="gs-section gs-section--last">
        <h2 className="gs-h2">Token quick reference</h2>
        <p className="gs-body">
          If Claude generates raw values, point it here or run the audit — it will fix violations automatically.
        </p>
        <div className="gs-token-table">
          <div className="gs-token-table__header">
            <span>What you want</span>
            <span>Token to use</span>
          </div>
          {TOKEN_RULES.map(({ want, use }) => (
            <div key={want} className="gs-token-table__row">
              <span className="gs-token-table__want">{want}</span>
              <code className="gs-token-table__use">{use}</code>
            </div>
          ))}
        </div>
        <div className="gs-audit-box">
          <div className="gs-audit-box__label">Token audit</div>
          <p className="gs-audit-box__desc">
            Run before every commit. Must exit with zero errors. Ask Claude to fix any violations it finds.
          </p>
          <CodeSnippet code="node scripts/token-audit.js" />
        </div>
      </section>

    </div>
  );
}
