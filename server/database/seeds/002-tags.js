var faker = require("faker");

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("tags")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tags").insert([
        { id: 1, note_id: 1, tag: faker.random.word() },
        { id: 2, note_id: 1, tag: faker.random.word() },
        { id: 3, note_id: 2, tag: faker.random.word() },
        { id: 4, note_id: 2, tag: faker.random.word() },
        { id: 5, note_id: 3, tag: faker.random.word() },
        { id: 6, note_id: 3, tag: faker.random.word() }
      ]);
    });
};
