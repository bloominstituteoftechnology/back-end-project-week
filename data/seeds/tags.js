exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("tags")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("tags").insert([
        {note_id: 1, tag: "test"},
        {note_id: 1, tag: "note"},
        {note_id: 1, tag: "lambda"},
        {note_id: 2, tag: "test"},
        {note_id: 3, tag: "test"}
      ]);
    });
};
