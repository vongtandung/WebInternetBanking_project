var db = require('../fn/mysql-db');
var dateTime = require('node-datetime')

exports.getPaymentAccountById = (userId)=>{
    var sql = `select accountNumber, balance from paymentAccount where userId = ${userId}`;
    return db.load(sql);
}
exports.getInfoByAccountNumber = (accountNumber)=>{
    var sql = `select account.name, account.phone, account.email, paymentAccount.accountNumber from paymentAccount, account where paymentAccount.userId = account.id and paymentAccount.accountNumber =${accountNumber}`;
    return db.load(sql);
}
exports.addBalance = (plus,accountNumber) => {
    var sql = `update paymentAccount set paymentAccount.balance = paymentAccount.balance + ${plus} where accountNumber = '${accountNumber}'`;
    return db.load(sql);
}
exports.subtractBalance = (sub, accountNumber) => {
    var sql = `update paymentAccount set paymentAccount.balance = paymentAccount.balance - ${sub} where accountNumber = '${accountNumber}'`;
    return db.load(sql);
}
exports.addTransHistory = (req) => {
    var dt = dateTime.create();
    var transId = dt.format('ymdHMSN');
    var time = dt.format('Y/m/d H:M:S:N');
    var sql = `insert into transactionHistory values('${transId}','${req.sendAccount}','${req.reciveAccount}', '${req.amount}','${req.note}','${time}')`;
    return db.insert(sql);
}
exports.getTransHistory= (accountNumber) => {
    var sql = `select * from transactionHistory where sendAccount = ${accountNumber} or reciveAccount =${accountNumber}`;
    return db.load(sql);
}
exports.countPaymentAccountOfUser = (userId) => {
    var sql = `select count(*) as count from paymentAccount where userId=${userId}`;
    return db.load(sql);
}
exports.getBalance = (accountNumber) => {
    var sql = `select balance from paymentAccount where accountNumber =${accountNumber}`;
    return db.load(sql);
}
exports.deletePaymentAccount = (accountNumber)=> {
    var sql = `delete  from paymentAccount where accountNumber = ${accountNumber}`;
    return db.load(sql);
}