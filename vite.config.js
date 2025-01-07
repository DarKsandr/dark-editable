import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
      libInjectCss(),
      dts(),
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: './src/dark-editable.ts',
      name: 'DarkEditable',
      // the proper extensions will be added
      fileName: 'dark-editable',
      formats: ['es', 'iife', 'umd'],
    },
    rollupOptions: {
      external: ['bootstrap', 'moment'],
      output: {
        globals: {
          bootstrap: 'bootstrap',
          moment: 'moment',
        }
      }
    },
    sourcemap: true
  },
});