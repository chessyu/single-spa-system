import request from '@/utils/require.js'


const ENV_URL = process.env.ABP_URL;
export const  PA_getActionLogData= (data) =>
    request({  //数据列表
        url:ENV_URL +'/monitor/operlog/list',
        method:'post',
        data
    })

