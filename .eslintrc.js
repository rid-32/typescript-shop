// eslint: The core ESLint linting library
// @typescript-eslint/parser: The parser that will allow ESLint to lint TypeScript code
// @typescript-eslint/eslint-plugin: A plugin that contains a bunch of ESLint rules that are TypeScript specific

// prettier: The core prettier library
// eslint-config-prettier: Disables ESLint rules that might conflict with prettier
// eslint-plugin-prettier: Runs prettier as an ESLint rule

module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
};
