/**
 * @Author fangh3
 * @Desc
 * @Date 2022-09-22 17:20:13
 * @LastEditors fangh3
 * @LastEditTime 2022-09-22 17:20:13
 * @List
 */
export const routes = [
  {
    path: '/',
    component: '@/layout/basicLayout',
    routes: [
      {
        path: '/',
        redirect: '/home',
      },
      {
        path: '/home',
        name: '搜索',
        component: '@/pages/home',
      },
      {
        path: '/settings',
        name: '个人设置',
        component: '@/pages/settings',
      },
      {
        path: '/chatgpt',
        component: './chatgpt',
      },
      {
        path: '/app1',
        microApp: 'app1',
        autoSetLoading: true,
        className: 'myContainer',
        wrapperClassName: 'myWrapper',
      },
      // {
      //   path: '/subapp',
      //   microApp: 'subapp',
      //   microAppProps: {
      //     wrapperClassName: 'iframe-wrapper',
      //     mountElementId: 'subapp-container',
      //   },
      // },
      {
        path: '/exception/:code',
        component: './exception',
      },
    ],
  },
];
