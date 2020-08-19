'use strict'

const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');


module.exports = {
    devtool:'source-map',
    devServer:{
        host:'0.0.0.0',
        port:2000,
        hot:true,
        historyApiFallback:true,
        quiet: true,
        disableHostCheck: true,
        headers:{
            'Access-Control-Allow-Origin': '*',
        },
        proxy:{
            '/dev-api':{
                target:'http://localhost:2020',//开发环境
                changeOrigin:true,
                ws:true,
                pathRewrite: {
                    '^/dev-api': '',//重写,
                }
            }
        }
    },
    plugins:[
        new WebpackBuildNotifierPlugin({
            title:"项目编译成功😘",
            logo:'./favicon.png',
            suppressSuccess: true
        }),
        
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`- Your application is running here:  http://localhost:2000`],
                notes: [`- network: http://本机ip: 2000`]
            },
            onErrors: function(severity, errors){
                if (severity !== 'error') {
                    return;
                  }
                  const error = errors[0];
                  notifier.notify({
                    title: "哦嚯~~编译已报错",
                    message: severity + ': ' + error.name,
                    subtitle: error.file || '',
                    // icon: ICON
                  });
            },
            clearConsole: true,
        })
    ]
}