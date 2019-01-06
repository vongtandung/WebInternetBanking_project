var jwt = require("jsonwebtoken");
var rndToken = require("rand-token");
var moment = require("moment");

var db = require("../fn/mysql-db");

const SECRET = "ABCDEF";
const AC_LIFETIME = 600;

exports.generateAccessToken = userEntity => {
  var payload = {
    user: userEntity
  };
  var token = jwt.sign(payload, SECRET, {
    expiresIn: AC_LIFETIME
  });
  return token;
};

exports.verifyAccessToken = (req, res, next) => {
    var token = req.headers["x-access-token"];
    if (token) {
      jwt.verify(token, SECRET, (err, payload) => {
        if (err) {
          res.statusCode = 401;
          res.json({
            msg: "verify failed",
            error: err
          });
        } else {
          req.token_payload = payload;
          next();
        }
      });
    } else {
      res.statusCode = 403;
      res.json({
        msg: "NO TOKEN"
      });
    }
};

exports.generateRefreshToken = () => {
  const SIZE = 80;
  return rndToken.generate(SIZE);
};

exports.updateRefreshToken = (userId, rfToken) => {
  return new Promise((resolve, reject) => {
    var sql = `delete from userRefreshTokenExt where UserId = ${userId}`;
    db.insert(sql) // delete
      .then(value => {
        var rdt = moment().format("YYYY-MM-DD HH:mm:ss");
        sql = `insert into userRefreshTokenExt values(${userId}, '${rfToken}', '${rdt}')`;
        return db.insert(sql);
      })
      .then(value => resolve(value))
      .catch(err => reject(err));
  });
};
exports.verifyRefreshToken = refreshToken => {
    var sql = `select * from userRefreshTokenExt where refreshToken = '${refreshToken}'`;
    return db.load(sql);
}

exports.deleteRefreshToken = id => {
    var sql = `delete from userRefreshTokenExt where ID = ${id}`;
    return db.delete(sql);
}