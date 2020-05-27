exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  // return knex("notes")
  //   .truncate()
  //   .then(function() {
  //     // Inserts seed entries
  return knex("notes").insert([
    { title: "Reminder", content: "Walk Dog", noteTesting: "true" },
    { title: "Todo", content: "Sleep", noteTesting: "true" },
    { title: "Science", content: "E=MC2", noteTesting: "true" },
  ]);
  // });
};
