
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .truncate()
    .then(function() {
        // Inserts seed entries
        return knex('notes').insert([
          {
              title: 'Note 1',
              content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quos ducimus dolores est sit delectus rem consequatur obcaecati facere doloremque aspernatur corporis animi accusamus nulla corrupti sed, perferendis culpa. Doloremque.',
          },
          {
              title: 'Note 2',
              content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quos ducimus dolores est sit delectus rem consequatur obcaecati facere doloremque aspernatur corporis animi accusamus nulla corrupti sed, perferendis culpa. Doloremque.',
          },
          {
              title: 'Note 3',
              content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quos ducimus dolores est sit delectus rem consequatur obcaecati facere doloremque aspernatur corporis animi accusamus nulla corrupti sed, perferendis culpa. Doloremque.',
          },
        ]);
     });
};
