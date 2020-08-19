import request from '@/utils/require.js'


const ENV_URL = process.env.ABP_URL;
export const  PA_getRoleData= (data) =>
    request({  //数据列表
        url:ENV_URL +'/role/list',
        method:'post',
        data
    })

export const PA_postRoleAdd = (data) =>
    request({   //新增
        url:ENV_URL +'/role/insert', 
        method:'post',
        data
    })

export const PA_postRoleEdit = (data) =>
    request({   //修改
        url:ENV_URL +'/role/update',
        method:'post',
        data
    })

export const PA_postRoleDelete = (data) =>
    request({   //删除
        url:ENV_URL +'/role/delete',
        method:'post',
        data
    })


export const PA_getMenuList = (data) =>
    request({   //菜单数据列表
        url:ENV_URL +'/menu/list',
        method:'post',
        data
    })

export const  PA_getDeptData= (data) =>
    request({   //部门数据列表
        url:ENV_URL +'/dept/list',
        method:'post',
        data
    })

export const PA_postRoleScope = (data) =>
    request({   //分配数据权限
        url:ENV_URL +'/role/dataScope',
        method:'post',
        data
    })

export const PA_getMenuRoles = (data) =>
    request({
        url:ENV_URL +'/menu/roleMenuTreeSelect',
        method:'post',
        data
    })

export const PA_getDeptRoles = (data) =>
    request({
        url:ENV_URL +'/dept/roleDeptTreeSelect',
        method:'post',
        data
    })