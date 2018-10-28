"use strict";
const webpack = require("webpack");
const path = require("path");// const babelrc = require("./.babelrc");
const HtmlWebPackPlugin = require('html-webpack-plugin');


module.exports = {
  target: "node",
  mode: "development",
  entry: "./server/server.js",
  output: {
    path: __dirname + "/dist/",
    // publicPath: "build/",
    filename: "server.bundle.js",
    libraryTarget: "commonjs"
  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  externals: [/^[a-z]/],
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /public/],
        use: {
          loader: "babel-loader",
          options: {
            presets:["babel-preset-env"],
            plugins: ["transform-class-properties"]
          }
        }
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/, /public/],
        use: [
          {loader: "style-loader"},
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[sha1:hash:base64]",
              sourceMap: true,
              minimize: true
            }
          },
          // {loader: "autoprefixer-loader"},
          {loader: "less-loader"},
        ]
      },

      {
        test: /\.jsx$/,
        exclude: [/node_modules/, /public/],
        use: [
          {
            loader: "babel-loader",
            options:{
              presets: ["babel-preset-env", "babel-preset-react"],
              plugins: ["transform-class-properties"]
            },
          }
        ]
      },
      
    ]
  },
  /*devServer: {
    port:8090,
    contentBase: path.join(__dirname,'static'),
    // proxy: {'/api/!*': 'http://localhost:3000'},
    proxy: {'**': 'http://localhost:3000'},
    historyApiFallback: true
  },
  */
    plugins: [
      /*new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      })*/
    ]
};
