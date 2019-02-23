exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        { id: 1, title: "Dummy Note 1", content: "Dummy Note Content 1" },
        {
          id: 2,
          title: "A Tisket A Tasket A Green and Yellow Basket",
          content: "Dummy Note Content 2"
        },
        { id: 3, title: "Dummy Note 3", content: "Dummy Note Content 3" }
      ]);
    });
};
