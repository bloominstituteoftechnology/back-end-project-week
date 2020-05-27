exports.seed = function (knex, Promise) {
  // // Deletes ALL existing entries
  // return knex("categories")
  //   .truncate()
  //   .then(function() {
  //     // Inserts seed entries
  return knex("categories").insert([
    { title: "Testing", content: "The letters A-Z uppercase and lowercase" },
    { title: "Numbers", content: "Numbers 1-10 with pictures" },
    {
      title: "Community Helpers",
      content: "The people in the community that help us",
    },
  ]);
  // });
};
