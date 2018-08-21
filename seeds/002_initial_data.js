
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        { title: 'Learn React', textBody: 'Learning React really well would be super neat', tags: 'todo'},
        { title: 'Learn Some kind of photo Editing software', textBody: 'I just need to cut some faces out of some images, it shouldnt be this hard', tags: 'todo, wisdom'},
        { title: 'Just, live your life, man', textBody: 'I guess this is going to happen no matter what you do', tags: 'nonsense'}
      ]);
    });
};
