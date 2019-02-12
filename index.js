const express = require('express');
require('dotenv').config()
const server = express();
const PORT = process.env.port || 5000;
const helmet = require('helmet');
const morgan = require('morgan');


server.use(
  express.json(),
  morgan('tiny'),
  helmet()
)


server.listen(PORT, () => {
  console.log(`Server Is Live On Port ${PORT}`)
});
