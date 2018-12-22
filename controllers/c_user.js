// 导入数据库处理模块
const M_user = require("../models/m_user");

exports.showSigin = (req, res) => {
  res.render("signin.html")
};
exports.handleSignin = (req, res,next) => {
  // 获取req.body(需要导包，配置请求体，)
  const body = req.body;

  // 使用数据库模块封装的函数进行操作
  M_user.checkEmail(body.email, (err,data) => {
    if (err) return next(err);
    if (data.length === 0) return res.send({ code: 1, msg: "邮箱不存在" });
    if (data[0].password != body.password) return res.send({ code: 2, msg: "密码错误" });
    req.session.user = data[0];
    res.send({ code: 200, msg: "验证通过" });  //此处出现过bug，在send之后设置session，我怕是sb啊
  });
};
// 用户退出，清除session；
exports.handleSignout = (req,res) => {
  delete req.session.user;
// 重定向到登录页面
  res.redirect('/signin');
};
exports.showSignup = (req,res) => {
  res.render('signup.html')
};

//点击注册，实现注册功能
exports.handleSignup = (req,res,next) => {
  body = req.body;
  M_user.checkEmail(body.email,(err,data) => { //检查邮箱是否存在
    if(err) return next(err);
    if(data[0]) return res.send({code:1,msg:'邮箱存在'});
    M_user.checkNickname(body.nickname,(err,data) => { //检查昵称是否存在
      if(err) return next(err);
      if(data[0]) return res.send({code:1,msg:'用户名存在'});
      M_user.addUser(body,(err,data) => { //添加用户信息，提示注册结果
        if(err) return next(err);
        res.send({code:200,msg:'注册成功'})
      })
    })
  })
};