const Router = require("koa-router")
const businessController = require("../controller/businessController")


const router = new Router()

/**获取所有用户数据 */
router.post("/getUserInfo",businessController.getUserInfoControll);


module.exports = router;
