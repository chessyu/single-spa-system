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


// 提交系统配置数据
export const setSysConfig = function(context,data){
    context.commit('setSysConfig',data)
}