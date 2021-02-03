

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
        redirect:'/crm/index',
        component:() => import(/* webpackChunkName: "layout" */ '@/view/layout/layout.vue'),
        children:[
            {
                path:'/crm/index',
                name:'index',
                component:() => import(/* webpackChunkName: "home" */ '@/view/home/home.vue')
            },
            {
                path:'/crm/system/user',
                name:'crm_system_user',
                component: () => import(/* webpackChunkName: "user" */ '@/view/system/user.vue')
            },
            {
                path:'/crm/system/role',
                name:'crm_system_role',
                component: () => import(/* webpackChunkName: "role" */ '@/view/system/role.vue')
            },
            {
                path:'/crm/system/menu',
                name:'crm_system_menu',
                component: () => import(/* webpackChunkName: "menu" */ '@/view/system/menu.vue')
            },
            {
                path:'/crm/system/dict',
                name:'crm_system_dict',
                component: () => import(/* webpackChunkName: "dict" */ '@/view/system/dict.vue')
            },
            {
                path:'/crm/system/dictData:dictType',
                name:'dictData',
                component: () => import(/* webpackChunkName: "dictData" */ '@/view/system/dictData.vue')
            },
            {
                path:'/crm/system/dept',
                name:'dept',
                component: () => import(/* webpackChunkName: "dept" */ '@/view/system/dept.vue')
            },
            {
                path:'/crm/system/post',
                name:'crm_system_post',
                component: () => import(/* webpackChunkName: "post" */ '@/view/system/post.vue')
            },
            {
                path:'/crm/system/userCenter',
                name:'userCenter',
                component: () => import(/* webpackChunkName: "userCenter" */ '@/component/userCenter/userCenter.vue')
            },
            {
                path:'/crm/system/actionLog',
                name:'actionLog',
                component: () => import(/* webpackChunkName: "actionLog" */ '@/view/system/log/actionLog.vue')
            },
            {
                path:'/crm/system/report',
                name:'report',
                component: () => import(/* webpackChunkName: "report" */ '@/view/system/report.vue')
            },
            {           
                path:'/crm/systemUtils/formGenerator',
                name:'formGenerator',
                component: () => import(/* webpackChunkName: "formGenerator" */ '@/view/systemUtils/formGenerator.vue')
            },
            {           
                path:'/crm/systemUtils/structureConfig',
                name:'structureConfig',
                component: () => import(/* webpackChunkName: "structureConfig" */ '@/view/systemUtils/structureConfig.vue')
            }
        ]
    }
]