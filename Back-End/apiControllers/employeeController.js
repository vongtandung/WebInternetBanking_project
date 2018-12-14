var express = require("express"),
  moment = require("moment"),
  low = require("lowdb"),
  fileSync = require("lowdb/adapters/FileSync"),
  employeeRepo = require("../repos/employeeRepo");

var router = express.Router();

router.post("/createaccount", (req, res) => {
  employeeRepo
    .createAccount(req.body)
    .then(res.json("Create Success"))
    .catch(err => {
      console.log("err when create new account");
      res.end(err);
    });
});
router.post("/createpaymentaccount", (req, res) => {
  employeeRepo
    .createPaymentAccount(req.body)
    .then(row => {
      if (row != null) {
        res.json("Create Payment Account Success");
      }
    })
    .catch(err => {
      console.log("err when create new account");
      res.json("err when create new account");
    });
});
router.post("/addbalance",(req,res)=>{
  employeeRepo.addBalance(req.body)
  .then(row => {
    if (row != null) {
      res.json("add balance Success");
    }
  })
  .catch(err => {
    console.log("err when add balance");
    res.json("err when add balance");
  });
})
module.exports = router;
