const moment = require('moment');

const EST_UTC_OFFSET = 4;
const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

function dbRowToTradeJSONRecord(row){
    const {trade_id, type, user_id, user_name, symbol, shares, price, timestamp} = row;
    return {
        id: trade_id,
        type,
        user: {
            id: user_id,
            name: user_name
        },
        symbol,
        shares,
        price,
        timestamp: timestampFromUTCToEST(timestamp)
    }
}

function timestampFromUTCToEST(timestamp){
    return moment(timestamp).add(EST_UTC_OFFSET, 'hours').format(DATE_FORMAT);
}

function timestampFomESTToUTC(timestamp){
    return moment(timestamp).subtract(EST_UTC_OFFSET, 'hours').format(DATE_FORMAT);
}

function isValidTimestamp(timestamp){
    return moment(timestamp, DATE_FORMAT, true).isValid();
}

module.exports = {
    dbRowToTradeJSONRecord,
    timestampFromUTCToEST,
    timestampFomESTToUTC,
    isValidTimestamp
}