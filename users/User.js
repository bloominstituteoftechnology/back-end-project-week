const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
    race: {
        type: String,
        required: true
    }
});

// Must be BEFORE you generate the model (e.g. `module.exports...etc.`)
// REMEMBER, you have to use regular 'function' NOT arrow here because you need to use `this`
// If you use an arrow function then `this` will be bound to the outside scope.
// QUESTION: So this will run just before the user.save() in route.js???
userSchema.pre('save', function (next) {
    // PROMISE METHOD:
    // algorithm will run 2^10 times 
    // On this line however, you NEED an arrow function, because `this` applies to the document
    // Otherwise, you would need to write `const user = this;` here, and then replace this.password
    // with user.password (see full ex below)
    bcrypt.hash(this.password, 10).then(hash => {
        this.password = hash;
        // next must be here INSIDE the backet, b/c you only want to move on if there are no errors
        next();
    })
})

// Should compare the password with input and let us know if it isValid or not
userSchema.methods.verifyPassword = function(guess, callback) {
    bcrypt.compare(guess, this.password, function(err, isValid) {
        if(err) {return callback(err)}
        // here there was no error
        callback(null, isValid)
    })
}

// Regular function usage EXAMPLE [also works]:
// userSchema.pre('save', function (next) {
//     const user = this;
//     bcrypt.hash(this.password, 10).then(hash => {
//         user.password = hash;
//         next();
//     })
// })

// The third parameter here is not required as 'User' will be lowercased and pluralized
// automatically as the title of the collection.  It is added here just to be more explicit.
module.exports = mongoose.model('User', userSchema, 'users')