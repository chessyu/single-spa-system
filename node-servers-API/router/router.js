const Router = require('koa-router')
const loginRoute = require('./loginRoute');
const layoutRoute = require('./layoutRoute');
const businessRoute = require('./business');
const menuRoute = require('./menu');

let router = new Router();
router.use(loginRoute.routes())
router.use(layoutRoute.routes())
router.use(businessRoute.routes())
router.use(menuRoute.routes())

module.exports = router;