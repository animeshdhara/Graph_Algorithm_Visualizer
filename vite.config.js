import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: '@emotion/react',
    babel: {
      plugins: ['@emotion/babel-plugin'],
    },
  })],
  optimizeDeps: {
    include: [
      '@emotion/react', 
      '@emotion/styled', 
      '@emotion/tooltip'
    ],
  },
  build: {
    chunkSizeWarningLimit: 2000, // Set this to your desired limit in kilobytes
  },
})
