const CRM_menu = [
    {
        menu_id : 1,
        menu_code :'system',
        title:'系统管理',
        parent_id : 0,
        status:1,
        path:'',
        component:'system',
        icon:'md-cog',
        permissions:'',
        children:[
            {
                menu_id : 2,
                menu_code :'menu',
                title:'菜单管理',
                parent_id : 1,
                status:1,
                path:'/s_crm/menu',
                component:'s_crm_menu',
                icon:'',
                permissions:'',
                children:[],
                create_time :'2021-01-30',
                create_user : '系统管理员',
                update_time :'',
                update_user : ''
            },
            {
                menu_id : 2,
                menu_code :'permissions',
                title:'权限管理',
                parent_id : 1,
                status:1,
                path:'/s_crm/permissions',
                component:'s_crm_permissions',
                icon:'',
                permissions:'',
                children:[],
                create_time :'2021-01-30',
                create_user : '系统管理员',
                update_time :'',
                update_user : ''
            },
            {
                menu_id : 2,
                menu_code :'dict',
                title:'数据字典',
                parent_id : 1,
                status:1,
                path:'/s_crm/dict',
                component:'s_crm_dict',
                icon:'',
                permissions:'',
                children:[],
                create_time :'2021-01-30',
                create_user : '系统管理员',
                update_time :'',
                update_user : ''
            },
            {
                menu_id : 3,
                menu_code :'post',
                title:'职位管理',
                parent_id : 1,
                status:1,
                path:'/s_crm/post',
                component:'s_crm_post',
                icon:'',
                permissions:'',
                children:[],
                create_time :'2021-01-30',
                create_user : '系统管理员',
                update_time :'',
                update_user : ''
            },
            {
                menu_id : 4,
                menu_code :'role',
                title:'角色管理',
                parent_id : 1,
                status:1,
                path:'/s_crm/role',
                component:'s_crm_role',
                icon:'',
                permissions:'',
                children:[],
                create_time :'2021-01-30',
                create_user : '系统管理员',
                update_time :'',
                update_user : ''
            },
        ],
        create_time :'2021-01-30',
        create_user : '系统管理员',
        update_time :'',
        update_user : ''
    },
    
]

const ORM_menu = [
    {
        menu_id : 1,
        menu_code :'system',
        title:'系统管理',
        parent_id : 0,
        status:1,
        path:'',
        component:'system',
        icon:'',
        permissions:'',
        children:[],
        create_time :'2021-01-30',
        create_user : '系统管理员',
        update_time :'',
        update_user : ''
    },
    {
        menu_id : 2,
        menu_code :'menu',
        title:'菜单管理',
        parent_id : 1,
        status:1,
        path:'/s_crm/menu',
        component:'s_crm_menu',
        icon:'',
        permissions:'',
        children:[
            {
                menu_id : 2,
                menu_code :'permissions',
                title:'权限管理',
                parent_id : 1,
                status:1,
                path:'/s_crm/permissions',
                component:'s_crm_permissions',
                icon:'',
                permissions:'',
                children:[],
                create_time :'2021-01-30',
                create_user : '系统管理员',
                update_time :'',
                update_user : ''
            },
            {
                menu_id : 2,
                menu_code :'dict',
                title:'权限管理',
                parent_id : 1,
                status:1,
                path:'/s_crm/dict',
                component:'s_crm_dict',
                icon:'',
                permissions:'',
                children:[],
                create_time :'2021-01-30',
                create_user : '系统管理员',
                update_time :'',
                update_user : ''
            },
            {
                menu_id : 3,
                menu_code :'post',
                title:'职位管理',
                parent_id : 1,
                status:1,
                path:'/s_crm/post',
                component:'s_crm_post',
                icon:'',
                permissions:'',
                children:[],
                create_time :'2021-01-30',
                create_user : '系统管理员',
                update_time :'',
                update_user : ''
            },
            {
                menu_id : 4,
                menu_code :'role',
                title:'角色管理',
                parent_id : 1,
                status:1,
                path:'/s_crm/role',
                component:'s_crm_role',
                icon:'',
                permissions:'',
                children:[],
                create_time :'2021-01-30',
                create_user : '系统管理员',
                update_time :'',
                update_user : ''
            },
        ],
        create_time :'2021-01-30',
        create_user : '系统管理员',
        update_time :'',
        update_user : ''
    },
    
]


module.exports = {
    CRMMENU:CRM_menu,
    ORMMENU:ORM_menu
}