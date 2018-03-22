const server = require('./server');
// const port = require('./config').port;
// const port = require('./config').port

const port = JSON.parse(process.env.CONFIG).port;

server.listen(process.env.PORT || port, _ => {
  console.log(`Listening on port: ${port}`);
});

// const server = require('./server');
// // const port = require('./config').port;
// // const port = require('./config').port

// // const port = 5000;

// // server.listen(process.env.PORT || port, _ => {
// //   console.log(`Listening on port: ${port}`);
// // });

// // start debug

// // const express = require('express');
// // const morgan = require('morgan');
// // const cors = require('cors');

// // const router = require('./router');

// // const { validateToken } = require('./services/auth');

// // const server = express();
// // const debug = false;

// // debug ? server.use(morgan('combined')) : null;

// // server.use(express.json());
// // server.use(cors({ origin: 'http://localhost:3000', credentials: true }));

// // server.use('/api', router);

// // server.get('/', (req, res) => {
// //   res.send({ server: `running` });
// // });

// // server.post('/validate', validateToken, (req, res) => {
// //   res.send({ decoded: req.decoded });
// // });

// const port = 5000;

// server.listen(process.env.PORT || port, _ => {
//   console.log(`listening port ${port}`);
// });
