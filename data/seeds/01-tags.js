exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        { title: "note1", content: "Hello from note1", tags: "tag1" },
        { title: "note2", content: "Hello from note2", tags: "tag2" },
        { title: "note3", content: "Hello from note3", tags: "tag3" }
      ]);
    });
};
