const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
const { dbLogin, dbPw } = require("../utils/dbConfig");

module.exports = {
  connect: function() {
    if (uri) {
      return mongoose.connect(uri);
    }
    return mongoose.connect(
      `mongodb://${dbLogin}:${dbPw}@ds139960.mlab.com:39960/lambda-notes`
    );
  }
};
