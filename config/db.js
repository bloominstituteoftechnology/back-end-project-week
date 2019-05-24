require('dotenv').config()

const MONGOOSE = require('mongoose')

const {
  DEV_MONGO_DB,
  PROD_MONGO_DB } = process.env

const DB = DEV_MONGO_DB || PROD_MONGO_DB

module.exports = {
  connectTo: () => {
    MONGOOSE.set('useCreateIndex', true)
    return MONGOOSE.connect(DB,
      { useNewUrlParser: true })
  }
}