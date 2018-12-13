exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "a", password: "passwdggord" },
        { id: 2, username: "ann", password: "paffffgfhfssword" },
        { id: 3, username: "rogeralwValue3", password: "paffssword" }
      ]);
    });
};
