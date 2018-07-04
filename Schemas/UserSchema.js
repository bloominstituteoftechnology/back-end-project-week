const mongoose = require('mongoose');

const userDefinition = {

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    cohort: { //comes from cohorts
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Cohort'
    },
    notesWritten: { //comes from notes
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Note'
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
};

const userOptions = {
    timestamp = true
};

const UserSchema = new mongoose.Schema(userDefinition, userOptions);

const userModel = mongoose.model("User", UserSchema, "users");

module.exports = userModel;
