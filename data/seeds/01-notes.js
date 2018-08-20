exports.seed = function(knex, Promise) {
  return knex('notes')
    .del()
    .then(function() {
      return knex('notes').insert([
        {
          title: 'Note 0',
          content:
            'Content for Note 0',
        },
        {
          title: 'Note 1',
          content:
            'Content for Note 1',
        },
        {
          title: 'Note 2',
          content:
            'Content for Note 2',
        },
        {
          title: 'Note 3',
          content:
            'Content for Note 3',
        }
      ]);
    });
};
