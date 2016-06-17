const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './lib/app',
    background: './lib/background',
  },
  output: {
    path: 'chrome',
    filename: '[name].js',
  },
  debug: true,
  devtool: 'source-map',
  plugins: [
    new CopyWebpackPlugin([
      { from: 'assets' },
    ]),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
};
