const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const path = require('path');

const isProd = process.env.NODE_ENV === 'production'

const config = {
  entry: ['regenerator-runtime/runtime', 'isomorphic-fetch', './src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "dist"),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/zc-core"),
          path.resolve(__dirname, "node_modules/zc-web")
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        }
      }
    ]
  },
  resolve: {
    alias: {
      theme: path.resolve(__dirname, './src/style/theme'),
      assets: path.resolve(__dirname, './src/assets'),
      config: path.resolve(__dirname, './src/config')
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebpackPlugin({
      title: 'ZConnect App',
      template: 'src/index.ejs'
    })
  ],
  devServer: {
    contentBase: isProd ? './dist' : './src',
    historyApiFallback: true,
    port: 3000,
    compress: isProd,
    inline: !isProd,
    hot: !isProd,
  },
  devtool: isProd ? false : 'source-map',
  target: 'web',
}

if (isProd) {
  config.plugins.push(
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
    }),
    new ExtractTextPlugin('style-[hash].css'),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, './src/assets/logo-small.png'),
      inject: true,
    })
  );

  config.module.rules.push(
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
          'css-loader?modules=true&localIdentName=[hash:base64:6]&sourceMap',
        ],
      })
    }
  )
}
else {
  config.module.rules.push(
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
        'css-loader?modules=true&localIdentName=[local]_[hash:base64:6]&sourceMap',
      ],
    }
  )
}

module.exports = config
