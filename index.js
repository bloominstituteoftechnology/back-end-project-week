

//== API Server ================================================================

//-- Dependencies --------------------------------
require('dotenv').config();
const express = require('express');
const cors    = require('cors'   );
const config     = require('./config.js'     );
const dataAccess = require('./data_access.js');
const apiMaker   = require('./api_maker.js'  );

//-- Configure Server ----------------------------
const server = express();
server.use(cors());
server.use(express.json());
server.use(apiMaker(dataAccess(config.TABLE_NOTES)));
server.listen(config.SERVER_PORT, function () {
    console.log(config.SERVER_MESSAGE);
});
