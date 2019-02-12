
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'note1', textBody: "this is note1", tags: "", _id: 1234, image: "image address", users_id: 1},
        {id: 2, title: 'note2', textBody: "this is note2", tags: "", _id: 1234, image: "image address", users_id: 2},
        {id: 3, title: 'note3', textBody: "this is note3", tags: "", _id: 1234, image: "image address", users_id: 1},
        {id: 4, title: 'note4', textBody: "this is note4", tags: "", _id: 1234, image: "image address", users_id: 2},
        {id: 5, title: 'note5', textBody: "this is note5", tags: "", _id: 1234, image: "image address", users_id: 3}
      ]);
    });
};
