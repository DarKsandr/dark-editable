import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/dark-editable.js'),
      name: 'DarkEditable',
      // the proper extensions will be added
      fileName: 'dark-editable',
      formats: ['es', 'iife', 'umd'],
    },
  },
})