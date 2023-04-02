export {};
const { findAllRoleService } = require('../../service/system/role.service');

class RoleController {
  async findAllRoleController(ctx) {
    const data = await findAllRoleService(ctx.request.body);
    ctx.body = {
      code: '200',
      message: '成功',
      data
    };
  }
}

module.exports = new RoleController();
