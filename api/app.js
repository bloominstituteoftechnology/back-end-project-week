const { server } = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost/lambdanotes')
  .then(conn => {
    console.log('Successfully Connected to MongoDB');
  })
  .catch(err => {
    console.log('Database connection failed');
  });

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
