//import express server
const server = require('./api/server.js')

//add listener
const PORT = 4000;
server.listen(PORT, ()=>{

  console.log(`Server is up and running at PORT ${PORT}`);
})


