import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { BaseUrl } from './utills/domain'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],

// })

// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
     proxy: {
       // Proxy all requests starting with /api to the backend server
       '/api': {
         target: BaseUrl, // Backend server URL
         changeOrigin: true,
         rewrite: (path) => path.replace(/^\/api/, '/api')
       }
     }
  }
 })
 