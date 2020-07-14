exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        {
          title: "my first note",
          content: "this is a very cool note",
          user_id: 2
        },
        {
          title: "my second note",
          content: "this is another very cool note",
          user_id: 3
        },
        { title: "third", content: "once again a cool note", user_id: 1 }
      ]);
    });
};
