// const port = process.env.PORT || 3333;
const mongoose = require('mongoose');

// module.exports = {
//     connectTo: function(database = 'sandbox', host = 'localhost') {
//       return mongoose.connect(`mongodb://${host}/${database}`);
//     },
//   };

  module.exports = {
    connectTo: function() {
      return mongoose.connect('mongodb://govi:password1234@ds121321.mlab.com:21321/dblambdanotes');
    },
  };

