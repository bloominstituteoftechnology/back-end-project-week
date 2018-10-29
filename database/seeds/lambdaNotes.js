exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'note 1', content: 'content for note 1' },
        { title: 'note 2', content: 'content for note 2' },
        { title: 'note 3', content: 'content for note 3' }
      ]);
    });
};