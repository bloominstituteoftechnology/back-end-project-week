const db = require("../data/dbConfig.js");

module.exports = {
  fetch: () => {
    return db("users");
  },
  insert: user => {
    return db("users").insert(user);
  },
  fetchByUserName: username => {
    return db("users").where("username", username);
  }
};
