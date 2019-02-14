
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {tagTitle: 'single'},
        {tagTitle: 'single'},
        {tagTitle: 'double'}
      ]);
    });
};
