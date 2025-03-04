import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsp from '@typescript-eslint/parser';
import js from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.ts'],
    languageOptions: {
      sourceType: 'module',
      parser: tsp,
      globals: { ...globals.node, ...globals.jest },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'no-console': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
];
