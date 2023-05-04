import { defineConfig } from 'umi';
import { routes } from './routes';
export default defineConfig({
  // outputPath: 'dist',
  antd: {},
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  cssModules: false,
  fastRefresh: {},
  dva: {
    immer: true,
    hmr: false,
  },
  proxy: {
    '/api': {
      target: 'http://localhost:7001/',
      changeOrigin: true,
    },
  },
});
