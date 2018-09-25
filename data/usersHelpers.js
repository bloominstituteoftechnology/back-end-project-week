const db = require("./index.js");

function getUsers() {
  return db("users").select("id", "username");
}

function getUser(id) {
  return db("users").where({ id: id });
}

function getUserByUsername(username) {
  return db("users").where({ username: username });
}

function addUser(user) {
  return db("users").insert(user);
}

function updateUser(id, user) {
  return db("users")
    .where({ id: id })
    .update(user);
}

function deleteUser(id) {
  return db("users")
    .where({ id: id })
    .del();
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUserByUsername
};
