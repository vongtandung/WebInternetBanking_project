var express = require("express"),
  moment = require("moment"),
  low = require("lowdb"),
  fileSync = require("lowdb/adapters/FileSync"),
  employeeRepo = require("../repos/employeeRepo");

var router = express.Router();

router.post("/createaccount", (req, res) => {
  employeeRepo
    .createAccount(req.body)
    .then(res.json({"return code":1,"return mess": "create success"}))
    .catch(err => {
      console.log("err when create new account");
      res.json({"return code":-1,"return mess": "cretae fail"})
    });
});
router.post("/createpaymentaccount", (req, res) => {
  employeeRepo
    .createPaymentAccount(req.body)
    .then(row => {
      if (row != null) {
        res.json({"return code":1,"return mess": "create success"});
      }
    })
    .catch(err => {
      console.log("err when create new account");
      res.json({"return code":-1,"return mess": "create fail"})
    });
});
router.post("/addbalance",(req,res)=>{
  employeeRepo.addBalance(req.body)
  .then(row => {
    if (row != null) {
      res.json({"return code":1,"return mess": "add balance success"});
    }
  })
  .catch(err => {
    console.log("err when add balance");
    res.json({"return code":-1,"return mess": "add balance fail"});
  });
})
module.exports = router;
