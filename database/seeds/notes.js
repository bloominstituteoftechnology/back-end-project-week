
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {title: 'Note #1', note: 'This is note #1', edittoggle: false},
        {title: 'Note #2', note: 'This is note #2', edittoggle: false},
        {title: 'Note #3', note: 'This is note #3', edittoggle: false},
      ]);
    });
};
