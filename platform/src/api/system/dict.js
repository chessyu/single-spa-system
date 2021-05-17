import request from 'common/utils/require.js'


export const  PFS_getDictData= (data) =>
    request({   //获取字典数据
        url:'/dict/list',
        method:'post',
        data
    })

export const PFS_postDictAdd = (data) =>
    request({   //新增数据
        url:'/dict/type/insert',
        method:'post',
        data
    })

export const PFS_postDictEdit = (data) =>
    request({   //修改字典数据
        url:'/dict/type/update',
        method:'post',
        data
    })

export const PFS_postDictDelete = (data) =>
    request({
        url:'/dict/type/delete',
        method:'post',
        data
    })