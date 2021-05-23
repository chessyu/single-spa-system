const Router = require("koa-router")
const roleController = require("../controller/roleController")


const router = new Router()

/**获取所有用户数据 */
router.post("/role/list",roleController.getRoleData);


module.exports = router;
