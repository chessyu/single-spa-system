
// const argv = require('yargs-parser')(process.argv.slice(2))

const env = process.env.ENVPARA;
//开发环境时的 systemjs 的配置
let  systemjsImportmapDev = {
  "imports": {
    "ORM":    "http://192.168.0.104:5004/script/main.bundle.js",
    "single-spa": "/cdn/single-spa.js",
    "vue": "/cdn/vue.js",
    "vue-router": "/cdn/vue-router.min.js" 
  }
}

//发包时 测试外网环境时的 systemjs 的配置
let  systemjsImportmapDevExtranet = {
  "imports": {
    "ORM": "http://issue-dev.hhycdk.com/script/main.bundle.js",
    "single-spa": "/cdn/single-spa.js",
    "vue": "/cdn/vue.js",
    "vue-router": "/cdn/vue-router.min.js"
  }
}

//发包时 测试内网环境时的 systemjs 的配置
let systemjsImportmapDevIntranent = {
  "imports": {
    "ORM": "http://10.10.10.139:8083/script/main.bundle.js",
    "single-spa": "/cdn/single-spa.js",
    "vue": "/cdn/vue.js",
    "vue-router": "/cdn/vue-router.min.js"
  }
}

//发包时 生产环境时的 systemjs 的配置
let systemjsImportmapProd = {
  "imports": {
    "ORM": "http://120.79.143.23:2002/script/main.bundle.js",
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