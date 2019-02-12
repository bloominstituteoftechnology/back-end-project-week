
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'title ONE', textBody: 'ONE text text text'},
        {title: 'title TWO', textBody: 'TWO text text text'},
        {title: 'title THREE', textBody: 'THREE text text text'}
      ]);
    });
};
