exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "abc",
          password:
            "$2y$10$BllqXl8UkiG.YPDVtCKi2OAiZ5zSOW3CWOBsNcTDxGbh4OAJvCKHW"
        },
        {
          id: 2,
          username: "123",
          password:
            "$2y$10$BllqXl8UkiG.YPDVtCKi2OAiZ5zSOW3CWOBsNcTDxGbh4OAJvCKHW"
        },
        {
          id: 3,
          username: "abc123",
          password:
            "$2y$10$BllqXl8UkiG.YPDVtCKi2OAiZ5zSOW3CWOBsNcTDxGbh4OAJvCKHW"
        }
      ]);
    });
};
