exports.seed = function(knex, Promise) {
  return knex('notes').del()
    .then(function () {
      return knex('notes').insert([
        { id: 1,
          title: 'A title',
          content: 'This is the first note.',
          user_id: 1
        },
        { id: 2,
          title: 'Another title',
          content: 'This is the second note.',
          user_id: 1
        },
        { id: 3,
          title: 'Yet another title',
          content: 'This is the third note.',
          user_id: 1
        },
      ]);
    });
};
