
import systemConfig from '../../systemConfig.json'
export default{
    userData:{},            //登录个人数据
    buttomPower:[],     //登录人的所有操作权限(按钮)
    viewport:{              //视口宽高
        width:0,
        height:0
    },
    layoutTag:[             //新开的所有标签
        {
            path: "index",
            index: 0,
            name: "首页", 
            active:true,
            isSonSys:false,
            routerPath:`/${systemConfig.systemCode}/index`
        }
    ],
    sysConfig:{             //全局配置
        showBread:false,
        keepAliveTag:true,
    },
}