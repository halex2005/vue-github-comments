module.exports = {
  "extends": [
    "standard",
    "vue",
  ],
  "rules": {
    "space-before-function-paren": ["off"],
    "comma-dangle": [
      "error", {
        "arrays": "only-multiline",
        "objects": "only-multiline",
        "imports": "only-multiline",
        "exports": "only-multiline",
        "functions": "ignore"
      }
    ],
  },
  "plugins": [
    "import",
    "node",
    "promise",
    "standard",
    "vue",
  ]
};