import express from 'express';
import {graphqlHTTP} from 'express-graphql';
import path from 'path';
// import webpack from 'webpack';
// import WebpackDevServer from 'webpack-dev-server';
// import periqles from 'periqles';
import {schema} from './data/schema';

const APP_PORT: number = 3000;

// Serve the Relay app
// Calling webpack() without a callback as 2nd property returns a Compiler object.
// The libdefs don't like it, but it's fine.  $FlowFixMe https://webpack.js.org/api/node/
// const compiler: webpack.Compiler = webpack({
//   mode: 'development',
//   // entry: ['whatwg-fetch', path.resolve(__dirname, 'js', 'app.js')],
//   entry: './js/app.js',
//   resolve: {
//     // changed from extensions: [".js", ".jsx"]
//     extensions: ['.ts', '.tsx', '.js', '.jsx'],
//   },
//   // addition - add source-map support
//   devtool: 'source-map',
//   module: {
//     rules: [
//       {
//         test: /\.(t|j)sx?$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'ts-loader',
//           // options: {
//           //   presets: ['@babel/preset-env', '@babel/preset-react']
//           // },
//         },
//       },
//       // addition - add source-map support
//       {
//         enforce: 'pre',
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'source-map-loader',
//       },
//     ],
//   },
//   externals: {
//     react: 'React',
//     'react-dom': 'ReactDOM',
//   },
//   output: {
//     filename: 'app.js',
//     path: '/',
//   },
// });

// const app: WebpackDevServer = new WebpackDevServer(compiler, {
//   contentBase: '/public/',
//   publicPath: '/js/',
//   stats: {colors: true},
// });

const app = express();

// Serve static resources
app.use('/', express.static(path.resolve(__dirname, 'public')));

// Setup GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    pretty: true,
  }),
);

app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`);
});
