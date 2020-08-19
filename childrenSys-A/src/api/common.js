import request from '@/utils/require.js'


import store from '@/store'                            //从后台返回接口里面取
let OAP_URL = store.state.serverApi.filter(e => e.code === "OAP")[0].url;
let ABP_URL = store.state.serverApi.filter(e => e.code === "ABP")[0].url;

// const OAP_URL = process.env.OAP_URL;
// const ABP_URL = process.env.ABP_URL;
export const IP_getCascadeSelect = (data) =>
    request({    //取下级列表
        url:`${OAP_URL}/report/lookupData/${ data.lookup}`,
        method:'post',
        data
    })

export const IP_GetChatType = (data) =>
    request({    //获取游戏聊天频道
        url:`${OAP_URL}/report/lookupData/chatType`,
        method:'post',
        data
    })
export const IP_GetAreaList = (data) =>
    request({    //获取区服列表
        url:`${OAP_URL}/report/lookupData/area`,
        method:'post',
        data
    })
export const  PA_getDeptData= (data) =>
    request({   //部门数据列表
        url:ABP_URL +'/dept/list',
        method:'post',
        data
    })