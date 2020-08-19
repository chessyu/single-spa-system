const Router = require("koa-router")
const controller = require("../controller/loginController")


const router = new Router()

/**设置登录时的请求验证码 */
router.get("/getCaptcha",controller.getCaptcha)
/* 设置请求登录接口 */
router.post("/login",controller.login);
/* 请求登录后的用户信息接口 */
router.post("/getInfo",controller.userInfoData);

module.exports = router;
