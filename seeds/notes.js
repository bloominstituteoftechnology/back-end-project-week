
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: '1st Note', content: 'Hey, just fyi that this is the first note.'},
        {title: '2nd Note', content: 'Newer content goes here.'},
        {title: '3rd Note', content: 'Whoa, check this out.'},
      ]);
    });
};
