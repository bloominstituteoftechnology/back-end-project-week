require('dotenv').config()

const mongoose = require('mongoose')

const {
  DEV_MONGO_DB,
  PROD_MONGO_DB
} = process.env

const db = DEV_MONGO_DB || PROD_MONGO_DB

module.exports = {
  connectTo: () => {
    mongoose.set('useCreateIndex', true)
    return mongoose.connect(db, { useNewUrlParser: true})
  }
}