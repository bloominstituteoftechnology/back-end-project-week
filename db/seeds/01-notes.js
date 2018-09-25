exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        { id: 1, title: "title1", textBody: "content1" },
        { id: 2, title: "title2", textBody: "content2" },
        { id: 3, title: "title3", textBody: "content3" }
      ]);
    });
};
