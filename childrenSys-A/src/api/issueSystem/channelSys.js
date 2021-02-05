
    import request from '@/utils/require.js'

  
    export const IP_getChannelSysData = (data) =>
        request({  //获取表格数据
            url:'/sn/getSnList',
            method:'post',
            data
        })

    export const IP_ChannelSysAdd = (data) =>
        request({   //新增
            url:'/sn/insertSn',
            method:'post',
            data
        })
    
    export const IP_ChannelSysEdit = (data) =>
        request({   //修改
            url:'/sn/updateSn',
            method:'post',
            data
        })


    export const IP_ChannelSysDelete = (data) =>
        request({    //删除
            url:`/sn/deleteSn`,
            method:'post',
            data
        })


    export const IP_GetGameDept = (data) =>
        request({    //获取部门的游戏的权限
            url:`/deptPermission/getSnDeptIds`,
            method:'post',
            data
        })
        
    export const IP_InsertDeptGame = (data) =>
        request({    //插入拥有某游戏的部门的权限
            url:`/deptPermission/insertDeptSn`,
            method:'post',
            data
        })
    