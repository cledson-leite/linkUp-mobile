// eslint.config.js
// Flat config do ESLint com Expo + regras customizadas

const { defineConfig } = require('eslint/config')
const expoConfig = require('eslint-config-expo/flat')
const importPlugin = require('eslint-plugin-import')
const boundariesPlugin = require('eslint-plugin-boundaries')

module.exports = defineConfig([
  expoConfig,

  {
    ignores: ['dist/**', 'node_modules/**', '.expo/**'],
  },

  {
    plugins: {
      import: importPlugin,
      boundaries: boundariesPlugin,
    },

    rules: {
      // 🧹 Organização de Imports
      'import/order': [
        'error',
        {
          groups: [
            ['builtin', 'external', 'react'],
            'external',
            ['internal'],
            ['parent'],
            ['sibling', 'index'],
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'react',
              position: 'before',
            },
            {
              pattern: 'react-native',
              group: 'react',
              position: 'before',
            },
            {
              pattern: 'expo**',
              group: 'react',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      // 🔒 Restrições entre camadas
      'boundaries/element-types': ['error', {
        default: 'disallow',
        rules: [
          { from: 'view', allow: ['view-model', 'config', 'shared'] },
          { from: 'view-model', allow: ['controller', 'config', 'shared'] },
          { from: 'controller', allow: ['infra', 'config', 'shared'] },
          { from: ['infra', 'shared', 'config'], allow: ['*'] },
        ],
      }],
    },

    settings: {
      'boundaries/elements': [
        { type: 'view', pattern: 'src/view/**' },
        { type: 'view-model', pattern: 'src/view-model/**' },
        { type: 'controller', pattern: 'src/controller/**' },
        { type: 'infra', pattern: 'src/infra/**' },
        { type: 'shared', pattern: 'src/shared/**' },
        { type: 'config', pattern: 'src/config/**' },
      ],
    },
  },
])
