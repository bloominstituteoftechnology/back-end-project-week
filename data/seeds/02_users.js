
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "Michael", password: "password"},
        {username: "Cassidy", password: "password"},
        {username: "Cathy", password: "password"}
        
      ]);
    });
};
