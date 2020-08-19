import request from '@/utils/require.js'


const ENV_URL = process.env.ABP_URL;
export const  PA_getDictData= (data) =>
    request({   //获取字典数据
        url:ENV_URL +'/dict/type/list',
        method:'post',
        data
    })

export const PA_postDictAdd = (data) =>
    request({   //新增数据
        url:ENV_URL +'/dict/type/insert',
        method:'post',
        data
    })

export const PA_postDictEdit = (data) =>
    request({   //修改字典数据
        url:ENV_URL +'/dict/type/update',
        method:'post',
        data
    })

export const PA_postDictDelete = (data) =>
    request({
        url:ENV_URL +'/dict/type/delete',
        method:'post',
        data
    })