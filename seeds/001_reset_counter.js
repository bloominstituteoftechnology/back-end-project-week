
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('sqlite_sequence').del()
    .then(function () {
      // Inserts seed entries
      return knex('sqlite_sequence').insert([
        { name: 'notes', seq: 0}
      ]);
    });
};
