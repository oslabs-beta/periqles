module.exports = {
  extends: [
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier/react',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@babel/eslint-parser',
  plugins: [ "babel", 'prettier', 'react', "react-hooks", '@typescript-eslint'],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  settings: {
    react: {
      version: '17.0.1',
    },
  },
}