const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './ts/app.tsx',
  output: {
    filename: './bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/', // location of bundle.js
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'), // static assets: serve html/css
    publicPath: '/dist/', // location of bundle.js
    port: 8080, // port used in development mode
    hot: true, // hot module replacement
    open: true, // opens the page when server starts
    // TODO: a more secure setting for allowed origins
    headers: {'Access-Control-Allow-Origin': '*'}, // allow cors from any host
    historyApiFallback: true, // if 404, serve index.html
    proxy: {
      '/graphql/*': 'http://localhost:3000',
    },
    onListening: function (server) {
      const port = server.listeningApp.address().port;
      console.log('Frontend listening on port:', port);
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        enforce: 'pre',
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      // use this loader if you want to require assets into files where they are used
      {
        test: /\.(png|jpg|jpeg|gif|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
            publicPath: 'dist'  // after build, static assets currently in ./public will be findable in ./dist/public
        }
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
        patterns: [
            { from: 'public/assets' }
        ]
    })
  ],
  devtool: 'source-map',
};