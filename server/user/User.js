const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new mongoose.Schema({
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true }
}, { collection: 'User' });

User.pre('save', function (next) {
    bcrypt
        .hash(this.password, 12)
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => {
            next(err);
        });
});

User.methods.checkPassword = function (plainTextPW, callBack) {
    bcrypt.compare(plainTextPW, this.password, (err, res) => {
        return callBack(err, res)
    })
};

module.exports = mongoose.model('User', User);
