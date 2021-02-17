import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  mode: process.env.NODE_ENV,
  // entry: './dist/app.js',
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
      // our backend; used to serve GraphQL API reqs
      '/graphql': 'http://localhost:3000',
      // '/graphql': {
      //   target: 'http://localhost:3000',
      //   secure: false,
      //   changeOrigin: true,
      //   headers: {
      //     Connection: 'keep-alive',
      //   },
      // },
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
    ],
  },
  devtool: 'source-map',
};

//     // 'babel-loader',
//     {
//       loader: 'babel-loader',
//       options: {
//         plugins: [
//           ['relay', {artifactDirectory: './__generated__/relay/'}],
//           '@babel/plugin-transform-runtime',
//           '@babel/plugin-proposal-class-properties',
//           // 'macros',
//         ],
//         presets: [
//           '@babel/preset-react',
//           '@babel/preset-env',
//           '@babel/typescript',
//         ],
//       },
//     },

// {
//   test: /\.tsx?$/,
//   exclude: /node_modules/,
//   loader: 'ts-loader',
//   options: {
//     getCustomTransformers: () => ({
//       before: [
//         tsgqlPlugin.getTransformer({
//           /* transformer options */
//         }),
//       ],
//     }),
//   },
// },
