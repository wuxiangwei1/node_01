const express = require("express");
const myjs = require("./js/test");
const router = express.Router();
router.get('/signin', myjs.showSigin)
module.exports = router;