const db = require("../dbConfig");

module.exports = {
  get,
  insert
};

function get(username) {
  const query = db("users");
  if (username) return query.where({ username: username }).first();
  return query;
}

function insert(newUser) {
  return db("users").insert(newUser);
}
