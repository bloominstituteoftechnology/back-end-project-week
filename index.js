require('dotenv').config(); // load the .env file content

const server = require('./api/server.js');

// [GET] /
// test endpoint
server.get('/', (req, res) => {
    res.status(200).json({ bigBrother: 'is always watching' });
});

const port = process.env.PORT || 5555;
server.listen(port, () => console.log(`\n-----Listening on port ${port}-----\n`))