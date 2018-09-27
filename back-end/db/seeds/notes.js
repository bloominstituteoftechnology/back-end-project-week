
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'First Note', body: 'First Note Body'},
        {title: 'Second Note', body: 'Second Note Body'},
        {title: 'Third Note', body: 'Third Note Body'}
      ]);
    });
};
