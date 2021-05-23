const Router = require('koa-router')
const loginRoute = require('./loginRoute');
const layoutRoute = require('./layoutRoute');
const businessRoute = require('./business');
const menuRoute = require('./menu');
const dictRoute = require('./dictRoute')
const postRoute = require('./postRoute')
const roleRoute = require('./roleRoute')

let router = new Router();
router.use(loginRoute.routes())
router.use(layoutRoute.routes())
router.use(businessRoute.routes())
router.use(menuRoute.routes())
router.use(dictRoute.routes())
router.use(postRoute.routes())
router.use(roleRoute.routes())

module.exports = router;