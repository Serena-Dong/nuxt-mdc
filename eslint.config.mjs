import withNuxt from './.nuxt/eslint.config.mjs'

import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default withNuxt([
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...eslintConfigPrettier.rules,
      ...eslintPluginPrettierRecommended.rules,
      'tailwindcss/no-custom-classname': 'off',
    },
    ignores: [
      '.nuxt/*',
      '.nuxt/*/**',
      '.vscode/*',
      '.vscode/*/**',
      '.output/*',
      '.output/*/**',
      '.storybook/*',
      'node_modules',
      'pnpm-lock.yaml',
      'yarn.lock',
      'package-lock.json',
    ],
  },
])
  .override('nuxt/typescript/rules', {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
  })
  .override('nuxt/rules', {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/max-attributes-per-line': [
        'error',
        {
          singleline: {
            max: 3,
          },
        },
      ],
    },
  })
