
var express = require('express'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
cors = require('cors');
var accountCtrl = require('./apiControllers/accountController');
var employeeCtrl = require('./apiControllers/employeeController');
var bankingCtrl = require('./apiControllers/bankingController');
var verifyAccessToken = require('./repos/authRepo').verifyAccessToken;


var app= express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.multipart());

app.use('/api/employee/',verifyAccessToken,employeeCtrl);
app.use('/api/account/',accountCtrl);
app.use('/api/banking/',verifyAccessToken,bankingCtrl);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

var PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`API running on PORT ${PORT}`);
});