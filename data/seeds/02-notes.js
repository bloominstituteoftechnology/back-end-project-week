
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'The Dank', content: 'Hello, the Dank' },
        { title: 'The Seer', content: 'Hello, the Seer' },
        { title: 'The Pole', content: 'Hello, the Pole' }
      ]);
    });
};
