// 获取路由配置数据
export const getRoutersConfig = function(state,getters){
    return state.routers;
}

// 获取系统全局配置数据
export const getSysConfig = function(state,getters){
    return state.sysConfig;
}

//获取layout已开标签数据
export const getLayoutTag = (state,getters) => {return state.layoutTag}

//获取当前登录人的数据
export const getUserData = (state,getters) => { return state.userData }

//获取当前登录人的所有按钮权限
export const getUserButtomPower = (state,getters) =>{ return state.buttomPower }

//获取当前视口宽高
export const getViewPort = (state,getters) => { return state.viewport }

//获取缓存数据
export const getCacheData = (state,getters) => { return state.cache }

//获取服务端接口地址
export const getServerApi = (state,getters) => { return state.serverApi }


