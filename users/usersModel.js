const db = require("../data/dbConfig.js");

module.exports = {
  fetch: () => {
    return db("users").select("username");
  },
  insert: user => {
    return db("users").insert(user);
  },
  fetchByUserName: username => {
    return db("users").where("username", username);
  }
};
