const server = require('./api/server');
require('dotenv').config();

const PORT = process.env.PORT || 8888;

server.get('/', (req, res)=>{
    res.send(`Server is running on ${PORT}`)
});
server.listen(PORT, ()=>{
    console.log(`Server listening on Port ${PORT}`)
})