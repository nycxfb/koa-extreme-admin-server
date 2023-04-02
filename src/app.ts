const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const { koaBody } = require('koa-body');
const parameter = require('koa-parameter');
const cors = require('koa2-cors');
const morgan = require('koa-morgan');
const server = require('koa-static');
const router = require('./router');
const seq = require('./db');

const app = new Koa();

const redis = require('redis');

export const redisClient = redis.createClient(6379, '127.0.0.1');

/**
 * @author nycxfb
 * @date 2023-03-30 16:29:22
 * @description:启动redis
 */
function startRedis() {
  return new Promise((resolve, reject) => {
    redisClient
      .connect()
      .then((res) => {
        console.log('redis 已连接！');
        resolve('redis 已连接！');
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * @author nycxfb
 * @date 2023-03-30 16:29:40
 * @description:连接mysql
 */
function startMysql() {
  return new Promise((resolve, reject) => {
    seq
      .authenticate()
      .then(() => {
        console.log('数据库连接成功');
        resolve('数据库连接成功');
      })
      .catch(() => {
        console.error('数据库连接失败');
        reject('数据库连接失败');
      });
  });
}

/**
 * @author nycxfb
 * @date 2023-02-10 10:52:54
 * @description:允许跨域携带cookie
 */
app.use(
  cors({
    credentials: true
  })
);

/**
 * @author nycxfb
 * @date 2023-02-10 10:52:37
 * @description:跨域配置
 */
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, authorization, Accept, X-Requested-With , yourHeaderFeild'
  );
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  ctx.set('Access-Control-Allow-Credentials', 'true');
  await next();
});

/**
 * @author nycxfb
 * @date 2023-02-10 10:53:18
 * @description:请求配置
 */
app.use(
  koaBody({
    multipart: true,
    formidable: {},
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
  })
);
app.use(parameter(app));
app.use(router.routes());

/**
 * @author nycxfb
 * @date 2023-02-15 09:07:23
 * @description:上传文件静态服务地址
 */
app.use(server(path.join(__dirname, './upload')));

/**
 * @author nycxfb
 * @date 2023-02-10 10:51:41
 * @description:生成日志
 */
if (process.env.NODE_ENV == 'dev') {
  app.use(morgan('dev'));
} else {
  const logFileName = path.join(__dirname, '../', 'logs', 'access.log');
  const logStream = fs.createWriteStream(logFileName, { flags: 'a' });
  app.use(
    morgan('combined', {
      stream: logStream
    })
  );
}

/**
 * @author nycxfb
 * @date 2023-02-10 10:52:01
 * @description:监听端口
 */
(async function startApp() {
  try {
    await startRedis();
    await startMysql();
    app.listen(3000, () => {
      console.log(`server is running on http://localhost:3000`);
    });
  } catch (e) {
    console.log(e);
  }
})();
