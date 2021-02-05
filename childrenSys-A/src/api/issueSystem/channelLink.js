
    import request from '@/utils/require.js'



    // const ENV_URL = process.env.IP_URL; 

    export const IP_getChannelLinkData = (data) =>
        request({  //获取表格数据
            url:'/gameSn/getGameSnList',
            method:'post',
            data
        })

    export const IP_ChannelLinkAdd = (data) =>
        request({   //新增
            url:'/gameSn/insertGameSn',
            method:'post',
            data
        })
    
    export const IP_ChannelLinkEdit = (data) =>
        request({   //修改
            url:'/gameSn/updateGameSn',
            method:'post',
            data
        })


    export const IP_ChannelLinkDelete = (data) =>
        request({    //删除
            url:`/gameSn/deleteGameSn`,
            method:'post',
            data
        })

    


    