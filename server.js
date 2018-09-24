const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const restrictedRoutes = require("./routes/restrictedRoutes");

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());
server.use(morgan());

server.use("/notes", restrictedRoutes);

const port = 8000;
server.listen(port, function() {
	console.log(`\n === Server Be Sailin on http://localhost${port}. Yarrrnnn`);
});
