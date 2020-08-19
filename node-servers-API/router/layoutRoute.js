const Router = require("koa-router")
const layoutController = require("../controller/layoutController")


const router = new Router()

/**获取所有权限的子系统 */
router.post("/getProjects",layoutController.getChildrenControll);

module.exports = router;
