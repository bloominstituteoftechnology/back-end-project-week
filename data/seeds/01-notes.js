exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("notes").insert([
        {
          title: "The Godfather",
          content: "director: Francis Ford Coppola, metascore: 100"
        },
        {
          title: "Star Wars",
          content: "director: George Lucas, metascore: 92"
        },
        {
          title: "The Lord of the Rings: The Fellowship of the Ring",
          content: "director: Peter Jackson, metascore: 92"
        },
        {
          title: "Terminator 2: Judgement Day",
          content: "director: James Cameron, metascore: 94"
        },
        {
          title: "Dumb and Dumber",
          content: "director: The Farely Brothers, metascore: 76"
        },
        {
          title: "Tombstone",
          content: "director: George P. Cosmatos, metascore: 89"
        }
      ]);
    });
};
