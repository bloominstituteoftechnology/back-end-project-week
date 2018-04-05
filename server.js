const express = require('express');
const session = require('express-session');
const cors = require('cors');

const SECRET = process.env.SECRET;

const routes = require('./api/routes/routes');

const server = express();
const corsOptions = {
  origin: 'https://focused-brown-5aff3e.netlify.com',
  credentials: true,
};

// server.options('*', cors());

server.use(express.json());
server.use(cors(corsOptions));

// server.all('*', function(req, res, next) {
//   var origin = req.get('origin');
//   res.header('Access-Control-Allow-Origin', origin);
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
//   );
//   // intercept OPTIONS method
//   if ('OPTIONS' == req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// });

server.use(
  session({
    secret: SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

routes(server);

module.exports = {
  server,
};
