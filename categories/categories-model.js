const db = require('../data/dbConfig.js');

module.exports = {
    find,
    findBy,
    findByID,
    add,
    update,
    remove,
    findFlashcardsByCategoryID
}

function find(){
 return db('categories');
}

function findBy(filter) {
    return db("categories").where(filter);
  }

function findByID(id){
    return db('categories')
    .where({ id })
    .first();
}

function add(category){
    return db("categories")
    .insert(category, "id")
    .then(ids => {
      const [id] = ids;
      return findByID(id);
    });
}

function update(id, changes){
    return db('categories')
    .where({ id })
    .update(changes)
    .then(() =>{
        return findByID(id)
    });
}

function remove(id){
    return db("categories")
    .where("id", id)
    .del()
    .then(() =>{
        return id
    });
}

// get all flashcards with the same category ID
function findFlashcardsByCategoryID(id){
    return db("flashcards")
    .select("flashcards.id", "categories.name", "flashcards.frontCard", "flashcards.backCard")
    .join("categories", "flashcards.category_id", "categories.id")
    .where("category_id", id);
}