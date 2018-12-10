exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        {id: 1, title: "Note 1", content: "sample note"},
        {id: 2, title: "Note 2", content: "sample note"},
        {id: 3, title: "Note 3", content: "sample note"}
      ]);
    });
};
