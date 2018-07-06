const mongoose = require('mongoose')

module.exports = {
  connectTo: function(database = 'notes', host = 'localhost') {
    // return mongoose.connect(`mongodb://${host}/${database}`)
    return mongoose.connect('mongodb://aquila:user123@ds018568.mlab.com:18568/notes')
  }
}