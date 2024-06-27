// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  server: {
    proxy: {
      '/api': {
        target: 'https://tech-exercise.vercel.app',
        changeOrigin: true,
        secure: false // If dealing with HTTPS to HTTP or invalid certificates
      }
    }
  }
})
