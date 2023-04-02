export {};
const KoaRouter = require('koa-router');
const {
  findAllUserController,
  createUserController,
  deleteUserController,
  updateUserController,
  userLoginController,
  uploadUserAvatarController,
  getCaptchaController
} = require('../../controller/system/user.controller');
const { cryptPassword, verifyPassword, isUserExist } = require('../../middleware/user.middleware');

const { auth } = require('../../middleware/auth.middleware');

const route = new KoaRouter({ prefix: '/system/user' });

/**
 * @author nycxfb
 * @description:用户注册
 */
route.post('/register', isUserExist, cryptPassword, createUserController);

/**
 * @author nycxfb
 * @description:验证码
 */
route.get('/captcha', getCaptchaController);

/**
 * @author nycxfb
 * @description:用户登录
 */
route.post('/login', verifyPassword, userLoginController);

/**
 * @author nycxfb
 * @description:用户列表
 */
route.post('/list', auth, findAllUserController);

/**
 * @author nycxfb
 * @description:更新用户信息
 */
route.put('/update', auth, updateUserController);

/**
 * @author nycxfb
 * @description:删除用户
 */
route.delete('/delete', auth, deleteUserController);

/**
 * @author nycxfb
 * @description:用户上传
 */
route.post('/upload', auth, uploadUserAvatarController);

module.exports = route;
