
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lnotes').del()
    .then(function () {
      // Inserts seed entries
      return knex('lnotes').insert([
        {id: 1, title: 'Note1', content:'This is note 1'},
        {id: 2, title: 'Note2', content: 'This is note 2'},
        {id: 3, title: 'Note3', content: 'This is note 3'}
      ]);
    });
};
