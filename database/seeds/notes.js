
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          title: "Note Name",
          note:
            "Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1."
        },
        {
          title: "Note Name",
          note:
            "Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1."
        },
        {
          title: "Note Name",
          note:
            "Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1."
        },
        {
          title: "Note Name",
          note:
            "Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1."
        },
        {
          title: "Note Name",
          note:
            "Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1."
        },
        {
          title: "Note Name",
          note:
            "Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1."
        },
        {
          title: "Note Name",
          note:
            "Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1."
        },
        {
          title: "Note Name",
          note:
            "Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1."
        },
        {
          title: "Note Name",
          note:
            "Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1. Morbi pellentesque euismod venenatis. Nulla ut nibh nunc. Phassellus diam metus, blandit ac purus a, efficitur mollis1."
        }
      ]);
    });
};
