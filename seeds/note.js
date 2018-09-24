
exports.seed = function(knex, Promise) {
  return knex('notes').del()
    .then(function () {
      return knex('notes').insert([
        {id: 1, title: 'Your First Note!', text: 'You can edit or delete me :)'},
      ]);
    });
};
