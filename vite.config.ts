import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      include: ['index.ts', 'lite.ts', 'full.ts'],
      outDir: 'dist',
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: 'index.ts',
        lite: 'lite.ts',
        full: 'full.ts',
      },
      formats: ['es', 'cjs'],
      name: 'SimplePeer',
    },
    sourcemap: true,
    minify: true,
    rollupOptions: {
      external: [],
      output: {
        exports: 'named',
      },
    },
  },
})
