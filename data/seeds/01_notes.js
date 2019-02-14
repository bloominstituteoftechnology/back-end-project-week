
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Accountant Meeting', textBody: 'Discuss end of year taxes'},
        {title: 'Oscar Party', textBody: 'Buy snacks, drinks and order pizza'},
        {title: 'Karaoke Night', textBody: 'No more Oasis songs for wife'}
      ]);
    });
};
