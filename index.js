const express = require('express')
const port = process.env.PORT || 3334
const middleware = require('./config/middleware')
const route = require('./config/route')

const server = express()
middleware(server)

server.get('/', (req, res)=>{
    res.send('<h1>Backend Project week</h1><h2>Built By Ryan Clausen</h2>')
})

server.use('/api/notes', route)

server.listen(port, ()=> console.log(`we hear you ${port}`))