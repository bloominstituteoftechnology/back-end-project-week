const mongoose = require('mongoose');

module.exports = {
  connectTo: function(database = 'sandbox', host = 'localhost') {
    return mongoose.connect(`mongodb://${host}/${database}`);
  },
};

// // mongodb://<dbuser>:<dbpassword>@ds217921.mlab.com:17921/lambda_notes

// module.exports = {
//   connectTo: function(dbuser = 'test', dbpassword = 'test1234', database = 'lambda_notes', host = 'ds217921.mlab.com') {
//     return mongoose.connect(`mongodb://${dbuser}:${dbpassword}@${host}:17921/${database}`);
//   },
// };