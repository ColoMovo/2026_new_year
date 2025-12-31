
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 确保在 GitHub Pages 子目录下资源路径正确
  build: {
    outDir: 'dist',
  }
})
