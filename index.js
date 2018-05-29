const mongoose = require('mongoose')
const server = require('./src/server/server')

const port = process.env.PORT || 3000
mongoose.connect(mongoUri, mongoOptions)
  .then(() => server.listen(port, () => console.log(`Listening on ${port}`)))