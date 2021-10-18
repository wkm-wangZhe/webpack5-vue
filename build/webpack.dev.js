const webpack = require("webpack");
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const WebpackBar = require("webpackbar");


function resolve(dir) {
  const pathDir = path.join(__dirname, dir);
  console.log('pathDir', pathDir)
  return pathDir
}

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "cheap-module-source-map",
  devServer: {
    port: 8080
  },
  plugins: [
    new WebpackBar(),
    new webpack.DefinePlugin({
        BASE_URL: '"/"',
      "process.env": {
        NODE_ENV: '"development"',
        REACT_APP_API: '"dev"',
        BASE_URL: '"/"'
      },

    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      favicon: resolve('../public/favicon.ico'),
      template: resolve("../public/index.html"),
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
});

module.exports = devWebpackConfig;
