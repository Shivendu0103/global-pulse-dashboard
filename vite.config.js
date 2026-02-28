import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vercel from 'vite-plugin-vercel';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercel()],
  build: {
    chunkSizeWarningLimit: 2000, // Increase the limit to 2MB to suppress the warning
  },
})
