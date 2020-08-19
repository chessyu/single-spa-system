
// const argv = require('yargs-parser')(process.argv.slice(2))

const env = process.env.ENVPARA;
//开发环境时的 systemjs 的配置
let  systemjsImportmapDev = {
  "imports": {
    "CCP": "http://10.10.11.28:5001/script/main.bundle.js",
    "GAP": "http://10.10.11.28:5002/script/main.bundle.js",
    "OAP": "http://10.10.11.28:5003/script/main.bundle.js",
    "IP":    "http://10.10.11.28:5004/script/main.bundle.js",
    "single-spa": "/cdn/single-spa.js",
    "vue": "/cdn/vue.js",
    "vue-router": "/cdn/vue-router.min.js"
  }
}

//发包时 测试外网环境时的 systemjs 的配置
let  systemjsImportmapDevExtranet = {
  "imports": {
    "CCP": "http://control-dev.hhycdk.com/script/main.bundle.js",
    "GAP": "http://hhy.hhycdk.com/script/main.bundle.js",
    "OAP": "http://analyze-dev.hhycdk.com/script/main.bundle.js",
    "IP": "http://issue-dev.hhycdk.com/script/main.bundle.js",
    "single-spa": "/cdn/single-spa.js",
    "vue": "/cdn/vue.js",
    "vue-router": "/cdn/vue-router.min.js"
  }
}

//发包时 测试内网环境时的 systemjs 的配置
let systemjsImportmapDevIntranent = {
  "imports": {
    "OAP": "http://10.10.10.139:8081/script/main.bundle.js",
    "IP": "http://10.10.10.139:8083/script/main.bundle.js",
    "single-spa": "/cdn/single-spa.js",
    "vue": "/cdn/vue.js",
    "vue-router": "/cdn/vue-router.min.js"
  }
}

//发包时 生产环境时的 systemjs 的配置
let systemjsImportmapProd = {
  "imports": {
    "OAP": "http://analyze-dev.hhycdk.com/script/main.bundle.js",
    "IP": "http://issue-dev.hhycdk.com/script/main.bundle.js",
    "single-spa": "/cdn/single-spa.js",
    "vue": "/cdn/vue.js",
    "vue-router": "/cdn/vue-router.min.js"
  }
}


let envSystem;
switch(env){
  case "dev":
    envSystem = systemjsImportmapDev;
    break;
  case "test":
    envSystem = systemjsImportmapDevExtranet;
    break;
  case "intranet":
    envSystem = systemjsImportmapDevIntranent;
  break;
  default :
  envSystem = systemjsImportmapProd;
  break;
}

module.exports = envSystem;
// module.exports = argv.mode == 'development' ? systemjsImportmapDev : systemjsImportmapProd;