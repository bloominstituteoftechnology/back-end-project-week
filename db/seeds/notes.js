exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([
        {
          title: "New Note",
          content: "This is a new note about nothing in particular", 
          tags: "#Notes"
        },
        {
          title: "Notes about React",
          content:
            "React is a UI render component library. It uses components to built out a UI.", 
          tags: "#React #UI #Component #Programming #Javascript", 
        },
        {
          title: "Notes about Node.js",
          content:
            "Node.js is a Javascript runtime. Node is single-threaded and non-blocking. It contains a large ecosystem of libraries called NPM modules.", 
          tags: "#Node #Programming #Javascript", 
        },
        {
          title: "Things to get Done Today",
          content: "Clean laundry, wash dishes, go grocery shopping", 
          tags: "#Todo #Chores", 
        }
      ]);
    });
};
