exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("Notes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("Notes").insert([
        {
          title: "Calculon is gonna kill us!",
          content:
            "But I've never been to the moon! Yes, if you make it look like an electrical fire. When you do things right, people won't be sure you've done anything at all. No, just a regular mistake. Look, last night was a mistake",
        },
        {
          title: "Who are those horrible orange men?",
          content:
            "No, I'm Santa Claus! Stop it, stop it. It's fine. I will 'destroy' you! Fry, we have a crate to deliver. Ooh, name it after me! Maybe I love you so much I love you no matter who you are pretending to be.",
        },
        {
          title: "John Quincy Adding Machine.",
          content:
            "For example, if you killed your grandfather, you'd cease to exist! But, like most politicians, he promised more than he could deliver. Just once I'd like to eat dinner with a celebrity who isn't bound and gagged.",
        },
      ]);
    });
};
