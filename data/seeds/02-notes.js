exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('notes').insert([
        {
          id: 1,
          title: 'note #1',
          content: 'this is the first note. how sweet is that?',
          u_id: 1,
        },
        { id: 2, title: 'awesome', content: 'awesome sauce!', u_id: 1 },
        { id: 3, title: 'best note!', content: 'penny was here', u_id: 2 },
      ]);
    });
};
