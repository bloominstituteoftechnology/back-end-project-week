const db = require('../dbConfig.js');
  
module.exports = {
  get,
  getById,
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
