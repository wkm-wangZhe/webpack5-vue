const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const WebpackBar = require("webpackbar");
const path = require('path');


function resolve (dir) {
    return path.join(__dirname,  dir)
}

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        publicPath: './'
    },
    devtool: "cheap-module-source-map",
    plugins: [
        new WebpackBar(),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            BASE_URL: '"/"',
            'process.env': { 
                NODE_ENV: '"production"',
                REACT_APP_API: '"product"'
            } 
        }),
       
        new HtmlWebpackPlugin({
            filename: "index.html",
            favicon: resolve('../public/favicon.ico'),
            template: resolve("../public/index.html"),
            inject: true,
        }),
        new CopyWebpackPlugin([
            {
              from: resolve('../public'),
              to:  resolve('../dist'),
              ignore: ['.*']
            }
        ]),
        new OptimizeCSSAssetsPlugin()  
    ],
   
})
module.exports = devWebpackConfig