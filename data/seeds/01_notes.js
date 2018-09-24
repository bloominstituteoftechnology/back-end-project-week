
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {title: 'Title 1', content: 'Content 1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque rutrum eros, nec eleifend massa volutpat quis. Aliquam erat volutpat. Nulla euismod urna et lectus aliquet faucibus. Nullam ac gravida diam. Donec sit amet arcu a velit hendrerit interdum. Duis ac nibh nisl. Donec nec tortor enim. Vivamus elementum tincidunt molestie. Integer vitae est congue, euismod dolor a, semper sapien. Donec maximus dictum orci ut dapibus. Aliquam eleifend leo vel venenatis molestie. In hac habitasse platea dictumst. Integer semper in purus eget tempor.'},
        {title: 'Title 2', content: 'Content 2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque rutrum eros, nec eleifend massa volutpat quis. Aliquam erat volutpat. Nulla euismod urna et lectus aliquet faucibus. Nullam ac gravida diam. Donec sit amet arcu a velit hendrerit interdum. Duis ac nibh nisl. Donec nec tortor enim. Vivamus elementum tincidunt molestie. Integer vitae est congue, euismod dolor a, semper sapien. Donec maximus dictum orci ut dapibus. Aliquam eleifend leo vel venenatis molestie. In hac habitasse platea dictumst. Integer semper in purus eget tempor.'},
        {title: 'Title 3', content: 'Content 3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque rutrum eros, nec eleifend massa volutpat quis. Aliquam erat volutpat. Nulla euismod urna et lectus aliquet faucibus. Nullam ac gravida diam. Donec sit amet arcu a velit hendrerit interdum. Duis ac nibh nisl. Donec nec tortor enim. Vivamus elementum tincidunt molestie. Integer vitae est congue, euismod dolor a, semper sapien. Donec maximus dictum orci ut dapibus. Aliquam eleifend leo vel venenatis molestie. In hac habitasse platea dictumst. Integer semper in purus eget tempor.'}
      ]);
    });
};
