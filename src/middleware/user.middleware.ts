const bcrypt = require('bcryptjs');
const { findOneUserService } = require('../service/system/user.service');
import { redisClient } from '../app';

/**
 * @author nycxfb
 * @description:验证用户信息
 */
const validatorUser = async (ctx, next) => {
  const { nickname, phone, password } = ctx.request.body;
  if (!nickname) {
    ctx.app.emit('error', '用户名不能为空', ctx);
    return;
  }
  if (!phone) {
    ctx.app.emit('error', '用户名不能为空', ctx);
  }
  if (!password) {
    ctx.app.emit('error', '密码不能为空', ctx);
  }
  await next();
};

/**
 * @author nycxfb
 * @description:查询用户是否存在
 */
const isUserExist = async (ctx, next) => {
  const { phone } = ctx.request.body;
  const res = await findOneUserService({ phone });
  if (res) {
    ctx.body = {
      code: 500,
      message: '该手机号码已存在！'
    };
  } else {
    await next();
  }
};

/**
 * @author nycxfb
 * @date 2023-02-12 17:38:36
 * @description:用户密码加盐存储
 */
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  const salt = bcrypt.genSaltSync(10);
  ctx.request.body.password = bcrypt.hashSync(password, salt);
  await next();
};

/**
 * @author nycxfb
 * @date 2023-02-13 10:38:35
 * @description:验证用户密码是否正确
 */
const verifyPassword = async (ctx, next) => {
  const { password, phone, captcha } = ctx.request.body;
  const res = await findOneUserService({ phone });
  const text = await redisClient.get('text');
  if (!res) {
    ctx.body = {
      code: 500,
      message: '该用户不存在!'
    };
    ctx.app.emit('err', '该用户不存在', ctx);
    return;
  }
  if (!bcrypt.compareSync(password, res.password)) {
    ctx.body = {
      code: 500,
      message: '密码错误'
    };
    ctx.app.emit('err', '密码错误', ctx);
    return;
  } else if (text.toLowerCase() != captcha.toLowerCase()) {
    ctx.body = {
      code: 500,
      message: '验证码错误'
    };
    ctx.app.emit('err', '验证码错误', ctx);
  } else {
    await next();
  }
};

module.exports = {
  validatorUser,
  cryptPassword,
  verifyPassword,
  isUserExist
};
