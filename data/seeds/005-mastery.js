exports.seed = function(knex, Promise) {
	// return knex('user-categories').truncate()
	// .then(function() {
		return knex('mastery').insert([
			//currently testing
      { flashcard_id: 1, category_id: 1, user_id: 1, last: false },
			{ flashcard_id: 2, category_id: 1, user_id: 1, last: false },
			{ flashcard_id: 3, category_id: 1, user_id: 1, last: false },
			{ flashcard_id: 1, category_id: 2, user_id: 1, last: false },
			{ flashcard_id: 2, category_id: 2, user_id: 1, last: false },
			{ flashcard_id: 3, category_id: 2, user_id: 1, last: false }
		]);
	// });
};
