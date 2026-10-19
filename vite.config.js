import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'
import { defineConfig } from 'vite'

function langRoutes() {
  return {
    name: 'lang-routes',
    closeBundle() {
      const index = path.resolve('dist/index.html')
      if (!fs.existsSync(index)) return
      for (const lang of ['ru', 'en']) {
        const dir = path.resolve('dist', lang)
        fs.mkdirSync(dir, { recursive: true })
        fs.copyFileSync(index, path.join(dir, 'index.html'))
      }
    },
  }
}

export default defineConfig({
  plugins: [react(), langRoutes()],
  server: {
    port: 5174,
    strictPort: true,
  },
})
