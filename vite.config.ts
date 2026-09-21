/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    /* Styles are not applied in jsdom: media queries never match there, so a
       CSS-collapsed element would look "hidden" to queries. Behaviour is what
       these tests assert; layout is verified in a browser. */
    css: false,
    include: ['src/**/*.test.{ts,tsx}'],
  },
})
