import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
         target: 'http://localhost:5000', // Backend server URL
         changeOrigin: true,
         rewrite: (path) => path.replace(/^\/api/, '/api')
       }
     }
  }
 })
 