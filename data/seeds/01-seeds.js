exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("table_name").insert([
        { id: 1, title: "Success", content: "Way to go champ!" },
        {
          id: 2,
          title: "Important",
          content: "Wow...look at all these notes!"
        },
        {
          id: 3,
          title: "Good Job",
          content: "Do not stop now! Keep pushing towards MVP!"
        }
      ]);
    });
};
