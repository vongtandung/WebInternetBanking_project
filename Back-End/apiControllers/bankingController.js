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
        res.json(row);
      } else res.json("haven't payment account");
    })
    .catch(err => {
      console.log(err);
      res.json("can't load payment account");
    });
});
router.post("/getinfobyaccountNumber", (req, res) => {
  bankingRepo
    .getInfoByAccountNumber(req.body.accountNumber)
    .then(row => {
      if (row.length > 0) {
        res.json(row);
      } else {
        res.json("This account Number is not available");
      }
    })
    .catch(err => {
      console.log(err);
      res.json("fail");
    });
});
router.post("/transfer", (req, res) => {
  bankingRepo
    .subtractBalance(req.body.amount, req.body.sendAccount)
    .then(row => {
      bankingRepo
        .addBalance(req.body.amount, req.body.reciveAccount)
        .then(
          bankingRepo
            .addTransHistory(req.body)
            .then(res.json("Success"))
            .catch(err => {
              console.log(err);
              res.json("trans fail");
            })
        )
        .catch(err => {
          console.log(err);
          bankingRepo
            .addBalance(req.body.amount, req.body.sendAccount)
            .then(res.json("trans fail"));
        });
    });
});
router.post("/gettranshistory", (req, res) => {
  bankingRepo
    .getTransHistory(req.body.accountNumber)
    .then(row => {
      res.json(row);
    })
    .catch(err => {
      console.log(err);
      res.json("can't load history");
    });
});
router.post("/deletepaymentaccount", (req, res) => {
  bankingRepo.countPaymentAccountOfUser(req.body.userId).then(row => {
    if (row[0].count > 1) {
      bankingRepo.getBalance(req.body.accountNumber).then(balance => {
        if (balance[0].balance <= 0) {
          bankingRepo
            .deletePaymentAccount(req.body.accountNumber)
            .then(res.json("delete succes"))
            .catch(err => {
              console.log(err);
              res.json("delete fail");
            });
        }
        else{
          res.json("balance more than 0");
        }
      });
    }
    else{
      res.json("must have more than 0 account");
    }
  });
});
module.exports = router;
