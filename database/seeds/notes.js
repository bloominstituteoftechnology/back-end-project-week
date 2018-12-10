exports.seed = knex =>
  knex("notes")
    .truncate()
    .then(() =>
      knex("notes").insert([{ title: "test", content: "test", user_id: 1 }])
    );
