exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        {
          title: "Notes App Starter",
          textBody: "This is just a test for environment setup"
        },
        {
          title: "Another Note App Starter file",
          textBody: "This is just another test to check seeding and migrations."
        }
      ]);
    });
};
