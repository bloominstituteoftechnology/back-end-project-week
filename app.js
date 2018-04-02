const { server } = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/lambda-notes');
// mongoose.connect('mongodb://localhost/lambda-notes', {
//   useMongoClient: true
// });

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});