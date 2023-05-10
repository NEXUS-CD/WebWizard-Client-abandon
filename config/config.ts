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
          activeRule: '/app1',
        },
        {
          name: 'chatgpt', // 唯一 id
          entry: '//localhost:3000', // html entry
          activeRule: '/chatgpt',
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
