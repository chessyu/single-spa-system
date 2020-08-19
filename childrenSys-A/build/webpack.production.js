

const {join, resolve} = require('path')

const webpackbunld=require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    // devtool: "inline-source-map",
    externals: ['vue', 'vue-router'],
    // devServer:{
    //     host:'0.0.0.0',
    //     port:5004,
    //     hot:true,
    //     // historyApiFallback:true,
    //     quiet: true,
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //     },
    // },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        namedModules: true,
        namedChunks: true,
        flagIncludedChunks: true,
        splitChunks:{
            chunks: 'async', // initial、async和all
            minSize: 0, // 形成一个新代码块最小的体积
            maxAsyncRequests: 5, // 按需加载时候最大的并行请求数
            maxInitialRequests: 3, // 最大初始化请求数
            automaticNameDelimiter: '~', // 打包分割符
            name: true,
            cacheGroups:{
                // default: false,
                commons:{
                    chunks:'async',  //all ,async,initial  优化方式
                    name:'common',     //生成名称  
                    minChunks:1,       //模块的引用最小数
                    maxInitialRequests:5,   //入口点的最大并行请求数
                    minSize:0          //生成块的最小大小
                },
            }
        },
        // runtimeChunk: {
        //     name: 'runtime'
        // }
    },

    // plugins:[
       // new webpackbunld()
    // ]
    
}