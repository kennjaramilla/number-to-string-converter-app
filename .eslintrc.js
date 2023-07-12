module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'import', 'jsdoc', 'prefer-arrow', 'prettier'],
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:import/errors',
      'plugin:import/warnings',
      'plugin:import/typescript',
      'plugin:jsdoc/recommended',
      'plugin:prettier/recommended',
      'eslint-config-prettier'
    ],
    rules: {
      // Add or modify ESLint rules as needed
    },
  };
  