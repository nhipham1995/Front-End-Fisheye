module.exports = {
  // ecmaFeatures: {
  //   modules: true,
  //   spread: true,
  //   restParams: true,
  // },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    "no-unused-vars": "off",
    "no-undef": "off",
    // "no-restricted-imports": ["error", "import1", "import2"],
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 8,
  },
};
