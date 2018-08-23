exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("notes")
    .del()
    .then(function() {
      return knex("notes").insert([
        {
          id: "1",
          title: "One",
          text_body:
            "Don't delete it! This will be a base note. Many people will see this note."
        },
        {
          id: "2",
          title: "Two",
          text_body:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
          id: "3",
          title: "Three",
          text_body:
            "Don't delete it! This will be a base note. Many people will see this note."
        },
        {
          id: "4",
          title: "Four",
          text_body:
            "Don't delete it! This will be a base note. Many people will see this note."
        },
        {
          id: "5",
          title: "Five",
          text_body:
            "Don't delete it! This will be a base note. Many people will see this note."
        },
        {
          id: "6",
          title: "Six",
          text_body:
            "Don't delete it! This will be a base note. Many people will see this note."
        },
        {
          id: "7",
          title: "Seven",
          text_body:
            "Don't delete it! This will be a base note. Many people will see this note."
        },
        {
          id: "8",
          title: "Eight",
          text_body:
            "Don't delete it! This will be a base note. Many people will see this note."
        },
        {
          id: "9",
          title: "Nine",
          text_body:
            "Don't delete it! This will be a base note. Many people will see this note."
        }
      ]);
    });
};
