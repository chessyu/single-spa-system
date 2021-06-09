import systemConfig from '../../systemConfig.json'

export default[
    {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/login',
        name:'login',
        component:() => import(/* webpackChunkName: "B_login" */ '../../../commonModules/login/login.vue')
    },
    {
        path:'/layout:isMainFrame',
        name:'layout',
        props:{isMainFrame : systemConfig.systemMenuId},
        redirect:`/${systemConfig.systemCode}/index`,
        component:() => import(/* webpackChunkName: "B_layout" */ '../../../commonModules/layout/layout.vue'),
        children:[
            {
                path:`/${systemConfig.systemCode}/index`,
                name:`index`,
                component:() => import(/* webpackChunkName: "BIndex" */ '@/view/home/index.vue')
            },
            {
                path:`/${systemConfig.systemCode}/B/A`,
                name:`${systemConfig.systemCode}_B_A`, 
                component:() => import(/* webpackChunkName: "A" */ '@/view/A/a1.vue')
            },
            {
                path:`/${systemConfig.systemCode}/B/B`,
                name:`${systemConfig.systemCode}_B_B`,
                component:() => import(/* webpackChunkName: "B" */ '@/view/A/a2.vue')
            },
            {
                path:`/${systemConfig.systemCode}/B/C`,
                name:`${systemConfig.systemCode}_B_C`,
                component:() => import(/* webpackChunkName: "C" */ '@/view/A/a3.vue')
            },
            {
                path:`/${systemConfig.systemCode}/B/D`,
                name:`${systemConfig.systemCode}_B_D`,
                component:() => import(/* webpackChunkName: "D" */ '@/view/A/a4.vue')
            },
            // {
            //     path:`/${systemConfig.systemCode}/issueSystem/externalAccess`,
            //     name:`${systemConfig.systemCode}_issueSystem_externalAccess`,
            //     component:() => import(/* webpackChunkName: "externalAccess" */ '@/view/A/a5.vue')
            // },
            // {
            //     path:`/${systemConfig.systemCode}/issueSystem/testEnv`,
            //     name:`${systemConfig.systemCode}_issueSystem_testEnv`,
            //     component:() => import(/* webpackChunkName: "testEnv" */ '@/view/A/a6.vue')
            // },
            // {
            //     path:`/${systemConfig.systemCode}/issueSystem/payOrder`,
            //     name:`${systemConfig.systemCode}_issueSystem_payOrder`,
            //     component:() => import(/* webpackChunkName: "payOrder" */ '@/view/A/a7.vue')
            // },
            // {
            //     path:`/${systemConfig.systemCode}/dataSystem/chatMonitor`,
            //     name:`${systemConfig.systemCode}_dataSystem_chatMonitor`,
            //     component:() => import(/* webpackChunkName: "chatMonitor" */ '@/view/A/a8.vue')
            // },
        ]
    },
]