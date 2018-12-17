// 导入数据处理模块，使用它封装好的函数
const M_topic = require('../models/m_topic');
exports.showTopicList = (req,res) => {
  M_topic.findAllTopics((err,data) => {
    if(err) return res.send({code:500,msg:'服务器崩溃了'});
    console.log(req.session.user);
    res.render('index.html', {
      topics: data,
      user: req.session.user
    })
  })
};