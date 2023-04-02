export {};
const fuzzySearch = require('../../util/search');
const user = require('../../model/system/user.model');

class userService {
  async findAllUserService(params) {
    return await user.findAll({
      attributes: ['userId', 'nickname', 'phone', 'address', 'age', 'avatarUrl', 'createdAt', 'roleType'],
      where: fuzzySearch(params)
    });
  }

  async findOneUserService(params) {
    const res = await user.findOne({
      attributes: ['userId', 'nickname', 'phone', 'address', 'age', 'password', 'avatarUrl', 'roleType'],
      where: params
    });
    return res;
  }

  async createUserService(userParams) {
    return await user.create(userParams);
  }

  async deleteUserService(userId) {
    return await user.destroy({ where: { userId } });
  }

  async updateUserService(userParams) {
    return await user.update(userParams, { where: { userId: userParams.userId } });
  }
}

module.exports = new userService();
