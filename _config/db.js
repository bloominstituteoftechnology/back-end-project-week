const mongoose = require('mongoose')
require('dotenv').config()
console.log(process.env.mongo)

module.exports = {
  connectTo: () => {
    return mongoose.connect(`${process.env.mongo}`)
  }
}