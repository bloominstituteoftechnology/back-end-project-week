exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        {
          _id: 1,
          title: "A note",
          textBody: "This has some textBody"
        },
        {
          _id: 2,
          title: "Another note",
          textBody:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut numquam ab, aliquid et pariatur delectus temporibus magni, asperiores consequuntur fugit dolor porro officia. Soluta ullam nesciunt ab, voluptatum minima tempore reprehenderit quisquam, et optio recusandae maxime obcaecati distinctio vitae quos."
        },
        {
          _id: 3,
          title: "I'm a long title to test out a lot of different stuff",
          textBody: "The dragon is near the castle, knights! protect the royal blood with your lives!"
        }
      ]);
    });
};
