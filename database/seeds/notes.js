exports.seed = function(knex) {
  return knex("items").insert([
    {
      id: 1,
      noteTitle: "new note",
      noteBody: "new note"
    },
    {
      id: 1,
      noteTitle: "new note",
      noteBody: "new note"
    },
    {
      id: 1,
      noteTitle: "new note",
      noteBody: "new note"
    }
  ]);
};
