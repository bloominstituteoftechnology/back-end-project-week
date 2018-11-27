const mongoose = require('mongoose');

// mongodb://<dbuser>:<dbpassword>@ds217921.mlab.com:17921/lambda_notes
module.exports = {
  connectTo: function(dbuser = '', dbpassword = '', database = 'lambda_notes', host = 'ds217921.mlab.com') {
    return mongoose.connect(process.env.mongo);
  },
};