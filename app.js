const { server } = require('./server');
const mongoose = require('mongoose');
const PORT = 5000;
const noteSchema = require('./models/noteSchema');


mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/noteSchema')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.log('Connection to MongoDB Failed', err));

  server.get('/api/notes', (req, res) => {
    noteSchema.find({}, (err, database) => {
      if (err) {
        res.status(500);
        res.json(err);
      } else {
        res.json(database);
      }
    });
  });


  server.listen(PORT, err => {
    if (err) {
      console.log('Server error', err);
    } else {
      console.log(`The server is listening on port: ${PORT}.`);
    }
  });