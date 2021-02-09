module.exports = {
  parser: 'babel-eslint',
  plugins: [ "babel", "react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}