import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/

export default ({ mode }) => {
  console.log('mode', loadEnv(mode, process.cwd()).VITE_BASE_URL); //127.0.0.1:9000/api
  return defineConfig({
    plugins: [
      react(),
      {
        ...viteCompression(),
        apply: 'build',
      },
    ],
    //这里进行配置别名
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: '@import "@/assets/styles/index.scss";',
          additionalData: `@use "@/assets/styles/index.scss" as *;`,
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom', 'zustand'],
            antd: ['antd'],
          },
        },
      },
    },
    base: '/',
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: true,
      proxy: {
        '/api': {
          target: '要代理的地址',
          changeOrigin: true,
          ws: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
