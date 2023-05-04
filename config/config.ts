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
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'app1', // 唯一 id
          entry: '//localhost:8001', // html entry
        },
        {
          name: 'app2', // 唯一 id
          entry: '//localhost:8002', // html entry
        },
      ],
    },
  },
  proxy: {
    '/api': {
      target: 'http://localhost:7001/',
      changeOrigin: true,
    },
  },
});
