
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dishes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('dishes').insert([
        {
          "_id": 1,
          "title": "Leontine",
          "textBody": "Reide"
        }, {
          "_id": 2,
          "title": "Scotti",
          "textBody": "Swanton"
        }, {
          "_id": 3,
          "title": "Normand",
          "textBody": "Kinnar"
        }, {
          "_id": 4,
          "title": "Lise",
          "textBody": "Mushart"
        }, {
          "_id": 5,
          "title": "Sig",
          "textBody": "Bims"
        }, {
          "_id": 6,
          "title": "Philippe",
          "textBody": "Heiton"
        }, {
          "_id": 7,
          "title": "Stirling",
          "textBody": "Jakucewicz"
        }, {
          "_id": 8,
          "title": "Laure",
          "textBody": "Gude"
        }, {
          "_id": 9,
          "title": "Agosto",
          "textBody": "Rapi"
        }, {
          "_id": 10,
          "title": "Teodora",
          "textBody": "Vasyushkhin"
        }, {
          "_id": 11,
          "title": "Hercules",
          "textBody": "Liddall"
        }, {
          "_id": 12,
          "title": "Carl",
          "textBody": "De Caroli"
        }, {
          "_id": 13,
          "title": "Tomaso",
          "textBody": "Dugmore"
        }, {
          "_id": 14,
          "title": "Aidan",
          "textBody": "Claricoats"
        }, {
          "_id": 15,
          "title": "Katherina",
          "textBody": "Ancketill"
        }
      ]);
    });
};
