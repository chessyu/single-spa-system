import request from '@/utils/require.js'



export const getMenuList = (data) =>
    request({
        url:  '/getRouters',
        method:'get',
        params:data

    })