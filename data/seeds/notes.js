
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'songs to listen to', textBody: 'song1, song2'},
        {title: 'groceries', textBody: 'beef, lasagna, tomato sauce'},
        {title: 'favorite programming websites', textBody: 'freecodecamp.org'}
      ]);
    });
};
