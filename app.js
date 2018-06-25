const { server } = require('./server');
const mongoose = require('mongoose');
const config = require('./config')

const { apiPort, db: { user, pass, address } } = config;


mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${user}:${pass}${address}`)
// mongoose.connect('mongodb://localhost/backend')


server.listen(apiPort, () => {
  console.log(`Server is running on port ${apiPort}`)
}) 