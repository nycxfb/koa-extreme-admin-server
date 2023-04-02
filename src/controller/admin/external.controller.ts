const { externalApiRequest } = require('../../util/externalApi');

class ExternalController {
  /**
   * @author nycxfb
   * @date 2023-03-22 15:07:56
   * @description:天气接口
   */
  async getWeatherInfoController(ctx) {
    const res: any = await externalApiRequest('/weather/current/', encodeURI('上海市') + '?');
    ctx.body = res;
  }

  /**
   * @author nycxfb
   * @date 2023-03-22 15:08:11
   * @description:新闻接口
   */
  async getNewsController(ctx) {
    const res: any = await externalApiRequest('/news/types?');
    ctx.body = res;
  }

  /**
   * @author nycxfb
   * @date 2023-03-22 15:08:30
   * @description:新闻列表接口
   */
  async getNewsListController(ctx) {
    const { typeId } = ctx.request.query;
    const params = `typeId=${typeId}&page=1&`;
    const res: any = await externalApiRequest('/news/list?', params);
    ctx.body = res;
  }

  /**
   * @author nycxfb
   * @date 2023-03-22 15:08:47
   * @description:新闻详情接口
   */
  async getNewsDetailController(ctx) {
    const { newsId } = ctx.request.query;
    const params = `newsId=${newsId}&`;
    const res: any = await externalApiRequest('/news/details?', params);
    ctx.body = res;
  }

  /**
   * @author nycxfb
   * @date 2023-03-22 15:09:20
   * @description:每日一句接口
   */
  async getDailyWordController(ctx) {
    const res: any = await externalApiRequest('/daily_word/recommend?count=1&');
    ctx.body = res;
  }
}

module.exports = new ExternalController();
