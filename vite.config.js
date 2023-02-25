import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: resolve(__dirname, 'docs'),
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/element/editable-element.js'),
      name: 'dark-editable',
      // the proper extensions will be added
      fileName: 'dark-editable',
    },
    outDir: resolve(__dirname, 'dist'),
  },
})