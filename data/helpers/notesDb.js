const db = require('../dbConfig.js');
  
module.exports = {
  get,
  getById,
  getByTitle,	
  insert,
  update,
  remove,
};

function get(){
        return db('notes');
}

function getById(id){
const query = db('notes').where('id', id);

    return query.then(notes => {
            return notes[0];
    });	
}

function getByTitle(search){
	//var test = search.toLowerCase();
	//return knex('notes').whereRaw(`LOWER(title) LIKE ?`,[`%${test}%`]);
        return db('notes').where('title', 'ilike', `%${search}%`);
}

function insert(note) {
  return db('notes')
    .insert(note)
    .then(ids => ids[0]);	
    //.then(ids => ({ id: ids[0] }));
}


function update(id, note){
	return db('notes')
	       .where({id: Number(id)})
	       .update(note);
}

function remove(id){
	return db('notes')
	       .where({id: Number(id)})
	       .del();
}
