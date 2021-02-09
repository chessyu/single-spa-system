'use strict'

const path = require('path')
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode =argv.mode || 'development';
const webpackMode = (_mode == 'production')
// const webpackMode = (_mode == 'development' ? true : false)
const _mergeConfig = require(`./webpack.${_mode}.js`)
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const env = require(`./config/${process.env.ENVPARA}.env.js`)
const RewriteEntryFile = require('./plugins/RewriteEntryFile.js')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const systemJs = require('../public/system.js')


const webpackConfig = {
    entry:path.resolve(__dirname,'../src/index.js'),
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename:(webpackMode?'script/[name]_[chunkhash:5]_bundle.js' : 'script/[name].bundle.js'),
        chunkFilename:(webpackMode?'script/[name]_[chunkhash:5]_bundle.js' : 'script/[name].bundle.js'),
        publicPath:'/',

        // library:'platform',
        // libraryTarget:'umd'
    },
    resolve:{
        extensions:['.js','.jsx','.vue'],
        alias:{
            '@':path.resolve(__dirname,'../src'),
            "common": path.resolve(__dirname,"../../commonModules")
        }
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.less|\.css$/,
                use:[
                    // 'style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          esModule: true,
                          publicPath:'../'
                        },
                      },
                    'css-loader',
                    {
                        loader:'less-loader',
                        options:{
                            javascriptEnabled: true
                        }
                    }
                    
                ]
            },
            {
                test:/\.(jpg|png|gif|svg)$/,    
                use:[{
                    loader:'file-loader',
                    options:{
                        esModule: false,
                        name:'[name].[hash:5].[ext]',    //可以重写css中引入图片部分
                        // publicPath: '../img/',       //可以重新生成图片到新的目录
                        outputPath: 'img/'
                    }
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader:'file-loader',
                    options: {
                        name: '[name].[ext]',          //path为相对于context的路径
                        context:'src',
                        // publicPath: '../fonts/',
                        outputPath: 'fonts/'
                    }
                }]
            },
            {
                test : /\.json$/,
                loader : 'json-loader'
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        // new RewriteEntryFile(),
        new HtmlWebpackPlugin({
            title:"系统管理平台",
            filename: 'index.html',
            template: path.resolve(__dirname,'../public/index.html'),
            minify:{
                removeComments: false,
            },
            templateParameters:{
                systemJs:JSON.stringify(systemJs)
            }
        }),
        new MiniCssExtractPlugin({
            filename: webpackMode ? "style/[name].[hash:5].css" : 'style/[name].css',
            chunkFilename: webpackMode ? "style/[name].[id].[hash:5].css" : 'style/[id].css',
        }),
        new CopyPlugin([{
            from: path.resolve(__dirname,"../public/favicon.ico"),
            to:path.resolve(__dirname,'../dist')
        },
        {
            from: path.resolve(__dirname,"../public/cdn"),
            to:path.resolve(__dirname,'../dist/cdn'),
            toType:'dir'
        }]),
        new webpack.DefinePlugin({
            'process.env' : env
        }),
        new ProgressBarPlugin({
            // clear: true,
            format: 'build [:bar] :percent (:elapsed seconds)',
            clear: true, 
            width: 80
       }),
    ]
}

module.exports = webpackMode ? smp.wrap(merge(webpackConfig,_mergeConfig)) : merge(webpackConfig,_mergeConfig);