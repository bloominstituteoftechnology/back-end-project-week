//helper methods for note API calls
const db = require("../dbConfig.js");

module.exports ={ 
   insert,
   findByUsername,
   findUsers,
   findById,
}

//insert user into database
function insert(user) {
   return db("users").insert(user);
}

function findByUsername(username){
   return db("users").where("username", username);
}

function findUsers() {
   return db("users").select("id", "username");
}

function findById(id){
   return db("users").where("id", id);
}