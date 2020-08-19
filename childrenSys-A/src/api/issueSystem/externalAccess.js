
    import request from '@/utils/require.js'

    import store from '@/store'                            //从后台返回接口里面取
    let ENV_URL = store.state.serverApi.filter(e => e.code === "IP")[0].url;
    // const ENV_URL = process.env.IP_URL;
    export const IP_getExternalAccessData = (data) =>
        request({  //获取表格数据
            url:ENV_URL+'/gameTs/getGameTsList',
            method:'post',
            data
        })

    export const IP_ExternalAccessAdd = (data) =>
        request({   //新增
            url:ENV_URL+'/gameTs/insertGameTs',
            method:'post',
            data
        })
    
    export const IP_ExternalAccessEdit = (data) =>
        request({   //修改
            url:ENV_URL+'/gameTs/updateGameTs',
            method:'post',
            data
        })


    export const IP_ExternalAccessDelete = (data) =>
        request({    //删除
            url:`${ENV_URL}/gameTs/deleteGameTs`,
            method:'post',
            data
        })

    