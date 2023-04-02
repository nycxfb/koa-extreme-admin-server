export {};
const { Sequelize } = require('sequelize');

const seq = new Sequelize('extreme-admin-server', '用户名', '密码', {
  host: '150.158.155.240', //数据库服务器的IP地址或域名
  port: 3306, //数据库使用的端口号。MySQL数据库的默认端口号是3306
  dialect: 'mysql', //数据库的类型
  define: {
    charset: 'utf8', //处理Mysql中中文字符问题
    freezeTableName: true,
    mapToModel: true
  }
});

module.exports = seq;
