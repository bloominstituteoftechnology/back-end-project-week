const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = Schema({
   title: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
   },
   title: {
      type: String,
      required: true,
   },
});

// UserSchema.pre('save', function(next) {
//    const user = this;
//    if (!user.isModified('password')) return next();
//    bcrypt.hash(user.password, BCYRPT_COST, function(error, hash) {
//       if (error) return next(error);
//       user.password = hash;
//       next();
//    });
// });

// UserSchema.methods.checkPassword = function(plainTextPassword, cb) {
//    bcrypt.compare(plainTextPassword, this.password, (err, isMatch) => {
//       if (err) return cb(err);
//       cb(null, isMatch);
//    });
// };

module.exports = mongoose.model('Note', NoteSchema);