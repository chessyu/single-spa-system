import request from 'common/utils/require.js'


export const  PA_getDictData= (data) =>
    request({   //获取字典数据
        url:'/dict/data/list',
        method:'post',
        data
    })

export const  PA_getDictDataList= (data) =>
    request({   //获取字典类型的数据
        url:'/dict/type/all',
        method:'post',
        data
    })

export const PA_postDictAdd = (data) =>
    request({   //新增数据
        url:'/dict/data/insert',
        method:'post',
        data
    })

export const PA_postDictEdit = (data) =>
    request({   //修改字典数据
        url:'/dict/data/update',
        method:'post',
        data
    })

export const PA_postDictDelete = (data) =>
    request({
        url:'/dict/data/delete',
        method:'post',
        data
    })