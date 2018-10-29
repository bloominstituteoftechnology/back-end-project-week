exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("table_name").insert([
        { id: 1, title: "Success", body: "Way to go champ!" },
        {
          id: 2,
          title: "Important",
          body: "Wow...look at all these notes!"
        },
        {
          id: 3,
          title: "Good Job",
          body: "Do not stop now! Keep pushing towards MVP!"
        }
      ]);
    });
};
