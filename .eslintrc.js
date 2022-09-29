module.exports = {
  root: true,
  extends: ['plugin:jsx-a11y/recommended'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
