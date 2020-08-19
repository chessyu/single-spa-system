import request from '@/utils/require.js'


const ENV_URL = process.env.ABP_URL;
export const getMenuList = (data) =>
    request({
        url:ENV_URL + '/getRouters',
        method:'get',
        params:data

    })