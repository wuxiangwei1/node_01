const express = require("express");
const router = require("./router");
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
app.use("/public",express.static("./public"));
app.use("/node_modules",express.static("./node_modules"))
app.engine('html',require('express-art-template'));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(router);
app.listen(7000,(err) => {
  if(err) throw err;
  console.log('run it......！')
})