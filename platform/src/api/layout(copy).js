import request from '@/utils/require.js'




export const PA_getMenuList = (data) =>
    request({
        url: '/getRouters',
        method:'get',
        params:data
    })

export const PA_getChildrenModel = (data) =>
    request({
        url: '/getProjects',
        method:'post',
        data
    })


