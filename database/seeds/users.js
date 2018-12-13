exports.seed = function(knex) {
  return knex("users").insert([
    {
      username: "Adam",
      password: "pass"
    }
  ]);
};
