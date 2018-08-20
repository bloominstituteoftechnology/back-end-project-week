var faker = require("faker");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        { id: 1, title: faker.random.words(), textBody: faker.hacker.phrase() },
        { id: 2, title: faker.random.words(), textBody: faker.hacker.phrase() },
        { id: 3, title: faker.random.words(), textBody: faker.hacker.phrase() }
      ]);
    });
};
