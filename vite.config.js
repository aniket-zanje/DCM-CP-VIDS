import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/circuitverse-simulator': {
        target: 'https://circuitverse.org',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/circuitverse-simulator/, '/simulator'),
        configure: (proxy, options) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            delete proxyRes.headers['x-frame-options'];
            delete proxyRes.headers['content-security-policy'];
          });
        }
      },
      '/simulator-v0': {
        target: 'https://circuitverse.org',
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          proxy.on('proxyRes', (proxyRes, req, res) => {
            delete proxyRes.headers['x-frame-options'];
            delete proxyRes.headers['content-security-policy'];
          });
        }
      },
      '/packs': {
        target: 'https://circuitverse.org',
        changeOrigin: true,
        secure: false,
      },
      '/assets': {
        target: 'https://circuitverse.org',
        changeOrigin: true,
        secure: false,
      },
      '/fonts': {
        target: 'https://circuitverse.org',
        changeOrigin: true,
        secure: false,
      },
      '/webfonts': {
        target: 'https://circuitverse.org',
        changeOrigin: true,
        secure: false,
      },
      '/img': {
        target: 'https://circuitverse.org',
        changeOrigin: true,
        secure: false,
      },
      '/css': {
        target: 'https://circuitverse.org',
        changeOrigin: true,
        secure: false,
      },
      '/js': {
        target: 'https://circuitverse.org',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'https://circuitverse.org',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
