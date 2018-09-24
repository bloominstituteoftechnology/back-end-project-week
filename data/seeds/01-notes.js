exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('notes').insert([
        { id: 1, title: 'test1', content: 'testing' },
        { id: 2, title: 'test2', content: 'testing' },
        { id: 3, title: 'test3', content: 'testing' },
        {
          id: 4,
          title: 'How pleasant!',
          content: 'Something other than testing'
        },
        { id: 5, title: 'What!', content: 'Something other than testing' },
        { id: 6, title: 'Hello!', content: 'Something other than testing' },
        { id: 7, title: 'Stop!', content: 'Something other than testing' },
        { id: 8, title: 'Verify!', content: 'Something other than testing' },
        { id: 9, title: 'ABCD', content: 'Something other than testing' },
        { id: 10, title: 'No', content: 'Something other than testing' },
        { id: 11, title: 'More', content: 'Something other than testing' },
        { id: 12, title: 'Seed', content: 'Something other than testing' }
      ]);
    });
};
