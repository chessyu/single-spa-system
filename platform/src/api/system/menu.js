
import request from 'common/utils/require.js'

export const PFS_getMenuList = (data) =>
    request({   //数据列表
        url: '/menu/list',
        method:'post',
        data
    })

export const PFS_getSystemList = (data) =>
    request({   //其它系统
        url:'/menu/systemList',
        method:'post',
        data
    })

export const PFS_postMenu = (data) =>
    request({   //新增
        url:'/menu/insert',
        method:'post',
        data
    })

export const PFS_postMenuEdit = (data) =>
    request({   //修改
        url:'/menu/update',
        method:'post',
        data
    })

export const PFS_postMenuDelete = (data) =>
    request({   //删除
        url:'/menu/delete',
        method:'post',
        data
    })





