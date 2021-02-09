import request from 'common/utils/require.js'


export const  PA_getPostData= (data) =>
    request({    //取列表数据
        url:'/post/list',
        method:'post',
        data
    })

export const PA_postAdd = (data) =>
    request({    //新增数据
        url:'/post/insert',
        method:'post',
        data
    })

export const PA_postEdit = (data) =>
    request({    //修改数据
        url:'/post/update',
        method:'post',
        data
    })

export const PA_postDelete = (data) =>
    request({    //删除数据
        url:`/post/delete`,
        method:'post',
        data
    })