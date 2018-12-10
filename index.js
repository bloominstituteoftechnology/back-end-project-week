const { server } = require('./server.js');

const port = process.env.PORT || 9900;

server.listen(port, () => {
    console.log(`\n=== Server listen on port ${port} \n`)
})

server.get('/', function(req, res) {
    res.send('heroku working');
})