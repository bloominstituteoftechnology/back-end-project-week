exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        { title: "first note here", textBody: "This is the first note of the table here." },
        { title: "second note", textBody: "hello back end project" }
      ]);
    });
};
