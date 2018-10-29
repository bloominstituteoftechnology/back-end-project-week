const server = require('./server.js')
const port = 9000

server.listen(port, err => {
    if(err) console.log(err)
    console.log(`Server running at port: ${port}`)
})