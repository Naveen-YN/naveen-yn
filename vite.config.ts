import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/' : '/', // Use / for both dev and production
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});