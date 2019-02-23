require('dotenv').config();
const apiRouter = require('./api/index.js');
const express   = require('express');
const server    = express();
const cors      = require('cors');
const helmet    = require('helmet');
const chalk     = require('chalk');
const PORT      = process.env.PORT || 8080;




server.use( express.json() );
server.use( cors()         );
server.use( apiRouter      );

server.listen(PORT, () => {
  console.log(chalk.blue(`\nServer listening on port ${ PORT }...\n`));
});
