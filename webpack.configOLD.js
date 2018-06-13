"use strict";
const path = require("path");// const babelrc = require("./.babelrc");
/*
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlWebpackPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
});
*/

module.exports = {
  entry: "./src/App.jsx",
  output: {
    path: __dirname + "/static/",
    // publicPath: "build/",
    filename: "bundle.js"
  },
  // devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /public/],
        use: {
          loader: "babel-loader",
          options: {
            presets:["babel-preset-env", "babel-preset-react"],
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
      /*{
        test: /\.less$/,
        exclude: [/node_modules/, /public/],
        use:[
          "style-loader", "css-loader", "autoprefixer-loader", "less-loader"
        ]
      },*/
      {
        test: /\.jsx$/,
        exclude: [/node_modules/, /public/],
        use: [
          // "react-hot-loader/webpack",
          {
            loader: "babel-loader",
            options:{
              presets: ["babel-preset-env", "babel-preset-react"],
              plugins: ["transform-class-properties"]
            },
          }
        ]
      },
      /*
          {
            test: /\.json$/,
            use: ["json-loader"],
          },*/
    ]
  },
  // plugins: [htmlWebpackPlugin]
};
