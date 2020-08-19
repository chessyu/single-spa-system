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
