var express = require('express');
const stocksController = require('../controllers/stocks')
var router = express.Router();

// Routes related to stocks
router.get('/:stockSymbol/trades', function(req, res){
    const {type, start, end} = req.query;
    const {stockSymbol} = req.params;
    stocksController.getTradeRecordsFilteredBySymbolAndTypeAndDaterange(stockSymbol, type, start, end)
    .then(resultObj => {
        switch(resultObj.statusCode){
            case 200:
                res.status(resultObj.statusCode);
                res.send(resultObj.result);
                break;
            default:
                res.sendStatus(resultObj.statusCode);
        }
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    });
})

router.get('/:stockSymbol/price', function(req, res){
    const {start, end} = req.query;
    const {stockSymbol} = req.params;
    stocksController.getMaxAndMinPriceFilteredBySymbolAndDaterange(stockSymbol, start, end)
    .then(resultObj => {
        switch(resultObj.statusCode){
            case 200:
                res.status(resultObj.statusCode);
                res.send(resultObj.result);
                break;
            case 404:
                res.status(resultObj.statusCode);
                res.send(resultObj.result);
                break;
            default:
                res.sendStatus(resultObj.statusCode);
        }
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(500);
    })
})

module.exports = router;