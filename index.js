const mongoose = require('mongoose')
const server = require('./src/server/server')
const { mongoProdUri, mongoOptions } = require('./src/server/config')

const port = process.env.PORT || 3000
mongoose.connect(mongoProdUri, mongoOptions)
  .then(() => server.listen(port, () => console.log(`Listening on ${port}`)))