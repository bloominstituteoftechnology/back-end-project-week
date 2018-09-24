exports.seed = function(knex, Promise) {
  return knex("notes").del()
    .then(function () {
      return knex("notes").insert([
        { title: "Pizza", body: "Testestest", checklist:'[{"checked": true, "name":"string"}]', tags:'["string"]', userID:0},
        { title: "Orange", body: "Testestest1111", userID:0}
      ]);
    });
};