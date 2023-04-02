export {};

const { findAllUserService } = require('../../service/system/user.service');

class DemoController {
  async getListController(ctx) {
    const res = await findAllUserService();
    ctx.body = {
      code: '0000',
      message: '成功',
      result: res
    };
  }
}

module.exports = new DemoController();
