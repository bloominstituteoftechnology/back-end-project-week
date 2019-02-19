require('dotenv').config();

const server = require('./api/server');

const PORT = process.env.PORT || 4000;
server.listen(PORT, err => {
    if (err) console.log(err);
    console.log(`server is listening on port ${PORT}`);
});