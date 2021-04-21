module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "space-before-blocks": "off",
    "quotes": "off",
    "no-extra-semi": "off",
    'no-spaced-func': 0,
    'space-in-brackets': 0,
    'no-trailing-spaces': 0,
    'comma-dangle': 0,
    'lines-between-class-members': 0,
    'camelcase': 0,
    "eol-last": 0,
    "space-before-function-paren": ["error", "never"],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
    "semi": [ "error", "never" ]
  }
}
