/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,          // allows using `test` instead of `vitest.test`
    environment: 'jsdom',   // simulates browser environment
    setupFiles: './src/setupTests.js'
  }
});
