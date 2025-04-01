import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'airpower-web',
      formats: ['es'],
      fileName: () => `airpower.web.js`,
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
  plugins: [dts(), vue()],
})
