var db = require('../fn/mysql-db');
var md5 = require('crypto-md5');
var dateTime = require('node-datetime');

exports.createAccount = acc => {
    var md5_pwd = md5(acc.passWord);
    var sql = `insert into account(userName,passWord,phone,name,email,permission) values('${acc.userName}','${md5_pwd}','${acc.phone}','${acc.name}','${acc.email}','0') `;// 0 in permission is user, accout create by employee default is 0
    return db.load(sql);
}
exports.createPaymentAccount = acc => {
    var dt = dateTime.create();
    var accNum = dt.format('YmdHMSN');
    var sql = `insert into paymentAccount(accountNumber,userId, balance) values('${accNum}',${acc.userId},${acc.balance})`;
    return db.load(sql);
}
exports.addBalance = acc => {
    var sql = `update paymentAccount set paymentAccount.balance = paymentAccount.balance + ${acc.plus} where accountNumber = '${acc.accountNumber}'`;
    return db.load(sql);
}