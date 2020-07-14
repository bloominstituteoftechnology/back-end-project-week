
exports.seed = function(knex, Promise) {
  return knex('notes')
    .del()
    .then(function () {
      return knex('notes').insert([
        {title: 'Testing 1', textBody: 'Testing 1'},
        {title: 'Lambda Notes', textBody: 'Front End'},
        {title: 'Lambda Notes', textBody: 'Back End'},
      ]);
    });
};
