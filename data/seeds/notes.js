exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        {id: 1, title: "Note 1", textBody: "sample note"},
        {id: 2, title: "Note 2", textBody: "sample note"},
        {id: 3, title: "Note 3", textBody: "sample note"}
      ]);
    });
};
