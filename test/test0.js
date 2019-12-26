var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../app");
var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);
var Promise = require("bluebird");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

describe("Get all trades -", function () {
  this.timeout(120 * 1000);
  it('Erases trades', done => {
    const payloads = [
      { "request": { "method": "DELETE", "url": "/erase", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": {}, "body": {} } },
      { "request": { "method": "GET", "url": "/trades", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": { "Content-Type": "application/json" }, "body": [] } }
    ];
    processRequests(payloads, done)
  });

  it('Adds new trades', done => {
    const payloads = [
      { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002492, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "ABX", "shares": 30, "price": 134.26, "timestamp": "2014-06-14 14:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002493, "type": "sell", "user": { "id": 4737918, "name": "Adam" }, "symbol": "ABC", "shares": 120, "price": 134.26, "timestamp": "2014-06-14 18:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002494, "type": "buy", "user": { "id": 4737919, "name": "Danny" }, "symbol": "POR", "shares": 60, "price": 154.76, "timestamp": "2014-12-28 14:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002505, "type": "sell", "user": { "id": 4737927, "name": "Clerk" }, "symbol": "RTS", "shares": 230, "price": 984.26, "timestamp": "2014-07-02 21:10:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002495, "type": "buy", "user": { "id": 4737947, "name": "Daniel" }, "symbol": "OOP", "shares": 530, "price": 1034.26, "timestamp": "2015-01-12 10:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
    ];
    processRequests(payloads, done)
  });

  it('Rejects duplicated trade id', done => {
    const payloads = [
      { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002492, "type": "buy", "user": { "id": 4737937, "name": "Miley" }, "symbol": "ABX", "shares": 30, "price": 134.26, "timestamp": "2014-06-14 15:06:13" } }, "response": { "status_code": 400, "headers": {}, "body": {} } }
    ];
    processRequests(payloads, done)
  })

  it('Gets all trades', done => {
    const payloads = [
      { "request": { "method": "GET", "url": "/trades", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": { "Content-Type": "application/json" }, "body": [{ "id": 1002492, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "ABX", "shares": 30, "price": 134.26, "timestamp": "2014-06-14 14:06:13" }, { "id": 1002493, "type": "sell", "user": { "id": 4737918, "name": "Adam" }, "symbol": "ABC", "shares": 120, "price": 134.26, "timestamp": "2014-06-14 18:06:13" }, { "id": 1002494, "type": "buy", "user": { "id": 4737919, "name": "Danny" }, "symbol": "POR", "shares": 60, "price": 154.76, "timestamp": "2014-12-28 14:06:13" }, { "id": 1002495, "type": "buy", "user": { "id": 4737947, "name": "Daniel" }, "symbol": "OOP", "shares": 530, "price": 1034.26, "timestamp": "2015-01-12 10:06:13" }, { "id": 1002505, "type": "sell", "user": { "id": 4737927, "name": "Clerk" }, "symbol": "RTS", "shares": 230, "price": 984.26, "timestamp": "2014-07-02 21:10:13" }] } }
    ];
    processRequests(payloads, done)
  })
})

describe("Get trades by user id -", function () {
  this.timeout(120 * 1000);
  it('Erases trades', done => {
    const payloads = [
      { "request": { "method": "DELETE", "url": "/erase", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": {}, "body": {} } }
      , { "request": { "method": "GET", "url": "/trades", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": { "Content-Type": "application/json" }, "body": [] } }
    ];
    processRequests(payloads, done)
  })


  it('Adds new trades to users', done => {
    const payloads = [
      { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002492, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "ABX", "shares": 30, "price": 134.26, "timestamp": "2014-06-14 14:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002493, "type": "sell", "user": { "id": 4737918, "name": "Adam" }, "symbol": "ABC", "shares": 120, "price": 134.26, "timestamp": "2014-06-14 18:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002494, "type": "buy", "user": { "id": 4737919, "name": "Danny" }, "symbol": "POR", "shares": 60, "price": 154.76, "timestamp": "2014-12-28 14:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002505, "type": "sell", "user": { "id": 4737927, "name": "Clerk" }, "symbol": "RTS", "shares": 230, "price": 984.26, "timestamp": "2014-07-02 21:10:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002495, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "ABC", "shares": 120, "price": 834.26, "timestamp": "2018-08-14 18:46:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002499, "type": "sell", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "POP", "shares": 120, "price": 1034.26, "timestamp": "2018-09-21 04:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002603, "type": "sell", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "REQ", "shares": 120, "price": 2566.26, "timestamp": "2017-03-05 12:00:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002605, "type": "sell", "user": { "id": 4737918, "name": "Adam" }, "symbol": "XYZ", "shares": 530, "price": 5134.26, "timestamp": "2019-01-10 06:30:08" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002610, "type": "buy", "user": { "id": 4737918, "name": "Adam" }, "symbol": "POR", "shares": 590, "price": 3334.26, "timestamp": "2019-06-14 18:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
    ];
    processRequests(payloads, done);
  })

  it("Gets trades by user id", done => {
    const payloads = [
      // found trades
      { "request": { "method": "GET", "url": "/trades/users/4737917", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": {}, "body": [{ "id": 1002492, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "ABX", "shares": 30, "price": 134.26, "timestamp": "2014-06-14 14:06:13" }, { "id": 1002495, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "ABC", "shares": 120, "price": 834.26, "timestamp": "2018-08-14 18:46:13" }, { "id": 1002499, "type": "sell", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "POP", "shares": 120, "price": 1034.26, "timestamp": "2018-09-21 04:06:13" }, { "id": 1002603, "type": "sell", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "REQ", "shares": 120, "price": 2566.26, "timestamp": "2017-03-05 12:00:13" }] } }
      , { "request": { "method": "GET", "url": "/trades/users/4737918", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": {}, "body": [{ "id": 1002493, "type": "sell", "user": { "id": 4737918, "name": "Adam" }, "symbol": "ABC", "shares": 120, "price": 134.26, "timestamp": "2014-06-14 18:06:13" }, { "id": 1002605, "type": "sell", "user": { "id": 4737918, "name": "Adam" }, "symbol": "XYZ", "shares": 530, "price": 5134.26, "timestamp": "2019-01-10 06:30:08" }, { "id": 1002610, "type": "buy", "user": { "id": 4737918, "name": "Adam" }, "symbol": "POR", "shares": 590, "price": 3334.26, "timestamp": "2019-06-14 18:06:13" }] } }

      // not found trades
      , { "request": { "method": "GET", "url": "/trades/users/123456", "headers": {}, "body": {} }, "response": { "status_code": 404, "headers": {}, "body": {} } }
      , { "request": { "method": "GET", "url": "/trades/users/637948", "headers": {}, "body": {} }, "response": { "status_code": 404, "headers": {}, "body": {} } }
      , { "request": { "method": "GET", "url": "/trades/users/638952", "headers": {}, "body": {} }, "response": { "status_code": 404, "headers": {}, "body": {} } }
    ];
    processRequests(payloads, done)
  })
})


describe("Get trades by trade type -", function () {
  this.timeout(120 * 1000);
  it("Erases trades", done => {
    const payloads = [
      { "request": { "method": "DELETE", "url": "/erase", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": {}, "body": {} } }
      , { "request": { "method": "GET", "url": "/trades", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": { "Content-Type": "application/json" }, "body": [] } }
    ];
    processRequests(payloads, done)
  })
  it('Adds new trades', done => {
    const payloads = [
      { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002492, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "ABX", "shares": 30, "price": 134.26, "timestamp": "2014-06-14 14:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002493, "type": "sell", "user": { "id": 4737918, "name": "Adam" }, "symbol": "ABC", "shares": 120, "price": 134.26, "timestamp": "2014-06-14 18:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002494, "type": "buy", "user": { "id": 4737919, "name": "Danny" }, "symbol": "POR", "shares": 60, "price": 154.76, "timestamp": "2014-12-28 14:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002505, "type": "sell", "user": { "id": 4737927, "name": "Clerk" }, "symbol": "RTS", "shares": 230, "price": 984.26, "timestamp": "2014-07-02 21:10:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002495, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "ABC", "shares": 120, "price": 834.26, "timestamp": "2018-08-14 18:46:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002499, "type": "sell", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "POP", "shares": 120, "price": 1034.26, "timestamp": "2018-09-21 04:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002603, "type": "sell", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "REQ", "shares": 120, "price": 2566.26, "timestamp": "2017-03-05 12:00:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002605, "type": "sell", "user": { "id": 4737918, "name": "Adam" }, "symbol": "ABX", "shares": 530, "price": 5134.26, "timestamp": "2019-01-10 06:30:08" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002610, "type": "sell", "user": { "id": 4737918, "name": "Adam" }, "symbol": "POP", "shares": 590, "price": 3334.26, "timestamp": "2019-06-14 18:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
    ];
    processRequests(payloads, done)
  })

  it("Gets trades by trade type", done => {
    const payloads = [
      // found trades
      { "request": { "method": "GET", "url": "/stocks/POP/trades?type=buy&start=2019-04-23&end=2019-04-23", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": { "Content-Type": "application/json" }, "body": [] } }
      , { "request": { "method": "GET", "url": "/stocks/ABX/trades?type=buy&start=2014-06-14&end=2019-01-10", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": { "Content-Type": "application/json" }, "body": [{ "id": 1002492, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "ABX", "shares": 30, "price": 134.26, "timestamp": "2014-06-14 14:06:13" }] } }
      , { "request": { "method": "GET", "url": "/stocks/POP/trades?type=sell&start=2018-09-20&end=2019-06-14", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": { "Content-Type": "application/json" }, "body": [{ "id": 1002499, "type": "sell", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "POP", "shares": 120, "price": 1034.26, "timestamp": "2018-09-21 04:06:13" }, { "id": 1002610, "type": "sell", "user": { "id": 4737918, "name": "Adam" }, "symbol": "POP", "shares": 590, "price": 3334.26, "timestamp": "2019-06-14 18:06:13" }] } }

      // not found trades
      , { "request": { "method": "GET", "url": "/stocks/AC/trades?type=buy&start=2014-07-04&end=2014-08-17", "headers": {}, "body": {} }, "response": { "status_code": 404, "headers": { "Content-Type": "application/json" }, "body": {} } }
    ];
    processRequests(payloads, done)
  })
});


describe("Get stock price -", function () {
  this.timeout(120 * 1000);

  it('Erases trades', done => {
    const payloads = [
      { "request": { "method": "DELETE", "url": "/erase", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": {}, "body": {} } }
      , { "request": { "method": "GET", "url": "/trades", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": { "Content-Type": "application/json" }, "body": [] } }
    ];
    processRequests(payloads, done)
  });

  it('Adds new trades', done => {
    const payloads = [
      { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1002492, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "ABM", "shares": 30, "price": 134.26, "timestamp": "2014-06-14 14:06:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1197523, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "AAC", "shares": 12, "price": 133.96, "timestamp": "2014-06-19 15:15:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 1362189, "type": "sell", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "ABC", "shares": 25, "price": 135.57, "timestamp": "2014-06-25 14:03:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 2430871, "type": "sell", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "AAC", "shares": 27, "price": 155.09, "timestamp": "2014-07-24 13:32:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 2529336, "type": "sell", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "AEB", "shares": 21, "price": 184.04, "timestamp": "2014-07-26 13:46:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 2596260, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "ABR", "shares": 15, "price": 142.09, "timestamp": "2014-07-30 09:23:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 2755405, "type": "sell", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "AAC", "shares": 11, "price": 161.7, "timestamp": "2014-08-02 09:46:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 3183368, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "AED", "shares": 26, "price": 191.65, "timestamp": "2014-08-12 14:21:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 3215135, "type": "buy", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "ABM", "shares": 14, "price": 163.35, "timestamp": "2014-08-13 11:39:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }
      , { "request": { "method": "POST", "url": "/trades", "headers": { "Content-Type": "application/json" }, "body": { "id": 3428505, "type": "sell", "user": { "id": 4737917, "name": "Daniel" }, "symbol": "AET", "shares": 15, "price": 174.22, "timestamp": "2014-08-19 10:56:13" } }, "response": { "status_code": 201, "headers": {}, "body": {} } }

    ];
    processRequests(payloads, done)
  });

  it("Gets highest and lowest price", done => {
    const payloads = [
      { "request": { "method": "GET", "url": "/stocks/ABM/price/?start=2014-06-10&end=2014-08-19", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": { "Content-Type": "application/json" }, "body": { "symbol": "ABM", "highest": 163.35, "lowest": 134.26 } } }
      , { "request": { "method": "GET", "url": "/stocks/ABM/price/?start=2014-06-10&end=2014-08-19", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": { "Content-Type": "application/json" }, "body": { "symbol": "ABM", "highest": 161.7, "lowest": 133.96 } } }

      // stock symbol does not exist
      , { "request": { "method": "GET", "url": "/stocks/KYE/price/?start=2014-07-11&end=2014-07-11", "headers": {}, "body": {} }, "response": { "status_code": 404, "headers": {}, "body": {} } }

    ];
    processRequests(payloads, done)
  })

  it("Returns the correct response for no trades found in date range", done => {
    const payloads = [
      { "request": { "method": "GET", "url": "/stocks/ABC/price/?start=2014-02-20&end=2014-05-13", "headers": {}, "body": {} }, "response": { "status_code": 200, "headers": { "Content-Type": "application/json" }, "body": { "message": "There are no trades in the given date range" } } }
    ];
    processRequests(payloads, done)
  })
});


/*
HELPER FUNCTIONS
*/


const processRequests = (events, callback) => {
  Promise.mapSeries(events, e => {
    let eve = e;

    if (eve.request.method == "DELETE") {
      return chai
        .request(server)
        .delete(eve.request.url)
        .then(res => {
          return res;
        })
        .catch(err => {
          return err;
        });
    }
    if (eve.request.method == "GET") {


      return chai
        .request(server)
        .get(eve.request.url)
        .then(res => {
          return res;
        })
        .catch(err => {
          return err;
        });
    }
    if (eve.request.method == "POST") {
      return chai
        .request(server)
        .post(eve.request.url)
        .set(eve.request.headers)
        .send(eve.request.body)
        .then(res => {
          return res;
        })
        .catch(err => {
          return err;
        });
    }
    if (eve.request.method == "PUT") {
      return chai
        .request(server)
        .put(eve.request.url)
        .set(eve.request.headers)
        .send(eve.request.body)
        .then(res => {
          return res;
        })
        .catch(err => {
          return err;
        });
    }
  }).then(results => {
    for (let j = 0; j < results.length; j++) {
      let e = events[j];
      if (e.request.method == "GET") {


        results[j].should.have.status(e.response.status_code);
        let ar1 = results[j].body;
        let ar2 = e.response.body;
        if (e.response.status_code == 404) {
          continue;
        }
        expect(ar2.length).to.equal(ar1.length);
        for (let k = 0; k < ar1.length; k++) {
          expect(ar2[k]).to.deep.equal(ar1[k]);
        }
      }
      if (e.request.method == "POST") {
        expect(results[j].status).to.equal(e.response.status_code);
      }
      if (e.request.method == "DELETE") {
        expect(results[j].status).to.equal(e.response.status_code);
      }
      if (e.request.method == "PUT") {
        expect(results[j].status).to.equal(e.response.status_code);
      }
    }
    callback();
  })
    .catch(err => {

      callback(err);
    });
}