exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('notes').truncate().then(function() {
		// Inserts seed entries
		return knex('notes').insert([ { id: 1, title: 'this is a new title', content: 'this is new content' } ]);
	});
};
