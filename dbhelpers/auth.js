const knex = require("knex");
const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);


module.exports = {
  addUser:  (user,pass) => {
      return db("users").insert({ username: user, password: pass });
  },
  get: () => {
    return db("users");
  },
  getUsername: (username) => {
    return db("users")
    .where({username:username});
  },
  getUserID: (ID) =>{
    return db("users")
    .where({"id":ID})
  },
  deleteUser:(id)=>{
    return db("users")
    .where({"id":id})
    .del();
  },
};