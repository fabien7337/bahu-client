module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "@vue/airbnb"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "max-len": ["error", { code: 500 }],
    'global-require': 'off',
    'import/no-dynamic-require': 'off',
    semi: ['error', 'never'],
    'no-use-before-define': ['error', { variables: false }],
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  }
};
