exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("tags")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("tags").insert([
        { id: 1, note_id: 1, tag: "tag 1 content 1 note_id 1" },
        { id: 2, note_id: 2, tag: "tag 2" },
        { id: 3, note_id: 3, tag: "tag 3" }
      ]);
    });
};
