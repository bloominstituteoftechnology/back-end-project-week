const content = 'insert random note content here'

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'note1', textBody: lorem},
        {title: 'note2', textBody: lorem},
        {title: 'note3', textBody: lorem}
      ]);
    });
};
