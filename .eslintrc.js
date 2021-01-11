module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node":true,
    },
    "extends": ["eslint:recommended"],
    "parser": "vue-eslint-parser",
    "parserOptions": {
        "ecmaVersion": 12,
        sourceType: 'module'
    },
    "rules": {
        "no-unused-vars": 1,
        "semi": [1, "always"],
    },
};
