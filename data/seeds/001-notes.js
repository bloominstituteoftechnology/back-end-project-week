
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          "id": 1,
          "title": "Leontine",
          "textBody": "Reide"
        }, {
          "id": 2,
          "title": "Scotti",
          "textBody": "Swanton"
        }, {
          "id": 3,
          "title": "Normand",
          "textBody": "Kinnar"
        }, {
          "id": 4,
          "title": "Lise",
          "textBody": "Mushart"
        }, {
          "id": 5,
          "title": "Sig",
          "textBody": "Bims"
        }, {
          "id": 6,
          "title": "Philippe",
          "textBody": "Heiton"
        }, {
          "id": 7,
          "title": "Stirling",
          "textBody": "Jakucewicz"
        }, {
          "id": 8,
          "title": "Laure",
          "textBody": "Gude"
        }, {
          "id": 9,
          "title": "Agosto",
          "textBody": "Rapi"
        }, {
          "id": 10,
          "title": "Teodora",
          "textBody": "Vasyushkhin"
        }, {
          "id": 11,
          "title": "Hercules",
          "textBody": "Liddall"
        }, {
          "id": 12,
          "title": "Carl",
          "textBody": "De Caroli"
        }, {
          "id": 13,
          "title": "Tomaso",
          "textBody": "Dugmore"
        }, {
          "id": 14,
          "title": "Aidan",
          "textBody": "Claricoats"
        }, {
          "id": 15,
          "title": "Katherina",
          "textBody": "Ancketill"
        }
      ]);
    });
};
