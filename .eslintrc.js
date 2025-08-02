module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'promise/prefer-await-to-then': 'off',
    'n/no-missing-import': 'off',
    'n/no-missing-require': 'off',
    'n/no-extraneous-require': 'off',
    'n/no-process-exit': 'off',
    'no-unsupported-features/node-builtin': 'off',
    'react/react-in-jsx-scope': 'off',
    'react-native/no-inline-styles': 'error',
    'react-native/no-unused-styles': 'warn',
    'import/no-unresolved': 'off',
    'react/no-unstable-nested-components': 'off',

    // 'prettier/prettier': [
    //   'error',
    //   {
    //     endOfLine: 'auto',
    //   },
    // ],
  },
};
