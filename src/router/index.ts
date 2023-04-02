export {};

const Router = require('koa-router');

const router = new Router();

const userRoute = require('./system/user.route');
const roleRoute = require('./system/role.route');
const externalRoute = require('./admin/external.route');
const demoRoute = require('./demo');

router.use(userRoute.routes(), userRoute.allowedMethods());
router.use(roleRoute.routes(), roleRoute.allowedMethods());
router.use(demoRoute.routes(), demoRoute.allowedMethods());
router.use(externalRoute.routes(), externalRoute.allowedMethods());
module.exports = router;
