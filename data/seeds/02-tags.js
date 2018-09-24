
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {tag: 'backendweek', note_id: 1},
        {tag: 'lambdanotes', note_id: 1},
        {tag: 'reactredux', note_id: 1},
      ]);
    });
};
