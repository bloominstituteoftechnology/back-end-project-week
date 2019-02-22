exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "pascale",
          first: "pascale",
          last: "pascale",
          email: "pascale",
          password: "pascale"
        },
        {
          id: 2,
          username: "sean",
          first: "sean",
          last: "sean",
          email: "sean",
          password: "sean"
        },
        {
          id: 3,
          username: "ruby",
          first: "ruby",
          last: "ruby",
          email: "ruby",
          password: "ruby"
        }
      
    
      ]);
    });
};
