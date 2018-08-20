
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { id: 1, title: 'Title Seed 1', content: 'Content Seed 1' },
        { id: 2, title: 'Title Seed 2', content: 'Content Seed 2' },
        { id: 3, title: 'Title Seed 3', content: 'Content Seed 3' }
      ]);
    });
};
