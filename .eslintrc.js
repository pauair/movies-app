const { rules } = require('eslint-config-prettier');

module.exports = {
  extends: ['expo', 'prettier'],
  env: {
    browser: true, // Para funciones globales del navegador como setTimeout
    node: true, // Por si también utilizas Node.js
    es6: true, // Habilita características de ES6
  },
  rules: {
    // Puedes descomentar esta parte si estás configurando reglas personalizadas para Prettier
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     singleQuote: true,
    //     parser: 'flow',
    //   },
    // ],
  },
};

