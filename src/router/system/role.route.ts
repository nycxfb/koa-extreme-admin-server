export {};

const KoaRouter = require('koa-router');

const { auth } = require('../../middleware/auth.middleware');

const { findAllRoleController } = require('../../controller/system/role.controller');

const route = new KoaRouter({ prefix: '/system/role' });

route.post('/list', auth, findAllRoleController);

module.exports = route;
