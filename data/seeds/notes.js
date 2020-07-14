
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Test', textBody: 'This is a test note'},
        {title: 'Hello World', textBody: 'Just saying hi!'},
        {title: 'Launch!', textBody: 'Houston, we have liftoff!'}
      ]);
    });
};
