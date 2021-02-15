export default {
  mode: 'development',
  entry: './js/app.tsx',
  output: {
    filename: './bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(t|j)sx?$/,
        loader: ['ts-loader', 'babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      // {
      // enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'source-map-loader',
      // },
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  devtool: 'source-map',
};
