export {};
const { getListController } = require('../../controller/demo/index.controller');
const { auth } = require('../../middleware/auth.middleware');

const koaRouter = require('koa-router');

const route = new koaRouter({ prefix: '/demo' });

route.post('/demo1', auth, getListController);

module.exports = route;
