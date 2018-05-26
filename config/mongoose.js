const mongoose = require('mongoose')

module.exports = async env => {
  try {
    mongoose.connect(env.db)
    mongoose.Promise = global.Promise
    await mongoose.connection.once('open', () => console.log('🤖 MongoDB connected'))
  } catch (err) {
    console.log(`🤖 ${err.message}\n🤖 ${err.stack}`)
  }
}


