const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const SentryPlugin = require('webpack-sentry-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProd = process.env.NODE_ENV === 'production'
const isDeploy = process.env.DEPLOY_ENV === 'deploy'

let COMMITHASH
try {
  COMMITHASH = new GitRevisionPlugin().commithash()
}
catch (e) {
  uuid = require("uuid")
  COMMITHASH = uuid()
}

const config = {
  entry: ['regenerator-runtime/runtime', 'isomorphic-fetch', './src/index.js'],
  mode: isProd ? 'production' : 'development',
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
          path.resolve(__dirname, "styleguide"),
          path.resolve(__dirname, "node_modules/zc-core"),
          path.resolve(__dirname, "node_modules/zc-web")
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        }
      }
    ]
  },
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      config: path.resolve(__dirname, './src/config'),
      containers: path.resolve(__dirname, './src/containers'),
      hocs: path.resolve(__dirname, './src/hocs'),
      routes: path.resolve(__dirname, './src/routes'),
      selectors: path.resolve(__dirname, './src/selectors'),
      theme: path.resolve(__dirname, './src/style/theme'),
      utils: path.resolve(__dirname, './src/utils'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        DEPLOY_ENV: JSON.stringify(process.env.DEPLOY_ENV),
        COMMITHASH: JSON.stringify(COMMITHASH),
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
    proxy: {
      // Specific api requests can be routed to devServer on 4000 while the rest default to 8000
      // TODO: Remove proxy to local dev server when /users implemented on server
      // '/api/v3/devices/**': 'http://localhost:4000',
      // '/api/v3/sites/**': 'http://localhost:4000',
      // '/api/v3/devices/**/data/': 'http://localhost:4000',
      '/api/**': 'http://localhost:8000'
    }
  },
  devtool: isProd ? 'source-map' : 'source-map',
  target: 'web',
}

if (isProd) {
  config.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
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
        sourceMap: true,
      }),
    ]
  }
  config.plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new ExtractTextPlugin('style-[hash].css'),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, './src/assets/logos/icontact_logo.png'),
      inject: true,
    }),
    // new BundleAnalyzerPlugin(),
  )
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
      include: /(flexboxgrid|react-datepicker|react-dates|animate)/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader?sourceMap',
        ],
      })
    }
  )
}
else {
  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  )
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
      include: /(flexboxgrid|react-datepicker|react-dates|animate)/,
      use: [
        'style-loader?sourceMap',
        'css-loader?sourceMap',
      ],
    }
  )
}

if (isDeploy) config.plugins.push(new SentryPlugin({
  organization: 'zoetrope',
  project: 'rtr-front',
  apiKey: '4b3816339c6d49c5aacdcab38df19828812cf5927bb14e6394dee22e3d10002c',
  // Use the current git commit hash as release id
  release: COMMITHASH,
  suppressConflictError: true,
  exclude: /\.css(.map)?/
}))


module.exports = config
