exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("tags")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("tags").insert([
        { title: "homework", note_id: 1 },
        { title: "chores", note_id: 2 }
      ]);
    });
};
