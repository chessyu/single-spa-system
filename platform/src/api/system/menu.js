
import request from 'common/utils/require.js'

export const PA_getMenuList = (data) =>
    request({   //数据列表
        url: '/menu/list',
        method:'post',
        data
    })

export const PA_postMenuAdd = (data) =>
    request({   //新增
        url:'/menu/insert',
        method:'post',
        data
    })

export const PA_postMenuEdit = (data) =>
    request({   //修改
        url:'/menu/update',
        method:'post',
        data
    })

export const PA_postMenuDelete = (data) =>
    request({   //删除
        url:'/menu/delete',
        method:'post',
        data
    })





