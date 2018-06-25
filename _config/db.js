const mongoose = require('mongoose')

module.exports = {
  connectTo: function(database = 'notes', host = 'localhost') {
    return mongoose.connect(`mongodb://${host}/${database}`)
  }
}