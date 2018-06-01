const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;

module.exports = {
    connect: function() {
        if (uri) {
            return mongoose.connect(uri);
        }
        return mongoose.connect(
            'mongodb://${dbLogin}:${dbPW}@'
        )
    }
};