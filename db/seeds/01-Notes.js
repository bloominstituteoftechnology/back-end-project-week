exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("Notes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("Notes").insert([
        { id: 1, title: "title1", content: "content", tags: "" },
        { id: 2, title: "title2", content: "content", tags: "tag" },
        { id: 3, title: "title3", content: "content", tags: "tag1, tag2" },
      ]).returning('*');
    });
};
