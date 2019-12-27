var express = require('express');
const tradesController = require('../controllers/trades');
var router = express.Router();

// Routes related to trades
router.get('/', function(req, res){
    tradesController.getTradesOrderedByTradeId()
    .then(resultObj => {
        res.status(resultObj.statusCode);
        res.send(resultObj.result);
    })
    .catch(err => {
        console.log(err);
    });
});

router.post('/', function(req, res){
    tradesController.addTrade(req.body)
    .then(resultObj => {
        res.sendStatus(resultObj.statusCode);
    })
    .catch(err => {
        console.log(err);
    });
});

router.get('/users/:userID', function(req, res){
    const {userID} = req.params;
    tradesController.getUserTrades(userID)
    .then(resultObj => {
        const {statusCode} = resultObj;
        if(statusCode == 200){
            res.status(statusCode);
            res.send(resultObj.result);
        }
        res.sendStatus(statusCode);
    })
    .catch(err => console.log(err));

})

module.exports = router;