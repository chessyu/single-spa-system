import request from '@/utils/require.js'


const ENV_URL = process.env.ABP_URL;
export const PA_getOrganizational = (data) =>
    request({  //取组织架构数据
        url:ENV_URL +'/dept/treeSelect',
        method:'post',
        data
    })

export const PA_getUserList = (data) =>
    request({  //获取组织下的所有用户
        url:ENV_URL +'/user/list',
        method:'post',
        data
    })

export const PA_postUserListAdd = (data) =>
    request({  //新增用户
        url:ENV_URL +'/user/insert',
        method:'post',
        data
    })

export const PA_postUserListEdit = (data) =>
    request({  //修改用户数据 
        url:ENV_URL +'/user/update',
        method:'post',
        data
    })

export const PA_postUserListDelete = (data) =>
    request({  //删除用户
        url:ENV_URL +'/user/delete',
        method:'post',
        data
    })

export const PA_resetUserPassword = (data) =>
    request({  //重置用户密码 
        url:ENV_URL +'/user/resetPwd',
        method:'post',
        data
    })

export const  PA_getPostData= (data) =>
    request({    //取岗位列表数据
        url:ENV_URL +'/report/lookupData/post',
        method:'post',
        data
    })

export const  PA_getRoleData= (data) =>
    request({  //获取角色数据
        url:ENV_URL +'/report/lookupData/role',
        method:'post',
        data
    })
    
export const  PA_getRoleDetailData= (data) =>
    request({  //获取用户的一条数据
        url:ENV_URL +'/user/info',
        method:'post',
        data
    })


