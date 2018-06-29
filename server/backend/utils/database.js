const mongoose = require("mongoose");
const config = require("../../config");

// module.exports = {
//   connectTo: function(database = "Test", host = "localhost") {
//     return mongoose.connect(`mongodb://${host}/${database}`);
//   }
// };

module.exports = {
  connectTo: function() {
    return mongoose.connect(config.db);
  }
};
