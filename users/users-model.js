const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update,
  remove,
  findCategoriesByUserID
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function update(id, changes){
  return db('users')
  .where({ id })
  .update(changes)
  .then(() =>{
      return findByID(id)
  });
}

function remove(id){
  return db("users")
  .where("id", id)
  .del()
  .then(() =>{
      return id
  });
}

// get all flashcards with the same category ID
function findCategoriesByUserID(id){
  return db("user-categories")
  .select("user-categories.category_id", "user-categories.user_id","users.id", "users.username","categories.id", "categories.name")
  .leftJoin("users","user-categories.user_id", "users.id")
  .leftJoin("categories","user-categories.category_id", "categories.id")
  .where("users.id", id);
}