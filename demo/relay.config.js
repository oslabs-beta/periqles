module.exports = {
  // Configuration options accepted by the `relay-compiler` command-line tool and `babel-plugin-relay`.
  src: './ts',
  schema: './data/schema.graphql',
  exclude: ["**/node_modules/**", "**/__mocks__/**", "**/__generated__/**"],
  // include: './dist',
};
