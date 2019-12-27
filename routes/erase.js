var express = require('express');
var tradesController = require('../controllers/trades');
var router = express.Router();

// Route to delete all trades
router.delete('/', function(req, res){
    tradesController.eraseAll().then(resultObj => {
        res.sendStatus(resultObj.statusCode);
    })
  })

module.exports = router;
