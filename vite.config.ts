/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/rest-countries',
  plugins: [react()],
  test: {
    includeSource: ["src/**/*.{ts,tsx}"],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    css: true,
  }
})
