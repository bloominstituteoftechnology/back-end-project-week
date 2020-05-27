const db = require('../data/dbConfig.js');

module.exports = {
    find,
    findBy,
    findByID,
    add,
    update,
	remove
}

function find(){
 return db('flashcards');
}

function findBy(filter) {
    return db("flashcards").where(filter);
  }

function findByID(id){
    return db('flashcards')
    .where({ id })
    .first();
}

function add(flashcard){
    return db("flashcards")
    .insert(flashcard, "id")
    .then(ids => {
      const [id] = ids;
      return findByID(id);
    });
}

function update(id, changes){
    return db('flashcards')
    .where({ id })
    .update(changes)
    .then(() =>{
        return findByID(id)
    });
}

function remove(id){
    return db("flashcards")
    .where("id", id)
    .del()
    .then(() =>{
        return id
    });
}