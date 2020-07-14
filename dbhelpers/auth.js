const knex = require("knex");
const dbEngine = process.env.DB || 'development';
const config = require('../knexfile.js')[dbEngine];
const db = knex(config);


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