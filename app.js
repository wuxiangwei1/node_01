const express = require("express");
const router = require("./router");
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'node_01'
};
const sessionStore = new MySQLStore(options);
const app = express();
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
app.use(router);
app.listen(7000,(err) => {
  if(err) throw err;
  console.log('run it......！')
})