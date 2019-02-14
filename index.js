require('dotenv').config();
const server = require('./server');
const PORT = process.env.PORT || 4200;

server.listen(PORT, () => {
    console.log(`alive and listening on port ${PORT}`);
})