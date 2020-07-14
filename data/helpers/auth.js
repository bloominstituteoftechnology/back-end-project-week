const DB = require("../dbConfig");

module.exports = {
  registerUser,
  loginUser
};

function registerUser(user) {
  return DB("users").insert(user);
}

function loginUser(email) {
  return DB("users")
    .where("email", email)
    .first();
}
