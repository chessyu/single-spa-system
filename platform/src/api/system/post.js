import request from '@/utils/require.js'


const ENV_URL = process.env.ABP_URL;
export const  PA_getPostData= (data) =>
    request({    //取列表数据
        url:ENV_URL +'/post/list',
        method:'post',
        data
    })

export const PA_postAdd = (data) =>
    request({    //新增数据
        url:ENV_URL +'/post/insert',
        method:'post',
        data
    })

export const PA_postEdit = (data) =>
    request({    //修改数据
        url:ENV_URL +'/post/update',
        method:'post',
        data
    })

export const PA_postDelete = (data) =>
    request({    //删除数据
        url:`${ENV_URL }/post/delete`,
        method:'post',
        data
    })