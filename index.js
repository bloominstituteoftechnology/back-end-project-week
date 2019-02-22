require('dotenv').config();
const server = require('./server');

server.listen(process.env.PORT || 3000, () => {
    console.log(`alive and listening on port ${port}`);
})