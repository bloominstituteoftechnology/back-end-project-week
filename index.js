require('dotenv').config();

const server = require('./api/server.js');
const PORT = env.process.PORT || 2300;

server.listen(PORT, () => {
   console.log(env.process.PORT)
   console.log(`Server is up and running at http://localhost ${PORT}`);
})