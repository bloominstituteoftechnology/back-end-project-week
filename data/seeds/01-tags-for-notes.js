exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('tags_for_notes').del();
  // .then(function() {
  //   // Inserts seed entries
  //   return knex('tags_for_notes').insert([
  //     { note_id: 1, tag_id: 1 },
  //     { note_id: 2, tag_id: 2 },
  //     { note_id: 3, tag_id: 3 }
  //   ]);
  // });
};
