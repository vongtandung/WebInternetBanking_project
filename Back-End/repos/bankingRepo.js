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
exports.addTransHistory = (acc, req, type) => {
  //type =0 => nhận thêm , 1 => chuyển tiền , 2 nạp thêm tiền
  var dt = dateTime.create();
  var transId = dt.format("ymdHMSN");
  var time = dt.format("Y/m/d H:M:S:N");
  var stt;
  var amount;
  if (type === 0) {
    stt = "Nhận " + req.amount + " từ " + req.sendName;
    amount = "+" + req.amount;
  } else {
    if (type === 1) {
      stt = "Chuyển " + req.amount + " đến " + req.reciveName;
      amount = "-" + req.amount;
    } else {
      stt = "Chuyển " + req.amount + " vào tài khoản ";
      amount = "+" + req.amount;
    }
  }
  var sql = `insert into transactionHistory values('${transId}','${acc}','${stt}', '${amount}','${
    req.note
  }','${time}')`;
  return db.insert(sql);
};

exports.getTransHistory = accountNumber => {
  var sql = `select * from transactionHistory, paymentAccount where paymentAccount.accountNumber = '${accountNumber}' and transactionHistory.account = paymentAccount.accountNumber order by time`;
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
exports.deletePaymentAccount = (accountNumber, balance, reciveAccount) => {
  return new Promise((resolve, reject) => {
    if(reciveAccount != "" || reciveAccount === null)
    {
    var sql = `update paymentAccount set paymentAccount.balance = paymentAccount.balance + ${balance} where accountNumber = '${reciveAccount}'`;
    db.load(sql)
      .then(() => {
        sql = `delete from paymentAccount where accountNumber = ${accountNumber}`;
        console.log(accountNumber);
        return db.insert(sql);
      })
      .then(r => resolve(r))
      .catch(err => reject(err));
    }
    else{
     var sql = `delete from paymentAccount where accountNumber = ${accountNumber}`;
        console.log(accountNumber);
        return db.insert(sql);
    }
  });

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
          }','${req.name}', '${req.fullName}')`;
          return db.load(sql1);
        } else {
          var sql2 = `update reciverList set name = '${
            req.name
          }' where userId = ${req.userId} and accountNumber =${
            req.accountNumber
          }`;
          return db.load(sql2);
        }
      })
      .then(row => resolve(row))
      .catch(err => reject(err));
  });
};
exports.deleteinreciverlist = (userId, accountNumber) => {
  var sql = `delete from reciverList where userId = '${userId}' and accountNumber = '${accountNumber}'`;
  return db.insert(sql);
};
