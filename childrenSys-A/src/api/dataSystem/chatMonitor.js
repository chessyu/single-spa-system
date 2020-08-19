
    import request from '@/utils/require.js'

    import store from '@/store'                            //从后台返回接口里面取
    let ENV_URL = store.state.serverApi.filter(e => e.code === "IP")[0].url;

    // const ENV_URL = process.env.IP_URL;
    export const IP_getChatMonitorData = (data) =>
        request({  //获取表格数据
            url:ENV_URL+'/chat/getChatList',
            method:'post',
            data
        })

    export const IP_ChatMonitorAdd = (data) =>
        request({   //新增
            url:ENV_URL+'/url',
            method:'post',
            data
        })
    
    export const IP_ChatMonitorEdit = (data) =>
        request({   //修改
            url:ENV_URL+'/url',
            method:'post',
            data
        })


    export const IP_ChatMonitorDelete = (data) =>
        request({    //删除
            url:`${ENV_URL}/url/`,
            method:'post',
            data
        })



    