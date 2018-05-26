require('dotenv').config()

const app = require('express')()
const env = require('./config/env')

require('./config/express')(app, env)
require('./config/mongoose')(env)
require('./config/routes')(app)

app.listen(env.port, () => console.log(`🤖 Server up and runnning on port ${env.port}`))