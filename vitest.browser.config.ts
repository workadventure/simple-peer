import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import { Plugin } from 'vite'

// Plugin to inject process global in browser
function processGlobalPlugin(): Plugin {
  return {
    name: 'process-global',
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          attrs: { type: 'module' },
          children: `
            import process from 'process/browser';
            window.process = process;
            window.global = window;
          `
        }
      ]
    }
  }
}

export default defineConfig({
  plugins: [processGlobalPlugin()],
  define: {
    // Define process.env for browser
    'process.env': {},
    global: 'window'
  },
  resolve: {
    alias: {
      // Polyfill Node.js modules for browser
      events: 'events',
      buffer: 'buffer',
      stream: 'stream-browserify',
      util: 'util',
      process: 'process/browser'
    }
  },
  optimizeDeps: {
    include: ['events', 'buffer', 'stream-browserify', 'util', 'process/browser']
  },
  test: {
    globals: true,
    testTimeout: 30000,
    hookTimeout: 30000,
    include: ['test/**/*.ts', 'test/**/*.js'],
    exclude: ['node_modules/**', 'test/common.ts', 'test/common.js'],
    browser: {
      enabled: true,
      instances: [
        { browser: 'chromium', provider: playwright() }
      ],
      headless: true
    }
  }
})
