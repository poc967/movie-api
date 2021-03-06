module.exports = {
  "env": {
    "es6": true,
    "node": true,
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "camelcase": 0,
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "object-property-newline": ['error', {
      "allowAllPropertiesOnSameLine": true
    }]
  }
};