import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import jest from 'eslint-plugin-jest';

export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest
      }
    },
    plugins: {jest},
    rules: {
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'no-console': 'warn',
      'eqeqeq': 'error',
      'no-unused-vars': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'eol-last': ['error', 'always'],
      'indent': ['error', 2],
      'space-infix-ops': 'error',
      
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error'
    },
  },
]);
