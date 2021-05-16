const Router = require("koa-router")
const menuController = require("../controller/menuController")


const router = new Router()

/**获取所有用户数据 */
router.post("/menu/systemList",menuController.getSystemDataControll);
router.post("/menu/list",menuController.getmenuListControll);


module.exports = router;
