
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('tags').insert([
        { tag_name: 'tag1', note_id: 1 },
        { tag_name: 'tag2', note_id: 2 },
        { tag_name: 'tag3', note_id: 3 },
      ]);
    });
};