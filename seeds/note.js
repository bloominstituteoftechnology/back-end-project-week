
exports.seed = function(knex, Promise) {
  return knex('notes').del()
    .then(function () {
      return knex('notes').insert([
        {id: 1, title: 'Your First Note!', text: 'You can edit or delete me :)'},
        {id: 2, title: 'testing', text: 'helo'},
        {id: 3, title: '123', text: 'waw'}
      ]);
    });
};
