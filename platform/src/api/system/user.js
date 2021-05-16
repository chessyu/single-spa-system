import request from 'common/utils/require.js'


export const PFS_getOrganizational = (data) =>
    request({  //取组织架构数据
        url:'/dept/treeSelect',
        method:'post',
        data
    })

export const PFS_getUserList = (data) =>
    request({  //获取组织下的所有用户
        url:'/getUserInfo',
        method:'post',
        data
    })

export const PFS_postUserListAdd = (data) =>
    request({  //新增用户
        url:'/user/insert',
        method:'post',
        data
    })

export const PFS_postUserListEdit = (data) =>
    request({  //修改用户数据 
        url:'/user/update',
        method:'post',
        data
    })

export const PFS_postUserListDelete = (data) =>
    request({  //删除用户
        url:'/user/delete',
        method:'post',
        data
    })

export const PFS_resetUserPassword = (data) =>
    request({  //重置用户密码 
        url:'/user/resetPwd',
        method:'post',
        data
    })

export const  PFS_getPostData= (data) =>
    request({    //取岗位列表数据
        url:'/report/lookupData/post',
        method:'post',
        data
    })

export const  PFS_getRoleData= (data) =>
    request({  //获取角色数据
        url:'/report/lookupData/role',
        method:'post',
        data
    })
    
export const  PFS_getRoleDetailData= (data) =>
    request({  //获取用户的一条数据
        url:'/user/info',
        method:'post',
        data
    })


