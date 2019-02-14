
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'ONE', textBody: 'ONE text text text'},
        {title: 'TWO', textBody: 'TWO text text text'},
        {title: 'ELEVEN', textBody: 'ELEVEN text text text'}
      ]);
    });
};
