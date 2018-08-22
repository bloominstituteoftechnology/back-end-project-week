
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        { id: 1, tag: 'seed1', note_id: 1 },
        { id: 2, tag: 'seed2', note_id: 2 },
        { id: 3, tag: 'seed3', note_id: 3 }
      ]);
    });
};
