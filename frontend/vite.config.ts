import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env': JSON.stringify(process.env),
  },
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      path: 'path-browserify',
      fs: 'browserify-fs',
    },
  },
  optimizeDeps: {
    exclude: ['crypto', 'path', 'fs'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        //rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
