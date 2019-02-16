exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("tags")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("tags").insert([
        { tag: "tag1" },
        { tag: "tag2" },
        { tag: "tag3" },
        { tag: "tag4" }
      ]);
    });
};
