const sqlite3 = require('sqlite3').verbose();

const CREATE_TABLE_TRADES = `CREATE TABLE IF NOT EXISTS trades (
  trade_id INTEGER PRIMARY KEY,
  type TEXT CHECK (type = "buy" OR type = "sell"),
  user_id INTEGER NOT NULL,
  user_name TEXT NOT NULL,
  symbol TEXT NOT NULL,
  shares INTEGER CHECK (shares >=10 AND shares <= 30),
  price REAL CHECK (price >= 130.42 AND price <= 195.65),
  timestamp TEXT NOT NULL
);`

let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
  });

db.serialize(() => {
  db.run(CREATE_TABLE_TRADES);
});

db.serializedRunAsPromise = (sql, params) => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(sql, params, function(err) {
        if(err){
          reject(err);
        }
        resolve(this);
      })
    })
  })
}
  

module.exports = db;