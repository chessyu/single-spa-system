const Router = require('koa-router')
const loginRoute = require('./loginRoute');
const layoutRoute = require('./layoutRoute');
const businessRoute = require('./business')

let router = new Router();
router.use(loginRoute.routes())
router.use(layoutRoute.routes())
router.use(businessRoute.routes())

module.exports = router;