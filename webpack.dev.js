const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader?sourceMap',
          'css-loader?modules=true&localIdentName=[local]_[hash:base64:6]&sourceMap',
          'postcss-loader?sourceMap',
          'sass-loader?sourceMap',
        ],
      },
      {
        test: /\.css$/,
        include: /(flexboxgrid|react-datepicker|animate)/,
        use: [
          'style-loader?sourceMap',
          'css-loader?modules=true&localIdentName=[local]&sourceMap',
        ],
      },
    ],
  },
  devServer: {
    contentBase: './src',
    port: 3000,
    compress: false,
    inline: true,
    hot: true,
    proxy: {
      '/api/v1/**': 'http://localhost:4000',
    },
  },
  devtool: 'cheap-eval-source-map',
})
