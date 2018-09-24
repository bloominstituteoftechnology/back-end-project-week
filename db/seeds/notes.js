
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          title: "New Note", 
          content: "This is a new note about nothing in particular"
        },
        {
          title: "Notes about React", 
          content: "React is a UI render component library. It uses components to built out a UI."
        },
        {
          title: "Notes about Node.js", 
          content: "Node.js is a Javascript runtime. Node is single-threaded and non-blocking. It contains a large ecosystem of libraries called NPM modules."
        },
        {
          title: "Things to get Done Today", 
          content: "Clean laundry, wash dishes, go grocery shopping"
        }
      ]);
    });
};
