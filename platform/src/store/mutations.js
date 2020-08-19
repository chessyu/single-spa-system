//修改router配置项
export const editRouterConfig =  function(state, info){
    state.routers = info;
}

//账号注销
export const loginOut = function(){
    
}

// 修改系统配置数据
export const setSysConfig = function(state, info){
    state.sysConfig = info;
}

//刷新layout已开标签参数
export const setLayoutTag = (state,info) => {
    state.layoutTag = info
}

//修改当前登录人的个人数据
export const setUserData = (state,info) => {
    state.userData = info;
}

//修改当前登录人的按钮权限数据
export const setUserButtomPower = (state,info) => {
    state.buttomPower = info;
}

//修改当前视口宽高
export const setViewPort = (state,info) => {
    state.viewport = info;
}

//修改缓存数据
export const setCacheData = (state,info) => {
    Object.assign(state.cache, info);
}

//修改服务端请求API接口地址
export const setServerApi = (state,info) => {
    state.serverApi = info;
}



