const sqlActions = require('../lib/mysql');
const svgCaptcha = require('svg-captcha');
const  jwt = require('jsonwebtoken');


let cacheObj = {};

/**获取登录验证码 */
async function getCaptcha(ctx){
    const codeConfig = {
        size: 4, // 验证码长度
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0oO1ilI
        noise: 2, // 干扰线条的数量
        width: 105,
        height: 35,
        fontSize: 50,
        color: false, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#eee',
    };
    const captcha = svgCaptcha.create(codeConfig);
    ctx.session.captchaText = captcha.text.toLowerCase();   //下一个ctx.session 取不到
    cacheObj.captchaText = captcha.text.toLowerCase();
    return {
        msg:'获取成功',
        code:200,
        data:captcha.data
    }
}

/* 查询数据库实例 */
async function login(userName,passWord,code){
    try{
        let sql = `select * from user where userCode='${userName}' and passWord='${passWord}'`;
        return sqlActions.sqlActions(sql).then(res => {
            let obj = {};
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (30 * 60), // 过期时间
                data: 'createToken'
            }, "test token");
            if(code === cacheObj.captchaText && res.length > 0){
                cacheObj.signData = res;
                obj.msg = '登录成功';
                obj.code = 200;
                obj.data = token;
            }else{
                obj.msg = '验证码有误';
                obj.code = 400;
            }
            return obj;

        })
    }catch(error){
        return {
            msg:error.msg,
            code:400,
            data:[]
        }
    }
    
}

/**登录成功后取到个人数据 */
async function userInfoData(){
    let userData = cacheObj.signData[0];
    let sql = `select * from dept where deptId='${userData.deptId}'`;
    return sqlActions.sqlActions(sql).then(res => {
        userData.dept = res[0];
        return{
            msg : "操作成功",
            code:200,
            data:{
                user:userData,      //登录人的个人数据
                permissions:["*:*:*"]
            }
        } 
    })
}

module.exports = {
    login,
    getCaptcha,
    userInfoData
}