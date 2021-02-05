import systemConfig from '../../systemConfig.json'

export default[
    {
        path:'/',
        redirect:'/layout'
    },
    {
        path:'/login',
        name:'login',
        component:() => import(/* webpackChunkName: "login" */ '@/view/login/login.vue')
    },
    {
        path:'/layout',
        name:'layout',
        redirect:`/${systemConfig.systemCode}/index`,
        component:() => import(/* webpackChunkName: "layout" */ '@/view/layout/layout.vue'),
        children:[
            {
                path:`/${systemConfig.systemCode}/index`,
                name:'ccpIndex',
                component:() => import(/* webpackChunkName: "ccpIndex" */ '@/view/home/index.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/gameSys`,
                name:`${systemConfig.systemCode}_issueSystem_gameSys`,
                component:() => import(/* webpackChunkName: "gameSys" */ '@/view/issueSystem/gameSys.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/channelSys`,
                name:`${systemConfig.systemCode}_issueSystem_channelSys`,
                component:() => import(/* webpackChunkName: "channelSys" */ '@/view/issueSystem/channelSys.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/prefectureLink`,
                name:`${systemConfig.systemCode}_issueSystem_prefectureLink`,
                component:() => import(/* webpackChunkName: "prefectureLink" */ '@/view/issueSystem/prefectureLink.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/channelLink`,
                name:`${systemConfig.systemCode}_issueSystem_channelLink`,
                component:() => import(/* webpackChunkName: "channelLink" */ '@/view/issueSystem/channelLink.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/externalAccess`,
                name:`${systemConfig.systemCode}_issueSystem_externalAccess`,
                component:() => import(/* webpackChunkName: "externalAccess" */ '@/view/issueSystem/externalAccess.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/testEnv`,
                name:`${systemConfig.systemCode}_issueSystem_testEnv`,
                component:() => import(/* webpackChunkName: "testEnv" */ '@/view/issueSystem/testEnv.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/payOrder`,
                name:`${systemConfig.systemCode}_issueSystem_payOrder`,
                component:() => import(/* webpackChunkName: "payOrder" */ '@/view/issueSystem/payOrder.vue')
            },
            {
                path:`/${systemConfig.systemCode}/dataSystem/chatMonitor`,
                name:`${systemConfig.systemCode}_dataSystem_chatMonitor`,
                component:() => import(/* webpackChunkName: "chatMonitor" */ '@/view/dataSystem/chatMonitor.vue')
            },
        ]
    },
]