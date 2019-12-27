const moment = require('moment');

const UTC_OFFSET = -4;
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
        timestamp: moment(timestamp).utc(UTC_OFFSET).format(DATE_FORMAT)
    }
}

module.exports = {
    dbRowToTradeJSONRecord,
    UTC_OFFSET,
    DATE_FORMAT
}