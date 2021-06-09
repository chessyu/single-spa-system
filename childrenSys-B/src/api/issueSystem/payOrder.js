
    import request from '@/utils/require.js'



    export const IP_getPayOrderData = (data) =>
        request({  //获取表格数据
            url:'/payOrder/getPayOrderList',
            method:'post',
            data
        })

    export const IP_PayOrderAdd = (data) =>
        request({   //新增
            url:'/url',
            method:'post',
            data
        })
    
    export const IP_PayOrderEdit = (data) =>
        request({   //修改
            url:'/url',
            method:'post',
            data
        })


    export const IP_PayOrderDelete = (data) =>
        request({    //删除
            url:`/url/`,
            method:'post',
            data
        })

    export const IP_PayOrderAgainDelivery = (data) =>
        request({   //重新发货
            url:'/payOrder/againDelivery',
            method:'post',
            data
        })
    
