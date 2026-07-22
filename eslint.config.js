import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
// 想要保存即修复，需要设置vscode
// import-x插件与eslint-import-resolver-typescript插件需要同时安装
// 同组空行下面是有备注时,Eslint无法正常修复，需要手动删除空行，复现情况为在当前最上面注释加一行空格即可。
import { importX } from 'eslint-plugin-import-x';
import globals from 'globals';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import tsParser from '@typescript-eslint/parser';
import unusedImports from 'eslint-plugin-unused-imports';
import { fileURLToPath } from 'node:url';
const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url));
console.log('------------------\n', '/n', gitignorePath);
/**
 * eslint 配置
 * 1. 自动修复代码
 * 2. 自动修复 import 语句的排序
 * 3. 自动修复合并 import 语句的重复导入
 * 4. 自动修复删除未使用的导入
 *
 */
export default defineConfig([
  includeIgnoreFile(gitignorePath, { gitignoreResolution: true }),
  eslintPluginPrettierRecommended,
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      'node_modules/**',
      '.husky/**',
      '**/build/**',
      '**/es/**',
      '**/dist/**',
      '**/docs-dist/**',
      '**/.dumi/**',
      '**/tests/**',
    ],
    rules: {
      'import-x/no-duplicates': 'error',
      'import-x/order': [
        'error',
        {
          groups: [
            ['builtin', 'external'],
            ['internal', 'parent', 'sibling', 'index'],
          ],
          'newlines-between': 'always',
        },
      ],
      // 删除未使用的导入配置开始: 删除未使用的引用，必须引入修复插件解决。
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      // 删除未使用的导入配置结束
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { 'unused-imports': unusedImports },

    settings: {
      // 必须指定，不然无法正常提示TS项目。
      'import-x/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
]);
