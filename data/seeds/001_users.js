exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { username: "bob", password: "123" },
        { username: "john", password: "123" },
        { username: "doe", password: "123" }
      ]);
    });
};
