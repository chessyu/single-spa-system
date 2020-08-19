import request from '@/utils/require.js'


const ENV_URL = process.env.ABP_URL;
export const CCP_getVerCodeImg = (data) =>
    request({  //获取验证码
        url:ENV_URL+'/captchaImage',
        method:'get',
        data
    })
export const CCP_login = (data) => 
    request({  //登录接口
        url:ENV_URL+'/login',
        method:'post',
        data
    })

export const CCP_getUserdata = (data) =>
    request({  //获取个人数据
        url:ENV_URL+'/getInfo',
        method:'get',
        data
    })