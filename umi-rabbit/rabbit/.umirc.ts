import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  //antd主题色
  theme:{
    'primary-color':'#7BC0FC'
  },
});
