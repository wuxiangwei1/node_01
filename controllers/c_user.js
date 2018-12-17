// 导入数据库处理模块
const M_user = require("../models/m_user");

exports.showSigin = (req, res) => {
  res.render("signin.html");
};
exports.handleSignin = (req, res) => {
  // 获取req.body(需要导包，配置请求体，)
  const body = req.body;

  // 使用数据库模块封装的函数进行操作
  M_user.checkEmail(body.email, (err, data) => {
    if (err) return res.send({ code: 500, msg: "服务器错误！" });
    if (data.length === 0) return res.send({ code: 1, msg: "邮箱不存在" });
    if (data[0].password != body.password) return res.send({ code: 2, msg: "密码错误" });
    req.session.user = data[0];
    res.send({ code: 200, msg: "验证通过" });  //此处出现过bug，在send之后设置session，我怕是sb啊
    
    
  });
};
