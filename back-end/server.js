const express = require('express');
const cors = require('cors');

const PORT = 5000;
const server = express();
server.use(express.json());
server.use(cors());




server.get('/started', (req, res) => {
  res.json({ success: 'API is running'});
});


server.listen(PORT, err => {
  if (err) {
    console.log(`There seems to be an error starting your server.`, err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});