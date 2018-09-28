
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Calvin and Hobbes', content:'Sometimes when I am talking, my words cannot keep up with my thoughts. I wonder why we think faster than we speak. Probably so we can think twice.― Bill Watterson', image: 'https://res.cloudinary.com/dvgfmipda/image/upload/v1538153065/wglaae0hthj9xigiydww.jpg'},
        {title: 'Books', content:'A reader lives a thousand lives before he dies. The man who never reads lives only one.',image:'https://res.cloudinary.com/dvgfmipda/image/upload/v1538154221/rw0xpntmafje9czs3cyi.jpg'},
        {title: 'Design', content:'Design is not just what it looks like and feels like. Design is how it works. -Steve Jobs', image:'https://res.cloudinary.com/dvgfmipda/image/upload/v1538153987/qztojsw49gjlo2ejojh8.jpg'}
      ]);
    });
};
