exports.seed = function(knex, Promise) {
  return knex('notes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('notes').insert([
        {
          user_id: 1,
          title: 'Note 1 User 1',
          content: 'This is a note ya da da da'
        },
        {
          user_id: 1,
          title: 'Note 2 User 1',
          content: 'This is a note ya da da da'
        },
        {
          user_id: 1,
          title: 'Note 3 User 1',
          content: 'This is a note ya da da da'
        },
        {
          user_id: 2,
          title: 'Note 1 User 2',
          content: 'This is a note ya da da da'
        },
        {
          user_id: 2,
          title: 'Note 2 User 2',
          content: 'This is a note ya da da da'
        },
        {
          user_id: 3,
          title: 'Note 1 User 3',
          content: 'This is a note ya da da da'
        }
      ]);
    });
};
