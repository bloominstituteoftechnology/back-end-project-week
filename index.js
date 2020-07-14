const server = require('./server.js');

const port = process.env.PORT || 8500;
server.listen(port, ()=> {
    console.log(`Port ${port} is running`);
})