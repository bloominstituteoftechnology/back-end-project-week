exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('notes').insert([
        {
          title: 'Note 1',
          textBody:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quos ducimus dolores est sit delectus rem consequatur obcaecati facere doloremque aspernatur corporis animi accusamus nulla corrupti sed, perferendis culpa. Doloremque.',
        },
        {
          title: 'Note 2',
          textBody:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatum repudiandae molestiae esse, sit et praesentium saepe facilis repellendus cum placeat autem accusantium, fugit enim quaerat aliquid exercitationem aliquam. Tempore nihil tempora, voluptatibus vero quod nemo rerum corporis, ad veniam suscipit sapiente sequi, rem ut minus ullam quaerat aliquid eligendi deserunt!',
        },
        {
          title: 'Note 3',
          textBody:
            'Amet, perspiciatis. Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
        },
      ]);
    });
};
