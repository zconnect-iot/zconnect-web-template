const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const path = require('path')

const COMMITHASH = new GitRevisionPlugin().commithash()

module.exports = {
  entry: ['regenerator-runtime/runtime', 'isomorphic-fetch', './src/index.js'],
  output: {
    filename: 'bundle-[hash].js',
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
      config: path.resolve(__dirname, './src/config'),
      components: path.resolve(__dirname, './src/components'),
      containers: path.resolve(__dirname, './src/containers'),
      routes: path.resolve(__dirname, './src/routes'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        COMMITHASH: JSON.stringify(COMMITHASH),
      },
    }),
    new HtmlWebpackPlugin({
      title: 'ZConnect App',
      template: 'src/index.ejs',
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
  target: 'web',
}
