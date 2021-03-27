

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
        component:() => import(/* webpackChunkName: "login" */ '../../../commonModules/login/login.vue')
    },
    {
        path:'/layout:isMainFrame',
        name:'layout',
        redirect:'/CRM/index',
        props:{isMainFrame : true},
        component:() => import(/* webpackChunkName: "layout" */ '../../../commonModules/layout/layout.vue'),
        children:[
            {
                path:'/CRM/index',
                name:'index',
                component:() => import(/* webpackChunkName: "home" */ '@/view/home/home.vue')
            },
            {
                path:'/CRM/system/user',
                name:'CRM_system_user',
                component: () => import(/* webpackChunkName: "user" */ '@/view/A/a1.vue')
            },
            {
                path:'/CRM/system/role',
                name:'CRM_system_role',
                component: () => import(/* webpackChunkName: "role" */ '@/view/A/a2.vue')
            },
            {
                path:'/CRM/system/menu',
                name:'CRM_system_menu',
                component: () => import(/* webpackChunkName: "menu" */ '@/view/A/a3.vue')
            },
            {
                path:'/CRM/system/dict',
                name:'CRM_system_dict',
                component: () => import(/* webpackChunkName: "dict" */ '@/view/A/a4.vue')
            },
            {
                path:'/CRM/system/dictData',
                name:'CRM_system_dictData',
                component: () => import(/* webpackChunkName: "dictData" */ '@/view/A/a5.vue')
            },
            {
                path:'/CRM/system/dept',
                name:'CRM_system_dept',
                component: () => import(/* webpackChunkName: "dept" */ '@/view/A/a6.vue')
            },
            {
                path:'/CRM/system/post',
                name:'CRM_system_post',
                component: () => import(/* webpackChunkName: "post" */ '@/view/A/a7.vue')
            },
            {
                path:'/CRM/system/userCenter',
                name:'userCenter',
                component: () => import(/* webpackChunkName: "userCenter" */ '@/component/userCenter/userCenter.vue')
            },
            {
                path:'/CRM/system/report',
                name:'CRM_system_report',
                component: () => import(/* webpackChunkName: "report" */ '@/view/A/a8.vue')
            },
            {           
                path:'/CRM/systemUtils/formGenerator',
                name:'formGenerator',
                component: () => import(/* webpackChunkName: "formGenerator" */ '@/view/A/a9.vue')
            },
            {           
                path:'/CRM/systemUtils/structureConfig',
                name:'structureConfig',
                component: () => import(/* webpackChunkName: "structureConfig" */ '@/view/A/a10.vue')
            }
        ]
    },
    {
        path:"/bigScreen",
        name:"bigScreen",
        component:()=> import(/* webpackChunkName: "bigScreen" */ '@/view/A/a9.vue')
    }
]