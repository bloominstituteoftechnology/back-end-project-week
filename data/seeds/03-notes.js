exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'test1', content: 'testing' },
        { title: 'test2', content: 'testing' },
        { title: 'test3', content: 'testing' },
        {
          title: 'How pleasant!',
          content: 'Something other than testing'
        },
        { title: 'What!', content: 'Something other than testing' },
        { title: 'Hello!', content: 'Something other than testing' },
        { title: 'Stop!', content: 'Something other than testing' },
        { title: 'Verify!', content: 'Something other than testing' },
        { title: 'ABCD', content: 'Something other than testing' },
        { title: 'No', content: 'Something other than testing' },
        { title: 'More', content: 'Something other than testing' },
        { title: 'Seed', content: 'Something other than testing' }
      ]);
    });
};
