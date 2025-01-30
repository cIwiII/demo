import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'dist',
  base: 'docs',
  themeConfig: {
    name: '概要',
  },
  chainWebpack(memo, args) {
    // args.env='development';
    // 设置 alias
    // memo.resolve.alias.set('foo', '/tmp/to/foo');

    // // 添加额外插件
    // memo.plugin('hello').use(Plugin, [...args]);

    // // 删除 dumi 内置插件
    // memo.plugins.delete('hmr');
    return memo;
  },
});
