import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, '.', '');
    
    const plugins = [react()];
    if (mode === 'analyze') {
      plugins.push(visualizer({
        open: true,
        filename: 'dist/stats.html',
      }));
    }

    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: plugins,
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        chunkSizeWarningLimit: 600,
        rollupOptions: {
          output: {
            manualChunks(id) {
              if (id.includes('node_modules')) {
                if (id.includes('react-icons')) {
                  return 'vendor-icons';
                }
                if (id.includes('framer-motion')) {
                  return 'vendor-motion';
                }
                if (id.includes('react-router-dom') || id.includes('react-router') || id.includes('@remix-run')) {
                  return 'vendor-router';
                }
                return 'vendor-core';
              }
            }
          }
        }
      }
    };
});
