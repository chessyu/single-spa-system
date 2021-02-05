
    import request from '@/utils/require.js'



    // const ENV_URL = process.env.IP_URL;
    export const IP_getChatMonitorData = (data) =>
        request({  //获取表格数据
            url:'/chat/getChatList',
            method:'post',
            data
        })

    export const IP_ChatMonitorAdd = (data) =>
        request({   //新增
            url:'/url',
            method:'post',
            data
        })
    
    export const IP_ChatMonitorEdit = (data) =>
        request({   //修改
            url:'/url',
            method:'post',
            data
        })


    export const IP_ChatMonitorDelete = (data) =>
        request({    //删除
            url:`/url/`,
            method:'post',
            data
        })



    