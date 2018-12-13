
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: 'Grocery List', content:"Bananas, Apples, Raisins", user_id: 2},
        {id: 2, title: 'Grocery List', content:"Chicken, Bread, Cheese", user_id: 3},
        {id: 3, title: 'Books to Read', content:"This is here so people think I read", user_id: 2},
        {id: 4, title: 'Things to Study', content:"Computer Science, Other Code Stuff", user_id: 2},
        {id: 5, title: 'Grocery List', content:"Not gonna kid myself, I'm ordering takeout all week", user_id: 4},
        {id: 6, title: 'Books to Read', content:"Harry Potter", user_id: 3},
        {id: 7, title: 'Things to Study', content:"How to touch your right elbow with your right hand", user_id: 3},
      ]);
    });
};
