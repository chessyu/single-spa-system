
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const path = require('path')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');

///获取本机ip///
const os = require('os');
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
const myHost = getIPAdress();

module.exports = {
    devtool:'source-map',
    devServer:{
        host:'0.0.0.0',
        port:5004,
        hot:true,
        historyApiFallback:true,
        quiet: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        // proxy:{
        //     '/dev-api':{
        //         target:'http://m2-dev.hhycdk.com',   //本地调试
        //         changeOrigin:true,
        //         ws:true,
        //         pathRewrite: {
        //             '/dev-api': '',//重写,
        //         }
        //     }
        // }
    },
    
    plugins:[
        new WebpackBuildNotifierPlugin({
            title:"项目编译成功😘",
            logo:path.resolve(__dirname,'../src/assets/img/icon.png'),
            suppressSuccess: true
        }),
        
        
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here:  http://localhost:5004`],
                notes: [`- network: http://${myHost}:5004`]
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