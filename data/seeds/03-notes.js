
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        // NOTES FOR ID 1
        { title: 'The Dank', content: 'Hello, the Dank', user_id: 1 },
        { title: 'The Seer', content: 'Hello, the Seer', user_id: 1 },
        { title: 'The Pole', content: 'Hello, the Pole', user_id: 1 },
        { title: 'The Nuns', content: 'Hello, the Nuns', user_id: 1 },
        { title: 'The Wank', content: 'Hello, the Wank', user_id: 1 },
        { title: 'The Wank', content: 'Hello, the Wank', user_id: 1 },
        // NOTES FOR ID 2
        { title: 'User 2', content: 'User 2', user_id: 2 },
        { title: 'User 2', content: 'User 2', user_id: 2 },
        { title: 'User 2', content: 'User 2', user_id: 2 },
        { title: 'User 2', content: 'User 2', user_id: 2 },
        { title: 'User 2', content: 'User 2', user_id: 2 },
        { title: 'User 2', content: 'User 2', user_id: 2 },
        // NOTES FOR ID 3
        { title: 'User 3', content: 'User 3', user_id: 3 },
        { title: 'User 3', content: 'User 3', user_id: 3 },
        { title: 'User 3', content: 'User 3', user_id: 3 },
        { title: 'User 3', content: 'User 3', user_id: 3 },
        { title: 'User 3', content: 'User 3', user_id: 3 },
        { title: 'User 3', content: 'User 3', user_id: 3 },
      ]);
    });
};
