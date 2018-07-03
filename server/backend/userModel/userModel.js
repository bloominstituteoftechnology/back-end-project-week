const mongoose = require( 'mongoose' );
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = mongoose.Schema( {
    title: {
        type: String,
        required: true,
        unqiue: true
    },
    password: {
        type: String,
        required: true
    }
} )

module.exports = mongoose.model( 'User', User )
