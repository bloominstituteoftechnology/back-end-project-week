const express = require("express");
const server = express();
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const mongoose= require("mongoose");

//server.use might have to add more to parentheses
server.use(helmet());
server.use(express);
server.use(server); //might have to change this
server.use(helmet);
server.use(morgan);
server.use(cors);
server.use(mongoose);

server.use('/api/notes', noteController);




server.get("/", function(req, res) => {
	res.status(200).json({api: 'API is running'});
});
























const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
 console.log(`The server is running on port ${PORT}`);
});