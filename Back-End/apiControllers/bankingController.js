var express = require("express"),
  moment = require("moment"),
  low = require("lowdb"),
  fileSync = require("lowdb/adapters/FileSync"),
  bankingRepo = require("../repos/bankingRepo");
const nodemailer = require("nodemailer");

var router = express.Router();

router.post("/getpaymentaccount", (req, res) => {
  bankingRepo
    .getPaymentAccountById(req.body.userId)
    .then(row => {
      if (row.length > 0) {
        res.json({ return_code: 1, return_mess: "success", data: row });
      } else
        res.json({
          return_mess: "haven't payment account",
          return_code: -1
        });
    })
    .catch(err => {
      console.log(err);
      res.json({
        return_mess: "can't load payment account",
        return_code: -1
      });
    });
});
router.post("/getinfobyaccountNumber", (req, res) => {
  bankingRepo
    .getInfoByAccountNumber(req.body.accountNumber)
    .then(row => {
      if (row.length > 0) {
        res.json({ return_code: 1, return_mess: "get success", data: row });
      } else {
        res.json({
          return_mess: "This account Number is not available",
          return_code: -1
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
        return_mess: "error",
        return_code: -1
      });
    });
});
router.post("/transfer", (req, res) => {
  bankingRepo.verifyotp(req.body.email).then(row => {
    var dt = moment().format("YYYY-MM-DD HH:mm:ss");
    var date = new Date(dt);
    var period = date - row[0].time;
    if (row[0].otpnum == req.body.otp && period < 300000) {
      bankingRepo
        .getBalance(req.body.sendAccount)
        .then(row => {
          if (row[0].balance > req.body.amount) {
            bankingRepo
              .subtractBalance(
                req.body.amount,
                req.body.sendAccount,
                row[0].balance
              )
              .then(row => {
                bankingRepo
                  .addBalance(req.body.amount, req.body.reciveAccount)
                  .then(row => {
                    bankingRepo
                      .addTransHistory(req.body, "Trans")
                      .then(
                        res.json({
                          return_code: "1",
                          return_mess: "trans success"
                        })
                      )
                      .catch(err => {
                        console.log(err);
                        bankingRepo
                          .subtractBalance(
                            req.body.amount,
                            req.body.reciveAccount
                          )
                          .then(
                            bankingRepo
                              .addBalance(req.body.amount, req.body.sendAccount)
                              .then(
                                res.end(
                                  res.json({
                                    return_code: "-1",
                                    return_mess: "trans fail 1"
                                  })
                                )
                              )
                          );
                      });
                  })
                  .catch(err => {
                    console.log(err);
                    bankingRepo
                      .addBalance(req.body.amount, req.body.sendAccount)
                      .then(
                        res.end(
                          res.json({
                            return_code: "-1",
                            return_mess: "trans fail 3"
                          })
                        )
                      );
                  });
              })
              .catch(err => {
                console.log(err);
                res.end(
                  res.json({
                    return_code: "-1",
                    return_mess: "trans fail 5"
                  })
                );
              });
          } else {
            res.end(
              res.json({
                return_code: "-1",
                return_mess: "no enough money"
              })
            );
          }
        })
        .catch(err => {
          console.log(err);
          res.end(res.json({ return_code: "-1", return_mess: "trans fail 6" }));
        });
    } else {
      res.end(res.json({ return_code: "-1", return_mess: "OTP Wrong" }));
    }
  });
});
router.post("/gettranshistory", (req, res) => {
  bankingRepo
    .getTransHistory(req.body.accountNumber)
    .then(row => {
      res.json({ return_code: 1, return_mess: "success", data: row });
    })
    .catch(err => {
      console.log(err);
      res.json({ return_code: -1, return_mess: "can't load history" });
    });
});
router.post("/deletepaymentaccount", (req, res) => {
  bankingRepo.countPaymentAccountOfUser(req.body.userId).then(row => {
    if (row[0].count > 1) {
      bankingRepo.getBalance(req.body.accountNumber).then(balance => {
        if (balance[0].balance <= 0) {
          bankingRepo
            .deletePaymentAccount(req.body.accountNumber)
            .then(res.json({ return_code: 1, return_mess: "delete success" }))
            .catch(err => {
              console.log(err);
              res.json({ return_code: -1, return_mess: "delete fail" });
            });
        } else {
          res.json({
            return_mess: "Balnace is more than 0",
            return_code: "-1"
          });
        }
      });
    } else {
      res.json({
        return_mess: "account have less than 1 payment account",
        return_code: "-1"
      });
    }
  });
});
router.post("/send", async function(req, res) {
  response = {
    name: req.body.name,
    email: "lovemoneybanking@gmail.com"
  };

  var get = (await Math.random()) * (999999 - 100000) + 100000;
  var otp = parseInt(get);
  var mailOptions = {
    from: req.body.name,
    to: req.body.reciver,
    subject: "Xác Nhận OTP Giao Dịch Trên Smart Banking",
    html:
      "Xin Chào " +
      "<b>" +
      req.body.name +
      "</b>" +
      "<br></br> SmartBanking xin chân thành cảm ơn bạn đã sử dụng dịch vụ của chúng tôi " +
      '<br></br> Vui lòng xác nhận giao dịch của bạn bằng cách nhập mã sau vào màn hình xác nhận <br></br> <div style="text-align: center; padding: 2em">Mã Xác Nhận <br></br><span style="border:1px solid black; font-size: 20px"><b>' +
      otp +
      "</b></span></div> <br></br> mã xác nhận chỉ có hiệu lực trong vòng 5 phút <br></br> cảm ơn bạn đã sử dụng smartbanking <br></br><b>Smart banking</b>"
  };
  var transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lovemoneybanking@gmail.com",
      pass: "dung2609"
    }
  });
  var rdt = moment().format("YYYY-MM-DD HH:mm:ss");
  bankingRepo.opt(req.body.reciver, otp, rdt).then(
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        return console.log(err);
      } else {
        console.log(JSON.stringify(res));
      }
    })
  );
});
router.post("/getreciverlist", (req, res) => {
  bankingRepo
    .getreciverlist(req.body.userId)
    .then(row => {
      res.json({
        return_code: 1,
        return_mess: "get reciver list success",
        data: row
      });
    })
    .catch(res.end(res.json({ return_code: -1, return_mess: "fail" })));
});
router.post("/savenewreciver", (req, res) => {
  bankingRepo
    .savereciverlist(req.body)
    .then(
      res.json({
        return_code: 1,
        return_mess: "save reciver list success"
      }))
    .catch(err =>{res.json({ return_code: -1, return_mess: "fail" })});
});
module.exports = router;
