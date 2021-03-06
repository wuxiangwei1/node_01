const express = require("express");
const c_user = require("./controllers/c_user");
const c_topic = require("./controllers/c_topic");
// 使用express提供的路由方法，实例化router路由对象
const router = express.Router();
router
  .get('/signin', c_user.showSigin)
  .post('/signin', c_user.handleSignin)
  .get('/', c_topic.showTopicList)
  .get('/topic/create', c_topic.showCreateTopic)
  .post('/createTopic', c_topic.handleCreateTopic)
  .get('/signout',c_user.handleSignout)
  .get('/detail/topic/:topicID', c_topic.showTopicDetail)
  .get('/topic/delete/:topicID', c_topic.handleDeleTopic)//删除对应的评论数据
  .get('/topic/edit/:topicID', c_topic.showEditTopic)//点击编辑当前评论
  .post('/edit/topic/:topicID', c_topic.handleEditTopic) //提交编辑好的评论数据
  .get('/signup',c_user.showSignup)//展示注册页面
  .post('/signup', c_user.handleSignup)//点击注册，实现注册功能
module.exports = router;