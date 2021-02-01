import routerConfig from '../routes/router.js'

export default{
    routers:JSON.parse(JSON.stringify(routerConfig)),   //平台路由
    sysConfig:{             //全局配置
        showBread:false,
        keepAliveTag:true,
    },
    layoutTag:[             //新开的所有标签
        {
            path: "index",
            index: 0,
            name: "首页", 
            active:true,
            isSonSys:false,
            routerPath:'/ABP/index'
        }
    ],
    userData:{},            //登录人的个人数据
    buttomPower:[],     //登录人的所有操作权限(按钮)
    viewport:{              //视口宽高
        width:0,
        height:0
    },
    cache:{},                 //所有平台所需的缓存数据


}

