exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("posts")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("posts").insert([
        {
          id: 1,
          user_id: 1,
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
            Integer urna quam, pharetra non aliquam id, tristique in ligula."
        },
        {
          id: 2,
          user_id: 2,
          text: "Etiam accumsan turpis nec nisi sodales viverra."
        },
        {
          id: 3,
          user_id: 2,
          text:
            "Morbi pellentesque libero sed ante egestas, vitae auctor nulla tincidunt."
        }
      ]);
    });
};
