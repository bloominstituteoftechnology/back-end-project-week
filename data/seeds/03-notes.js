
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'The Dank', content: 'Hello, the Dank', sort_id: 3 },
        { title: 'The Seer', content: 'Hello, the Seer', sort_id: 2 },
        { title: 'The Pole', content: 'Hello, the Pole', sort_id: 1 }
      ]);
    });
};
