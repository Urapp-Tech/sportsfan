import eslint from '@eslint/js';
import eslintPluginImport from 'eslint-plugin-import';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginPromise from 'eslint-plugin-promise';
import eslintGlobals from 'globals';

const { configs } = eslint;
const { flatConfigs } = eslintPluginImport;
const { configs: promiseConfigs } = eslintPluginPromise;
const { node } = eslintGlobals;

export default [
  {
    languageOptions: {
      globals: node,
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  configs.recommended,
  flatConfigs.recommended,
  promiseConfigs['flat/recommended'],
  pluginPrettierRecommended,
  {
    rules: {
      'no-console': 'warn',
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          trailingComma: 'es5',
        },
      ],
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
];
