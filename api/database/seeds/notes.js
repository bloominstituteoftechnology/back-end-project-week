
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          id: 1,
          title: "ruby",
          content: "ruby",
          user_id: 1
        },
        {
          id: 2,
          title: "elliott",
          content: "elliott",
          user_id: 1
        },
        {
          id: 3,
          title: "elliott2",
          content: "elliott2",
          user_id: 1
        },
        {
          id: 4,
          title: "ruby4",
          content: "ruby5",
          user_id: 1
        },
        {
          id: 5,
          title: "ruby3",
          content: "ruby3",
          user_id: 1
        },
        {
          id: 6,
          title: "ruby3",
          content: "ruby3",
          user_id: 2
        },
        {
          id: 7,
          title: "ruby3",
          content: "ruby3",
          user_id: 3
        },
      ]);
    });
};
