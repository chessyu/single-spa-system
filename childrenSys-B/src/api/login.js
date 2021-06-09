import request from '@/utils/require.js'



export const CCP_getVerCodeImg = (data) =>
    request({  //获取验证码
        url:'/captchaImage',
        method:'get',
        data
    })
export const CCP_login = (data) => 
    request({  //登录接口
        url:'/login',
        method:'post',
        data
    })

export const CCP_getUserdata = (data) =>
    request({  //获取个人数据
        url:'/getInfo',
        method:'get',
        data
    })