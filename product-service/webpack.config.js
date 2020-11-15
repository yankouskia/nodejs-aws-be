const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV ==='production' ? 'production' : 'development',
  entry: './handler.js',
  output: {
    libraryTarget: 'commonjs',
    path:path.resolve(__dirname, 'dist'),
    filename: 'handler.js',
  },
  module: {
    rules: [
      {
        test: /\\.js$/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.sql$/i,
        use: { loader: 'raw-loader' },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  performance: {
    hints: 'warning',
    maxAssetSize: 200000,
    maxEntrypointSize: 400000,
  },
  context: __dirname,
  target: 'node12.18',
  stats: 'errors-only',
};
