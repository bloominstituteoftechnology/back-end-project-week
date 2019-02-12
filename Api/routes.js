const {server} = require('./server');
const db = require('../Database/dbConfig');



server.get('/notes', (req, res) => {
  db.get().then(sumNotes => {
      res.status(200).send(sumNotes);
  })
})

