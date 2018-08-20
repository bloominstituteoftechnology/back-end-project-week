exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        {
          id: 1,
          title: "A note",
          content: "This has some content"
        },
        {
          id: 2,
          title: "Another note",
          content:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut numquam ab, aliquid et pariatur delectus temporibus magni, asperiores consequuntur fugit dolor porro officia. Soluta ullam nesciunt ab, voluptatum minima tempore reprehenderit quisquam, et optio recusandae maxime obcaecati distinctio vitae quos."
        },
        {
          id: 3,
          title: "I'm a long title to test out a lot of different stuff",
          content: "The dragon is near the castle, knights! protect the royal blood with your lives!"
        }
      ]);
    });
};
