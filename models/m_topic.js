// 导入数据库配置模块，开始数据库操作,查询用户评论数据
const connection = require("../config/dabase_config");
// 导出封装好的数据处理模块
exports.findAllTopics = (callback) => { 
  const sqlstr = `select * FROM topics order by id desc`;
  connection.query(sqlstr, (err,data) => {
    if(err) return callback(err);
    callback(null,data);
  })
};
exports.addTopic = (body,callback) => {
  // 向数据库中添加用户评论的数据
  const sqlstr = `insert into topics set ?`;
  connection.query(sqlstr, body, (err,data) => {
    if(err) return callback(err);
    callback(null,data);
  });
};
exports.findTopicById = (topicID,callback)=> {
  const sqlstr = `select * from topics where id = ${topicID}`;
  connection.query(sqlstr,(err,data) => {
    if(err) return callback(err);
    callback(null,data);
  })
};
// 删除对应的评论数据
exports.deleTopicById = (topicID,callback) => {
  const sqlstr = `delete from topics where id = ${topicID}`;
  connection.query(sqlstr,(err,data) => {
    if(err) return callback(err);
    callback(null,data);
  })
}