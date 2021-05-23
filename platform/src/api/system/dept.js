import request from 'common/utils/require.js'


export const  PFS_getDeptData= (data) =>
    request({
        url:'/dept/list',
        method:'post',
        data
    })
export const PFS_postDeptAdd = (data) =>
    request({ //新增
        url:'/dept/insert',
        method:'post',
        data
    })
export const PFS_postDeptEdit = (data) =>
    request({  //修改
        url:'/dept/update',
        method:'post',
        data
    })

export const PFS_deleteDept = (data) =>
    request({ //删除
        url:`/dept/delete`,
        method:'post',
        data
    })