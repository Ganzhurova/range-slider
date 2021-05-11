const path = require('path');
const { merge } = require('webpack-merge');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  target: 'web',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
  plugins: [
    new StylelintPlugin({
      context: path.resolve(__dirname, './src'),
      fix: true,
    }),
    new ESLintPlugin({
      context: path.resolve(__dirname, './src'),
    }),
  ],
});
