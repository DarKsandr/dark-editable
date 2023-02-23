import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/element/editable-element.js'),
      name: 'dark-editable',
      // the proper extensions will be added
      fileName: 'dark-editable',
    },
  },
})