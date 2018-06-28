const mongoose = require('mongoose')
require('dotenv').config()
console.log(process.env.MONGODB_URI)

module.exports = {
  connectTo: () => {
    return mongoose.connect(`${process.env.MONGODB_URI}`)
  }
}