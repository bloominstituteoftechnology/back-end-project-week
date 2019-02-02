
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'example title 1',textBody: "Sample text body"},
        {id: 2, title: 'example title 2',textBody: "22222 Sample text body aaaa"},

      ]);
    });
};
