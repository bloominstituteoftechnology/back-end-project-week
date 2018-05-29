const mongoose = require("mongoose");
// const { dbLogin, dbPw } = require("../utils/dbConfig.js");
const dbLogin = process.env.MONGO_DBLOGIN;
const dbPw = process.env.MONGO_DBPW;
const uri = `mongodb://${dbLogin}:${dbPw}@ds139960.mlab.com:39960/lambda-notes`;
module.exports = {
  connect: function() {
    return mongoose.connect(uri);
  }
};
