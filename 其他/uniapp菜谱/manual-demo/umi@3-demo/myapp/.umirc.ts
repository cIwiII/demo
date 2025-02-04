import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  //   { path: '/home', component: '@/pages/home/Home' },
  // ],
  fastRefresh: {},
  //antd主题色
  theme:{
    'primary-color':'#efefef'
  },
  // devServer:{
  //   port:8888
  // }
});
