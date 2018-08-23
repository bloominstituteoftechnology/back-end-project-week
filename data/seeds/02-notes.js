
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('Notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('Notes').insert([
        {
          title: 'Test Note 1',
          content: 'This is test note, do not remove.',
          user_id: 1
        },
        {
          title: 'Test Note 2',
          content: 'This is test note, do not remove.',
          user_id: 1
        },
        {
          title: 'Test Note 3',
          content: 'This is test note, do not remove.',
          user_id: 2
        },
        {
          title: 'Test Note 4',
          content: 'This is test note, do not remove.',
          user_id: 2
        }
      ]);
    });
};
