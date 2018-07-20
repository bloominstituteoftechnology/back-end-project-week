const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId


const UserSchema = new Schema ({
    username: {
        type:String,
        required:true
    },
    email : {
        type : String,
        required: true,
    },
    password: {
        type:String,
        required:true
    },
    notes : [{type:ObjectId,ref:'Note'}]    
})

UserSchema.pre('save',function(next){
    bcrypt.hash(this.password,10,(err, hash) => {
        if (err) {
            return next(err)
        }
        this.password = hash;
        next();
    })
})

const UserModel = mongoose.model('User',UserSchema)

module.exports = UserModel;

