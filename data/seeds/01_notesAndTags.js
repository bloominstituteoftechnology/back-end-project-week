exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notesAndTags")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notesAndTags").insert([
        { note_id: 1, tag_id: 1 },
        { note_id: 1, tag_id: 2 },
        { note_id: 1, tag_id: 5 },
        { note_id: 2, tag_id: 1 },
        { note_id: 2, tag_id: 4 },
        { note_id: 2, tag_id: 3 }
      ]);
    });
};
