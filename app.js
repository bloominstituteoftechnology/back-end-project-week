const { server } = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin1:12345@ds215370.mlab.com:15370/heroku_jbnbkkl6', {}, (error, res) => {
  if (error) console.log(error, 'Could not connect to the database');
  console.log('/n/n--Connected to the database--/n/n');
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
