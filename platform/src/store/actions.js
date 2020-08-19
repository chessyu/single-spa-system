//异步提交平台路由配置
export const editRouterConfig =  function(context,data){
    context.commit('editRouterConfig',data)
}

// 提交系统配置数据
export const setSysConfig = function(context,data){
    context.commit('setSysConfig',data)
}

//修改当前登录人的个人数据
export const setUserData = (context,data) => {
    context.commit('setUserData',data)
}

//修改当前登录人的按钮权限数据
export const setUserButtomPower = (context,data) => {
    context.commit('setUserButtomPower',data)
}

//修改当前视口宽高
export const setViewPort = (context,data) => {
    context.commit('setViewPort',data)
}

//修改缓存数据
export const setCacheData = (context,data) => {
    context.commit('setCacheData',data)
}

//修改服务端API接口地址
export const setServerApi = (context,data) => {
    context.commit('setServerApi',data)
}




