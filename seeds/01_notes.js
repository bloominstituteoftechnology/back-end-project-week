
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {title: 'Test Note #1', textBody: 'Call on W2'},
        {title: 'Test Note #2', textBody: 'File taxes'},
        {title: 'Test Note #3', textBody: 'Get Bread'}
      ]);
    });
};

