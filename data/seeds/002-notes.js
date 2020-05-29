exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  // return knex("notes")
  //   .truncate()
  //   .then(function() {
  //     // Inserts seed entries
  return knex("notes").insert([
    { title: "Note 1", content: "This is your first note" },
    { title: "Note 2", content: "This is your second note" },
    { title: "Note 3", content: "This is your third note" },
    { title: "Note 4", content: "This is your forth note" },
  ]);
  // });
};
