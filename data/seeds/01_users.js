exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          name: "Joseph Thompson",
          email: "joseph@josephmt.com",
          password:
            "$2a$12$2KEWx9JQQdfr4u0GTYBuqu8APJgIlmnRXz56Yl9Pjf15OkYnAqnfm",
          role: "admin"
        },
        {
          name: "Kimberly Gibson",
          email: "kimberly@josephmt.com",
          password:
            "$2a$12$2KEWx9JQQdfr4u0GTYBuqu8APJgIlmnRXz56Yl9Pjf15OkYnAqnfm",
          role: "pro"
        },
        {
          name: "Parker Cain",
          email: "parker@josephmt.com",
          password:
            "$2a$12$2KEWx9JQQdfr4u0GTYBuqu8APJgIlmnRXz56Yl9Pjf15OkYnAqnfm",
          role: "user"
        }
      ]);
    });
};
