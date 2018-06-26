const mongoose = require('mongoose');


// module.exports = {
//   connectTo: function(database = 'sandbox', host = 'localhost') {
//     return mongoose.connect(`mongodb://${host}/${database}`);
//   },
// };

// mongodb://<dbuser>:<dbpassword>@ds217921.mlab.com:17921/lambda_notes
const uri = 'mongodb://<dbuser>:<dbpassword>@ds217921.mlab.com:17921/lambda_notes';
console.log(process.env.mongo)
module.exports = {
  connectTo: function(dbuser = 'test', dbpassword = 'test1234', database = 'lambda_notes', host = 'ds217921.mlab.com') {
    return mongoose.connect(process.env.mongo);
  },
};