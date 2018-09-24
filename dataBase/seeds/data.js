
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Note 1', content: 'some note data'},
        {title: 'Note 2', content: 'some note data'},
        {title: 'Note 3', content: 'some note data'}
      ]);
    });
};
