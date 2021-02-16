import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  mode: process.env.NODE_ENV,
  entry: './dist/app.js',
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
    proxy: {
      // our backend; used to serve GraphQL API reqs
      '/graphql': 'http://localhost:3000',
    },
    onListening: function (server) {
      const port = server.listeningApp.address().port;
      console.log('Webpack dev server listening on port:', port);
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
        loader: [
          'ts-loader',
          'source-map-loader',
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                ['relay', {artifactDirectory: './__generated__/relay/'}],
                '@babel/plugin-transform-runtime',
                '@babel/plugin-proposal-class-properties',
              ],
              presets: [
                '@babel/preset-react',
                '@babel/preset-env',
                '@babel/typescript',
              ],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // externals: {
  //   'react': 'React',
  //   'react-dom': 'ReactDOM',
  // },
  devtool: 'source-map',
};
