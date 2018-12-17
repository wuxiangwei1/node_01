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

exports.showSigin = (req,res) => {
  res.render("signin.html");
}
exports.handleSignin = (req,res) => {
  // 获取req.body
  const body = req.body;
  console.log(body);
  const sqlstr = "select * from users where `email`=?";
  connection.query(sqlstr, body.email, (err,data) => {
    if(err) return res.send({code:501,msg:"服务器错误！"});
    if(data.length === 0) return res.send({code:1,msg:'邮箱不存在'})
    if(data[0].password === body.password) return res.send({code:2,msg:'登陆成功'})
  })
}