import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'postcss',
  },
  build: {
    cssMinify: false,
  },
  server: {
    proxy: {
      '/accounts': {
        target: 'http://10.133.51.121:6969',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://10.133.51.121:8080',
        changeOrigin: true,
      },
    },
  },
})
