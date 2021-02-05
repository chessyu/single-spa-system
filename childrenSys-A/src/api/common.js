import request from '@/utils/require.js'


export const IP_getCascadeSelect = (data) =>
    request({    //取下级列表
        url:`/report/lookupData/${ data.lookup}`,
        method:'post',
        data
    })

export const IP_GetChatType = (data) =>
    request({    //获取游戏聊天频道
        url:`/report/lookupData/chatType`,
        method:'post',
        data
    })
export const IP_GetAreaList = (data) =>
    request({    //获取区服列表
        url:`/report/lookupData/area`,
        method:'post',
        data
    })
export const  PA_getDeptData= (data) =>
    request({   //部门数据列表
        url:'/dept/list',
        method:'post',
        data
    })