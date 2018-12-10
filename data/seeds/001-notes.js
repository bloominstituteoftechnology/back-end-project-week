
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Test1', textBody: 'Hello World'},
        {title: 'Test2', textBody: 'Whats Up.'},
        {title: 'Test3', textBody: 'Hows it going?'}
      ]);
    });
};
