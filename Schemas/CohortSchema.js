const mongoose = require('mongoose');

const cohortSchema = new mongoose.Schema({
    cohort_name: {
        type: String
    }
});

const cohortModel = mongoose.model("Cohort", tagSchema, "cohorts");

module.exports = cohortModel;

