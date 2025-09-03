module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  globals: {
    angular: 'readonly'
  },
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['prettier', 'angular'],
  rules: {
    // Prettier como regra (reporta formatação como erro)
    'prettier/prettier': 'error',

    // regras úteis (ajuste conforme sua preferência)
    'no-console': 'warn',
    'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],
    'no-var': 'error',
    'prefer-const': 'error',
    'eqeqeq': ['error', 'always'],
    'curly': ['error', 'multi-line'],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'semi': ['error', 'always']
  }
};
