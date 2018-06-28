const mongoose = require('mongoose')
require('dotenv').config()

module.exports = {
  connectTo: () => {
    return mongoose.connect(`${process.env.mongo}`)
  }
}