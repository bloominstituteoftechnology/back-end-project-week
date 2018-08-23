
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {_id: 1, title: '1 NOTE TITLE ONE', textBody: '1 This is the text body for note one'},
        {_id: 2, title: '2 NOTE TITLE TWO', textBody: '2 This is the text body for note two'},
        {_id: 3, title: '3 NOTE TITLE THREE', textBody: '3 This is the text body for note three'}
      ]);
    });
};
