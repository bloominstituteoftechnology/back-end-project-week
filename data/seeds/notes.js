
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
        {id: 5, title: 'note5', textBody: "this is note5", tags: "", _id: 1234, image: "image address", users_id: 3},
        {id: 6, title: 'note6', textBody: "this is note6", tags: "", _id: 1234, image: "image address", users_id: 1},
        {id: 7, title: 'note7', textBody: "this is note7", tags: "", _id: 1234, image: "image address", users_id: 2},
        {id: 8, title: 'note8', textBody: "this is note8", tags: "", _id: 1234, image: "image address", users_id: 1},
        {id: 9, title: 'note9', textBody: "this is note9", tags: "", _id: 1234, image: "image address", users_id: 2},
        {id: 10, title: 'note10', textBody: "this is note10", tags: "", _id: 1234, image: "image address", users_id: 3}
      ]);
    });
};
