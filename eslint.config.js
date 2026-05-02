import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginOxlint from 'eslint-plugin-oxlint'
import skipFormatting from 'eslint-config-prettier/flat'

export default defineConfig([
  // 1. 设置全局忽略：防止 ESLint 去扫描构建产物和依赖
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'node_modules/**']),

  // 2. 基础配置：告诉 ESLint 你的代码运行在什么环境
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node, // 允许使用 process 等 Node.js 变量
      },
    },
  },

  // 3. 核心规则集
  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],

  // 4. 针对 Vue 文件的特殊处理
  {
    files: ['**/*.vue'],
    languageOptions: {
      // 这里的配置确保 Vue 模板中的 JS 逻辑能被正确识别
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
    rules: {
      // 你可以在这里微调 Vue 规则，例如：
      'vue/multi-word-component-names': 'off', // 习惯单文件命名的可以关掉
    },
  },

  // 5. Oxlint 性能优化
  // 注意：如果你本地没有 .oxlintrc.json，请将下面这行换成:
  // pluginOxlint.configs.recommended,
  ...pluginOxlint.buildFromOxlintConfigFile('.oxlintrc.json'),

  // 6. 禁用格式化冲突（Prettier 兼容）
  // 这行一定要放在最后！
  skipFormatting,
])