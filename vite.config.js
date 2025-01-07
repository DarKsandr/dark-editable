import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
  plugins: [libInjectCss()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: './src/dark-editable.js',
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
    sourcemap: true,
    minify: false,
  },
});