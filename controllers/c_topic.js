// 导入数据处理模块，使用它封装好的函数
const M_topic = require('../models/m_topic');
const moment = require("moment");
exports.showTopicList = (req,res) => {
  M_topic.findAllTopics((err,data) => {
    if(err) return res.send({code:500,msg:'服务器崩溃了'});
    res.render('index.html', {
      topics: data,
      user: req.session.user
    })
  })
};
exports.showCreateTopic = (req,res) => {
  res.render('topic/create.html',{user: req.session.user})
};


exports.handleCreateTopic = (req,res) => {
  // 获取表单数据
  const body = req.body;
    // 向数据中添加新成员，
  // 添加当前添加时间,此处需要使用comment包的方法
  body.createdAt = moment().format();
  // 添加当前用户的id，以便于后期判断当前用户是否拥有编辑当前评论数据的权限
  body.userId = req.session.user.id;
  // 使用数据库封装好的数据处理函数
  M_topic.addTopic(body,(err,data) => {
    if(err) return res.send({code:500,msg:'服务器错误'});
    res.send({code:200,msg:'添加成功'});
  })
}