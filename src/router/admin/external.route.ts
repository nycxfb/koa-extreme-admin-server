export {};
const koaRouter = require('koa-router');
const route = new koaRouter({ prefix: '/external' });

const {
  getWeatherInfoController,
  getNewsController,
  getNewsListController,
  getNewsDetailController,
  getDailyWordController
} = require('../../controller/admin/external.controller');

/**
 * @author nycxfb
 * @description:天气
 */
route.get('/weather', getWeatherInfoController);

/**
 * @author nycxfb
 * @description:新闻分类
 */
route.get('/news/classification', getNewsController);

/**
 * @author nycxfb
 * @description:新闻列表
 */
route.get('/news/list', getNewsListController);

/**
 * @author nycxfb
 * @description:新闻详情
 */
route.get('/news/detail', getNewsDetailController);

/**
 * @author nycxfb
 * @description:每日一句
 */
route.get('/dailyWord', getDailyWordController);

module.exports = route;
