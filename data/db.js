const mongoose = require("mongoose");
const { dbLogin, dbPw } = require("../utils/dbConfig.js");
const uri = `mongodb://${dbLogin}:${dbPw}@ds139960.mlab.com:39960/lambda-notes`;
module.exports = {
  connect: function() {
    return mongoose.connect(uri);
  }
};
