const loginService = require('../service/login')

async function getCaptcha(ctx,next){
    return ctx.response.body = await loginService.getCaptcha(ctx);
}

async function login(ctx,next){
    //解构 get 参数 ctx.request.query;
    //解构 post 参数 ctx.request.body; 
    let {username,password,captcha} = ctx.request.body;

    let data = await loginService.login(username,password,captcha);
    return ctx.response.body = data;
}

/**获取用户数据 */
async function userInfoData(ctx,next){
    let data = await loginService.userInfoData();
    return ctx.response.body = data;
}

module.exports = {
    login,
    getCaptcha,
    userInfoData
}