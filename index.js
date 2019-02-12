const server = require('./api/server.js');
const PORT = 2300;

server.listen(PORT, () => {
   console.log(`Server is up and running at http://localhost ${PORT}`);
})