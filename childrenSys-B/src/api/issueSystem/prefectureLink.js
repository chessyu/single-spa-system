
    import request from '@/utils/require.js'


    export const IP_getPrefectureLinkData = (data) =>
        request({  //获取表格数据
            url:'/gameZone/getGameZoneList',
            method:'post',
            data
        })

    export const IP_PrefectureLinkAdd = (data) =>
        request({   //新增
            url:'/gameZone/insertGameZone',
            method:'post',
            data
        })
    
    export const IP_PrefectureLinkEdit = (data) =>
        request({   //修改
            url:'/gameZone/updateGameZone',
            method:'post',
            data
        })


    export const IP_PrefectureLinkDelete = (data) =>
        request({    //删除
            url:`/gameZone/deleteGameZone`,
            method:'post',
            data
        })

    export const IP_GetZoneDept = (data) =>
        request({    //获取部门的专区的权限
            url:`/deptPermission/getZoneDeptIds`,
            method:'post',
            data
        })
        
    export const IP_InsertDeptZone = (data) =>
        request({    //插入拥有专区的部门权限
            url:`/deptPermission/insertDeptZone`,
            method:'post',
            data
        })

    