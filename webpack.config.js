import path from 'path';
const __dirname = path.dirname(new URL(import.meta.url).pathname);

export default {
  mode: 'production',
  entry: {
    // 'periqles-lib': './src/PeriqlesForm.tsx',
    // 'periqles-lib.min': './src/PeriqlesForm.tsx'
    'periqles-lib': './src/index.tsx',
    'periqles-lib.min': './src/index.tsx'
  },
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
        loader: ['babel-loader', 'ts-loader'],
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      include: /\.min\.js$/,  // minify only the bundle file named periqles-min
    })
  ],
  devtool: 'source-map',
};

// can add fork-ts-checker-webpack-plugin to ts-loader for faster build times: https://github.com/TypeStrong/ts-loader#faster-builds