export {};
const jwt = require('jsonwebtoken');
const fse = require('fs-extra');
const path = require('path');
const svgCaptcha = require('svg-captcha');
import { redisClient } from '../../app';

const {
  findAllUserService,
  createUserService,
  deleteUserService,
  updateUserService,
  findOneUserService
} = require('../../service/system/user.service');

class UserController {
  async createUserController(ctx) {
    const { nickname, phone, password } = ctx.request.body;
    await createUserService({ nickname, phone, password });
    ctx.body = {
      code: 200,
      message: '注册成功！'
    };
  }

  async userLoginController(ctx) {
    const { phone } = ctx.request.body;
    ctx.state.phone = phone;
    const { password, nickname, ...res } = await findOneUserService({ phone });
    const token = { phone, nickname };
    ctx.body = {
      code: '200',
      message: '成功',
      data: {
        token: jwt.sign(token, 'tokenParams', { expiresIn: '8h' }),
        userInfo: res.dataValues
      }
    };
  }

  async findAllUserController(ctx) {
    const data = await findAllUserService(ctx.request.body);
    ctx.body = {
      code: '200',
      message: '成功',
      data
    };
  }

  async deleteUserController(ctx) {
    await deleteUserService(ctx.query.userId);
    ctx.body = {
      code: 200,
      message: '成功'
    };
  }

  async updateUserController(ctx) {
    await updateUserService(ctx.request.body);
    ctx.body = {
      code: 0,
      message: '成功'
    };
  }

  async uploadUserAvatarController(ctx) {
    const { originalFilename, filepath } = ctx.request.files.file;
    const { userId } = ctx.request.body;
    const dest = path.join(__dirname, '../../upload', originalFilename); // 目标目录，没有没有这个文件夹会自动创建
    const http = process.env.NODE_ENV === 'prod' ? 'http://150.158.155.240:3000' : 'localhost:3000';
    const url = `http://150.158.155.240:3000/${originalFilename}`;
    await fse.move(filepath, dest);
    await updateUserService({ avatarUrl: url, userId });
    ctx.body = {
      code: 200,
      message: '成功'
    };
  }

  async getCaptchaController(ctx) {
    let options = {
      size: 4,
      noise: 2,
      color: true,
      background: '#666',
      mathMin: 5,
      width: 111,
      height: 42
    };

    let captcha = svgCaptcha.create(options);
    let { text, data } = captcha;
    redisClient.set('text', text).then((res) => {
      console.log(res);
    });
    ctx.body = {
      code: 200,
      message: '成功',
      data: {
        captcha: data
      }
    };
  }
}

module.exports = new UserController();
