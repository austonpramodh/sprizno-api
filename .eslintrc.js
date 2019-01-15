module.exports = {
  extends: ["airbnb"],
  rules: {
    "linebreak-style": 0,
    "global-require": 0,
    "eslint linebreak-style": [0, "error", "windows"],
    "no-console": 1,
    semi: "error",
    "no-underscore-dangle": 0,
    "padded-blocks": "error",
    quotes: ["error", "double"],
    "no-param-reassign": 0,
    "spaced-comment": ["error", "always", { markers: ["/"] }],
  },
  globals: {
    localStorage: true,
    document: true,
    window: true,
    dangerouslySetInnerHTML: true,
    FB: true,
  },
};
