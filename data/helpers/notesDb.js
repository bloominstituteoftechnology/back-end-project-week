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
	return db('notes').where({id: Number(id)});
}

function getByTitle(search){
        return db('notes').where('title', 'like', `%${search}%`);
}

function insert(note) {
  return db('notes')
    .insert(note)
    .then(ids => ({ id: ids[0] }));
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
