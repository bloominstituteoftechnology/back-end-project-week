exports.seed = knex =>
  knex("users")
    .truncate()
    .then(() => knex("users").insert([{ username: "test", password: "test" }]));
