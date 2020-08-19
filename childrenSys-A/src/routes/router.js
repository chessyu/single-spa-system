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
                name:'gameSys',
                component:() => import(/* webpackChunkName: "gameSys" */ '@/view/issueSystem/gameSys.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/channelSys`,
                name:'channelSys',
                component:() => import(/* webpackChunkName: "channelSys" */ '@/view/issueSystem/channelSys.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/prefectureLink`,
                name:'prefectureLink',
                component:() => import(/* webpackChunkName: "prefectureLink" */ '@/view/issueSystem/prefectureLink.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/channelLink`,
                name:'channelLink',
                component:() => import(/* webpackChunkName: "channelLink" */ '@/view/issueSystem/channelLink.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/externalAccess`,
                name:'externalAccess',
                component:() => import(/* webpackChunkName: "externalAccess" */ '@/view/issueSystem/externalAccess.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/testEnv`,
                name:'testEnv',
                component:() => import(/* webpackChunkName: "testEnv" */ '@/view/issueSystem/testEnv.vue')
            },
            {
                path:`/${systemConfig.systemCode}/issueSystem/payOrder`,
                name:'payOrder',
                component:() => import(/* webpackChunkName: "payOrder" */ '@/view/issueSystem/payOrder.vue')
            },
            {
                path:`/${systemConfig.systemCode}/dataSystem/chatMonitor`,
                name:'chatMonitor',
                component:() => import(/* webpackChunkName: "chatMonitor" */ '@/view/dataSystem/chatMonitor.vue')
            },
        ]
    },
]