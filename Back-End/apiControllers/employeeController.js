var express = require("express"),
  moment = require("moment"),
  low = require("lowdb"),
  fileSync = require("lowdb/adapters/FileSync"),
  employeeRepo = require("../repos/employeeRepo");
bankingRepo = require("../repos/bankingRepo");

var router = express.Router();

router.post("/createaccount", (req, res) => {
  employeeRepo
    .createAccount(req.body)
    .then(res.json({ return_code: 1, return_mess: "create success" }))
    .catch(err => {
      console.log("err when create new account");
      res.json({ return_code: -1, return_mess: "cretae fail" });
    });
});
router.post("/createpaymentaccount", (req, res) => {
  employeeRepo
    .createPaymentAccount(req.body)
    .then(row => {
      if (row != null) {
        res.json({ return_code: 1, return_mess: "create success" });
      }
    })
    .catch(err => {
      console.log("err when create new account");
      res.json({ return_code: -1, return_mess: "create fail" });
    });
});
router.post("/addbalance", (req, res) => {
  employeeRepo
    .addBalance(req.body)
    .then(row => {
      if (row != null) {
        bankingRepo
          .addTranshistory(req.body, "Add Balance")
          .then(
            res.json({ return_code: 1, return_mess: "add balance success" })
          );
      }
    })
    .catch(err => {
      console.log("err when add balance");
      res.json({ return_code: -1, return_mess: "add balance fail" });
    });
});
module.exports = router;
