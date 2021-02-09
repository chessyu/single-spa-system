'use strict'

const {join, resolve} = require('path')

const webpackbunld=require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackDeepScopeAnalysisPlugin = require('webpack-deep-scope-plugin').default;


module.exports = {
    devtool:'eval-source-map',
    optimization: {
        minimizer: [new TerserPlugin({
            cache: true, // 是否缓存
            parallel: true, // 是否并⾏打包
            sourceMap: true
        }), new OptimizeCSSAssetsPlugin()],
        splitChunks:{
            chunks: 'async', // initial、async和all
            minSize: 0, // 形成一个新代码块最小的体积
            maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
            maxInitialRequests: 3, // 最大初始化请求数
            automaticNameDelimiter: '~', // 打包分割符
            name: true,
            cacheGroups:{
                commons:{
                    chunks:'initial',  //all ,async,initial  优化方式
                    name:'common',     //生成名称  
                    minChunks:1,       //模块的引用最小数
                    maxInitialRequests:5,   //入口点的最大并行请求数
                    minSize:0          //生成块的最小大小
                },
            }
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },

    plugins:[
        //new webpackbunld(),
        new ManifestPlugin(),
        new WebpackDeepScopeAnalysisPlugin()
        
    ]
    
}