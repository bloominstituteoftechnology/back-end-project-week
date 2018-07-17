const server = require('express')()

server.get('/',(req,res) => {
    res.send('Up and running')
})

server.listen(8080)