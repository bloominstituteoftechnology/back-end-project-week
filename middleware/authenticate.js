const jwt = require("jsonwebtoken");

const cl = console.log;
const secret = "idontknowactuallythatwouldprobablywork";

module.exports = {
  generateToken: user => {
    const payload = {
      userID: user.id
    };
    const options = {
      expiresIn: "1yr",
      jwtid: "12345"
    };
    return jwt.sign(payload, secret, options);
  },

  protected: (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
      jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "Invalid token" });
        } else {
          next();
        }
      });
    } else {
      res.status(401).json({ message: "No token provided" });
    }
  },

  getUserID: token => {
    if (token) {
      let userID = 0;
      jwt.verify(token, secret, (err, decodedToken) => {
        if (!err) {
          userID = decodedToken.userID;
        }
      });
      return userID;
    } else {
      return 0;
    }
  }
};
