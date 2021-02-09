import request from 'common/utils/require.js'



export const  PA_getDeptData= (data) =>
    request({
        url:'/dept/list',
        method:'post',
        data
    })

export const  PA_updateUserData= (data) =>
    request({  //密码修改
        url:'/profile/updateUser',
        method:'post',
        data
    })

export const  PA_updatePwd= (data) =>
    request({  //密码修改
        url:'/profile/updatePwd',
        method:'post',
        data
    })