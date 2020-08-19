
    import request from '@/utils/require.js'

    import store from '@/store'                            //从后台返回接口里面取
    let ENV_URL = store.state.serverApi.filter(e => e.code === "IP")[0].url;
    // const ENV_URL = process.env.IP_URL;
    export const IP_getPrefectureLinkData = (data) =>
        request({  //获取表格数据
            url:ENV_URL+'/gameZone/getGameZoneList',
            method:'post',
            data
        })

    export const IP_PrefectureLinkAdd = (data) =>
        request({   //新增
            url:ENV_URL+'/gameZone/insertGameZone',
            method:'post',
            data
        })
    
    export const IP_PrefectureLinkEdit = (data) =>
        request({   //修改
            url:ENV_URL+'/gameZone/updateGameZone',
            method:'post',
            data
        })


    export const IP_PrefectureLinkDelete = (data) =>
        request({    //删除
            url:`${ENV_URL}/gameZone/deleteGameZone`,
            method:'post',
            data
        })

    export const IP_GetZoneDept = (data) =>
        request({    //获取部门的专区的权限
            url:`${ENV_URL}/deptPermission/getZoneDeptIds`,
            method:'post',
            data
        })
        
    export const IP_InsertDeptZone = (data) =>
        request({    //插入拥有专区的部门权限
            url:`${ENV_URL}/deptPermission/insertDeptZone`,
            method:'post',
            data
        })

    