const { server } = require('./server');
const mongoose = require('mongoose');
const PORT = 5000;


mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/noteSchema')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.log('Connection to MongoDB Failed', err));



  server.listen(PORT, err => {
    if (err) {
      console.log('Server error', err);
    } else {
      console.log(`The server is listening on port: ${PORT}.`);
    }
  });