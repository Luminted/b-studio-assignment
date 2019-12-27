const db = require('../database');
const moment = require('moment');
const utils = require('./utils');


function getTradeRecordsFilteredBySymbolAndTypeAndDaterange(symbol, type, start, end) {
    const symbolExistsSQL =
        `SELECT * FROM trades
    WHERE symbol='${symbol}'`;
    const resultSQL =
        `SELECT * FROM trades
    WHERE symbol="${symbol}" AND type="${type}" AND date(timestamp) BETWEEN date('${moment(start).utc().format()}') AND date('${moment(end).utc().format()}');`;

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
    WHERE symbol='${symbol}' AND date(timestamp) BETWEEN date('${moment(start).utc().format()}') AND date('${moment(end).utc().format()}')
    LIMIT 1;`
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
                        result: {
                            message: 'There are no trades in the given date range'
                        }
                    })
                }
            })
            db.get(resultSQL, (err, row) => {
                if (err) {
                    reject(err);
                }
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
            })
        })
    })
}

module.exports = {
    getTradeRecordsFilteredBySymbolAndTypeAndDaterange,
    getMaxAndMinPriceFilteredBySymbolAndDaterange
}