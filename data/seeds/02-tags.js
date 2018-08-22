exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex("tags")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tags").insert([
        {
          tag: "Marlon Brando"
        },
        {
          tag: "Al Pacino"
        },
        {
          tag: "Robert Duvall"
        },
        {
          tag: "Mark Hamill"
        },
        {
          tag: "Harrison Ford"
        },
        {
          tag: "Carrie Fisher"
        },
        {
          tag: "Elijah Wood"
        },
        {
          tag: "Ian McKellen"
        },
        {
          tag: "Orlando Bloom"
        },
        {
          tag: "Arnold Schwarzenegger"
        },
        {
          tag: "Edward Furlong"
        },
        {
          tag: "Linda Hamilton"
        },
        {
          tag: "Jim Carrey"
        },
        {
          tag: "Jeff Daniels"
        },
        {
          tag: "Lauren Holly"
        },
        {
          tag: "Kurt Russell"
        },
        {
          tag: "Bill Paxton"
        },
        {
          tag: "Sam Elliot"
        }
      ]);
    });
};
