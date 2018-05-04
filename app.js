const { server } = require('./server');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

mongoose.Promise = global.Promise;
mongoose.connect(process.env.mongo_URI, {
  useMongoClient: true
});

server.listen(port, err => {
    if (err) console.log(err);
    console.log(`API is now running on port ${port}`  );
});
