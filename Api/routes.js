const server = require('./server');
const db = require('../Database/dbConfig');



server.get('api/notes', (req, res) => {
   res.status(200).json({message: "this is working"});
})

