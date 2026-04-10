import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'

// No .css suffix — prevents Vite's CSS pipeline from picking up virtual modules
const VIRTUAL_PREFIX = '\0ahoy-cssmod:'

/**
 * @teamleader/ahoy was built for webpack + css-loader (CSS Modules).
 * Its ESM dist uses `import theme from './theme.css'` inside components,
 * expecting a class-name map object as the default export.
 *
 * This plugin intercepts those internal CSS imports and:
 *   1. Resolves them to virtual JS modules (bypassing Vite's PostCSS pipeline)
 *   2. Reads the actual CSS, extracts global class names, injects them into <head>
 *   3. Exports the class map as `default`
 */
function ahoyCSSModules(): Plugin {
  return {
    name: 'ahoy-css-modules',
    enforce: 'pre',

    resolveId(id, importer) {
      // Only intercept CSS files imported from within @teamleader/ahoy JS modules
      if (
        importer?.includes('/node_modules/@teamleader/ahoy/') &&
        id.endsWith('.css')
      ) {
        const absolutePath = resolve(dirname(importer), id)
        // Bounds check: resolved path must remain inside @teamleader/ahoy
        if (!absolutePath.includes('/node_modules/@teamleader/ahoy/')) {
          throw new Error(`[ahoy-css-modules] Path escape detected: ${absolutePath}`)
        }
        // Strip .css so the virtual ID doesn't trigger Vite's CSS pipeline
        return VIRTUAL_PREFIX + absolutePath.slice(0, -4)
      }
    },

    load(id) {
      if (!id.startsWith(VIRTUAL_PREFIX)) return

      const filePath = id.slice(VIRTUAL_PREFIX.length) + '.css'
      const css = readFileSync(filePath, 'utf-8')

      // Extract all CSS class names (ahoy uses un-hashed global names)
      const classMap: Record<string, string> = {}
      const regex = /\.(-?[a-zA-Z_][a-zA-Z0-9_-]*)\b/g
      let match
      while ((match = regex.exec(css)) !== null) {
        classMap[match[1]] = match[1]
      }

      // Inject the CSS into <head> (deduped by file path) and export class map
      const escaped = JSON.stringify(css)
      const key = JSON.stringify(filePath)

      return `
if (typeof document !== 'undefined') {
  if (!document.querySelector('[data-ahoy=${key}]')) {
    const el = document.createElement('style');
    el.setAttribute('data-ahoy', ${key});
    el.textContent = ${escaped};
    document.head.appendChild(el);
  }
}
export default ${JSON.stringify(classMap)};
`
    },
  }
}

/**
 * @teamleader/ahoy's datagrid/types.js has a dead `import { AggregationFns }`
 * that was originally `import type` but got compiled as a value import.
 * `AggregationFns` was renamed to `aggregationFns` in @tanstack/react-table v8.5+.
 * This plugin rewrites the stale import so esbuild/Rollup don't fail.
 */
function ahoyTanstackFix(): Plugin {
  return {
    name: 'ahoy-tanstack-fix',
    enforce: 'pre',
    transform(code, id) {
      if (
        id.includes('/node_modules/@teamleader/ahoy/') &&
        code.includes('AggregationFns')
      ) {
        return {
          code: code.replace(
            /import\s*\{\s*AggregationFns\s*\}\s*from\s*['"]@tanstack\/react-table['"]\s*;?/g,
            "import { aggregationFns as AggregationFns } from '@tanstack/react-table';"
          ),
          map: null,
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [ahoyCSSModules(), ahoyTanstackFix(), react()],
  optimizeDeps: {
    // Exclude ahoy from esbuild pre-bundling so our transform plugins
    // (CSS modules + tanstack import fix) can run on its source files.
    exclude: ['@teamleader/ahoy'],
    // Ahoy's CJS transitive deps must be explicitly included for Vite
    // to pre-bundle them (converting CJS → ESM for the browser).
    include: [
      'classnames',
      'date-fns',
      'lodash/camelCase',
      'lodash/debounce',
      'lodash/findKey',
      'lodash/omit',
      'lodash/pick',
      'lodash/throttle',
      'lodash/upperFirst',
      'lodash/without',
    ],
  },
})
