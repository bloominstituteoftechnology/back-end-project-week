exports.seed = function(knex, Promise) {
  return knex("users")
    .del()
    .then(function() {
      return knex("users").insert([
        {
          username: "test",
          password:
            "$2b$14$yhHi8.oVCeCtAevqL/7UjOyZZdA1L.DJF.TW3gYXznRDVafqrW9By",
          ID: 0
        }
      ]);
    });
};
