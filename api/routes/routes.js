const { authenticate } = require("../utils/middlewares");

const { userRegister, userLogin } = require("../controllers");

module.exports = server => {
  server.route("/api/register").post(userRegister);
  server.route("/api/login").post(userLogin);
};
