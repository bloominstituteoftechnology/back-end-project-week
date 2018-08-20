
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('Notes').insert([
        {title: 'Test Note', content: 'This is test note, do not remove.'}
      ]);
    });
};
