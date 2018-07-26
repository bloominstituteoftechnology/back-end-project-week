const server = require('express')()
const json = require('express').json
const PORT = process.env.PORT || 8888
const cors = require('cors')
const mongoose = require('mongoose')
const users = require('./users/userRouter')
const notes = require('./notes/noteRouter')


if (process.env.NODE_ENV === 'PROD') {
    mongoose.connect(process.env.MONGODB_URI)
}
else {
    mongoose.connect('mongodb://localhost/notesapp')
}
server.use(cors())
server.use(json())
server.use('/api/users', users)
server.use('/api/notes', notes)

//test call
server.get('/',(req,res) => {
    res.json({status:'Up and running'})
})

server.listen(PORT, () => console.log(`Listenining on ${PORT}`))
