
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, user_id:1, title: "Ava's First note title", textBody: "I am describing Ava's first note"},
        {id: 2, user_id:1, title: "Ava's Second note titl", textBody: "I am describing Ava's second note"},
        {id: 3, user_id:1, title: "Ava's Third note title", textBody: "I am describing Ava's third note"},
        {id: 4, user_id:2, title: "Alec's First note title", textBody: "I am describing Alec's first note"},
        {id: 5, user_id:2, title: "Alec's Second note title", textBody:"I am describing Alec's second note"},
        {id: 6, user_id:2, title: "Alec's Third note title", textBody: "I am describing Alec's third note"},
        {id: 7, user_id:3, title: "Timbo's First note title", textBody:"I am describing Timbo's first note"},
        {id: 8, user_id:3, title: "Timbo's Second note title", textBody: "I am describing Timbo's second note"},
        {id: 9, user_id:3, title: "Timbo's Third note title", textBody: "I am describing Timbo's third note"}
      ]);
    });
};
