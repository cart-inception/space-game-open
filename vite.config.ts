import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath, URL } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  root: resolve(__dirname, 'src/renderer'),
  base: './',
  build: {
    outDir: resolve(__dirname, 'dist/renderer'),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/renderer/index.html'),
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/components'),
      '@/systems': resolve(__dirname, 'src/systems'),
      '@/assets': resolve(__dirname, 'src/assets'),
      '@/generators': resolve(__dirname, 'src/generators'),
      '@/data': resolve(__dirname, 'src/data'),
      '@/utils': resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    port: 3000,
  },
  optimizeDeps: {
    include: ['three']
  }
});