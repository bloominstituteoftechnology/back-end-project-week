const { server } = require('./server.js');

const port = process.env.PORT || 9000;//sets up for heroku i think
server.listen(port, () => {
    console.log(`Server listening on port : ${port}`);
});