import request from '../utils/require.js'




export const PA_getVerCodeImg = (data) =>
    request({  //获取验证码
        url:'/getCaptcha',
        method:'get',
        data
    })
export const PA_login = (data) => 
    request({  //登录接口
        url:'/login',
        method:'post',
        data
    })

export const PA_getUserdata = (data) =>
    request({  //获取个人数据
        url:'/getInfo',
        method:'post',
        data
    })

export const PA_getCacheModel = (data) =>
    request({  //获取需要缓存的字段code
        url:'/report/getCacheKey',
        method:'post',
        data
    })

export const PA_getCacheData = (data) =>
    request({  //根据字段code取到对应的数据
        url:'/report/lookupData/'+ data,
        method:'post'
    })