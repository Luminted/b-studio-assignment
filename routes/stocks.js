var express = require('express');
const stocksController = require('../controllers/stocks')
var router = express.Router();

// Routes related to stocks
router.get('/:stockSymbol/trades', function(req, res){
    const {type, start, end} = req.query;
    const {stockSymbol} = req.params;
    stocksController.getTradeRecordsFilteredBySymbolAndTypeAndDaterange(stockSymbol, type, start, end)
    .then(resultObj => {
        const {statusCode} = resultObj;
        if(statusCode == 200){
            res.status(statusCode);
            send(resultObj.result);
        }else{
            res.sendStatus(statusCode)
        }
    })
    .catch(err => {
        console.log(err);
    });
})

router.get('/:stockSymbol/price', function(req, res){
    const {start, end} = req.query;
    const {stockSymbol} = req.params;
    stocksController.getMaxAndMinPriceFilteredBySymbolAndDaterange(stockSymbol, start, end)
    .then(resultObj => {
        const {statusCode} = resultObj;
        if(statusCode == 200){
            res.status(statusCode);
            send(resultObj.result);
        }else{
            res.sendStatus(statusCode)
        }
    })
    .catch(err => {
        console.log(err);
    })
})

module.exports = router;