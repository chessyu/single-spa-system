
const path = require('path')
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development';
const webpackMode = _mode == 'production' ? true : false
const _mergeConfig = require(`./webpack.${_mode}.js`)
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin')
const webpack  = require('webpack')
const env = require(`./config/${process.env.ENVPARA}.env.js`)
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

// const CopyConfig = require('./wepackPlugins/copyConfig');
const webpackConfig = {
    entry:path.resolve(__dirname,'../src/index.js'),
    // externals: ['vue', 'vue-router'],
    output:{
        path:path.resolve(__dirname,'../dist'),
        // filename:(webpackMode?'script/[name].[hash:5].bundle.js' : 'script/[name].bundle.js'),
        filename: 'script/[name].bundle.js',
        // chunkFilename: "[id].chunk.js",
        publicPath:'/',
        libraryTarget:'umd',
    },
    resolve:{
        extensions:['.js','.jsx','.vue'],
        alias:{
            '@':path.resolve(__dirname,'../src')
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
                        name:'[name].[ext]?[hash:5]',    //可以重写css中引入图片部分
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
                        publicPath: '../fonts/',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ]
    },
    plugins:[
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:"发行平台",
            filename: 'index.html',
            template: path.resolve(__dirname,'../public/index.html'),
            // favicon: './favicon.ico'
        }),
        new webpack.DefinePlugin({
            'process.env' : env
        }),
        new MiniCssExtractPlugin({
            filename: webpackMode ? "style/[name].[hash:5].css" : 'style/[name].css',
            chunkFilename: webpackMode ? "style/[name].[id].[hash:5].css" : 'style/[id].css',
        }),
        // new CopyConfig({   //自定义的插件
        //     from: path.resolve(__dirname,"../src/single-spa-config.js"),
        //     to:path.resolve(__dirname,'../dist')
        // })
        new CopyPlugin([
            {
                from: path.resolve(__dirname,"../src/single-spa-config.js"),
                to:path.resolve(__dirname,'../dist'),
            },
            {
                from: path.resolve(__dirname,"../public/favicon.ico"),
                to:path.resolve(__dirname,'../dist')
            }
        ]),
        new ProgressBarPlugin({
            // clear: true,
            format: 'build [:bar] :percent (:elapsed seconds)',
            clear: false, 
            width: 80
       }),
    ]
}

// if(!webpackMode) delete webpackConfig.externals;


module.exports = merge(webpackConfig,_mergeConfig);
