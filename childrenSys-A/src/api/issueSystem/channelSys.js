
    import request from '@/utils/require.js'

    import store from '@/store'                            //从后台返回接口里面取
    let ENV_URL = store.state.serverApi.filter(e => e.code === "IP")[0].url;
    // const ENV_URL = process.env.IP_URL;
    export const IP_getChannelSysData = (data) =>
        request({  //获取表格数据
            url:ENV_URL+'/sn/getSnList',
            method:'post',
            data
        })

    export const IP_ChannelSysAdd = (data) =>
        request({   //新增
            url:ENV_URL+'/sn/insertSn',
            method:'post',
            data
        })
    
    export const IP_ChannelSysEdit = (data) =>
        request({   //修改
            url:ENV_URL+'/sn/updateSn',
            method:'post',
            data
        })


    export const IP_ChannelSysDelete = (data) =>
        request({    //删除
            url:`${ENV_URL}/sn/deleteSn`,
            method:'post',
            data
        })


    export const IP_GetGameDept = (data) =>
        request({    //获取部门的游戏的权限
            url:`${ENV_URL}/deptPermission/getSnDeptIds`,
            method:'post',
            data
        })
        
    export const IP_InsertDeptGame = (data) =>
        request({    //插入拥有某游戏的部门的权限
            url:`${ENV_URL}/deptPermission/insertDeptSn`,
            method:'post',
            data
        })
    