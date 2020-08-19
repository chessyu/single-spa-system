import request from '@/utils/require.js'


const ENV_URL = process.env.ABP_URL;

export const PA_getMenuList = (data) =>
    request({
        url:ENV_URL + '/getRouters',
        method:'get',
        params:data
    })

export const PA_getChildrenModel = (data) =>
    request({
        url:ENV_URL + '/getProjects',
        method:'post',
        data
    })


