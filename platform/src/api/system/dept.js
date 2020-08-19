import request from '@/utils/require.js'


const ENV_URL = process.env.ABP_URL;
export const  PA_getDeptData= (data) =>
    request({
        url:ENV_URL +'/dept/list',
        method:'post',
        data
    })
export const PA_postDeptAdd = (data) =>
    request({ //新增
        url:ENV_URL +'/dept/insert',
        method:'post',
        data
    })
export const PA_postDeptEdit = (data) =>
    request({  //修改
        url:ENV_URL +'/dept/update',
        method:'post',
        data
    })

export const PA_deleteDept = (data) =>
    request({ //删除
        url:`${ENV_URL}/dept/delete`,
        method:'post',
        data
    })