require('dotenv').config();
const server = require('./server');
const port = process.env.PORT || 3000;

server.listen(port, "0.0.0.0", () => {
    console.log(`alive and listening on port ${port}`);
})