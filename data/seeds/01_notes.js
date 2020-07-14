
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Accountant Meeting', textBody: 'Discuss end of year taxes', tags: 'finances'},
        {title: 'Oscar Party', textBody: 'Buy snacks, drinks and order pizza', tags: 'entertainment'},
        {title: 'Karaoke Night', textBody: 'No more Oasis songs for wife', tags: 'hobbies'}
      ]);
    });
};
