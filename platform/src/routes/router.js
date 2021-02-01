

export default[
    {
        path:'*',
        name:'error',
        component:() => import(/* webpackChunkName: "error" */ '@/view/error/error.vue')
    },
    {
        path:'/',
        redirect:'/login'
    },
    {
        path:'/login',
        name:'login',
        component:() => import(/* webpackChunkName: "login" */ '@/view/login/login.vue')
    },
    {
        path:'/layout',
        name:'layout',
        redirect:'/s_crm/index',
        component:() => import(/* webpackChunkName: "layout" */ '@/view/layout/layout.vue'),
        children:[
            {
                path:'/s_crm/index',
                name:'index',
                component:() => import(/* webpackChunkName: "home" */ '@/view/home/home.vue')
            },
            {
                path:'/s_crm/system/user',
                name:'user',
                component: () => import(/* webpackChunkName: "user" */ '@/view/system/user.vue')
            },
            {
                path:'/s_crm/system/role',
                name:'role',
                component: () => import(/* webpackChunkName: "role" */ '@/view/system/role.vue')
            },
            {
                path:'/s_crm/system/menu',
                name:'menuT',
                component: () => import(/* webpackChunkName: "menu" */ '@/view/system/menu.vue')
            },
            {
                path:'/s_crm/system/dict',
                name:'dict',
                component: () => import(/* webpackChunkName: "dict" */ '@/view/system/dict.vue')
            },
            {
                path:'/s_crm/system/dictData:dictType',
                name:'dictData',
                component: () => import(/* webpackChunkName: "dictData" */ '@/view/system/dictData.vue')
            },
            {
                path:'/s_crm/system/dept',
                name:'dept',
                component: () => import(/* webpackChunkName: "dept" */ '@/view/system/dept.vue')
            },
            {
                path:'/s_crm/system/post',
                name:'post',
                component: () => import(/* webpackChunkName: "post" */ '@/view/system/post.vue')
            },
            {
                path:'/s_crm/system/userCenter',
                name:'userCenter',
                component: () => import(/* webpackChunkName: "userCenter" */ '@/component/userCenter/userCenter.vue')
            },
            {
                path:'/s_crm/system/actionLog',
                name:'actionLog',
                component: () => import(/* webpackChunkName: "actionLog" */ '@/view/system/log/actionLog.vue')
            },
            {
                path:'/s_crm/system/report',
                name:'report',
                component: () => import(/* webpackChunkName: "report" */ '@/view/system/report.vue')
            },
            {           
                path:'/s_crm/systemUtils/formGenerator',
                name:'formGenerator',
                component: () => import(/* webpackChunkName: "formGenerator" */ '@/view/systemUtils/formGenerator.vue')
            },
            {           
                path:'/s_crm/systemUtils/structureConfig',
                name:'structureConfig',
                component: () => import(/* webpackChunkName: "structureConfig" */ '@/view/systemUtils/structureConfig.vue')
            }
        ]
    }
]