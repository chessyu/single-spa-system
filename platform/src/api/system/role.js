import request from 'common/utils/require.js'


export const  PFS_getRoleData= (data) =>
    request({  //数据列表
        url:'/role/list',
        method:'post',
        data
    })

export const PFS_postRoleAdd = (data) =>
    request({   //新增
        url:'/role/insert', 
        method:'post',
        data
    })

export const PFS_postRoleEdit = (data) =>
    request({   //修改
        url:'/role/update',
        method:'post',
        data
    })

export const PFS_postRoleDelete = (data) =>
    request({   //删除
        url:'/role/delete',
        method:'post',
        data
    })


export const PFS_getMenuList = (data) =>
    request({   //菜单数据列表
        url:'/menu/list',
        method:'post',
        data
    })

export const  PFS_getDeptData= (data) =>
    request({   //部门数据列表
        url:'/dept/list',
        method:'post',
        data
    })

export const PFS_postRoleScope = (data) =>
    request({   //分配数据权限
        url:'/role/dataScope',
        method:'post',
        data
    })

export const PFS_getMenuRoles = (data) =>
    request({
        url:'/menu/roleMenuTreeSelect',
        method:'post',
        data
    })

export const PFS_getDeptRoles = (data) =>
    request({
        url:'/dept/roleDeptTreeSelect',
        method:'post',
        data
    })