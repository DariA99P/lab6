var express = require('express');
var router = express.Router();
const  writeJsonFile  =  require ('write-json-file');
const list = require('../books.json');

router.get('/:id', function(req, res, next) {
  const currentBookInfo = list.books.find(item => item.id === +req.params.id);
  res.send(currentBookInfo);
});

router.put('/:id', function(req, res, next) {
  const currentBookIndex = list.books.findIndex(item => item.id === +req.params.id);
  list.books.splice(currentBookIndex, 1, req.body);
  ( async () => {
    await writeJsonFile('books.json' ,list);
  })()
  setTimeout(() => res.send(!!req.body), 3000);
});

router.delete('/delete/:id', function(req, res, next) {
  const currentBookIndex = list.books.findIndex(item => item.id === +req.params.id);
  list.books.splice(currentBookIndex, 1);
  ( async () => {
    await writeJsonFile('books.json' , list);
  })()
});

module.exports = router;
