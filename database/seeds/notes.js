exports.seed = function(knex) {
  return knex("notes").insert([
    {
      id: 1,
      noteTitle: "Note One",
      noteBody: "new note"
    },
    {
      id: 2,
      noteTitle: "Note Two",
      noteBody: "new note"
    },
    {
      id: 3,
      noteTitle: "Note Three",
      noteBody: "new note"
    }
  ]);
};
