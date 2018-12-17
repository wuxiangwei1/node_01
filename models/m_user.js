// 导入数据库的配置文件开始操作数据库
const connection = require('../config/dabase_config');
// 导出封装好的验证登录的功能的函数
exports.checkEmail = (email,callback) => {
  const sqlstr = `select * from users where email = '${email}'`;
  connection.query(sqlstr, (err,data) => {
    if(err) return callback(err);
    callback(null,data);
  })
}