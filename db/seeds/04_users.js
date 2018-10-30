exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("Users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("Users").insert([
        {
          username: "Piroska",
          password: ""
        },
        
      ]);
    });
};
