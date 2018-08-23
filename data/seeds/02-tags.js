
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        { tag: 'Test 1', note_id: 1 },
        { tag: 'Test 2', note_id: 1 },
        { tag: 'Test 3', note_id: 2 }
      ]);
    });
};
