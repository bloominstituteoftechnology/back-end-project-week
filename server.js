const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 4444;

const server = express();
server.use(cors({}));
server.use(bodyParser.json());

server.get('/', (req, res) => {
	res.json({
		Message: '===== YAY!  Tis working! =====',
	});
});

server.listen(port, err => {
	if (err) console.log(err);
	console.log(`Server listening on port ${4444}`);
});
