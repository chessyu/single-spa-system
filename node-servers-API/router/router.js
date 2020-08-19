const Router = require('koa-router')
const loginRoute = require('./loginRoute');
const layoutRoute = require('./layoutRoute');

let router = new Router();
router.use(loginRoute.routes())
router.use(layoutRoute.routes())


module.exports = router;