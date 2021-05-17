const Router = require("koa-router")
const dictController = require("../controller/dictController")


const router = new Router()

/**获取所有用户数据 */
router.post("/dict/list",dictController.getDicDataControll);


module.exports = router;
