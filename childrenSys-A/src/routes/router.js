import systemConfig from '../../systemConfig.json'

export default[
    {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/login',
        name:'login',
        component:() => import(/* webpackChunkName: "login" */ '../../../commonModules/login/login.vue')
    },
    {
        path:'/layout:isMainFrame',
        name:'layout',
        props:{isMainFrame : systemConfig.systemMenuId},
        redirect:`/${systemConfig.systemCode}/index`,
        component:() => import(/* webpackChunkName: "layout" */ '../../../commonModules/layout/layout.vue'),
        children:[
            {
                path:`/${systemConfig.systemCode}/index`,
                name:`index`,
                component:() => import(/* webpackChunkName: "ccpIndex" */ '@/view/home/index.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/gameSys`,
                name:`${systemConfig.systemCode}_issueSystem_gameSys`,
                component:() => import(/* webpackChunkName: "gameSys" */ '@/view/A/a1.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/channelSys`,
                name:`${systemConfig.systemCode}_issueSystem_channelSys`,
                component:() => import(/* webpackChunkName: "channelSys" */ '@/view/A/a2.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/prefectureLink`,
                name:`${systemConfig.systemCode}_issueSystem_prefectureLink`,
                component:() => import(/* webpackChunkName: "prefectureLink" */ '@/view/A/a3.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/channelLink`,
                name:`${systemConfig.systemCode}_issueSystem_channelLink`,
                component:() => import(/* webpackChunkName: "channelLink" */ '@/view/A/a4.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/externalAccess`,
                name:`${systemConfig.systemCode}_issueSystem_externalAccess`,
                component:() => import(/* webpackChunkName: "externalAccess" */ '@/view/A/a5.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/testEnv`,
                name:`${systemConfig.systemCode}_issueSystem_testEnv`,
                component:() => import(/* webpackChunkName: "testEnv" */ '@/view/A/a6.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/payOrder`,
                name:`${systemConfig.systemCode}_issueSystem_payOrder`,
                component:() => import(/* webpackChunkName: "payOrder" */ '@/view/A/a7.vue')
            },
            {
                path:`/${systemConfig.systemCode}/dataSystem/chatMonitor`,
                name:`${systemConfig.systemCode}_dataSystem_chatMonitor`,
                component:() => import(/* webpackChunkName: "chatMonitor" */ '@/view/A/a8.vue')
            },
        ]
    },
]