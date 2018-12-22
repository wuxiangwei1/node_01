const express = require("express");
const router = require("./router");
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const morgan = require('morgan');   //控制台打印请求日志
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'node_01'
};
const sessionStore = new MySQLStore(options);  //
const app = express();   //实例化express框架对象
    //app.use()都是中间件，都是拦截所有请求，实现功能后 再调用next()保证下一个中间件可以执行
// app.use((req,res,next) => {  //打印请求日志，率先接收所有请求，执行以下代码
//   console.log(`请求方式：${req.method},请求参数：${req.path}`);  //打印请求方式和参数
//   next()  //继续向下匹配相对应的请求，和res.end(),res.send()等不同，并没有结束相应，
// });  // app.use('/a',(req,res,next) => {})  //此方法可以传入第一个参数意思是处理以/a开头的所有请求，
// app.use(morgan('combined'));   //控制台打印请求日志的格式一
app.use(morgan('tiny'));    //控制台打印请求日志的格式二
// app.use(':method :url :status :res[content-length] - :response-time ms');     //控制台打印请求日志的格式三
app.use("/public",express.static("./public"));
app.use("/node_modules",express.static("./node_modules"));
app.engine('html',require('express-art-template'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
// 统一处理session的赋值问题，公共成员app.locals 页面下都可访问
app.use((req,res,next) => {   //因为要使用seeeion，所以要放在session包配置之后
  app.locals.sessionUser = req.session.user;
  next();   //切记不要忘记调用next(),给后边的中间件留条活路
})
app.use(router);
// 统一处理500错误
app.use((req,res,next) => {
  res.render('404.html');
  next();
})
app.use((err,req,res,next) => {
  res.send({
    code: 500,
    msg: err.message
  });
});
app.listen(7000,(err) => {
  if(err) throw err;
  console.log('run it......！')
})