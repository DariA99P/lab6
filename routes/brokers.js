var express = require('express');
var router = express.Router();
const writeJsonFile = require('write-json-file');
var fs = require("fs");
router.get('/:id', function(req, res, next) {
  const contents = fs.readFileSync("listBrokers.json");
  const list = JSON.parse(contents);
  const currentBrokerInfo = list.brokers.find(item => item.id === +req.params.id);
  if (currentBrokerInfo) {
    res.status(200).send(currentBrokerInfo);
  } else {
    res.status(404).send(false);
  }
});

router.put('/:id', function(req, res, next) {
  const contentsStocks = fs.readFileSync("stocks.json");
  const stocks = JSON.parse(contentsStocks);
  const findStock = stocks.stocks.find(item => +item.id === +req.body.idStock);
  if (findStock) {
    const contents = fs.readFileSync("listBrokers.json");
    const list = JSON.parse(contents);
    const newStocks = stocks.stocks.reduce((acc, item) => {
      if (item.id === req.body.idStock) {
        return [...acc, {...item, numberShares: item.numberShares - req.body.count}]
      }
      return [...acc, item];
    }, []);
    const updateList = list.brokers.reduce((acc, item) => {
      if (item.id === +req.params.id) {
        const updateStocks = item.stocks.map((i) => i.idStock === findStock.id
            ? ({ idStock: i.idStock, number: i.number + +req.body.count })
            : i);
        return [
            ...acc,
          {
            ...item,
            balance: item.balance - findStock.costPerShare*(+req.body.count),
            stocks: updateStocks.map(i => +i.idStock).includes(+findStock.id)
                ? updateStocks
                : [...updateStocks, { idStock: req.body.idStock, number: +req.body.count }],
          }
          ];
      }
      return [...acc, item];
    }, []);
    ( async () => {
      await writeJsonFile('listBrokers.json' , {...list, brokers: updateList });
      await writeJsonFile('stocks.json' , { ...stocks, stocks: newStocks });
    })();
    res.status(200).send({ list: updateList, stocks: newStocks});
  }
  res.status(404).send(false);
});

router.put('/sell/:id', function(req, res, next) {
  const contentsStocks = fs.readFileSync("stocks.json");
  const stocks = JSON.parse(contentsStocks);
  const findStock = stocks.stocks.find(item => +item.id === +req.body.idStock);
  console.log(findStock);
  if (findStock) {
    const contents = fs.readFileSync("listBrokers.json");
    const list = JSON.parse(contents);
    const newStocks = stocks.stocks.reduce((acc, item) => {
      if (item.id === req.body.idStock) {
        return [...acc, {...item, numberShares: item.numberShares + req.body.count}]
      }
      return [...acc, item];
    }, []);
    const updateList = list.brokers.reduce((acc, item) => {
      if (item.id === +req.params.id) {
        const updateStocks = item.stocks.map((i) => i.idStock === findStock.id
            ? ({ idStock: i.idStock, number: i.number - +req.body.count })
            : i);
        return [
          ...acc,
          {
            ...item,
            balance: item.balance + findStock.costPerShare*(+req.body.count),
            stocks: updateStocks,
          }
        ];
      }
      return [...acc, item];
    }, []);
    ( async () => {
      await writeJsonFile('listBrokers.json' , {...list, brokers: updateList });
      await writeJsonFile('stocks.json' , { ...stocks, stocks: newStocks });
    })();
    res.status(200).send({ list: updateList, stocks: newStocks});
  }
  res.status(404).send(false);
});

module.exports = router;
