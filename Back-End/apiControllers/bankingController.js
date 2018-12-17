var express = require("express"),
  moment = require("moment"),
  low = require("lowdb"),
  fileSync = require("lowdb/adapters/FileSync"),
  bankingRepo = require("../repos/bankingRepo");

var router = express.Router();

router.post("/getpaymentaccount", (req, res) => {
  bankingRepo
    .getPaymentAccountById(req.body.userId)
    .then(row => {
      if (row.length > 0) {
        res.json({ "return code": 1, data: row });
      } else
        res.json({
          "return mess": "haven't payment account",
          "return code": -1
        });
    })
    .catch(err => {
      console.log(err);
      res.json({
        "return mess": "can't load payment account",
        "return code": -1
      });
    });
});
router.post("/getinfobyaccountNumber", (req, res) => {
  bankingRepo
    .getInfoByAccountNumber(req.body.accountNumber)
    .then(row => {
      if (row.length > 0) {
        res.json({ "return code": 1, data: row });
      } else {
        res.json({
          "return mess": "This account Number is not available",
          "return code": -1
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json({
        "return mess": "error",
        "return code": -1
      });
    });
});
router.post("/transfer", (req, res) => {
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
            if (row.length > 0) {
              bankingRepo
                .addBalance(req.body.amount, req.body.reciveAccout)
                .then(row => {
                  if (row.length > 0) {
                    bankingRepo
                      .addTransHistory(req.body)
                      .then(
                        res.json({
                          "return code": "1",
                          "return mess": "trans success"
                        })
                      )
                      .catch(err => {
                        console.log(err);
                        res.end(
                          res.json({
                            "return code": "-1",
                            "return mess": "trans fail"
                          })
                        );
                        // revert balance
                      });
                  } else {
                    console.log(err);
                    res.end(
                      res.json({
                        "return code": "-1",
                        "return mess": "trans fail"
                      })
                    );
                    // revert balance
                  }
                })
                .catch(err => {
                  console.log(err);
                  res.end(
                    res.json({
                      "return code": "-1",
                      "return mess": "trans fail"
                    })
                  );
                  // revert balance
                });
            } else {
              res.end(
                res.json({ "return code": "-1", "return mess": "trans fail" })
              );
            }
          })
          .catch(err => {
            console.log(err);
            res.end(
              res.json({ "return code": "-1", "return mess": "trans fail" })
            );
          });
      } else {
        res.end(
          res.json({ "return code": "-1", "return mess": "no enough money" })
        );
      }
    })
    .catch(err => {
      console.log(err);
      res.end(res.json({ "return code": "-1", "return mess": "trans fail" }));
    });
});
router.post("/gettranshistory", (req, res) => {
  bankingRepo
    .getTransHistory(req.body.accountNumber)
    .then(row => {
      res.json({ "return code": 1, data: row });
    })
    .catch(err => {
      console.log(err);
      res.json({ "return code": -1, "return mess": "can't load history" });
    });
});
router.post("/deletepaymentaccount", (req, res) => {
  bankingRepo.countPaymentAccountOfUser(req.body.userId).then(row => {
    if (row[0].count > 1) {
      bankingRepo.getBalance(req.body.accountNumber).then(balance => {
        if (balance[0].balance <= 0) {
          bankingRepo
            .deletePaymentAccount(req.body.accountNumber)
            .then(
              res.json({ "return code": 1, "return mess": "delete success" })
            )
            .catch(err => {
              console.log(err);
              res.json({ "return code": -1, "return mess": "delete fail" });
            });
        } else {
          res.json({
            "return mess": "Balnace is more than 0",
            "return code": "-1"
          });
        }
      });
    } else {
      res.json({
        "return mess": "account have less than 1 payment account",
        "return code": "-1"
      });
    }
  });
});
module.exports = router;
