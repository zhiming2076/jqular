const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const appCSSPlugin = new ExtractTextPlugin('css/app.css');
const vendorsCSSPlugin = new ExtractTextPlugin('css/vendors.css');

module.exports = {
  entry: {
    'app': './index.js'
  },
  mode: "none",
  output: {
    filename: 'js/[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{ loader: "babel-loader" }]
      },
      {
        test: /app.css$/,
        use: appCSSPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /a.css$/,
        use: vendorsCSSPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Jqular',
      template: "index.html"
    }),
    appCSSPlugin, vendorsCSSPlugin,
    // new CopyWebpackPlugin([
    //   { from: 'plugins/**/**/*.css', to: 'css/*.css' },
    //   { from: 'plugins/**/**/*.css', to: 'css/*.css' }
    // ], {
    //     ignore: [],
    //     copyUnmodified: true,
    //     debug: "debug"
    //   }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name(module) {
            /*
             vendors = jquery + bootstrap(localhost) + ladsh
             plugins = plugins/..
           */
            if (/[\\/]node_modules[\\/]/.test(module["request"]) || /[\\/]plugins[\\/]bootstrap/.test(module["request"])) {
              return 'vendors';
            } else if (/[\\/]plugins[\\/]/.test(module["request"])) {
              return 'plugins';
            } else {
              return 'components';
            }
          },
          chunks: 'all'
        }
      }
    }
  }
};