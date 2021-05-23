const DICT = [
    {
        id:1,
        dictCode:"sex",
        mark:'性别',
        status:true,
        data:[
            {
               key:'男',
               value:1
            },
            {
                key:'女',
                value:0
            }
        ],
        create_time :'2021-01-30',
        create_user : '系统管理员'   
    },
    {
        id:2,
        dictCode:"play",
        mark:'支付方式',
        status:true,
        data:[
            {
                key:'银联',
                value:1
            },
            {
               key:'微信支付',
               value:1
            },
            {
                key:'支付宝',
                value:0
            }
        ],
        create_time :'2021-01-30',
        create_user : '系统管理员'   
    },
    {
        id:3,
        dictCode:"status",
        mark:'是否有效',
        status:true,
        data:[
            {
                key:'有效',
                value:1
            },
            {
               key:'无效',
               value:0
            },
            
        ],
        create_time :'2021-01-30',
        create_user : '系统管理员'   
    },
    {
        id:4,
        dictCode:"cooperation",
        mark:'合作方式',
        status:true,
        data:[
            {
                key:'直营店',
                value:1
            },
            {
               key:'加盟店',
               value:0
            },
            
        ],
        create_time :'2021-01-30',
        create_user : '系统管理员'   
    }
]

module.exports = {
    DICT
}