exports.seed = function(knex) {
  return knex("notes").insert([
    {
      noteTitle: "Note One",
      noteBody: "new note"
    },
    {
      noteTitle: "Note Two",
      noteBody: "new note"
    },
    {
      noteTitle: "Note Three",
      noteBody: "new note"
    }
  ]);
};
