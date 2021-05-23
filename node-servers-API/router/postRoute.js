const Router = require("koa-router")
const postController = require("../controller/postController")


const router = new Router()

/**获取所有用户数据 */
router.post("/post/list",postController.getPostData);


module.exports = router;
