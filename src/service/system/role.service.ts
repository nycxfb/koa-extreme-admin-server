export {};

const role = require('../../model/system/role.model');
const fuzzySearch = require('../../util/search');

class roleService {
  async findAllRoleService(params) {
    return await role.findAll({
      attributes: ['roleName', 'roleType', 'createdAt'],
      where: fuzzySearch(params)
    });
  }
}

module.exports = new roleService();
