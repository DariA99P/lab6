var express = require('express');
var router = express.Router();
const list = require('../books.json');

/* GET home page. */
router.get('/list', function(req, res, next) {
  res.send(list.books);
});

module.exports = router;
