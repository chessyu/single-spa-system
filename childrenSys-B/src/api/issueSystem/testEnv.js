
    import request from '@/utils/require.js'


    export const IP_getTestEnvData = (data) =>
        request({  //获取表格数据
            url:'/debugSn/getDebugSnList',
            method:'post',
            data
        })

    export const IP_TestEnvAdd = (data) =>
        request({   //新增
            url:'/debugSn/insertDebugSn',
            method:'post',
            data
        })
    
    export const IP_TestEnvEdit = (data) =>
        request({   //修改
            url:'/debugSn/updateDebugSn',
            method:'post',
            data
        })


    export const IP_TestEnvDelete = (data) =>
        request({    //删除
            url:`/debugSn/deleteDebugSn`,
            method:'post',
            data
        })

    