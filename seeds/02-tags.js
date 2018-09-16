
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags').del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        {id: 1, text: 'tag1', note_id:1},
        {id: 2, text: 'tag2', note_id:1},
        {id: 3, text: 'tag3', note_id:1},
        {id: 4, text: 'tag4', note_id:2},
        {id: 5, text: 'tag5', note_id:2},
        {id: 6, text: 'tag6', note_id:2},
        {id: 7, text: 'tag7', note_id:2},
      ]);
    });
};
