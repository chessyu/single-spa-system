
    import request from '@/utils/require.js'

    import store from '@/store'                            //从后台返回接口里面取
    let ENV_URL = store.state.serverApi.filter(e => e.code === "IP")[0].url;
    // const ENV_URL = process.env.IP_URL;

    export const IP_getPayOrderData = (data) =>
        request({  //获取表格数据
            url:ENV_URL+'/payOrder/getPayOrderList',
            method:'post',
            data
        })

    export const IP_PayOrderAdd = (data) =>
        request({   //新增
            url:ENV_URL+'/url',
            method:'post',
            data
        })
    
    export const IP_PayOrderEdit = (data) =>
        request({   //修改
            url:ENV_URL+'/url',
            method:'post',
            data
        })


    export const IP_PayOrderDelete = (data) =>
        request({    //删除
            url:`${ENV_URL}/url/`,
            method:'post',
            data
        })

    export const IP_PayOrderAgainDelivery = (data) =>
        request({   //重新发货
            url:ENV_URL+'/payOrder/againDelivery',
            method:'post',
            data
        })
    
