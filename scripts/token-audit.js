#!/usr/bin/env node
/**
 * token-audit.js — Design Token Audit Script
 *
 * Scans CSS/SCSS files for hardcoded visual values that should reference
 * design tokens. CI-ready: exits 1 when any errors are found.
 *
 * Usage:
 *   node scripts/token-audit.js [--dir <path>] [--verbose]
 *
 * Severity levels:
 *   ERROR   Hardcoded colors, spacing (padding/margin/gap), border-radius,
 *           font-size, font-weight in component CSS. Must be zero to pass.
 *   WARNING Raw transition durations, z-index values. Informational only.
 *
 * Token reference: ahoy-demo/src/tokens.css
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ─── CLI args ────────────────────────────────────────────────────────────────
const args    = process.argv.slice(2);
const dirArg  = args.includes('--dir') ? args[args.indexOf('--dir') + 1] : null;
const SCAN_DIR = dirArg
  ? path.resolve(dirArg)
  : path.join(__dirname, '../ahoy-demo/src');
const VERBOSE = args.includes('--verbose');

// ─── Token suggestion maps ────────────────────────────────────────────────────
const FONT_SIZE_TOKENS = {
  '12px': 'var(--font-size-xs)',
  '14px': 'var(--font-size-sm)',
  '16px': 'var(--font-size-base)',
  '18px': 'var(--font-size-lg)',
  '24px': 'var(--font-size-xl)',
};

const SPACING_TOKENS = {
  '3px':  'var(--space-1)',
  '5px':  'var(--space-xxs)',
  '6px':  'var(--space-2)',
  '8px':  'var(--space-3)',
  '10px': 'var(--space-xs-alt)',
  '12px': 'var(--space-4)',
  '16px': 'var(--space-icon)',
  '18px': 'var(--space-5)',
  '20px': 'var(--space-mobile)',
  '22px': 'var(--space-icon-lg)',
  '24px': 'var(--space-6)',
  '25px': 'var(--space-gap-lg)',
  '32px': 'var(--space-section)',
  '36px': 'var(--space-7)',
  '48px': 'var(--space-8)',
  '72px': 'var(--space-9)',
  '88px': 'var(--space-spacer)',
};

const RADIUS_TOKENS = {
  '2px': 'var(--radius-sm)',
  '4px': 'var(--radius-md)',
  '5px': 'var(--radius-counter)',
  '6px': 'var(--radius-link)',
  '8px': 'var(--radius-lg)',
  '50%': 'var(--radius-round)',
};

const DURATION_TOKENS = {
  '0.3s':  'var(--duration-base)',
  '0.35s': 'var(--duration-fast)',
};

const Z_INDEX_TOKENS = {
  '-1':  'var(--z-below)',
  '0':   'var(--z-base)',
  '1':   'var(--z-above)',
  '10':  'var(--z-overlay)',
  '100': 'var(--z-modal)',
  '1000':'var(--z-toast)',
};

const FONT_WEIGHT_TOKENS = {
  '100': 'var(--font-weight-regular)  /* closest: regular=400 */',
  '200': 'var(--font-weight-regular)  /* closest: regular=400 */',
  '300': 'var(--font-weight-regular)  /* closest: regular=400 */',
  '400': 'var(--font-weight-regular)',
  '500': 'var(--font-weight-medium)',
  '600': 'var(--font-weight-semibold)',
  '700': 'var(--font-weight-bold)',
  '800': 'var(--font-weight-bold)     /* closest: bold=700 */',
  '900': 'var(--font-weight-bold)     /* closest: bold=700 */',
};

// ─── Property → checker config ───────────────────────────────────────────────
// type 'error' = must be zero for CI pass
// type 'warning' = informational, CI passes

const PROPERTY_CHECKS = [
  // Spacing — error
  { props: ['padding','padding-top','padding-right','padding-bottom','padding-left',
            'padding-inline','padding-block','padding-inline-start','padding-inline-end',
            'padding-block-start','padding-block-end'],
    type: 'error', pattern: /\b\d+\.?\d*px\b/, map: SPACING_TOKENS,
    label: 'hardcoded spacing' },

  { props: ['margin','margin-top','margin-right','margin-bottom','margin-left',
            'margin-inline','margin-block','margin-inline-start','margin-inline-end'],
    type: 'error', pattern: /\b\d+\.?\d*px\b/, map: SPACING_TOKENS,
    label: 'hardcoded spacing' },

  { props: ['gap','row-gap','column-gap'],
    type: 'error', pattern: /\b\d+\.?\d*px\b/, map: SPACING_TOKENS,
    label: 'hardcoded spacing' },

  // Border radius — error
  { props: ['border-radius','border-top-left-radius','border-top-right-radius',
            'border-bottom-left-radius','border-bottom-right-radius'],
    type: 'error', pattern: /\b\d+\.?\d*(px|%)\b/, map: RADIUS_TOKENS,
    label: 'hardcoded radius' },

  // Typography — error
  { props: ['font-size'],
    type: 'error', pattern: /\b\d+\.?\d*px\b/, map: FONT_SIZE_TOKENS,
    label: 'hardcoded font-size' },

  { props: ['font-weight'],
    type: 'error', pattern: /\b(100|200|300|400|500|600|700|800|900)\b/, map: FONT_WEIGHT_TOKENS,
    label: 'hardcoded font-weight' },

  // Colors — error
  { props: ['color','background','background-color','border-color',
            'border-top-color','border-right-color','border-bottom-color','border-left-color',
            'outline-color','text-decoration-color','caret-color'],
    type: 'error', pattern: /#[0-9a-fA-F]{3,8}\b|rgba?\s*\([^)]+\)|hsla?\s*\([^)]+\)/,
    map: {}, label: 'hardcoded color' },

  // Transitions — warning
  { props: ['transition','animation'],
    type: 'warning', pattern: /\b\d+\.?\d*m?s\b/, map: DURATION_TOKENS,
    label: 'raw duration' },

  // Z-index — warning
  { props: ['z-index'],
    type: 'warning', pattern: /^-?\d+$/, map: Z_INDEX_TOKENS,
    label: 'raw z-index' },

  // Box shadow — warning (raw shadows without var())
  { props: ['box-shadow'],
    type: 'warning', pattern: /\b\d+px\b/, map: {
      // map shadow values to elevation tokens
    }, label: 'raw box-shadow (use var(--elevation-N))' },
];

// Build flat lookup: property name → checker config
const PROP_MAP = new Map();
for (const check of PROPERTY_CHECKS) {
  for (const p of check.props) {
    if (!PROP_MAP.has(p)) PROP_MAP.set(p, []);
    PROP_MAP.get(p).push(check);
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function collectCSSFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) {
    console.error(`Error: scan directory not found: ${dir}`);
    process.exit(2);
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      results.push(...collectCSSFiles(full));
    } else if (entry.isFile() && /\.(css|scss)$/.test(entry.name)) {
      // Skip tokens.css — it defines raw values intentionally
      if (entry.name !== 'tokens.css') results.push(full);
    }
  }
  return results;
}

function hasVarRef(value) {
  return value.includes('var(--');
}

function extractMatches(value, pattern) {
  const re = new RegExp(pattern.source, 'g');
  const hits = [];
  let m;
  while ((m = re.exec(value)) !== null) hits.push(m[0]);
  return hits;
}

function suggest(rawValue, map) {
  const key = rawValue.trim();
  return map[key] ?? null;
}

// Values that are always valid without a token
const ALWAYS_OK = new Set([
  'none','auto','inherit','initial','unset','revert','revert-layer',
  'normal','transparent','currentColor','currentcolor',
  'border-box','content-box','padding-box',
]);

function isAlwaysOK(value) {
  const v = value.trim();
  if (ALWAYS_OK.has(v)) return true;
  // Pure zero (unitless or 0px/0em treated as zero)
  if (/^0(px|em|rem|%|vh|vw)?$/.test(v)) return true;
  return false;
}

// ─── Per-file audit ───────────────────────────────────────────────────────────
function auditFile(filePath) {
  const lines   = fs.readFileSync(filePath, 'utf8').split('\n');
  const findings = [];

  for (let i = 0; i < lines.length; i++) {
    const raw     = lines[i];
    const trimmed = raw.trim();
    const lineNum = i + 1;

    // Skip blank lines, comments, CSS selectors, at-rules, closing braces
    if (!trimmed) continue;
    if (trimmed.startsWith('//') || trimmed.startsWith('*') || trimmed.startsWith('/*')) continue;
    if (trimmed.startsWith('--')) continue;           // custom property definitions
    if (trimmed.startsWith('@') || trimmed === '}')  continue;
    if (trimmed.startsWith('&') || trimmed.endsWith('{')) continue;

    // Extract property: value pairs (handles optional trailing semicolon)
    const match = trimmed.match(/^([\w-]+)\s*:\s*(.+?)\s*;?\s*$/);
    if (!match) continue;

    const [, prop, value] = match;

    if (isAlwaysOK(value)) continue;

    // If the entire value is a var() reference, it's tokenised — skip
    if (hasVarRef(value)) continue;

    const checks = PROP_MAP.get(prop);
    if (!checks) continue;

    for (const check of checks) {
      const hits = extractMatches(value, check.pattern);
      if (hits.length === 0) continue;

      const suggestions = hits.map(h => {
        const s = suggest(h, check.map);
        return s
          ? `${h} → ${s}`
          : `${h} → (no token yet — add to tokens.css)`;
      });

      findings.push({
        type:       check.type.toUpperCase(),
        file:       filePath,
        line:       lineNum,
        property:   prop,
        value:      value,
        violations: hits,
        label:      check.label,
        suggestions,
      });
    }
  }

  return findings;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  const relScanDir = path.relative(process.cwd(), SCAN_DIR);
  console.log(`\n🔍  Token Audit  —  scanning ${relScanDir}/\n`);

  const cssFiles = collectCSSFiles(SCAN_DIR);

  if (cssFiles.length === 0) {
    console.log(`No CSS files found in ${SCAN_DIR}`);
    process.exit(0);
  }

  const allFindings = [];

  for (const file of cssFiles) {
    const findings = auditFile(file);
    allFindings.push(...findings);

    if (findings.length > 0 || VERBOSE) {
      const rel      = path.relative(process.cwd(), file);
      const errCount = findings.filter(f => f.type === 'ERROR').length;
      const wrnCount = findings.filter(f => f.type === 'WARNING').length;

      if (findings.length > 0) {
        console.log(`📄  ${rel}  (${errCount} error(s), ${wrnCount} warning(s))`);
        for (const f of findings) {
          const badge = f.type === 'ERROR' ? '❌ ERROR  ' : '⚠️  WARN  ';
          console.log(`  ${badge}  line ${String(f.line).padStart(3)}  |  ${f.property}: ${f.value}`);
          console.log(`              Label:      ${f.label}`);
          console.log(`              Violation:  ${f.violations.join(', ')}`);
          console.log(`              Suggestion: ${f.suggestions.join(' | ')}`);
        }
        console.log();
      } else if (VERBOSE) {
        console.log(`  ✅  ${path.relative(process.cwd(), file)}  — clean`);
      }
    }
  }

  const errors   = allFindings.filter(f => f.type === 'ERROR');
  const warnings = allFindings.filter(f => f.type === 'WARNING');

  console.log('─'.repeat(62));
  console.log(`  Files scanned : ${cssFiles.length}`);
  console.log(`  Errors        : ${errors.length}${errors.length > 0 ? '  ← must be 0 to pass' : ''}`);
  console.log(`  Warnings      : ${warnings.length}`);
  console.log('─'.repeat(62));

  if (errors.length > 0) {
    console.log('\n❌  Audit FAILED — resolve all errors before committing.\n');
    process.exit(1);
  }

  if (warnings.length > 0) {
    console.log('\n⚠️   Audit passed with warnings. Review before committing.\n');
  } else {
    console.log('\n✅  Audit passed — zero violations.\n');
  }

  process.exit(0);
}

main();
