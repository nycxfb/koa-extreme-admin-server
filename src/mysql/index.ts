const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '150.158.155.240',
  user: '用户名',
  password: '密码',
  database: 'extreme-admin-server',
  port: 3306
});
connection.connect();

connection.query('select * from user', (err, results, fields) => {
  if (err) {
    throw err;
  }
  console.log(results);
});
