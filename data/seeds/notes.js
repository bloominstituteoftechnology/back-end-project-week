
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'note1', textBody: "this is note1", tags: "", _id: 1234, pictures: "image address", users_id: 1},
        {id: 2, title: 'Note2', textBody: "Note2 text width and characters test. Checking for carriage returns and overrun.", tags: "", _id: 1234, pictures: "image address", users_id: 2},
        {id: 3, title: 'This is a Title3', textBody: "this is note3", tags: "", _id: 1234, pictures: "image address", users_id: 1},
        {id: 4, title: 'note4', textBody: "this is note4", tags: "", _id: 1234, pictures: "image address", users_id: 2},
        {id: 5, title: 'An Important Note', textBody: "this is note5", tags: "", _id: 1234, pictures: "image address", users_id: 3},
        {id: 6, title: 'note6', textBody: "this is note6", tags: "", _id: 1234, pictures: "image address", users_id: 1},
        {id: 7, title: 'School Reminder!', textBody: "Remember to sign up for Labs!!", tags: "", _id: 1234, pictures: "image address", users_id: 2},
        {id: 8, title: 'Finish Debugging!!', textBody: "Must debug and run more tests", tags: "", _id: 1234, pictures: "image address", users_id: 1},
        {id: 9, title: 'This is Nine', textBody: "this is note9", tags: "", _id: 1234, pictures: "image address", users_id: 2},
        {id: 10, title: 'note10', textBody: "this is note10", tags: "", _id: 1234, pictures: "image address", users_id: 3}
      ]);
    });
};
