const path = require('path');
const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require('./data/schema/index.js');
const webpack = require("webpack");
const WebpackDevServer = require('webpack-dev-server');

// Serve the Relay app
// Calling webpack() without a callback as 2nd property returns a Compiler object.
// The libdefs don't like it, but it's fine. https://webpack.js.org/api/node/
const compiler = webpack({
  mode: 'development',
  entry: ['whatwg-fetch', path.resolve(__dirname, 'js', 'app.js')],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    filename: 'app.js',
    path: '/',
  },
});

const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/js/',
  stats: {colors: true},
});

app.use(cors());
app.use('/', express.static(path.resolve(__dirname, 'public')));

app.use("/graphql", graphqlHTTP({ 
  schema, 
  pretty: true,      // pretty-print JSON responses   
}));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`GraphQL server at localhost:/${port}/graphql`);
});
