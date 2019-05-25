const EXPRESS = require('express')
const DB = require('./config/db')
const MIDDLEWARE = require('./config/middleware')
const ROUTES = require('./config/routes')
const SERVER = EXPRESS()

const PORT = process.env.PORT || 21310 

MIDDLEWARE(SERVER)
ROUTES(SERVER)

DB
.connectTo()
.then(() => {
  SERVER.listen(PORT, () => {
    console.log('API connected to the web server and MongoDB.')
    console.log(`It is running on port ${PORT}.`)
  })
})
.catch(err => console.log('An error occurred while trying to connect to the database server.\n', err))