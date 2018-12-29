var db = require("../fn/mysql-db");
var dateTime = require("node-datetime");
var moment = require("moment");

exports.getPaymentAccountById = userId => {
  var sql = `select accountNumber, balance from paymentAccount where userId = ${userId}`;
  return db.load(sql);
};
exports.getInfoByAccountNumber = accountNumber => {
  var sql = `select account.name, account.phone, account.email, paymentAccount.accountNumber from paymentAccount, account where paymentAccount.userId = account.id and paymentAccount.accountNumber =${accountNumber}`;
  return db.load(sql);
};
exports.getBalance = accountNumber => {
  var sql = `select paymentAccount.balance from paymentAccount where paymentAccount.accountNumber =${accountNumber}`;
  return db.load(sql);
};
exports.addBalance = (plus, accountNumber) => {
  var sql = `update paymentAccount set paymentAccount.balance = paymentAccount.balance + ${plus} where accountNumber = '${accountNumber}'`;
  return db.load(sql);
};
exports.subtractBalance = (sub, accountNumber) => {
  var sql = `update paymentAccount set paymentAccount.balance = paymentAccount.balance - ${sub} where accountNumber = '${accountNumber}'`;
  return db.load(sql);
};
exports.addTransHistory = (req, type) => {
  var dt = dateTime.create();
  var transId = dt.format("ymdHMSN");
  var time = dt.format("Y/m/d H:M:S:N");
  var sql = `insert into transactionHistory values('${transId}','${
    req.sendAccount
  }','${req.reciveAccount}', '${req.amount}','${
    req.note
  }','${time}','${type}')`;
  return db.insert(sql);
};
exports.getTransHistory = accountNumber => {
  var sql = `select * from transactionHistory where sendAccount = ${accountNumber} or reciveAccount =${accountNumber}`;
  return db.load(sql);
};
exports.countPaymentAccountOfUser = userId => {
  var sql = `select count(*) as count from paymentAccount where userId=${userId}`;
  return db.load(sql);
};
exports.getBalance = accountNumber => {
  var sql = `select balance from paymentAccount where accountNumber =${accountNumber}`;
  return db.load(sql);
};
exports.deletePaymentAccount = accountNumber => {
  var sql = `delete from paymentAccount where accountNumber = ${accountNumber}`;
  return db.load(sql);
};
exports.otp = (email, otp, time) => {
  return new Promise((resolve, reject) => {
    var sql = `delete from OTP where email = '${email}'`;
    db.insert(sql) // delete
      .then(() => {
        sql = `insert into OTP(email,otpnum,time) values('${email}','${otp}','${time}')`;
        return db.insert(sql);
      })
      .then(r => resolve(r))
      .catch(err => reject(err));
  });
};
exports.verifyotp = email => {
  var sql = `select otpnum, time from OTP where email = '${email}'`; //order by time desc limit 1`;
  return db.load(sql);
};
exports.getreciverlist = userId => {
  var sql = `select * from reciverList where userId = '${userId}'`;
  return db.load(sql);
};
exports.savereciverlist = req => {
  var sql = `select * from reciverList where userId= '${
    req.userId
  }' and accountNumber=${req.accountNumber}`;
  return new Promise((resolve, reject) => {
    db.load(sql)
      .then(row => {
        if (row.length == 0) {
          var sql1 = `insert into reciverList values('${req.userId}','${
            req.accountNumber
          }','${req.name}')`;
          return db.load(sql1);
        } else {
          var sql2 = `update reciverList set name = '${req.name}' where userId = ${
            req.userId
          } and accountNumber =${req.accountNumber}`;
          return db.load(sql2);
        }
      })
      .then(row=> resolve(row))
      .catch(err => reject(err));
  });
};
