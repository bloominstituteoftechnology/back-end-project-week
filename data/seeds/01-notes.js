
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'note 1', textBody: 'message 1', editing: false},
        {title: 'note 2', textBody: 'message 2', editing: false},
        {title: 'note 3', textBody: 'message 3', editing: false}
      ]);
    });
};
