
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'note #1', textBody: 'note #1 text body lorem ipsum blah blab bling'},
        { title: 'note #2', textBody: 'note #2 text body lorem ipsum blah blab bling'},
        { title: 'note #3', textBody: 'note #3 text body lorem ipsum blah blab bling'}
      ]);
    });
};

//$ knex seed:make 01_notes
//$ kenx seed:run