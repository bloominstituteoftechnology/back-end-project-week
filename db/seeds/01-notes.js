
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'test1', body: "hello what's up man, like how are you"},
        {title: 'test2', body: "hello what's up man, like how are you"},
        {title: 'test3', body: "hello what's up man, like how are you"}
      ]);
    });
};
