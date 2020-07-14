exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        { title: "note1", textBody: "test" },
        { title: "note2", textBody: "test" }
      ]);
    });
};
