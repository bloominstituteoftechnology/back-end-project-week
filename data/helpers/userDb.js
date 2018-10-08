const db = require('../dbConfig.js');

module.exports = {
  getUserByName,
  add,
};


function getUserByName(username){
	const query = db('users').where('username', username);

    	return query.then(users => {
            return users[0];
    	});


        //return db('users').where('username', username);
}


function add(user) {
  return db('users')
    .insert(user)
    .returning('id')
    .then(ids => ids[0]);
}
