// 导入数据库的配置文件开始操作数据库
const connection = require('../config/dabase_config');
// 导出封装好的验证登录的功能的函数,检查邮箱
exports.checkEmail = (email,callback) => {
  const sqlstr = `select * from users where email = '${email}'`;
  connection.query(sqlstr, (err,data) => {
    if(err) return callback(err);
    callback(null,data);
  })
}
// 检查用户名
exports.checkNickname = (nickname,callback) => {
  const sqlstr = `select * from users where nickname = '${nickname}'`
  connection.query(sqlstr,(err,data) => {
    if(err) return callback(err);
    callback(null,data)
  })
};
//添加用户信息，验证注册结果
exports.addUser = (body,callback) => {
  const sqlstr = `insert into users set ?`;
  connection.query(sqlstr, body, (err,data) => {
    if(err) return callback(err);
    callback(null,data);
  })
}