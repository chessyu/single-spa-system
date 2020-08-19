import request from '@/utils/require.js'

const ENV_URL = process.env.ABP_URL;


export const  PA_getDeptData= (data) =>
    request({
        url:ENV_URL + '/dept/list',
        method:'post',
        data
    })

export const  PA_updateUserData= (data) =>
    request({  //密码修改
        url:ENV_URL + '/profile/updateUser',
        method:'post',
        data
    })

export const  PA_updatePwd= (data) =>
    request({  //密码修改
        url:ENV_URL + '/profile/updatePwd',
        method:'post',
        data
    })