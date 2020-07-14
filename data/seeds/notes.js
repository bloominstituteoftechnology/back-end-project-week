
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes").truncate()
    .then(function () {
      // Inserts seed entries
      return knex("notes").insert([
        {title: 'note1', note:' This is note 1'},
        {title: 'note2',note:'This is note 2'},
        {title: 'note3', note:'this is note 3'}
      ]);
    });
};
