const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const BCRYPT_COST = 11;

const UserSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: Schema.Types.Mixed,
        required: true,
        unique: false,
    }
});

UserSchema.pre("save", function(next){
    bcrypt.hash(this.password, BCRYPT_COST, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    })
});

UserSchema.methods.checkLogin = function(newLoginPass, cb){
    bcrypt.compare(newLoginPass, this.password, (err, matched) => {
        if (err) return next(err);
        if (matched) cb(matched);
    })
}

module.exports = mongoose.model("UserModel", UserSchema, "Users");