const { server } = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/back-end-week', {}, (error, res) => {
  if (error) console.log(error, 'Could not connect to the database');
  console.log('/n/n--Connected to the database--/n/n');
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
