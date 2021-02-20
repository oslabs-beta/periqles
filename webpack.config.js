import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, '_bundles'),
    filename: 'periqles.js',
    libraryTarget: 'umd', // = universal module definition (universal compatibility)
    library: 'periqles',  // tell webpack we're bundling a library and provide the name
    umdNamedDefine: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  devtool: 'source-map',
  externals: 'react',   // enables periqles to use host project's copy of React
};

// can add fork-ts-checker-webpack-plugin to ts-loader for faster build times: https://github.com/TypeStrong/ts-loader#faster-builds