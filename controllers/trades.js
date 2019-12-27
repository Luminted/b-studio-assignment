const db = require('../database');
const utils = require('./utils');


function addTrade(entry){
    const {id, type, user, symbol, shares, price, timestamp} = entry;
    const params = [id, type, user.id, user.name, symbol, shares, price,utils.timestampFomESTToUTC(timestamp)];
    const sql = 
    `INSERT INTO trades
    (trade_id,
        type,
        user_id,
        user_name,
        symbol,
        shares,
        price,
        timestamp)
    VALUES (${params.map(() => '?').join(',')});`;
    return new Promise((resolve, reject) => {
        if(!utils.isValidTimestamp(timestamp)){
            resolve({
                statusCode: 201
            })
        }
        db.serialize(() => {
            db.run(sql, params, err => {
                if(err && err.message.includes('UNIQUE constraint failed')){
                    resolve({
                        statusCode: 400
                    });
                }
                resolve({
                    statusCode: 201
                });
            });
        });
    });
}

function getTradesOrderedByTradeId(){
    const sql = 
    `SELECT * FROM trades;
    ORDER BY trade_id`;
    return new Promise((resolve, reject) => {
        db.serialize(()=>{
            db.all(sql, (err, rows) => {
                if(err){
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

function getUserTrades(userID){
    const userExistsSQL = 
    `SELECT * FROM trades
    WHERE user_id='${userID}'`;
    const resultSQL = 
    `SELECT * FROM trades
    WHERE user_id=${userID}`;
    return new Promise((resolve, reject) => {
        db.serialize(()=>{
            db.get(userExistsSQL, (err, row) => {
                if(err){
                    reject(err)
                }
                if(!row){
                    resolve({
                        statusCode: 404,
                    })
                }
            })
            db.all(resultSQL, (err, rows) => {
                if(err){
                    reject(err);
                }
                resolve({
                    statusCode: 200,
                    result: rows.map(row => utils.dbRowToTradeJSONRecord(row))
                });
            })
        })
    })
}

function eraseAll(){
    const sql = 
    `DELETE FROM trades`;

    return new Promise((resolve, reject) => {
        db.serialize(()=>{
            db.run(sql, err => {
                if(err){
                    reject(err);
                }
                resolve({
                    statusCode: 200
                })
            })
        })
    })
}

module.exports = {
    addTrade,
    getTradesOrderedByTradeId,
    getUserTrades,
    eraseAll
}