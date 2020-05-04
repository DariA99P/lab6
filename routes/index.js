var express = require('express');
var router = express.Router();
var fs = require("fs");
const writeJsonFile = require('write-json-file');

router.get('/list', function(req, res, next) {
  const contents = fs.readFileSync("listBrokers.json");
  const list = JSON.parse(contents);
  res.send(list.brokers);
});

router.get('/listStocks', function(req, res, next) {
  const contentsStocks = fs.readFileSync("stocks.json");
  const stocks = JSON.parse(contentsStocks);
  res.send(stocks.stocks);
});

router.post('/login', function (req, res, next) {
  const contents = fs.readFileSync("listBrokers.json");
  const list = JSON.parse(contents);
  const broker = list.brokers.find(item => item.name === req.body.name);
  if (broker) {
    res.status(200).send({
      id: broker.id,
    });
  } else {
    res.status(404).send(false);
  }
})

router.post('/register', function (req, res, next) {
  const contents = fs.readFileSync("listBrokers.json");
  const list = JSON.parse(contents);
  const broker = list.brokers.find(item => item.name === req.body.name);
  if (!broker) {
    const updateList = [...list.brokers, {
      id: Math.max(...list.brokers.map(i => i.id)) + 1,
      name: req.body.name,
      balance: req.body.balance,
      stocks: [],
      tradingStocks: []
    }];
    ( async () => {
      await writeJsonFile('listBrokers.json' , {...list, brokers: updateList });
    })();
    res.status(200).send(true);
  } else {
    res.status(404).send(false);
  }
})

module.exports = router;
