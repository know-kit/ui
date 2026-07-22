import { defineConfig } from 'dumi';
import path from 'node:path';

export default defineConfig({
  outputPath: 'docs-dist',
  utoopack: {},
  apiParser: {},
  resolve: {
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: path.join(__dirname, '../../packages/ui/src/index.ts'),
  },
  themeConfig: {
    // name: 'kno-ui',
    hideHomeNav: true,
    logo: 'kno-ui',
    footer: false,
  },
});
