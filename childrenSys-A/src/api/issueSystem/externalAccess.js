
    import request from '@/utils/require.js'


    export const IP_getExternalAccessData = (data) =>
        request({  //获取表格数据
            url:'/gameTs/getGameTsList',
            method:'post',
            data
        })

    export const IP_ExternalAccessAdd = (data) =>
        request({   //新增
            url:'/gameTs/insertGameTs',
            method:'post',
            data
        })
    
    export const IP_ExternalAccessEdit = (data) =>
        request({   //修改
            url:'/gameTs/updateGameTs',
            method:'post',
            data
        })


    export const IP_ExternalAccessDelete = (data) =>
        request({    //删除
            url:`/gameTs/deleteGameTs`,
            method:'post',
            data
        })

    