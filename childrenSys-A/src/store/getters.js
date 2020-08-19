//获取当前登录人的数据
export const getUserData = (state,getters) => { return state.userData }

//获取当前登录人的所有按钮权限
export const getUserButtomPower = (state,getters) =>{ return state.buttomPower }


//获取当前视口宽高
export const getViewPort = (state,getters) => { return state.viewport }