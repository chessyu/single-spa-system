
import request from '@/utils/require.js'

const ENV_URL = process.env.ABP_URL;
export const PA_getMenuList = (data) =>
    request({   //数据列表
        url:ENV_URL + '/menu/list',
        method:'post',
        data
    })

export const PA_postMenuAdd = (data) =>
    request({   //新增
        url:ENV_URL +'/menu/insert',
        method:'post',
        data
    })

export const PA_postMenuEdit = (data) =>
    request({   //修改
        url:ENV_URL +'/menu/update',
        method:'post',
        data
    })

export const PA_postMenuDelete = (data) =>
    request({   //删除
        url:ENV_URL +'/menu/delete',
        method:'post',
        data
    })





