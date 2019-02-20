const knex = require('knex');
const dbConfig = require('../knexfile.js');
const db = knex(dbConfig.development);


module.exports={

	addNote: function(note) {
		return db('notes')
			.insert(note)
			.then(id => id);
	},

	getNote: function(noteId) {
		return db('notes')
			.where({ id: noteId })
			.then(note => note);
	},
};


