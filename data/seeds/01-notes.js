exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("notes").insert([{
        title: 'The Godfather',
        content: 'director: Francis Ford Coppola, metascore: 100',
        tags: 'Marlon Brando, Al Pacino, Robert Duvall'
      },
      {
        title: 'Star Wars',
        content: 'director: George Lucas, metascore: 92',
        tags: 'Mark Hamill, Harrison Ford, Carrie Fisher'
      },
      {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        content: 'director: Peter Jackson, metascore: 92',
        tags: 'Elijah Wood, Ian McKellen, Orlando Bloom'
      },
      {
        title: 'Terminator 2: Judgement Day',
        content: 'director: James Cameron, metascore: 94',
        tags: 'Arnold Schwarzenegger, Edward Furlong, Linda Hamilton'
      },
      {
        title: 'Dumb and Dumber',
        content: 'director: The Farely Brothers, metascore: 76',
        tags: 'Jim Carrey, Jeff Daniels, Lauren Holly'
      },
      {
        title: 'Tombstone',
        content: 'director: George P. Cosmatos, metascore: 89',
        tags: 'Kurt Russell, Bill Paxton, Sam Elliot'
      }
    ]);
  })
};
