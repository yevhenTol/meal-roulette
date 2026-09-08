import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The backend is expected on :3001. If it isn't running, the app falls back to
// mock data (see src/api.js), so the frontend is usable standalone.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  // `vite preview` blocks unknown Host headers by default; allow tunnel hosts
  // (Cloudflare quick tunnels, ngrok) used for temporary demo deploys.
  preview: {
    allowedHosts: ['.trycloudflare.com', '.ngrok-free.app', '.ngrok.io'],
  },
})
