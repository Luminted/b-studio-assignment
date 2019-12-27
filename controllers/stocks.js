const db = require('../database');
const utils = require('./utils');


function getTradeRecordsFilteredBySymbolAndTypeAndDaterange(symbol, type, start, end) {
    const symbolExistsSQL =
        `SELECT * FROM trades
    WHERE symbol='${symbol}';`;
    const resultSQL =
        `SELECT * FROM trades
    WHERE symbol="${symbol}"
    AND type="${type}"
    AND date(timestamp) BETWEEN date('${start}') AND date('${end}');`;
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // checking if symbol exists in DB
            db.get(symbolExistsSQL, (err, row) => {
                if (err) {
                    reject(err);
                }
                if (!row) {
                    resolve({
                        statusCode: 404
                    })
                }
            })
            db.all(resultSQL, (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve({
                    statusCode: 200,
                    result: rows.map(row => utils.dbRowToTradeJSONRecord(row))
                })
            })
        })
    })
}

function getMaxAndMinPriceFilteredBySymbolAndDaterange(symbol, start, end) {
    const symbolExistsSQL =
        `SELECT * FROM trades
    WHERE symbol='${symbol}'`;
    const resultSQL =
        `SELECT
     MAX(price) AS highest,
     MIN(price) AS lowest
    FROM trades
    WHERE symbol='${symbol}' 
    AND date(timestamp) BETWEEN date('${utils.timestampFomESTToUTC(start)}')
    AND date('${utils.timestampFomESTToUTC(end)}');`
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            // checking if symbol exists in DB
            db.get(symbolExistsSQL, (err, row) => {
                if (err) {
                    reject(err);
                }
                if (!row) {
                    resolve({
                        statusCode: 404,
                    })
                }
            })
            db.get(resultSQL, (err, row) => {
                if (err) {
                    reject(err);
                }
                if(row && row.lowest !== null && row.highest !== null){
                    const {
                        lowest,
                        highest
                    } = row;
                    resolve({
                        statusCode: 200,
                        result: {
                            lowest,
                            highest,
                            symbol
                        }
                    })
                }
                else{
                    resolve({
                        statusCode: 200,
                        result: {
                            message: "There are no trades in the given date range"
                        }
                    })
                }
            })
        })
    })
}

module.exports = {
    getTradeRecordsFilteredBySymbolAndTypeAndDaterange,
    getMaxAndMinPriceFilteredBySymbolAndDaterange
}