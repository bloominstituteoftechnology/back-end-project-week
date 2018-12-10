exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        { title: "my first note", content: "this is a very cool note" },
        { title: "my second note", content: "this is another very cool note" },
        { title: "third", content: "once again a cool note" }
      ]);
    });
};
