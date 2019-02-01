exports.seed = function(knex, Promise) {
  return knex("notes")
    .truncate()
    .then(function() {
      return knex("notes").insert([
        {
          title: "Shopping",
          textBody: "Luggage Tags, Backpack, Travel size toiletries"
        },
        {
          title: "Flight Confirmations",
          textBody:
            "Nashville, TN, US (BNA) to Toronto, ON, CA (YYZ - Pearson), UA 8114, 4:40 && Toronto, ON, CA (YYZ - Pearson) to Paris, FR (CDG - Charles de Gaulle), 8:45p.m. UA 8252 "
        },
        {
          title: "Gift Shopping",
          textBody:
            "Maya, Elizabeth, Katie, Desi, Kristina, Benjamin, Dad, Santino, Maddi"
        }
      ]);
    });
};
