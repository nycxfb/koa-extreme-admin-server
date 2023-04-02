export {};
const Koa = require('koa');
const jwt = require('jsonwebtoken');
const app = new Koa();

/**
 * @author nycxfb
 * @date 2023-02-14 11:28:19
 * @description:token验证
 */
const auth = async (ctx, next) => {
  const { token } = ctx.request.header;
  const parseToken = token.replace('Bearer', '');
  try {
    jwt.verify(parseToken, 'tokenParams');
    await next();
  } catch (error) {
    console.log(error, 'error');
    switch (error.name) {
      case 'TokenExpiredError':
        ctx.set('tokenExpired', 'true');
        console.error('token已过期', error);
        ctx.body = {
          code: 500,
          message: '登录信息已过期'
        };
        break;
      case 'JsonWebTokenError':
        ctx.set('invalidToken', 'true');
        ctx.body = {
          code: 500,
          message: '无效的token'
        };
        console.error('无效的token', error);
        break;

      default:
        ctx.set('tokenError', 'true');
        ctx.body = {
          code: 500,
          message: 'token 验证出错'
        };
    }
  }
};

app.use(function (ctx, next) {
  return next().catch((err) => {
    if (401 == err.statusCode) {
      // token 失效
      ctx.code = 401;
      ctx.body = {
        code: 401,
        data: null,
        message: "'token 失效请重新登录"
      };
    } else {
      throw err;
    }
  });
});

module.exports = { auth };
