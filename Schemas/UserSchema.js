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
    username_ids: {
        type: Number
    },
    username: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Auth"
    },
    cohort_ids: {
        type: Number
    },
    cohort: { //comes from cohorts
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Cohort'
    },
    note_ids: {
        type: Number
    },
    notesWritten: { //comes from notes
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Note'
    },
};

const userOptions = {
    timestamp = true
};

const UserSchema = new mongoose.Schema(userDefinition, userOptions);

const userModel = mongoose.model("User", UserSchema, "users");

module.exports = userModel;
