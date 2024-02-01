import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/server': {
        target: 'https://118.67.142.194.nip.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/server/, ''),
        secure: false,
        ws: true,
      },
    },
  },
})
