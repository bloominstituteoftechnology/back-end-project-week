
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Test Note', textBody: 'This is a test note for testing purposes only.'},
      ]);
    });
};
