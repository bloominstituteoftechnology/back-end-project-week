const express = require('express')
const port = process.env.PORT || 3334
const middleware = require('./config/middleware')


const server = express()
middleware(server)

server.get('/', (req, res)=>{
    res.send('<h1>Backend Project week</h1><h2>Built By Ryan Clausen</h2>')
})

server.listen(port, ()=> console.log(`we hear you ${port}`))