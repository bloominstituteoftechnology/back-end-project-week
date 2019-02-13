const db = require('../data/dbConfig.js');

module.exports = {
   getAll,
   findById,
   insert,
   update,
   remove,
};

async function getAll() {
   return db("notes");
}

async function findById(id) {
   return db("notes").where("id", id);
}

async function insert(){
   return null;
}
async function update(id){
   return null;
}
async function remove(id){
   return null;
}