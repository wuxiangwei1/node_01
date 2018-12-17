// 导入mysql包
const mysql = require('mysql');
// 配置数据库信息
const connection = mysql.createConnection({
  host: 'localhost',
  // 用户名
  user: 'root',
  // 密码
  password: 'root',
  // 数据库名字
  database: 'node_01'
});
// 链接数据库
connection.connect();
module.exports = connection;