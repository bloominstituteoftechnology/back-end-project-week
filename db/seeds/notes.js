exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        { title: "Note 1", contents: "This is only a test" },
        { title: "Note 2", contents: "This is only a test" },
        { title: "Note 3", contents: "This is only a test" },
        { title: "Note 4", contents: "This is only a test" },
        { title: "Note 5", contents: "This is only a test" }
      ]);
    });
};
