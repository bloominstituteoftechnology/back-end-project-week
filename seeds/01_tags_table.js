exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("tags")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tags").insert([
        { title: "testing", note_id: 1 },
        { title: "ipsum", note_id: 3 },
        { title: "example", note_id: 2 },
        { title: "example", note_id: 1 }
      ]);
    });
};
