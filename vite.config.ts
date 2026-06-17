import path from 'path';
import { defineConfig, PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
    const plugins: PluginOption[] = [react()];
    if (mode === 'analyze') {
      plugins.push(visualizer({
        open: true,
        filename: 'dist/stats.html',
      }) as any);
    }

    return {
      server: {
        port: 3000,
        host: 'localhost',
      },
      plugins: plugins,
      define: {},
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      esbuild: {
        drop: mode === 'production' ? ['console', 'debugger'] : [],
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
