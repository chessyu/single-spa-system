
    import request from '@/utils/require.js'

    import store from '@/store'                            //从后台返回接口里面取
    let ENV_URL = store.state.serverApi.filter(e => e.code === "IP")[0].url;
    // const ENV_URL = process.env.IP_URL;
    export const IP_getTestEnvData = (data) =>
        request({  //获取表格数据
            url:ENV_URL+'/debugSn/getDebugSnList',
            method:'post',
            data
        })

    export const IP_TestEnvAdd = (data) =>
        request({   //新增
            url:ENV_URL+'/debugSn/insertDebugSn',
            method:'post',
            data
        })
    
    export const IP_TestEnvEdit = (data) =>
        request({   //修改
            url:ENV_URL+'/debugSn/updateDebugSn',
            method:'post',
            data
        })


    export const IP_TestEnvDelete = (data) =>
        request({    //删除
            url:`${ENV_URL}/debugSn/deleteDebugSn`,
            method:'post',
            data
        })

    