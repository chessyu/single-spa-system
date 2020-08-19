
    import request from '@/utils/require.js'

    import store from '@/store'                            //从后台返回接口里面取
    let ENV_URL = store.state.serverApi.filter(e => e.code === "IP")[0].url;

    // const ENV_URL = process.env.IP_URL;
    export const IP_getGameSysData = (data) =>
        request({  //获取表格数据
            url:ENV_URL+ '/game/getGameList',
            method:'post',
            data
        })

    export const IP_GameSysAdd = (data) =>
        request({   //新增数据
            url:ENV_URL+'/game/insertGame',
            method:'post',
            data
        })
    
    export const IP_GameSysEdit = (data) =>
        request({   //修改数据
            url:ENV_URL+'/game/updateGame',
            method:'post',
            data
        })


    export const IP_GameSysDelete = (data) =>
        request({     //删除
            url:`${ENV_URL}/game/deleteGame`,
            method:'post',
            data
        })

    export const IP_GetGameDept = (data) =>
        request({    //获取部门的游戏的权限
            url:`${ENV_URL}/deptPermission/getGameDeptIds`,
            method:'post',
            data
        })
        
    export const IP_InsertDeptGame = (data) =>
        request({    //插入拥有某游戏的部门的权限
            url:`${ENV_URL}/deptPermission/insertDeptGame`,
            method:'post',
            data
        })