
exports.seed = function(knex, Promise) {
 // Deletes ALL existing entries
 return knex('notes').truncate()
   .then(function () {
     // Inserts seed entries
     return knex('notes').insert([
       {id: 1, title: 'rowValue1', body: 'password1', user_id: 1 },
       {id: 2, title: 'rowValue2', body: 'password2', user_id: 2 },
       {id: 3, title: 'rowValue3', body: 'password3', user_id: 1 }
     ]);
   });
};
