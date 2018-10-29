const db = require('../dbConfig.js');

module.exports = {
	get: function(id) {
		let query = db('notes');
		if (id) query.where({ id });
		return query;
	},
	insert: function(note) {
		return db('notes')
			.insert(note)
			.then(([id]) => this.get(id));
	},
	update: function(id, note) {
		let query = db('notes');
		return query
			.where({ id })
			.update(note);
	},
	remove: function(id) {
		return db('notes')
			.where({ id })
			.del();
	},
};
