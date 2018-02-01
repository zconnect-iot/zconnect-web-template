const webpack = require('webpack')
const merge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SentryPlugin = require('webpack-sentry-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const path = require('path')

const common = require('./webpack.common.js');

const isDeploy = process.env.DEPLOY_ENV === 'deploy'

const COMMITHASH = new GitRevisionPlugin().commithash()

const config = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules=true&localIdentName=[hash:base64:6]&sourceMap',
            'postcss-loader?sourceMap',
            'sass-loader?sourceMap',
          ],
        }),
      },
      {
        test: /\.css$/,
        include: /(flexboxgrid|react-datepicker|animate)/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?modules=true&localIdentName=[local]&sourceMap',
          ],
        }),
      },
    ],
  },
  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, './src/assets/logo-small.png'),
      inject: true,
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),
    new ExtractTextPlugin('style-[hash].css'),
    // new BundleAnalyzerPlugin() // Uncomment for bundle analysis
  ],
  devServer: {
    contentBase: './dist',
    port: 3000,
    compress: true,
    inline: false,
    hot: false,
  },
  devtool: 'source-map',
}

if (isDeploy) config.plugins.push(new SentryPlugin({
  organization: 'overlock',
  project: 'overlock-frontend',
  apiKey: '<Sentry API Key here>',
  // Use the current git commit hash as release id
  release: COMMITHASH,
  suppressConflictError: true,
}))

module.exports = merge(common, config)
