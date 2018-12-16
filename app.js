const express = require("express");
const router = require("./router")
const app = express();
app.use(router);
app.use("/public",express.static("./public"));
app.use("/node_modules",express.static("./node_modules"))
app.engine('html',require('express-art-template'));
app.listen(7000,(err) => {
  if(err) throw err;
  console.log('run it......！')
})