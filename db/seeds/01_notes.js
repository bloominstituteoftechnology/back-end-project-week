
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'note #1', textBody: 'note #1 text body lorem ipsum blah blab bling', tags: 'tag1, tag1a', userId: 1},
        { title: 'note #2', textBody: 'note #2 text body lorem ipsum blah blab bling', tags: 'tag2, tag2a', userId: 4},
        { title: 'note #3', textBody: 'note #3 text body lorem ipsum blah blab bling', tags: 'tag3a, tag3c', userId: 3}
      ]);
    });
};

//$ knex seed:make 01_notes
//$ kenx seed:run