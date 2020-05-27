const bcrypt = require("bcryptjs");

exports.seed = function (knex, Promise) {
  // // Deletes ALL existing entries
  // return knex("users")
  //   .truncate()
  //   .then(function() {
  //     // Inserts seed entries
  return knex("users").insert([
    {
      username: "Jason",
      password: bcrypt.hashSync("password"),
      role: "admin",
    },
    { username: "hello", password: bcrypt.hashSync("there") },
  ]);
  //     });
};
