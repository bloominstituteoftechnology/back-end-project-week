exports.seed = function(knex, Promise) {
	// return knex('user-categories').truncate()
	// .then(function() {
		return knex('user-categories').insert([
			//currently testing
			{ user_id: 1, category_id: 1, categoryTesting: true },
			{ user_id: 1, category_id: 2, categoryTesting: true },
			{ user_id: 1, category_id: 3, categoryTesting: true },

			{ user_id: 2, category_id: 1, categoryTesting: true },
			{ user_id: 2, category_id: 2, categoryTesting: false },
			{ user_id: 2, category_id: 3, categoryTesting: true }
		]);
	// });
};
