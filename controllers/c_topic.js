// 导入数据处理模块，使用它封装好的函数
const M_topic = require('../models/m_topic');
const moment = require("moment");
exports.showTopicList = (req,res,next) => {
  M_topic.findAllTopics((err,data) => {
    if(err) return next(err);
    res.render('index.html', {
      topics: data
    })
  })
};
exports.showCreateTopic = (req,res,next) => {
  res.render('topic/create.html')
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
    if(err) return next(err);
    res.send({code:200,msg:'添加成功'});
  })
};
// 渲染文章列表页
exports.showTopicDetail = (req,res) => {
  // 获取请求中的变量(动态路由中传过来的参数当前评论的id值) req.params.形参
  const topicID = req.params.topicID;
  // 使用M中的函数来查询当前评论的信息
  M_topic.findTopicById(topicID,(err,data) => {
    if(err) return next(err);
  res.render("topic/show.html",{
    topic: data[0],
    sessionUserId: req.session.user ? req.session.user.id : 0 //判断用户是否登录，登录就把userID传过去，没登录就把根本没有的的一个userid值0传过去
  });
  })
}
// 删除当前评论列表
exports.handleDeleTopic = (req,res) => {
  const topicID = req.params.topicID;
  M_topic.deleTopicById(topicID,(err,data) => {
    if(err) return next(err);
    // 重定向到评论列表
    res.redirect("/");
  })
}
// 展示编辑评论的页面
exports.showEditTopic = (req,res) => {
  const topicID = req.params.topicID;
  M_topic.findTopicById(topicID, (err,data) => {
    if(err) return next(err);
    if(data.length === 0) return res.send({code:1,msg:'该文章已经被删除'})
    res.render('topic/edit.html',{topic: data[0]});
  })
}
//提交当前的编辑内容
exports.handleEditTopic = (req,res) => {
  const body = req.body;
  const topicID = req.params.topicID;
  // console.log(body,topicID);
  M_topic.editTopicById(topicID, body, (err,data) =>{
    if(err) return next(err);
    res.send({code:200,msg:'修改成功'});    
  })
}