import request from 'common/utils/require.js'


export const  PA_getActionLogData= (data) =>
    request({  //数据列表
        url:'/monitor/operlog/list',
        method:'post',
        data
    })

