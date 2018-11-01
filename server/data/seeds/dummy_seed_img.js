
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('note_table').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('note_table').insert([
        {note_title: 'Farmers market', note_body: '11/20/2018. fresh ingredients for res.', note_image: 'https://calexicorecreation.org/sites/calexicolibrary.org/files/attachments/FarmersMarketPoster.jpg', user_id: 1},
        
        {note_title: 'Buy leash for Gunther', note_body: 'Buy stronger leash, Gunther 2 strong', note_image: 'http://www.thebestpetsproducts.com/Images/703717/big-smile-paw-dog-leash-bungee-shock-absorption-4-ft-long-blue.jpg', user_id: 2},

        {note_title: 'Buy book', note_body: 'Legend of Drizzt: Exile', note_image: 'https://aentcdn.azureedge.net/graphics/items/sdimages/c/500/8/3/2/5/3585238.jpg?ae=43700921', user_id: 3},
      ]);
    });
};