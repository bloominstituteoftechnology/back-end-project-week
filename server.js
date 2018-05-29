const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const port = process.env.PORT || 5000;

const server = express();

const sessionConfig = {
  secret: 'fumos are great',
  cookie: {
    maxAge: 1 * 24 * 60 * 60 * 1000
  }, // 1 day in milliseconds
  httpOnly: true,
  secure: false,
  resave: true,
  saveUninitialized: false,
  name: 'noname',
  store: new MongoStore({
  url : 'mongodb://ds139960.mlab.com:39960/fumo',
    ttl: 60 * 10
  })
};

mongoose
.connect('mongodb://ds139960.mlab.com:39960/fumo')
.then( conn => {
  console.log('===API CONNECTED===')
})
.catch(err => console.log('issues connecting to mongo', error));

server.get('/', (req, res) => {
  res.json({ message: `The api is running on port ${port}` });
});

server.listen(port, err => {
  if (err) console.log(err);
  console.log(`\n=== API running on port ${port}==`);
});
