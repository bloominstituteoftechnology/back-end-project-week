
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          id: "1",
          title: "this is an edited note",
          textBody: "my notehhhhhlllllllll",
        },
        {
          id: "2",
          title: "Title",
          textBody: "Cobnnnnnnnnnntent",
        },
        {
          id: "3",
          title: "bbbbbbbb",
          textBody: "nnnnnn",
        },
        {
          id: "4",
          title: "mmmmmmmmmmmmmm",
          textBody: "kkkkkkkkkkkkk",
        }
      ]);
    });
};
