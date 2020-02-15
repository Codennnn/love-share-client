module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-shadow': ['error', { allow: ['state'] }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    camelcase: 'off',
    semi: ['error', 'never'],
    'max-len': 'off',
  },

  parserOptions: {
    parser: 'babel-eslint',
  },
}
