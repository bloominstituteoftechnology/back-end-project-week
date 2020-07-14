
exports.seed = function(knex, Promise) {
  return knex('notes').del()
    .then(function () {
      return knex('notes').insert([
        {note_title: 'INIT', url_title: 'init', note_content: 'INIT', userId: 1}
      ]);
    });
};
