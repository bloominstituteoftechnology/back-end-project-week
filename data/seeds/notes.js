
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {id: 1, title: "TODO" , content: "1. Wash the dog 2. Cook dinner 3. Do homework"},
        {id: 2, title: 'Movies' , content: 'Jurrasic park, scooby-doo, The nightmare before Christmas' },
        {id: 3, title: 'Weekend plans' , content: 'Take a walk at the park, play games, meet up with old friends' }
      ]);
    });
}