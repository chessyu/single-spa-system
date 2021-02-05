
    import request from '@/utils/require.js'


    export const IP_getGameSysData = (data) =>
        request({  //获取表格数据
            url: '/game/getGameList',
            method:'post',
            data
        })

    export const IP_GameSysAdd = (data) =>
        request({   //新增数据
            url:'/game/insertGame',
            method:'post',
            data
        })
    
    export const IP_GameSysEdit = (data) =>
        request({   //修改数据
            url:'/game/updateGame',
            method:'post',
            data
        })


    export const IP_GameSysDelete = (data) =>
        request({     //删除
            url:`/game/deleteGame`,
            method:'post',
            data
        })

    export const IP_GetGameDept = (data) =>
        request({    //获取部门的游戏的权限
            url:`/deptPermission/getGameDeptIds`,
            method:'post',
            data
        })
        
    export const IP_InsertDeptGame = (data) =>
        request({    //插入拥有某游戏的部门的权限
            url:`/deptPermission/insertDeptGame`,
            method:'post',
            data
        })