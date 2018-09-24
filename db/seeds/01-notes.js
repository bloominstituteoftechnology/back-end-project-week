
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'test 01', textBody: '123'},
        { title: 'test 02', textBody: '345'},
        { title: 'test 03', textBody: '567'}
      ]);
    });
};
